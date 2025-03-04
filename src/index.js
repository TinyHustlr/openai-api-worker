import OpenAI from "openai"

const corsHeaders = {
	"Access-Control-Allow-Origin": "*",
	"Access-Control-Allow-Methods": "POST, OPTIONS",
	"Access-Control-Allow-Headers": "Content-Type"
};

export default {
	async fetch(request, env, ctx) {
		if (requested.method == 'OPTIONS') {
			return new Response(null, {headers: corsHeaders});
		}
		
		const openai = new OpenAI({
			apiKey: env.OPENAI_API_KEY
		})
		try {
			const chatCompletion = await openai.chat.completions.create({
				model: "gpt-4",
				messages: [
					{
						role: "system",
						content: "You are a stock trading super computer"
					},
					{
						role: "user",
						content: "what are the top 5 stocks to buy today"
					}
				]
			})
			const response = chatCompletion.choices[0].message
			return new Response(JSON.stringify(response), { headers: corsHeaders})
		} catch (err) {
			return new Response(env, { headers: corsHeaders})
		}
	}
}
