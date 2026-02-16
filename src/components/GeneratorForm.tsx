import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Upload, FileText, Check, AlertCircle, Sparkles, Building2, Key, Paperclip, Trash2 } from 'lucide-react';
import * as pdfjsLib from 'pdfjs-dist';

import pdfWorker from 'pdfjs-dist/build/pdf.worker.min.mjs?url';

// Configure PDF.js worker
pdfjsLib.GlobalWorkerOptions.workerSrc = pdfWorker;

interface GeneratorFormProps {
  onGenerate: (data: { companyName: string; cvText: string; apiKey: string; language: string; supportingDocs: File[]; customPrompt: string }) => void;
  isLoading: boolean;
  error?: string | null;
  t: {
    steps: string[];
    step1: {
      title: string;
      subtitle: string;
      companyPlaceholder: string;
      next: string;
    };
    step2: {
      title: string;
      subtitle: string;
      cvLabel: string;
      cvPlaceholder: string;
      cvSub: string;
      supportLabel: string;
      supportPlaceholder: string;
      supportSub: string;
      back: string;
      next: string;
    };
    step3: {
      title: string;
      subtitle: string;
      warning: string;
      placeholder: string;
      customPromptLabel: string;
      customPromptPlaceholder: string;
      back: string;
      generate: string;
      generating: string;
      noKey: string;
      getKey: string;
    };
    errors: {
      pdfOnly: string;
      readError: string;
    };
  };
}

