import Footer from "@/components/Footer";
export default function Layout({ children }) {
  return (
    <div className="w-screen min-h-screen flex flex-col bg-gray-900">
      <div className="my-auto">{children}</div>
      <Footer />
    </div>
  );
}
