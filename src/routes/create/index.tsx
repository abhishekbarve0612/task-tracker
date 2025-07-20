import CreateTaskScreen from '@/screenComponents/createTask'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/create/')({
  component: RouteComponent,
})

function RouteComponent() {
  return <CreateTaskScreen />
}
