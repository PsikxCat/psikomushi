import { Link } from 'react-router-dom'

export default function Sidebar() {
  return (
    <nav className="h-screen w-44 bg-muted text-white">
      <ul>
        <li>
          <Link to="/admin/dashboard" className="block p-4 hover:bg-gray-700">
            Dashboard
          </Link>
        </li>
        <li>
          <Link to="/admin/orders" className="block p-4 hover:bg-gray-700">
            Órdenes
          </Link>
        </li>
        <li>
          <Link to="/admin/products" className="block p-4 hover:bg-gray-700">
            Productos
          </Link>
        </li>
      </ul>
    </nav>
  )
}
