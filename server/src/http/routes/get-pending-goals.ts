import z from 'zod'
import dayjs from 'dayjs'
import weekOfYearPlugin from 'dayjs/plugin/weekOfYear'
import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'

import { getWeekPendingGoals } from '@/services/get-week-pending-goals'

dayjs.extend(weekOfYearPlugin)

export const getPendingGoalsRoute: FastifyPluginAsyncZod = async app => {
  app.get(
    '/pending-goals',
    {
      schema: {
        querystring: z.object({
          weekOfYear: z.coerce.number().optional(),
        }),
      },
    },
    async request => {
      const { weekOfYear } = request.query

      const week = weekOfYear ?? dayjs().week() - 1

      const { pendingGoals } = await getWeekPendingGoals(week)

      return { pendingGoals }
    }
  )
}
