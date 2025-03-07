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

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <MainLayout>
              <Home />
            </MainLayout>
          }
        />

        <Route
          path="/auth/login"
          element={
            <MainLayout>
              <LoginPage />
            </MainLayout>
          }
        />

        <Route
          path="/auth/register"
          element={
            <MainLayout>
              <RegisterPage />
            </MainLayout>
          }
        />

        <Route
          path="/admin"
          element={
            <MainLayout>
              <AdminLayout />
            </MainLayout>
          }
        >
          <Route path="dashboard" element={<DashboardPage />} />
          <Route path="products" element={<ProductsPage />} />
          <Route path="orders" element={<OrdersPage />} />
          <Route path="customers" element={<CustomersPage />} />
        </Route>
      </Routes>
    </Router>
  )
}

export default App
