import { eq } from 'drizzle-orm'

import { db } from '@/db'
import { goalCompletions } from '@/db/schema'

interface RemoveGoalCompletionRequest {
  goalCompletionId: string
}

export async function removeGoalCompletion({
  goalCompletionId,
}: RemoveGoalCompletionRequest) {
  await db.delete(goalCompletions).where(eq(goalCompletions.id, goalCompletionId))
}
