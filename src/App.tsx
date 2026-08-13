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
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <ScrollToTop />
        <RouteTracker />
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/bio" element={<Instagram />} />
          <Route path="/privacidade" element={<Privacidade />} />
          <Route path="/termos" element={<Termos />} />
          <Route path="/ferramentas" element={<FerramentasIndex />} />
          <Route
            path="/ferramentas/custo-do-galao"
            element={<CustoDoGalao />}
          />
          {/* Página não listada: acesso só por link direto (noindex) */}
          <Route
            path="/programa-parceiros-h2o-2026"
            element={<ProgramaParceiros />}
          />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
