import { motion } from 'framer-motion';
import { ArrowLeft, Key, ExternalLink, CheckCircle } from 'lucide-react';

interface GuideProps {
  onBack: () => void;
  t: {
    title: string;
    step1Title: string;
    step1Desc: string;
    step1Link: string;
    step2Title: string;
    step2Desc: string;
    proTip: string;
    proTipDesc: string;
    step3Title: string;
    step3Desc: string;
    freeTag: string;
    freeDesc: string;
    cta: string;
  };
}

export const Guide = ({ onBack, t }: GuideProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="max-w-3xl mx-auto space-y-8"
    >
      <div className="flex items-center gap-4">
        <button
          onClick={onBack}
          className="p-2 hover:bg-gray-100 rounded-full transition-colors text-gray-500 hover:text-gray-900"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
        <h1 className="text-3xl font-bold text-gray-900">{t.title}</h1>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-8 space-y-8">
          
          <div className="flex gap-4">
            <div className="flex-shrink-0 w-8 h-8 bg-indigo-100 rounded-full flex items-center justify-center text-indigo-600 font-bold">1</div>
            <div className="space-y-2">
              <h3 className="text-xl font-semibold text-gray-900">{t.step1Title}</h3>
              <p className="text-gray-600">
                {t.step1Desc}
              </p>
              <a 
                href="https://aistudio.google.com/app/apikey" 
                target="_blank" 
                rel="noreferrer"
                className="inline-flex items-center gap-2 text-indigo-600 hover:text-indigo-700 font-medium mt-2"
              >
                {t.step1Link} <ExternalLink className="w-4 h-4" />
              </a>
            </div>
          </div>

          <div className="flex gap-4">
            <div className="flex-shrink-0 w-8 h-8 bg-indigo-100 rounded-full flex items-center justify-center text-indigo-600 font-bold">2</div>
            <div className="space-y-2">
              <h3 className="text-xl font-semibold text-gray-900">{t.step2Title}</h3>
              <p className="text-gray-600">
                {t.step2Desc}
              </p>
              <div className="bg-gray-50 p-4 rounded-lg border border-gray-100 mt-2">
                <div className="flex items-center gap-2 text-sm text-gray-500 mb-2">
                  <Key className="w-4 h-4" />
                  <span>{t.proTip}</span>
                </div>
                <p className="text-sm text-gray-600">
                  {t.proTipDesc}
                </p>
              </div>
            </div>
          </div>

          <div className="flex gap-4">
            <div className="flex-shrink-0 w-8 h-8 bg-indigo-100 rounded-full flex items-center justify-center text-indigo-600 font-bold">3</div>
            <div className="space-y-2">
              <h3 className="text-xl font-semibold text-gray-900">{t.step3Title}</h3>
              <p className="text-gray-600">
                {t.step3Desc}
              </p>
              <div className="bg-green-50 p-4 rounded-lg border border-green-100 mt-2 flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                <div className="space-y-1">
                  <p className="text-sm font-medium text-green-800">{t.freeTag}</p>
                  <p className="text-sm text-green-700">
                    {t.freeDesc}
                  </p>
                </div>
              </div>
            </div>
          </div>

        </div>
        
        <div className="bg-gray-50 p-6 border-t border-gray-100 text-center">
          <button
            onClick={onBack}
            className="bg-indigo-600 text-white px-6 py-3 rounded-xl font-bold hover:bg-indigo-700 transition-colors"
          >
            {t.cta}
          </button>
        </div>
      </div>
    </motion.div>
  );
};
