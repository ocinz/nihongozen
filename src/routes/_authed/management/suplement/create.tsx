import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_authed/management/suplement/create')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/_authed/management/suplement/create"!</div>
}
