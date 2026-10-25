'use client';

import { MotionConfig } from 'framer-motion';
import CursorFollower from './components/CursorFollower';
import Footer from './components/Footer';
import Navbar from './components/Navbar';

export default function App({ children }) {
  return (
    <MotionConfig reducedMotion="user">
      <a href="#main" className="skip-link">
        Skip to main content
      </a>
      <CursorFollower />
      <Navbar />
      <main id="main" className="min-h-[60vh]">
        {children}
      </main>
      <Footer />
    </MotionConfig>
  );
}
