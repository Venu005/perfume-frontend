import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "@/context/AuthContext";;
import { Routes, Route } from "react-router-dom";
import { HomePage } from "@/pages/HomePage";
import { ProductPage } from "@/pages/ProductPage";
import { AuthPage } from "@/pages/AuthPage";
import ShopPage from "./pages/ShopPage";
import { Navbar } from "./components/shared/NavBar";

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Navbar/>
        <main className="container py-8">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/shop" element={<ShopPage />} />
            <Route path="/products/:id" element={<ProductPage />} />
            <Route path="/auth" element={<AuthPage />} />
          </Routes>
        </main>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
