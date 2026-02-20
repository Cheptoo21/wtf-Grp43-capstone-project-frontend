import Header from "./header";
import Footer from "./footer";

export default function Layout({ children }) {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />

    
      <main className="flex-1 flex items-center justify-center bg-gray-50">
        {children}
      </main>

      <Footer />
    </div>
  );
}