import { ContactBand, Footer } from "./profile/Footer";
import { Hero, ProofStrip } from "./profile/Hero";
import Reveal from "./profile/Reveal";
import {
  About,
  Faq,
  Services,
  Testimonials,
  Together,
} from "./profile/Sections";
import TopBar from "./profile/TopBar";
import Work from "./profile/Work";
import styles from "./profile/profile.module.css";

export default function HomePage() {
  return (
    <div id="top" className={styles.page}>
      <a href="#main" className={styles.skipLink}>
        Skip to content
      </a>
      <TopBar />
      <main id="main">
        <Hero />
        <ProofStrip />
        <Services />
        <Work />
        <Together />
        <Testimonials />
        <About />
        <Faq />
        <ContactBand />
      </main>
      <Footer />
      <Reveal />
    </div>
  );
}
