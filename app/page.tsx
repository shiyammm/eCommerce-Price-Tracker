import HeroSection from '@/components/HeroSection';
import Navbar from '@/components/Navbar';
import TrendingProducts from '@/components/TrendingProducts';

export default function Home() {
  return (
    <main>
      <Navbar />
      <HeroSection />
      <TrendingProducts />
    </main>
  );
}
