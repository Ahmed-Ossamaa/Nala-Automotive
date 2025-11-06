import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from 'react-hot-toast';
import { useEffect } from 'react';
import { useAuthStore } from './store/authStore';

// Layouts
import { Layout } from './components/layout/layout';
import { AdminLayout } from './components/layout/AdminLayout';

// Public Pages
import { Home } from './pages/Home';
import { Login } from './pages/Auth/Login';
import { Register } from './pages/Auth/Register';
import { CarsList } from './pages/Cars/carsList';
import { PublicCarDetails } from './pages/Cars/PuplicCarDetails';
import { CustomerCarDetails } from './pages/Cars/CarCaustomerDetails';

// Protected Pages (Customer)
import { MyInquiries } from './pages/inquiries/MyInquiries';
import { Profile } from './pages/Profile/Profile';

// Admin Pages
import { AdminDashboard } from './pages/Admin/AdminDashboard';
import { AdminCars } from './pages/Admin/AdminCars';
import { CreateCar } from './pages/Admin/CreateCar';
import { EditCar } from './pages/Admin/EditCar';
import { AdminInquiries } from './pages/Admin/AdminInquiries';

// Route Guards
import { ProtectedRoute } from './components/guards/ProtectedRoute';
import { AdminRoute } from './components/guards/AdminRoute';
import { GuestRoute } from './components/guards/GuestRoute';
import { About } from './pages/About';

// ]React Query client
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1,
      staleTime: 5 * 60 * 1000, // 5 minutes
    },
  },
});

function App() {
  const fetchUser = useAuthStore((state) => state.fetchUser);

  // Fetch user on app load
  useEffect(() => {
    fetchUser();
  }, [fetchUser]);

  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Toaster
          position="top-right"
          toastOptions={{
            duration: 3000,
            style: {
              background: '#fff',
              color: '#363636',
            },
            success: {
              iconTheme: {
                primary: '#10B981',
                secondary: '#fff',
              },
            },
            error: {
              iconTheme: {
                primary: '#EF4444',
                secondary: '#fff',
              },
            },
          }}
        />

        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Layout><Home /></Layout>} />
          <Route path="/About" element={<Layout><About /></Layout>} />
          <Route path="/cars" element={<Layout><CarsList /></Layout>} />
          <Route path="/cars/:id" element={<Layout><PublicCarDetails /></Layout>} />

          {/* Auth Routes (Guest Only) */}
          <Route
            path="/login"
            element={
              <GuestRoute>
                <Login />
              </GuestRoute>
            }
          />
          <Route
            path="/register"
            element={
              <GuestRoute>
                <Register />
              </GuestRoute>
            }
          />

          {/* Protected Routes (Customer) */}
          <Route
            path="/cars/details/:id"
            element={
              <ProtectedRoute>
                <Layout><CustomerCarDetails /></Layout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/inquiries"
            element={
              <ProtectedRoute>
                <Layout><MyInquiries /></Layout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <Layout><Profile /></Layout>
              </ProtectedRoute>
            }
          />

          {/* Admin Routes */}
          <Route
            path="/admin"
            element={
              <AdminRoute>
                <AdminLayout><AdminDashboard /></AdminLayout>
              </AdminRoute>
            }
          />
          <Route
            path="/admin/cars"
            element={
              <AdminRoute>
                <AdminLayout><AdminCars /></AdminLayout>
              </AdminRoute>
            }
          />
          <Route
            path="/admin/cars/create"
            element={
              <AdminRoute>
                <AdminLayout><CreateCar /></AdminLayout>
              </AdminRoute>
            }
          />
          <Route
            path="/admin/cars/edit/:id"
            element={
              <AdminRoute>
                <AdminLayout><EditCar /></AdminLayout>
              </AdminRoute>
            }
          />
          <Route
            path="/admin/inquiries"
            element={
              <AdminRoute>
                <AdminLayout><AdminInquiries /></AdminLayout>
              </AdminRoute>
            }
          /> 

          {/* 404 */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;