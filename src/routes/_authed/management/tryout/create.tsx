import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_authed/management/tryout/create')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/_authed/management/tryout/create"!</div>
}
