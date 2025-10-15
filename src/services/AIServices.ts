import { streamText } from 'ai'
import { openrouter } from '../lib/ai'

export default {
    async generateRecipe(prompt: string) {
        const result = streamText({
            model: openrouter('meta-llama/llama-3.3-8b-instruct:free'),
            prompt,
            system: 'You are a child 5 years old',
            temperature: 1
        })

        return result.textStream
    }
}