import { ReactNode } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ScrollToTop from "./components/ScrollToTop";
import { RouteTracker } from "./components/analytics/RouteTracker";
import Index from "./pages/Index";
import Instagram from "./pages/Instagram";
import Privacidade from "./pages/Privacidade";
import Termos from "./pages/Termos";
import ProgramaParceiros from "./pages/ProgramaParceiros";
import FerramentasIndex from "./pages/ferramentas/Index";
import CustoDoGalao from "./pages/ferramentas/CustoDoGalao";
import AbrirDistribuidora from "./pages/ferramentas/AbrirDistribuidora";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

/**
 * Tudo que envolve as rotas, menos o roteador.
 *
 * Fica separado porque o build também renderiza esta árvore, com o
 * StaticRouter no lugar do BrowserRouter, para escrever o HTML de cada rota
 * (src/entry-server.tsx). Provider que existisse só de um lado sairia como
 * diferença na hidratação.
 */
export const AppProviders = ({ children }: { children: ReactNode }) => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      {children}
    </TooltipProvider>
  </QueryClientProvider>
);

/** O miolo roteado, igual no navegador e no build. Precisa de um Router acima. */
export const AppRoutes = () => (
  <>
    <ScrollToTop />
    <RouteTracker />
    <Routes>
      <Route path="/" element={<Index />} />
      <Route path="/bio" element={<Instagram />} />
      <Route path="/privacidade" element={<Privacidade />} />
      <Route path="/termos" element={<Termos />} />
      <Route path="/ferramentas" element={<FerramentasIndex />} />
      <Route path="/ferramentas/custo-do-galao" element={<CustoDoGalao />} />
      <Route
        path="/ferramentas/abrir-distribuidora"
        element={<AbrirDistribuidora />}
      />
      {/* Página não listada: acesso só por link direto (noindex) */}
      <Route
        path="/programa-parceiros-h2o-2026"
        element={<ProgramaParceiros />}
      />
      {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  </>
);

const App = () => (
  <AppProviders>
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  </AppProviders>
);

export default App;
