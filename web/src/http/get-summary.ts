export type SummaryResponse = {
  oldestGoal: Date
  completed: number
  total: number
  goalsPerDay: Record<
    string,
    Array<{
      id: string
      title: string
      completedAt: string
    }>
  >
}

export async function getSummary(weekOfYear: number): Promise<SummaryResponse> {
  const response = await fetch(`http://localhost:3333/summary?weekOfYear=${weekOfYear}`)
  const data = await response.json()

  return data.summary
}
