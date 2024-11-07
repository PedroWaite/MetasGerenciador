import z from 'zod'
import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import { removeGoalCompletion } from '@/services/remove-goal-completion'

export const removeCompletionRoute: FastifyPluginAsyncZod = async app => {
  app.delete(
    '/completions',
    {
      schema: {
        body: z.object({
          goalCompletionId: z.string(),
        }),
      },
    },
    async request => {
      const { goalCompletionId } = request.body

      await removeGoalCompletion({ goalCompletionId })
    }
  )
}
