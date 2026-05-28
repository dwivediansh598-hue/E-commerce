import { RouterProvider } from 'react-router';
import { router } from './routes';
import { CartProvider } from './context/CartContext';
import { WishlistProvider } from './context/WishlistContext';

export default function App() {
  return (
    <WishlistProvider>
      <CartProvider>
        <RouterProvider router={router} />
      </CartProvider>
    </WishlistProvider>
  );
}