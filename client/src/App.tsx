import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'

import {
  Home,
  DashboardPage,
  ProductsPage,
  OrdersPage,
  CustomersPage,
  LoginPage,
  RegisterPage,
  SalesPage,
  UserProfilePage,
  UserOrdersPage,
  CartPage,
  StorePage,
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
            <Route path="cart" element={<CartPage />} /> {/* Carrito de compras */}
          </Route>
          {/* Rutas exclusivas para usuario no registrado (guest) */}
          <Route element={<RequireGuest />}>
            <Route path="auth/login" element={<LoginPage />} />
            <Route path="auth/register" element={<RegisterPage />} />
          </Route>
          {/* Rutas accesibles para todos */}
          <Route>
            <Route index element={<Home />} />
            <Route path="store" element={<ProductsPage />} />
            <Route path="cart" element={<CartPage />} /> {/* Carrito de compras */}
          </Route>
          {/* Rutas para usuarios autenticados */}
          <Route element={<RequireClient />}>
            {/* <Route path="user" element={<UserLayout />}> // > Evaluar necesidad de UserLayout <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<< */}
            <Route path="user" />
            <Route index element={<UserProfilePage />} /> {/* Ej: Perfil del usuario */}
            <Route path="orders" element={<UserOrdersPage />} /> {/* Historial de órdenes */}
          </Route>
        </Route>

        {/* Rutas del panel de administración */}
        <Route path="/admin" element={<MainLayout />}>
          <Route element={<AdminLayout />}>
            {/* Rutas accesibles para vendedores (seller) */}
            <Route element={<RequireSeller />}>
              <Route path="sales" element={<SalesPage />} /> {/* Gestión de ventas */}
              <Route path="orders" element={<OrdersPage />} /> {/* Gestión de órdenes */}
            </Route>

            {/* Rutas accesibles para repartidores (delivery) */}
            <Route element={<RequireDelivery />}>
              <Route path="orders" element={<OrdersPage />} /> {/* Gestión de órdenes */}
            </Route>

            {/* Rutas solo para administradores */}
            <Route element={<RequireAdmin />}>
              <Route path="dashboard" element={<DashboardPage />} /> {/* Dashboard */}
              <Route path="products" element={<ProductsPage />} /> {/* Gestión de productos */}
              <Route path="customers" element={<CustomersPage />} /> {/* Gestión de clientes */}
            </Route>
          </Route>
        </Route>
      </Routes>
    </Router>
  )
}

export default App
