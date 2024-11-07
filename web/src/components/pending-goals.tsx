import { Plus } from 'lucide-react'
import { useQuery, useQueryClient } from '@tanstack/react-query'

import { getPendingGoals } from '@/http/get-pending-goals'
import { createGoalCompletion } from '@/http/create-goal-completion'

import { OutlineButton } from './ui/outline-button'

interface PendingGoalsProps {
  disableButtons: boolean
  selectedWeek: number
}

export function PendingGoals({ disableButtons, selectedWeek }: PendingGoalsProps) {
  const queryClient = useQueryClient()

  const { data } = useQuery({
    queryKey: ['pending-goals', selectedWeek],
    queryFn: () => getPendingGoals(selectedWeek),
    staleTime: 1000 * 60, // 60 minutes
  })

  if (!data) return null

  async function handleCompleteGoal(goalId: string) {
    await createGoalCompletion(goalId)

    queryClient.invalidateQueries({ queryKey: ['summary'] })
    queryClient.invalidateQueries({ queryKey: ['pending-goals'] })
  }

  return (
    <div className="flex flex-wrap gap-3">
      {data.map(goal => (
        <OutlineButton
          key={goal.id}
          onClick={() => handleCompleteGoal(goal.id)}
          disabled={goal.completionCount >= goal.desiredWeeklyFrequency || disableButtons}
        >
          <Plus className="size4 text-zinc-600" />
          {goal.title}
        </OutlineButton>
      ))}
    </div>
  )
}
