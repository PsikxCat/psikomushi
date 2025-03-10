import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'

import {
  Home,
  DashboardPage,
  ProductsPage,
  OrdersPage,
  CustomersPage,
  LoginPage,
  RegisterPage,
} from '@/pages'
import MainLayout from '@/layouts/MainLayout'
import AdminLayout from '@/layouts/AdminLayout'
import { RequireAdmin, RequireEmployee, RequireGuest } from '@/utils/routeGuard'

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        {/* Rutas públicas */}
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Home />} />
          <Route path="/auth" element={<RequireGuest />}>
            <Route path="login" element={<LoginPage />} />
            <Route path="register" element={<RegisterPage />} />
          </Route>
        </Route>

        {/* Rutas del panel de administración */}
        <Route path="/admin" element={<MainLayout />}>
          <Route element={<AdminLayout />}>
            {/* Rutas accesibles para empleados y administradores */}
            <Route element={<RequireEmployee />}>
              <Route path="orders" element={<OrdersPage />} />
              <Route path="customers" element={<CustomersPage />} />
            </Route>

            {/* Rutas solo para administradores */}
            <Route element={<RequireAdmin />}>
              <Route path="dashboard" element={<DashboardPage />} />
              <Route path="products" element={<ProductsPage />} />
            </Route>
          </Route>
        </Route>
      </Routes>
    </Router>
  )
}

export default App
