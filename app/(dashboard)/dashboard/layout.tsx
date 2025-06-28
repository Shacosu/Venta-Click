import Pricing from "@/components/Pricing";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import { auth } from "@/auth";

export default async function DashboardLayout({ children }: { children: React.ReactNode; }) {
  const session = await auth()
  return (
    session?.user?.plan !== "Free" ? (
      <div className="flex h-screen bg-gray-50">
        <Sidebar />
        <div className="flex-1 flex flex-col overflow-hidden">
          <Header />
          <main className="flex-1 overflow-y-auto p-6 bg-gray-50">
            {children}
          </main>
        </div>
      </div>
    ) : <Pricing />
  );
}