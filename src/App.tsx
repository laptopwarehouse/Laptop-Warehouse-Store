import { Route, Routes, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import CartDrawer from './components/CartDrawer';
import { CartProvider } from './lib/cart';
import { StoreProvider } from './lib/store';
import StorePicker from './components/StorePicker';
import Home from './pages/Home';
import Shop from './pages/Shop';
import ProductPage from './pages/Product';
import CartPage from './pages/Cart';
import CheckoutPage from './pages/Checkout';
import BranchesPage from './pages/Branches';
import { BlogArticle, BlogList } from './pages/Blog';
import { InstallmentsPage, PrivacyPage, TermsPage } from './pages/Info';

function ScrollToTop() {
  const { pathname, search } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname, search]);
  return null;
}

export default function App() {
  return (
    <StoreProvider>
      <CartProvider>
      <ScrollToTop />
        <div className="flex min-h-screen flex-col">
        <Header />
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/shop" element={<Shop mode="search" />} />
            <Route path="/category/:categoryId" element={<Shop mode="category" />} />
            <Route path="/brand/:brandId" element={<Shop mode="brand" />} />
            <Route path="/product/:productId" element={<ProductPage />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/checkout" element={<CheckoutPage />} />
            <Route path="/branches" element={<BranchesPage />} />
            <Route path="/blog" element={<BlogList />} />
            <Route path="/blog/:slug" element={<BlogArticle />} />
            <Route path="/installments" element={<InstallmentsPage />} />
            <Route path="/privacy" element={<PrivacyPage />} />
            <Route path="/terms" element={<TermsPage />} />
            <Route
              path="*"
              element={
                <div className="mx-auto max-w-xl px-4 py-20 text-center">
                  <p className="font-display text-6xl font-extrabold text-brand">404</p>
                  <p className="mt-2 font-display text-xl font-bold">Page not found</p>
                </div>
              }
            />
          </Routes>
        </main>
        <Footer />
      </div>
      <CartDrawer />
      <StorePicker />
      </CartProvider>
    </StoreProvider>
  );
}
