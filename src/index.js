import OpenAI from "openai"

const corsHeaders = {
	"Access-Control-Allow-Origin": "*",
	"Access-Control-Allow-Methods": "POST, OPTIONS",
	"Access-Control-Allow-Headers": "Content-Type"
};

export default {
	async fetch(request, env, ctx) {
		if (request.method === "OPTIONS") {
			return new Response(null, {headers: corsHeaders});
		}

		if (request.method !== "POST") {
			return new Response(JSON.stringify({ errror: `${request.method} method is not allowed`}), { status: 405, headers: corsHeaders })
		}

		const openai = new OpenAI({
			apiKey: env.OPENAI_API_KEY
		})
		try {
			const userMessage = await request.json()
			const chatCompletion = await openai.chat.completions.create({
				model: "gpt-4",
				messages: [{
					role: 'system',
					content: 'You are Braze customer engagment platform email expert'
				},
				{
					role: 'user',
					content: `Write me email copy for the video editing platform Clipchamp presuading me to try it. It needs to be in the following format:
					
					Heading: 10 words of less
					Body copy: 60 words or less
					CTA: 5 words or less
					
					The copy should be upbeat, engaging and aimed at novice information workers. It should also include specific references to Clipchamp features to avoid sounding generic.
					Do not include introductions such as "hello there"`
				}]
			})
			const data = chatCompletion.choices[0].message
			const emailToSplit = data.content
        	const response = emailToSplit.split(/: |\n/)

			return new Response(JSON.stringify(response), { headers: corsHeaders})
		} catch (err) {
			return new Response(JSON.stringify({ error: err.message }), { status: 500, headers: corsHeaders})
		}
	}
}
