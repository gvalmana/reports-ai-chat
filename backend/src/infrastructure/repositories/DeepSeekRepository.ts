import OpenAI from 'openai'
import { CompletionRepository, IAiMessage } from '@/domain'

export class DeepSeekRepository implements CompletionRepository {
  private model: OpenAI

  constructor() {
    console.log('Usando DeepSeek...')
    this.model = new OpenAI({
      baseURL: 'http://localhost:11434/v1',
      apiKey: 'ollama',
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
      model: 'deepseek-r1:1.5b',
      temperature: 0.7,
    })

    const message = completion.choices[0]?.message
    if (!message) throw new Error('No message received')

    if (!includeReason && message?.content) {
      message.content = message.content.replace(/<think>[\s\S]*?<\/think>/g, '')
    }

    return {
      role: message.role,
      content: message.content || '',
    }
  }
}
