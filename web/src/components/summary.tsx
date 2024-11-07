import dayjs from 'dayjs'
import { useState } from 'react'
import ptBR from 'dayjs/locale/pt-BR'
import weekOfYear from 'dayjs/plugin/weekOfYear'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import { CheckCircle2, ChevronLeft, ChevronRight, Plus } from 'lucide-react'

import { InOrbitIcon } from './in-orbit-icon'

import {
  getFormattedDate,
  getFormattedTime,
  getOldestWeekWithGoals,
  getWeek,
  getWeekDay,
} from '@/utils/convert-date'

import { getSummary } from '@/http/get-summary'
import { removeGoalCompletion } from '@/http/remove-goal-completion'

import { Button } from './ui/button'
import { Separator } from './ui/separator'
import { DialogTrigger } from './ui/dialog'
import { Progress, ProgressIndicator } from './ui/progress-bar'

import { PendingGoals } from './pending-goals'

dayjs.locale(ptBR)
dayjs.extend(weekOfYear)

const thisWeek = dayjs().week() - 1

export function Summary() {
  const [selectedWeek, setSelectedWeek] = useState(thisWeek)
  const queryClient = useQueryClient()

  const { data } = useQuery({
    queryKey: ['summary', selectedWeek],
    queryFn: () => getSummary(selectedWeek),
    staleTime: 1000 * 60, // 60 minutes
  })

  if (!data) return null

  const completedPercentage = Math.round((data.completed * 100) / data.total)

  function handleSelectNextWeek() {
    setSelectedWeek(week => week + 1)
  }
  function handleSelectPreviousWeek() {
    setSelectedWeek(week => week - 1)
  }

  async function handleRemoveCompletion(goalCompletionId: string) {
    await removeGoalCompletion(goalCompletionId)

    queryClient.invalidateQueries({ queryKey: ['summary'] })
    queryClient.invalidateQueries({ queryKey: ['pending-goals'] })
  }

  return (
    <div className="py-10 max-w-[480px] px-5 mx-auto flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <InOrbitIcon />
          <span className="text-lg font-semibold capitalize">
            {getWeek(selectedWeek)}
          </span>

          <button
            type="button"
            className="-ml-2 mt-1 text-zinc-400 transition-colors hover:text-zinc-300 disabled:text-zinc-500"
            onClick={handleSelectPreviousWeek}
            disabled={getOldestWeekWithGoals(data.oldestGoal) === selectedWeek}
          >
            <ChevronLeft className="size-5" />
          </button>
          <button
            type="button"
            className="-ml-2 mt-1 text-zinc-400 transition-colors hover:text-zinc-300 disabled:text-zinc-500"
            onClick={handleSelectNextWeek}
            disabled={selectedWeek === thisWeek}
          >
            <ChevronRight className="size-5" />
          </button>
        </div>

        <DialogTrigger asChild>
          <Button size="sm">
            <Plus className="size-4" />
            Cadastrar meta
          </Button>
        </DialogTrigger>
      </div>

      <div className="flex flex-col gap-3">
        <Progress max={15} value={8}>
          <ProgressIndicator style={{ width: `${completedPercentage}%` }} />
        </Progress>

        <div className="flex items-center justify-between text-start text-zinc-400">
          <span>
            Você completou <span className="text-zinc-100">{data.completed}</span> de{' '}
            <span className="text-zinc-100">{data.total}</span> metas essa semana
          </span>
          <span>{completedPercentage}%</span>
        </div>
      </div>

      <Separator />

      <PendingGoals
        disableButtons={selectedWeek !== thisWeek}
        selectedWeek={selectedWeek}
      />

      <div className="flex flex-col gap-6">
        <h2 className="text-xl font-medium">Sua semana</h2>

        {Object.entries(data.goalsPerDay).map(([date, goals]) => (
          <div key={date} className="flex flex-col gap-4">
            <h3 className="font-medium">
              <span className="capitalize">{getWeekDay(date)}</span>{' '}
              <span className="text-zinc-400 text-xs">({getFormattedDate(date)})</span>
            </h3>

            <ul className="flex flex-col gap-3">
              {goals.map(goal => (
                <li key={goal.id} className="flex items-center gap-2">
                  <CheckCircle2 className="size-4 text-pink-500" />
                  <span className="text-sm text-zinc-400">
                    Você completou "<span className="text-zinc-100">{goal.title}</span>"
                    às{' '}
                    <span className="text-zinc-100">
                      {getFormattedTime(goal.completedAt)}h
                    </span>
                  </span>
                  <button
                    type="button"
                    onClick={() => handleRemoveCompletion(goal.id)}
                    className="ml-1 text-xs text-zinc-500 underline underline-offset-2 transition-colors hover:text-zinc-600"
                  >
                    Desfazer
                  </button>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  )
}
