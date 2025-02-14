import { Request, Response } from 'express'
import { CompletionsApplication } from '../../application/CompletionsApplication'
import { DeepSeekRepository } from '../../infrastructure/repositories'

export class CompletionsController {
  static async completions(req: Request, res: Response) {
    try {
      const aiRepository = new DeepSeekRepository()
      const completionsApplication = new CompletionsApplication(aiRepository)

      const { messages } = req.body
      const message = await completionsApplication.run(messages)

      res.json({ message })
    } catch (error) {
      console.error('Error processing completions:', error)
      res.status(500).json({ success: false, error: 'Error processing completions' })
    }
  }
}
