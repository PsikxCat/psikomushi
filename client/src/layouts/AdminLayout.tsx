import { Outlet } from 'react-router-dom'

import { Header, Sidebar } from '@/components'

export default function AdminLayout() {
  return (
    <section className="flex w-full border border-red-500">
      <Sidebar />

      <div className="flex-1">
        <Header />
        <main className="p-4">
          <Outlet />
        </main>
      </div>
    </section>
  )
}
