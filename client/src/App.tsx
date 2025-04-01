import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'

import {
  Home,
  AdminDashboardPage,
  AdminProductsPage,
  AdminOrdersPage,
  AdminCustomersPage,
  AdminSalesPage,
  LoginPage,
  RegisterPage,
  UserProfilePage,
  UserOrdersPage,
  CartPage,
  StorePage,
  ProductPage,
} from '@/pages'
import MainLayout from '@/layouts/MainLayout'
import AdminLayout from '@/layouts/AdminLayout'
import { RequireAdmin, RequireSeller, RequireDelivery, RequireGuest, RequireClient } from '@/utils/routeGuard'

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        {/* Rutas públicas */}
        <Route path="/" element={<MainLayout />}>
          {/* Rutas accesibles para todos */}
          <Route>
            <Route index element={<Home />} />
            <Route path="store" element={<StorePage />} />
            <Route path="store/:productId" element={<ProductPage />} /> {/* Detalle de producto */}
            <Route path="cart" element={<CartPage />} /> {/* Carrito de compras */}
          </Route>

          {/* Rutas exclusivas para usuario no registrado (guest) */}
          <Route element={<RequireGuest />}>
            <Route path="auth/login" element={<LoginPage />} />
            <Route path="auth/register" element={<RegisterPage />} />
          </Route>

          {/* Rutas para usuarios autenticados */}
          <Route element={<RequireClient />}>
            {/* <Route path="user" element={<UserLayout />}> // > Evaluar necesidad de UserLayout <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<< */}
            <Route path="user" element={<UserProfilePage />} /> {/* Perfil de usuario */}
            <Route path="orders" element={<UserOrdersPage />} /> {/* Historial de órdenes del usuario */}
          </Route>
        </Route>

        {/* Rutas del panel de administración */}
        <Route path="/admin" element={<MainLayout />}>
          <Route element={<AdminLayout />}>
            {/* Rutas accesibles para vendedores (seller) */}
            <Route element={<RequireSeller />}>
              <Route path="sales" element={<AdminSalesPage />} /> {/* Gestión de ventas */}
              <Route path="orders" element={<AdminOrdersPage />} /> {/* Gestión de órdenes */}
            </Route>

            {/* Rutas accesibles para repartidores (delivery) */}
            <Route element={<RequireDelivery />}>
              <Route path="orders" element={<AdminOrdersPage />} /> {/* Gestión de órdenes */}
            </Route>

            {/* Rutas solo para administradores */}
            <Route element={<RequireAdmin />}>
              <Route path="dashboard" element={<AdminDashboardPage />} /> {/* Dashboard */}
              <Route path="products" element={<AdminProductsPage />} /> {/* Gestión de productos */}
              <Route path="customers" element={<AdminCustomersPage />} /> {/* Gestión de clientes */}
            </Route>
          </Route>
        </Route>
      </Routes>
    </Router>
  )
}

export default App
