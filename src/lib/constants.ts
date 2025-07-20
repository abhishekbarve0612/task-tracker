import type { Category, Priority } from '@/lib/types'

export const categories: Category[] = [
  { value: 'personal', label: 'Personal', color: 'emerald' },
  { value: 'work', label: 'Work', color: 'amber' },
  { value: 'health', label: 'Health', color: 'rose' },
  { value: 'learning', label: 'Learning', color: 'violet' },
]

export const priorities: Priority[] = [
  { value: 'low', label: 'Low', color: 'slate' },
  { value: 'medium', label: 'Medium', color: 'orange' },
  { value: 'high', label: 'High', color: 'red' },
]
