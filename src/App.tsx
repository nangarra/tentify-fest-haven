import { useEffect } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
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
import HyraGlampingtalt from "./pages/HyraGlampingtalt";
import EventBookingPage from "./pages/EventBookingPage";
import Navigation from "./components/Navigation";
import Footer from "./components/Footer";

const queryClient = new QueryClient();

const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    // Instant jump on route change so users always land at the top of the new page.
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
  }, [pathname]);
  return null;
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <ScrollToTop />
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
          <Route path="/hyra-glampingtalt" element={<HyraGlampingtalt />} />
          <Route path="/booking/:slug" element={<EventBookingPage />} />
          <Route path="/book/:slug" element={<EventBookingPage />} />
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
