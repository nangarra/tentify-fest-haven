import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import HyrGlamping from "./pages/HyrGlamping";
import ZenAdmin from "./pages/ZenAdmin";
import Auth from "./pages/Auth";
import TaltBrollop from "./pages/TaltBrollop";
import GlampingSwedenRock from "./pages/GlampingSwedenRock";
import DeSwedenRockGlamping from "./pages/DeSwedenRockGlamping";
import HyraTaltSkane from "./pages/HyraTaltSkane";
import HyraTaltMalmo from "./pages/HyraTaltMalmo";
import FestivalGlamping from "./pages/FestivalGlamping";
import Navigation from "./components/Navigation";
import Footer from "./components/Footer";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Navigation />
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/hyr-glamping" element={<HyrGlamping />} />
          <Route path="/talt-brollop" element={<TaltBrollop />} />
          <Route path="/glamping-sweden-rock" element={<GlampingSwedenRock />} />
          <Route path="/de/sweden-rock-glamping-unterkunft" element={<DeSwedenRockGlamping />} />
          <Route path="/hyra-talt-skane" element={<HyraTaltSkane />} />
          <Route path="/hyra-talt-malmo" element={<HyraTaltMalmo />} />
          <Route path="/festival-glamping" element={<FestivalGlamping />} />
          <Route path="/auth" element={<Auth />} />
          <Route path="/zenadmin" element={<ZenAdmin />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
