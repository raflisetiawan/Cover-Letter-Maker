import { motion } from 'framer-motion';
import { ArrowRight, CheckCircle2 } from 'lucide-react';

interface HeroProps {
  onStart: () => void;
  t: {
    title1: string;
    title2: string;
    subtitle: string;
    cta: string;
    features: string[];
  };
}

export const Hero = ({ onStart, t }: HeroProps) => {
  return (
    <div className="relative overflow-hidden pt-24 pb-12 md:pt-32 md:pb-16 lg:pt-48 lg:pb-32">
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-3xl md:text-4xl sm:text-6xl font-extrabold tracking-tight text-gray-900 mb-6 md:mb-8">
              {t.title1} <br />
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600">
                {t.title2}
              </span>
            </h1>
            <p className="mt-4 max-w-2xl mx-auto text-lg md:text-xl text-gray-500 mb-8 md:mb-10">
              {t.subtitle}
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex justify-center gap-4"
          >
            <button
              onClick={onStart}
              className="group px-6 py-3 md:px-8 md:py-4 text-base md:text-lg font-bold text-white bg-indigo-600 rounded-full hover:bg-indigo-700 transition-all hover:shadow-xl hover:shadow-indigo-500/40 flex items-center gap-2"
            >
              {t.cta}
              <ArrowRight className="w-4 h-4 md:w-5 md:h-5 group-hover:translate-x-1 transition-transform" />
            </button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="mt-8 md:mt-12 flex flex-wrap justify-center gap-4 md:gap-8 text-sm text-gray-500"
          >
            {t.features.map((feature) => (
              <div key={feature} className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 md:w-5 md:h-5 text-green-500" />
                <span>{feature}</span>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
      
      {/* Background decoration */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 -z-10 w-full h-full opacity-30 pointer-events-none">
        <div className="absolute top-0 right-0 w-[300px] h-[300px] md:w-[500px] md:h-[500px] bg-indigo-200 rounded-full blur-3xl mix-blend-multiply filter animate-blob" />
        <div className="absolute top-0 left-0 w-[300px] h-[300px] md:w-[500px] md:h-[500px] bg-purple-200 rounded-full blur-3xl mix-blend-multiply filter animate-blob animation-delay-2000" />
        <div className="absolute bottom-0 left-1/2 w-[300px] h-[300px] md:w-[500px] md:h-[500px] bg-pink-200 rounded-full blur-3xl mix-blend-multiply filter animate-blob animation-delay-4000" />
      </div>
    </div>
  );
};
