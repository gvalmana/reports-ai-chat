import OpenAI from 'openai'
import { CompletionRepository, IAiMessage } from '@/domain'

export class OpenAIRepository implements CompletionRepository {
  private model: OpenAI

  constructor() {
    console.log('Usando OpenAi...')
    this.model = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
      dangerouslyAllowBrowser: true,
    })
  }

  async complete({
    messages,
    includeReason = true,
  }: {
    messages: IAiMessage[]
    includeReason?: boolean
  }): Promise<IAiMessage> {
    const completion = await this.model.chat.completions.create({
      messages,
      model: 'gpt-3.5-turbo',
      temperature: 0.7,
    })

    const message = completion.choices[0]?.message
    if (!message) throw new Error('No message received')

    if (includeReason && message?.content) {
      message.content = message.content?.replace(/<think>.*?<\/think>/, '')
    }

    return {
      role: message.role,
      content: message.content || '',
    }
  }
}
