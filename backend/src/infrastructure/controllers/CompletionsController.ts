import { Request, Response } from 'express'
import { CompletionsApplication } from '../../application/CompletionsApplication'
import { OpenAIRepository } from '../../infrastructure/repositories'

export class CompletionsController {
  static async completions(req: Request, res: Response) {
    try {
      const aiRepository = new OpenAIRepository()
      const alegraApiKey: string = req.headers.authorization || ''
      const completionsApplication = new CompletionsApplication(aiRepository, alegraApiKey)

      const { messages } = req.body
      const message = await completionsApplication.runWithTool(messages)

      res.json({ message })
    } catch (error) {
      console.error('Error processing completions:', error)
      res.status(500).json({ success: false, error: 'Error processing completions' })
    }
  }
}
