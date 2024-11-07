import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'

import { createGoalRoute } from './create-goal'
import { createCompletionRoute } from './create-completion'
import { getPendingGoalsRoute } from './get-pending-goals'
import { getWeekSummaryRoute } from './get-week-summary'
import { removeCompletionRoute } from './remove-completion'

export const routes: FastifyPluginAsyncZod = async app => {
  app.register(createGoalRoute)
  app.register(createCompletionRoute)
  app.register(getPendingGoalsRoute)
  app.register(getWeekSummaryRoute)
  app.register(removeCompletionRoute)
}
