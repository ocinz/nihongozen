import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_authed/management/quiz/create')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/_authed/management/quiz/create"!</div>
}
