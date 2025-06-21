import Header from "@/components/Header";

export default function LandingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col min-h-screen justify-between">
      <Header />
      <div className="min-h-[calc(100vh-65px)]">
        {children}
      </div>
      <footer className="bg-accent text-white text-center p-2">
        <p>
          &copy; {new Date().getFullYear()} Ventaclick. Todos los derechos reservados.
        </p>
      </footer>
    </div>
  );
}
