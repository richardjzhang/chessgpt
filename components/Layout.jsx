import Footer from "@/components/Footer";
export default function Layout({ children }) {
  return (
    <div className="overflow-auto w-screen min-h-screen flex flex-col bg-gray-900 ">
      <div className="my-auto py-4 px-10 w-full h-full flex justify-center items-center max-w-2xl mx-auto lg:max-w-6xl">
        {children}
      </div>
      <Footer />
    </div>
  );
}
