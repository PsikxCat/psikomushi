import { Link, useLocation } from 'react-router-dom'

type SidebarItemProps = {
  to: string
  label: string
  isActive: boolean
}

const SidebarItem = ({ to, label, isActive }: SidebarItemProps) => (
  <li>
    <Link
      to={to}
      className={`block p-4 transition-all ${
        isActive
          ? 'translate-x-2 scale-105 rounded-r-sm bg-earth-terracotta underline underline-offset-4'
          : 'hover:translate-x-1 hover:scale-105 hover:text-earth-terracotta hover:underline hover:underline-offset-4'
      }`}
    >
      {label}
    </Link>
  </li>
)

export default function Sidebar() {
  const location = useLocation()

  const menuItems: Omit<SidebarItemProps, 'isActive'>[] = [
    { to: '/admin/dashboard', label: 'Dashboard' },
    { to: '/admin/products', label: 'Productos' },
    { to: '/admin/employees', label: 'Empleados' },
    { to: '/admin/customers', label: 'Clientes' },
    { to: '/admin/sales', label: 'Ventas' },
    { to: '/admin/orders', label: 'Órdenes' },
  ]

  return (
    <nav className="h-[calc(100vh-max(70px,calc(50px+3vw))-3rem)] w-44 bg-earth-darkBrown py-6 text-white">
      <ul className="flex flex-col space-y-4">
        {menuItems.map((item) => {
          // Verificar si la ruta actual coincide con este elemento del menú
          const isActive =
            location.pathname === item.to ||
            (item.to !== '/admin/dashboard' && location.pathname.startsWith(item.to))

          return <SidebarItem key={item.to} to={item.to} label={item.label} isActive={isActive} />
        })}
      </ul>
    </nav>
  )
}
