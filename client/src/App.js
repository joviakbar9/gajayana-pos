import logo from "./logo.svg";
import "antd/dist/antd.css";
import { Button } from "antd";
import { BrowserRouter, Routes, Route, Navigate, Outlet } from "react-router-dom";
import Homepage from "./pages/Homepage";
import Produk from "./pages/Items";
import KategoriProduk from "./pages/KategoriProduk";
import Pemesanan from "./pages/CartPage";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Customers from "./pages/Customers";
import DaftarPemesanan from "./pages/Pemesanan";
import Pembelian from "./pages/Pembelian";
import Pegawai from "./pages/Pegawai";
import LaporanPenjualan from "./pages/LaporanPenjualan";
import LaporanPembelian from "./pages/LaporanPembelian";
import User from "./pages/User";
import DefaultLayout from './components/DefaultLayout';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<DefaultLayout><Outlet/></DefaultLayout>}>
            <Route path="home" element={<ProtectedRoute><Homepage /></ProtectedRoute>} />
            <Route path="produk" element={<ProtectedRoute><Produk /></ProtectedRoute>} />
            <Route path="/kategoriproduk" element={<ProtectedRoute><KategoriProduk /></ProtectedRoute>} />
            <Route path="/pemesanan" element={<ProtectedRoute><Pemesanan /></ProtectedRoute>} />
            <Route path="/daftarpemesanan" element={<ProtectedRoute><DaftarPemesanan /></ProtectedRoute>} />
            <Route path="/customers" element={<ProtectedRoute><Customers /></ProtectedRoute>} />
            <Route path="/pembelian" element={<ProtectedRoute><Pembelian /></ProtectedRoute>} />
            <Route path="/pegawai" element={<ProtectedRoute><Pegawai /></ProtectedRoute>} />
            <Route path="/laporanpenjualan" element={<ProtectedRoute><LaporanPenjualan /></ProtectedRoute>} />
            <Route path="/laporanpembelian" element={<ProtectedRoute><LaporanPembelian /></ProtectedRoute>} />
            <Route path="/user" element={<ProtectedRoute><User /></ProtectedRoute>} />
            <Route path="/register" element={<Register />} />
          </Route>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<Login />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

export function ProtectedRoute({ children }) {
  if (localStorage.getItem('pos-user')) {
    return children
  }
  else {
    return <Navigate to='/login' />
  }
}