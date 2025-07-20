import type React from 'react'
import { Button, Form } from '@/components'
import { categories, priorities } from '@/lib/constants'

export interface TaskFormData {
  title: string
  description: string
  priority: 'low' | 'medium' | 'high'
  category: string
  dueDate: string
}

interface TaskFormProps {
  task: TaskFormData
  setTask: (task: TaskFormData) => void
  onSubmit: () => void
  onCancel: () => void
  submitLabel: string
}

function TaskForm({ task, setTask, onSubmit, onCancel, submitLabel }: TaskFormProps) {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit()
  }

  return (
    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        <Form.Label htmlFor="title">Title</Form.Label>
        <Form.Input
          id="title"
          value={task.title}
          onChange={(e) => setTask({ ...task, title: e.target.value })}
          placeholder="What needs to be done?"
          required
        />
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        <Form.Label htmlFor="description">Description</Form.Label>
        <Form.Textarea
          id="description"
          value={task.description}
          onChange={(e) => setTask({ ...task, description: e.target.value })}
          placeholder="Add more details..."
          rows={3}
        />
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <Form.Label htmlFor="category">Category</Form.Label>
          <Form.Select
            value={task.category}
            onValueChange={(value) => setTask({ ...task, category: value })}
          >
            <Form.Select.Trigger>
              <Form.Select.Value />
            </Form.Select.Trigger>
            <Form.Select.Content>
              {categories.map((category) => (
                <Form.Select.Item key={category.value} value={category.value}>
                  {category.label}
                </Form.Select.Item>
              ))}
            </Form.Select.Content>
          </Form.Select>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <Form.Label htmlFor="priority">Priority</Form.Label>
          <Form.Select
            value={task.priority}
            onValueChange={(value) =>
              setTask({ ...task, priority: value as 'low' | 'medium' | 'high' })
            }
          >
            <Form.Select.Trigger>
              <Form.Select.Value />
            </Form.Select.Trigger>
            <Form.Select.Content>
              {priorities.map((priority) => (
                <Form.Select.Item key={priority.value} value={priority.value}>
                  {priority.label}
                </Form.Select.Item>
              ))}
            </Form.Select.Content>
          </Form.Select>
        </div>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        <Form.Label htmlFor="dueDate">Due Date (Optional)</Form.Label>
        <Form.Input
          id="dueDate"
          type="date"
          value={task.dueDate}
          onChange={(e) => setTask({ ...task, dueDate: e.target.value })}
        />
      </div>

      <div style={{ display: 'flex', gap: '12px', paddingTop: '16px' }}>
        <Button type="submit" style={{ flex: 1 }}>
          {submitLabel}
        </Button>
        <Button
          type="button"
          variant={Button.Variants.ghost}
          onClick={onCancel}
          style={{ flex: 1 }}
        >
          Cancel
        </Button>
      </div>
    </form>
  )
}

export default TaskForm
