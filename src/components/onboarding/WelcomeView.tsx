import React from 'react';
import { useApp } from '../../context/AppContext';
import { ArrowRight } from 'lucide-react';
import { motion } from 'motion/react';

export const WelcomeView: React.FC = () => {
  const { setActiveView } = useApp();

  return (
    <div className="min-h-[85vh] flex flex-col items-center justify-center px-4 sm:px-6 py-12 text-center max-w-xl mx-auto">
      <div className="w-12 h-12 rounded-2xl bg-stone-900 text-stone-100 dark:bg-stone-100 dark:text-stone-900 flex items-center justify-center font-editorial-sans font-bold text-xl mb-8 shadow-sm">
        M
      </div>

      <span className="text-xs uppercase tracking-widest text-stone-500 dark:text-stone-300 font-semibold mb-3">
        MINIMAL
      </span>

      <h1 className="text-4xl sm:text-5xl font-serif font-normal tracking-tight text-stone-900 dark:text-[#F6F4EE] balance-text leading-[1.15]">
        A calmer way to read.
      </h1>

      <p className="mt-5 text-base sm:text-lg text-stone-600 dark:text-stone-300 leading-relaxed font-editorial-sans balance-text">
        Discover stories that matter to you, without the noise. No ads, no algorithmic traps, and no endless notifications.
      </p>

      <div className="mt-10">
        <motion.button
          whileTap={{ scale: 0.96 }}
          onClick={() => setActiveView('topics')}
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-stone-900 text-stone-100 dark:bg-stone-100 dark:text-stone-900 text-sm font-semibold hover:opacity-90 transition shadow-sm cursor-pointer"
        >
          <span>Get started</span>
          <ArrowRight className="w-4 h-4" strokeWidth={1.75} />
        </motion.button>
      </div>

      <p className="mt-12 text-xs text-stone-400 dark:text-stone-300">
        You choose what matters. We make it easy to read.
      </p>
    </div>
  );
};
