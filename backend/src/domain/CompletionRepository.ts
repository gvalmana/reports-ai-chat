import { ChatCompletionTool } from 'openai/resources/chat/completions'

export interface IAiMessage {
  role: 'system' | 'user' | 'assistant'
  content: string
}
export interface IAiMessageWithTool extends IAiMessage {
  tool_calls: {
    name: string
    arguments: string
  }[]
}

export interface CompletionRepository {
  complete({
    messages,
    includeReason,
  }: {
    messages: IAiMessage[]
    includeReason?: boolean
  }): Promise<IAiMessage>
  completeWithTool({
    messages,
    tools,
    toolChoice,
  }: {
    messages: IAiMessage[]
    tools: ChatCompletionTool[]
    toolChoice?: 'auto' | 'none' | 'required'
  }): Promise<IAiMessageWithTool>
}
