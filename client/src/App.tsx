import { BrowserRouter as Router, Route, Routes, Outlet } from 'react-router-dom'

import { Home, Dashboard, Products, Orders, Customers } from '@/pages'
import MainLayout from '@/layouts/MainLayout'

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
          path="/admin"
          element={
            <MainLayout>
              <Outlet />
            </MainLayout>
          }
        >
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="products" element={<Products />} />
          <Route path="orders" element={<Orders />} />
          <Route path="customers" element={<Customers />} />
        </Route>
      </Routes>
    </Router>
  )
}

export default App
