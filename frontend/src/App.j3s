import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from 'react-query';
import { Toaster } from 'react-hot-toast';
import Header from './components/Header/Header';
import Home from './pages/Home';
import Courses from './pages/Courses';
import Cart from './pages/Cart';
import Dashboard from './pages/Dashboard';
import Admin from './pages/Admin';
import { CartProvider } from './components/Cart/CartContext';
import './styles/global.css';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <CartProvider>
        <Router>
          <div className="App">
            <Header />
            <main>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/courses" element={<Courses />} />
                <Route path="/cart" element={<Cart />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/admin" element={<Admin />} />
              </Routes>
            </main>
            <Toaster position="top-right" />
          </div>
        </Router>
      </CartProvider>
    </QueryClientProvider>
  );
}

export default App;
