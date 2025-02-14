import { CompletionRepository, IAiMessage } from '@/domain'

export class CompletionsApplication {
  constructor(private repository: CompletionRepository) {}

  async run(messages: IAiMessage[]) {
    return this.repository.complete({ messages })
  }
}
