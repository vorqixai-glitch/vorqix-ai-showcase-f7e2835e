import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AuthProvider } from "@/hooks/useAuth";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Auth from "./pages/Auth";
import Pricing from "./pages/Pricing";
import { BlogList, BlogDetail, CaseStudyList, CaseStudyDetail } from "./pages/Content";
import AppLayout from "./layouts/AppLayout";
import Overview from "./pages/app/Overview";
import Copilot from "./pages/app/Copilot";
import ProductsDash from "./pages/app/Products";
import Bookings from "./pages/app/Bookings";
import Billing from "./pages/app/Billing";
import Settings from "./pages/app/Settings";
import AdminPosts from "./pages/app/AdminPosts";
import AdminBookings from "./pages/app/AdminBookings";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AuthProvider>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/auth" element={<Auth />} />
            <Route path="/pricing" element={<Pricing />} />
            <Route path="/blog" element={<BlogList />} />
            <Route path="/blog/:slug" element={<BlogDetail />} />
            <Route path="/case-studies" element={<CaseStudyList />} />
            <Route path="/case-studies/:slug" element={<CaseStudyDetail />} />

            <Route path="/app" element={<AppLayout />}>
              <Route index element={<Overview />} />
              <Route path="copilot" element={<Copilot />} />
              <Route path="products" element={<ProductsDash />} />
              <Route path="bookings" element={<Bookings />} />
              <Route path="billing" element={<Billing embedded />} />
              <Route path="settings" element={<Settings />} />
              <Route path="admin/posts" element={<AdminPosts />} />
              <Route path="admin/bookings" element={<AdminBookings />} />
            </Route>

            <Route path="*" element={<NotFound />} />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
