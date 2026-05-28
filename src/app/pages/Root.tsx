import { Outlet } from 'react-router';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { Toaster } from '../components/ui/sonner';

export function Root() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 pt-4">
        <Outlet />
      </main>
      <Footer />
      <Toaster />
    </div>
  );
}
