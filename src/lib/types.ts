export interface Task {
  id: string
  title: string
  description: string
  completed: boolean
  priority: 'low' | 'medium' | 'high'
  category: string
  createdAt: Date
  dueDate?: Date
}

export interface Category {
  value: string
  label: string
  color: string
}

export interface Priority {
  value: string
  label: string
  color: string
}
