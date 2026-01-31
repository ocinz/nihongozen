import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_authed/administration/staff/create')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/_authed/administration/staff/create"!</div>
}
