import { db } from "@/services/db";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import { auth } from "@/auth";
import Pricing from "@/components/Pricing";

export default async function DashboardLayout({ children }: { children: React.ReactNode; }) {
  const session = await auth();
  const user = await db.user.findUnique({ where: { id: session?.user?.id }, include: { subscription: true } });

  const isPremium = user?.subscription?.status === 'authorized';

  console.log(isPremium)
  return (
    isPremium ? (
      <div className="flex h-screen bg-gray-50">
        <Sidebar />
        <div className="flex-1 flex flex-col overflow-hidden">
          <Header />
          <main className="flex-1 overflow-y-auto p-6 bg-gray-50">
            {children}
          </main>
        </div>
      </div>
    ) : (
      <Pricing />
    )
  );
}