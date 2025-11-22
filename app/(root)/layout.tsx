import Footer from '@/components/shared/footer';
import Navbar from '@/components/shared/navbar';

export default function PublicLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Navbar />
      <main className={'max-w-[85em] mx-auto px-4 2xl:px-0'}>{children}</main>
      <Footer />
    </>
  );
}
