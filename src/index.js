import OpenAI from "openai"

export default {
	async fetch(request, env, ctx) {
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
			return new Response(JSON.stringify(response))
		} catch (err) {
			return new Response("There was an error: " + err.message, { status: 500 })
		}
	}
}
