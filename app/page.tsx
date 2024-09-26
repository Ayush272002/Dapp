'use client';

import { Button } from '@/components/ui/button';
import { slides } from '@/lib/slides';
import { useState } from 'react';
import { ChevronLeft, ChevronRight, ExternalLink, Wallet } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function Home() {
  const router = useRouter();
  const [currentSlide, setCurrentSlide] = useState(1);

  const totalSlides = slides.length;
  const nextSlide = () => setCurrentSlide((prev) => (prev % totalSlides) + 1);
  const prevSlide = () =>
    setCurrentSlide((prev) => ((prev - 2 + totalSlides) % totalSlides) + 1);

  return (
    <div className="min-h-screen bg-stone-100 text-stone-900 p-8 font-sans">
      <div className="max-w-4xl mt-40 mx-auto bg-stone-50 shadow-lg rounded-lg overflow-hidden relative">
        <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
          <div className="absolute top-0 left-0 w-16 h-16 border-t-4 border-l-4 border-red-500 rounded-tl-lg"></div>
          <div className="absolute top-0 right-0 w-16 h-16 border-t-4 border-r-4 border-red-500 rounded-tr-lg"></div>
          <div className="absolute bottom-0 left-0 w-16 h-16 border-b-4 border-l-4 border-red-500 rounded-bl-lg"></div>
          <div className="absolute bottom-0 right-0 w-16 h-16 border-b-4 border-r-4 border-red-500 rounded-br-lg"></div>
        </div>

        <header className=" p-6 border-b border-stone-200 flex justify-between items-center relative z-10">
          <div className="flex items-center space-x-4">
            <div className="w-8 h-8 bg-red-500 rounded-full">
              <img
                src="/image.png"
                alt="logo"
                className="rounded-full hover:cursor-pointer"
              />
            </div>

            <nav className="space-x-4 text-sm">
              <a href="#" className="hover:underline">
                about
              </a>
              <a href="#" className="hover:underline">
                learn
              </a>
            </nav>
          </div>
        </header>

        <main className="p-6 relative z-10">
          <h1
            className="text-5xl font-bold mb-6 tracking-tighter text-center"
            style={{ fontFamily: "'Noto Sans JP', sans-serif" }}
          >
            WEB3 WORLD
          </h1>

          <div className="mb-8 bg-white p-6 rounded-lg shadow-inner">
            <h2 className="text-2xl font-semibold mb-4 text-red-500 font-mono">
              {slides[currentSlide - 1].heading}
            </h2>
            <p className="text-sm leading-relaxed mb-4 font-mono">
              {slides[currentSlide - 1].text}
            </p>
            <div className="flex justify-between items-center">
              <div className="flex space-x-2">
                <Button variant="outline" size="icon" onClick={prevSlide}>
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="icon" onClick={nextSlide}>
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
              <div className="text-sm font-semibold font-mono">
                {currentSlide} / {totalSlides}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 font-mono">
            <Button
              className="flex items-center justify-center space-x-2 bg-red-500 hover:bg-red-600 text-white py-3 transition-all ease-in-out hover:scale-105 duration-300"
              onClick={() => router.push('/airdrop')}
            >
              <ExternalLink className="w-4 h-4" />
              <span>Go to Solana Faucet</span>
            </Button>
            <Button
              className="flex items-center justify-center space-x-2 bg-stone-800 hover:bg-stone-950 text-white py-3 transition-all ease-in-out hover:scale-105 duration-300"
              onClick={() => router.push('/mytokens')}
            >
              <Wallet className="w-4 h-4" />
              <span>View Your Assets</span>
            </Button>
          </div>
        </main>

        <footer
          // change the color of the footer to match the background
          className={`p-6 border-t border-stone-200 text-center text-sm text-stone-600 relative `}
        >
          <span>
            Made by{' '}
            <a
              className="font-bold text-sm text-red-500 hover:text-red-600 transition-all ease-in-out hover:text-lg"
              href="https://github.com/Ayush272002"
              target="_blank"
            >
              Ayush
            </a>
          </span>
        </footer>
      </div>
    </div>
  );
}
