import Header from '../components/Header';
import ChapterNav from '../components/ChapterNav';
import Hero from '../sections/Hero';
import Manifesto from '../sections/Manifesto';
import ServicesIndex from '../sections/ServicesIndex';
import NicheChapter from '../sections/NicheChapter';
import Process from '../sections/Process';
import WhyInkova from '../sections/WhyInkova';
import Contact from '../sections/Contact';
import Footer from '../sections/Footer';
import { NICHES } from '../data/content';

export default function Home() {
  return (
    <>
      <Header />
      <ChapterNav />
      <main>
        <Hero />
        <Manifesto />
        <ServicesIndex />
        {NICHES.map((n) => (
          <NicheChapter key={n.id} niche={n} />
        ))}
        <Process />
        <WhyInkova />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
