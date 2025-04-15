import { Outlet } from 'react-router-dom'

import { Sidebar } from '@/components'

export default function AdminLayout() {
  return (
    <section className="flex h-[calc(100vh-max(70px,calc(50px+3vw))-3rem)] w-full bg-earth-sand">
      <Sidebar />

      <div className="h-full flex-1">
        <main className="section h-full p-4">
          <Outlet />
        </main>
      </div>
    </section>
  )
}
