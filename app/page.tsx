import Header from '@/components/Header';
import Hero from '@/components/Hero';
import BentoGrid from '@/components/BentoGrid';
import Services from '@/components/Services';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col scroll-smooth">
      <Header />
      <Hero />
      <BentoGrid />
      <Services />
      <Footer />
    </main>
  );
}