export const GeneratorForm = ({ onGenerate, isLoading, error, t }: GeneratorFormProps) => {
  const [step, setStep] = useState(1);
  const [companyName, setCompanyName] = useState('');
  const [language, setLanguage] = useState('English');
  const [cvFile, setCvFile] = useState<File | null>(null);
  const [supportingDocs, setSupportingDocs] = useState<File[]>([]);
  const [apiKey, setApiKey] = useState('');
  const [customPrompt, setCustomPrompt] = useState('');
  const [fileError, setFileError] = useState<string | null>(null);

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    setFileError(null);
    
    if (file) {
      if (file.type !== 'application/pdf') {
        setFileError(t.errors.pdfOnly);
        return;
      }
      setCvFile(file);
    }
  };

  const handleSupportingDocsUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      setSupportingDocs(prev => [...prev, ...Array.from(files)]);
    }
  };

  const removeSupportingDoc = (index: number) => {
    setSupportingDocs(prev => prev.filter((_, i) => i !== index));
  };

  const extractTextFromPDF = async (file: File): Promise<string> => {
    const arrayBuffer = await file.arrayBuffer();
    const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
    let fullText = '';

    for (let i = 1; i <= pdf.numPages; i++) {
        const page = await pdf.getPage(i);
        const textContent = await page.getTextContent();
        const pageText = textContent.items.map((item: any) => item.str).join(' ');
        fullText += pageText + '\n';
    }
    return fullText;
  };

  const handleSubmit = async () => {
    if (!cvFile || !companyName || !apiKey) return;

    try {
      const text = await extractTextFromPDF(cvFile);
      onGenerate({ companyName, cvText: text, apiKey, language, supportingDocs, customPrompt });
    } catch (err) {
      setFileError(t.errors.readError);
    }
  };

  const nextStep = () => setStep(s => s + 1);
  const prevStep = () => setStep(s => s - 1);

  return (
    <div className="w-full max-w-2xl mx-auto bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100 p-6 md:p-8">
      <div className="flex justify-between mb-8">
        {[1, 2, 3].map((i) => (
          <div key={i} className="flex flex-col items-center flex-1">
            <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-lg transition-colors ${
              step >= i ? 'bg-indigo-600 text-white' : 'bg-gray-100 text-gray-400'
            }`}>
              {step > i ? <Check className="w-6 h-6" /> : i}
            </div>
            <span className="text-xs mt-2 text-gray-500 font-medium">
              {i === 1 ? t.steps[0] : i === 2 ? t.steps[1] : t.steps[2]}
            </span>
          </div>
        ))}
      </div>

      <AnimatePresence mode="wait">
        {step === 1 && (
          <motion.div
            key="step1"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-6"
          >
            <div className="text-center">
              <h2 className="text-2xl font-bold text-gray-900">{t.step1.title}</h2>
              <p className="text-gray-500">{t.step1.subtitle}</p>
            </div>
            
            <div className="space-y-4">
              <div className="relative">
                <Building2 className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  value={companyName}
                  onChange={(e) => setCompanyName(e.target.value)}
                  placeholder={t.step1.companyPlaceholder}
                  className="w-full pl-12 pr-4 py-4 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all outline-none text-lg"
                />
              </div>

               <div className="grid grid-cols-1 gap-4">
                <div className="relative">
                  <select
                    value={language}
                    onChange={(e) => setLanguage(e.target.value)}
                    className="w-full px-4 py-4 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all outline-none appearance-none"
                  >
                    <option value="English">English</option>
                    <option value="Indonesian">Indonesian</option>
                  </select>
                  <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-gray-500">
                    ▼
                  </div>
                </div>
              </div>
            </div>

            <button
              onClick={nextStep}
              disabled={!companyName}
              className="w-full py-4 bg-indigo-600 text-white rounded-xl font-bold text-lg hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
            >
              {t.step1.next}
            </button>
          </motion.div>
        )}

        {step === 2 && (
          <motion.div
            key="step2"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-6"
          >
            <div className="text-center">
              <h2 className="text-2xl font-bold text-gray-900">{t.step2.title}</h2>
              <p className="text-gray-500">{t.step2.subtitle}</p>
            </div>
            
            {/* CV Upload */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700 ml-1">{t.step2.cvLabel}</label>
              <div className="border-2 border-dashed border-indigo-100 rounded-2xl p-6 hover:bg-indigo-50/50 transition-colors text-center group relative cursor-pointer">
                <input
                  type="file"
                  accept=".pdf"
                  onChange={handleFileUpload}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                />
                <div className="flex flex-col items-center">
                  <div className="w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center mb-2 group-hover:scale-110 transition-transform">
                    {cvFile ? <FileText className="w-6 h-6 text-indigo-600" /> : <Upload className="w-6 h-6 text-indigo-600" />}
                  </div>
                  {cvFile ? (
                    <div>
                      <p className="font-semibold text-gray-900">{cvFile.name}</p>
                      <p className="text-xs text-gray-500">{(cvFile.size / 1024 / 1024).toFixed(2)} MB</p>
                    </div>
                  ) : (
                    <div>
                      <p className="font-semibold text-gray-900">{t.step2.cvPlaceholder}</p>
                      <p className="text-xs text-gray-500">{t.step2.cvSub}</p>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Supporting Docs Upload */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700 ml-1">{t.step2.supportLabel}</label>
              <div className="border-2 border-dashed border-gray-100 rounded-2xl p-6 hover:bg-gray-50 transition-colors text-center group relative cursor-pointer">
                <input
                  type="file"
                  accept=".pdf,image/*"
                  multiple
                  onChange={handleSupportingDocsUpload}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                />
                <div className="flex flex-col items-center">
                  <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mb-2 group-hover:scale-110 transition-transform">
                    <Paperclip className="w-6 h-6 text-gray-500" />
                  </div>
                  <p className="font-semibold text-gray-900">{t.step2.supportPlaceholder}</p>
                  <p className="text-xs text-gray-500">{t.step2.supportSub}</p>
                </div>
              </div>
              
              {/* List of supporting docs */}
              {supportingDocs.length > 0 && (
                <div className="space-y-2 max-h-32 overflow-y-auto">
                  {supportingDocs.map((doc, idx) => (
                    <div key={idx} className="flex items-center justify-between bg-gray-50 p-3 rounded-lg text-sm">
                      <div className="flex items-center gap-2 truncate">
                        <FileText className="w-4 h-4 text-gray-400" />
                        <span className="truncate">{doc.name}</span>
                      </div>
                      <button 
                        onClick={() => removeSupportingDoc(idx)}
                        className="text-red-500 hover:text-red-700 p-1"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {fileError && (
              <div className="flex items-center gap-2 text-red-500 bg-red-50 p-3 rounded-lg text-sm">
                <AlertCircle className="w-4 h-4" />
                {fileError}
              </div>
            )}

            <div className="flex gap-4">
              <button
                onClick={prevStep}
                className="flex-1 py-4 bg-gray-100 text-gray-700 rounded-xl font-bold hover:bg-gray-200 transition-all"
              >
                {t.step2.back}
              </button>
              <button
                onClick={nextStep}
                disabled={!cvFile}
                className="flex-1 py-4 bg-indigo-600 text-white rounded-xl font-bold hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
              >
                {t.step2.next}
              </button>
            </div>
          </motion.div>
        )}

        {step === 3 && (
          <motion.div
            key="step3"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-6"
          >
            <div className="text-center">
              <h2 className="text-2xl font-bold text-gray-900">{t.step3.title}</h2>
              <p className="text-gray-500">{t.step3.subtitle}</p>
            </div>

            <div className="bg-amber-50 border border-amber-100 rounded-xl p-4 text-sm text-amber-800 flex gap-3">
              <AlertCircle className="w-5 h-5 flex-shrink-0" />
              <p>{t.step3.warning}</p>
            </div>

            <div className="relative">
              <Key className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="password"
                value={apiKey}
                onChange={(e) => setApiKey(e.target.value)}
                placeholder={t.step3.placeholder}
                className="w-full pl-12 pr-4 py-4 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all outline-none"
              />
            </div>
            
            <div className="relative">
              <div className="text-center mb-2">
                <p className="text-gray-500 text-sm">{t.step3.customPromptLabel}</p>
              </div>
              <textarea
                value={customPrompt}
                onChange={(e) => setCustomPrompt(e.target.value)}
                placeholder={t.step3.customPromptPlaceholder}
                className="w-full p-4 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all outline-none h-24 resize-none text-sm"
              />
            </div>

            {error && (
               <div className="flex items-center gap-2 text-red-500 bg-red-50 p-3 rounded-lg text-sm">
                <AlertCircle className="w-4 h-4" />
                {error}
              </div>
            )}

            <div className="flex gap-4">
              <button
                 onClick={prevStep}
                 className="flex-1 py-4 bg-gray-100 text-gray-700 rounded-xl font-bold hover:bg-gray-200 transition-all"
              >
                {t.step3.back}
              </button>
              <button
                onClick={handleSubmit}
                disabled={!apiKey || isLoading}
                className="flex-1 py-4 bg-indigo-600 text-white rounded-xl font-bold hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center justify-center gap-2"
              >
                {isLoading ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    {t.step3.generating}
                  </>
                ) : (
                  <>
                    <Sparkles className="w-5 h-5" />
                    {t.step3.generate}
                  </>
                )}
              </button>
            </div>
             <p className="text-center text-xs text-gray-400 mt-4">
              {t.step3.noKey} <a href="https://aistudio.google.com/app/apikey" target="_blank" rel="noreferrer" className="text-indigo-600 hover:underline">{t.step3.getKey}</a>
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
