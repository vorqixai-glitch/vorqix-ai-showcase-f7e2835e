import { Navbar } from "@/components/site/Navbar";
import { Footer } from "@/components/site/Footer";
import Billing from "./app/Billing";

export default function Pricing() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <Billing />
      <Footer />
    </div>
  );
}
