import { Outlet } from 'react-router-dom'

import { Sidebar } from '@/components'

export default function AdminLayout() {
  return (
    <section className="flex w-full bg-earth-sand">
      <Sidebar />

      <div className="flex-1">
        <main className="p-4">
          <Outlet />
        </main>
      </div>
    </section>
  )
}
