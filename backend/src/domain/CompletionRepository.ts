export interface IAiMessage {
  role: 'system' | 'user' | 'assistant'
  content: string
}

export interface CompletionRepository {
  complete({
    messages,
    includeReason,
  }: {
    messages: IAiMessage[]
    includeReason?: boolean
  }): Promise<IAiMessage>
}
