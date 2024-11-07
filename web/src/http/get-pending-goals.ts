export type PendingGoalsResponse = Array<{
  id: string
  title: string
  desiredWeeklyFrequency: number
  completionCount: number
}>

export async function getPendingGoals(weekOfYear: number): Promise<PendingGoalsResponse> {
  const response = await fetch(
    `http://localhost:3333/pending-goals?weekOfYear=${weekOfYear}`
  )
  const data = await response.json()

  return data.pendingGoals
}
