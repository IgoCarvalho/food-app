import { Toaster } from 'sonner';
import { ThemeProvider } from './components/theme-provider';
import { Router } from './Router';

export function App() {
  return (
    <>
      <Toaster richColors />
      <ThemeProvider defaultTheme="dark" storageKey="food-app-theme">
        <Router />
      </ThemeProvider>
    </>
  );
}
