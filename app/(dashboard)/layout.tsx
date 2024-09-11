import Navbar from "@/components/canvas/Navbar";
import SidebarComponent from "@/components/canvas/SidebarComponent";

export default function HomeLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col min-h-screen w-full"> 
      <Navbar />
      <div className="flex flex-grow">
        <SidebarComponent />
        <main className="flex-grow p-6 text-white">
          {children}
        </main>
      </div>
    </div>
  );
}