import z from 'zod'
import dayjs from 'dayjs'
import weekOfYearPlugin from 'dayjs/plugin/weekOfYear'
import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'

import { getWeekSummary } from '@/services/get-week-summary'

dayjs.extend(weekOfYearPlugin)

export const getWeekSummaryRoute: FastifyPluginAsyncZod = async app => {
  app.get(
    '/summary',
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

      const { summary } = await getWeekSummary(week)

      return { summary }
    }
  )
}
