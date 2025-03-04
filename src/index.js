import OpenAI from "openai"

const corsHeaders = {
	"Access-Control-Allow-Origin": "*",
	"Access-Control-Allow-Methods": "POST, OPTIONS",
	"Access-Control-Allow-Headers": "Content-Type"
};

export default {
	async fetch(request, env, ctx) {
		if (request.method === 'OPTIONS') {
			return new Response(null, {headers: corsHeaders});
		}

		if (request.method !== POST) {
			return new Response(JSON.stringify({ errror: `${request.method} method is not allowed`}), { status: 405, headers: corsHeaders })
		}

		const openai = new OpenAI({
			apiKey: env.OPENAI_API_KEY,
			baseURL: "https://gateway.ai.cloudflare.com/v1/c638b79f5291ad3033b57af0c47d3820/stock-predictions/openai"
		})
		try {
			const messages = await request.json()
			const chatCompletion = await openai.chat.completions.create({
				model: "gpt-4",
				messages: messages
			})
			const response = chatCompletion.choices[0].message
			return new Response(JSON.stringify(response), { headers: corsHeaders})
		} catch (err) {
			return new Response(JSON.stringify({ error: err.message }), { status: 500, headers: corsHeaders})
		}
	}
}
