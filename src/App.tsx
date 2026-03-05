import { useState } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { GeneratorForm } from './components/GeneratorForm';
import { CoverLetterPreview } from './components/CoverLetterPreview';
import { CVTailoringForm } from './components/CVTailoringForm';
import { CVPreview } from './components/CVPreview';
import { Guide } from './components/Guide';
import { Footer } from './components/Footer';
import { GoogleGenAI } from '@google/genai';
import { translations, type Language } from './utils/translations';

function App() {
  const [view, setView] = useState<'hero' | 'form' | 'result' | 'guide' | 'cvTailoringForm' | 'cvTailoringResult'>('hero');
  const [currentLang, setCurrentLang] = useState<Language>('en');
  const [generatedContent, setGeneratedContent] = useState('');
  const [supportingDocs, setSupportingDocs] = useState<File[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const t = translations[currentLang];

  const generateCoverLetter = async ({ companyName, cvText, apiKey, language, supportingDocs, customPrompt }: { companyName: string; cvText: string; apiKey: string; language: string; supportingDocs: File[]; customPrompt: string }) => {
    setIsLoading(true);
    setError(null);
    setSupportingDocs(supportingDocs);
    const MODELS_TO_TRY = [
      "gemini-2.5-flash",
      "gemini-2.5-flash-001",
      "gemini-2.5-pro",
      "gemini-pro"
    ];
    
    try {
      const ai = new GoogleGenAI({ apiKey });
      let lastError = null;

      for (const modelName of MODELS_TO_TRY) {
        try {
          console.log(`Attempting generation with model: ${modelName}`);
          

          const today = new Date();
          const todayStr = language === 'Indonesian' 
            ? today.toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })
            : today.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });

          const prompt = `
            Act as a professional resume writer. I need a cover letter for a job application to ${companyName}.
            
            Here is my CV content:
            ${cvText}
            
            ${customPrompt ? `
            Additional Custom Instructions from User:
            "${customPrompt}"
            (Please prioritize these instructions while maintaining a professional structure.)
            ` : ''}
            
            Requirements:
            1. Professional and engaging tone.
            2. Language: Write the cover letter in ${language}.
            3. Highlight relevant skills from the CV that match a typical role at ${companyName}.
            4. Structure: 
               - Header: Include Name, Email, Phone, LinkedIn/Portfolio only if present in CV. **DO NOT include placeholders like [Your Address] or [City, State]. If address is missing, skip it.**
               - Date: ${todayStr}.
               - Salutation: Dear Hiring Manager (or specific name if found).
               - Opening: Strong hook about interest in ${companyName}.
               - Body: aligned with CV skills. Keep paragraphs concise.
               - Closing: Call to action.
               - Sign-off: Sincerely, [Name from CV].
            5. **CRITICAL**: If specific contact details (Address, Phone, Email, etc.) are NOT in the CV, DO NOT invent them and DO NOT use brackets/placeholders like "[Your Address]". Just omit that line entirely.
            6. Do not include markdown formatting like **bold** or *italic* in the output, just plain text suitable for a PDF.
            7. **Strict Length Limit**: Keep it concise (under 300 words) to ensure it fits perfectly on a single page. Avoid lengthy paragraphs.
          `;

          const response = await ai.models.generateContent({
            model: modelName,
            contents: prompt,
          });

          const text = response.text;
          
          if (!text) {
             throw new Error("Empty response from AI");
          }

          setGeneratedContent(text);
          setView('result');
          return; // Success! Exit the function
        } catch (err: unknown) {
          console.warn(`Failed with model ${modelName}:`, err);
          lastError = err instanceof Error ? err : new Error(String(err));
          // Continue to next model
        }
      }
      
      // If loop finishes without returning, throw the last error
      if (lastError) throw lastError;

    } catch (err: unknown) {
      console.error("AI Generation Error:", err);
      const errorMessage = err instanceof Error ? err.message : "Failed to generate cover letter. Please check your API key and try again.";
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const generateTailoredCV = async ({ companyName, jobDescription, cvText, apiKey, language, supportingDocs, customPrompt }: { companyName: string; jobDescription: string; cvText: string; apiKey: string; language: string; supportingDocs: File[]; customPrompt: string }) => {
    setIsLoading(true);
    setError(null);
    setSupportingDocs(supportingDocs);
    const MODELS_TO_TRY = [
      "gemini-2.5-flash",
      "gemini-2.5-flash-001",
      "gemini-2.5-pro",
      "gemini-pro"
    ];
    
    try {
      const ai = new GoogleGenAI({ apiKey });
      let lastError = null;

      for (const modelName of MODELS_TO_TRY) {
        try {
          console.log(`Attempting CV tailoring with model: ${modelName}`);

          const prompt = `
            Act as an expert CV/resume consultant and ATS optimization specialist. Your task is to tailor the user's CV to match the given job description.

            === TARGET COMPANY ===
            ${companyName}

            === JOB DESCRIPTION ===
            ${jobDescription}

            === CURRENT CV CONTENT ===
            ${cvText}

            ${customPrompt ? `
            === ADDITIONAL INSTRUCTIONS FROM USER ===
            "${customPrompt}"
            (Please prioritize these instructions while maintaining professional quality.)
            ` : ''}

            === YOUR TASK ===
            Rewrite and restructure the CV content to better match the job description. Follow these rules:

            1. **Language**: Write the tailored CV in ${language}.
            2. **DO NOT fabricate**: Only use information that already exists in the CV. Do NOT invent experiences, skills, certifications, or any details that are not present.
            3. **Prioritize relevance**: Reorder sections and bullet points so the most relevant skills and experiences for this job appear first.
            4. **Use job description keywords**: Where the CV already demonstrates a matching skill, rephrase it using terminology from the job description for better ATS compatibility.
            5. **Strengthen impact**: Improve bullet points using action verbs and quantifiable results where data is already present in the CV.
            6. **Professional Summary**: Write or improve a professional summary/objective at the top that directly addresses the key requirements of the job description.
            7. **Structure**: Maintain a clear, professional CV structure:
               - Contact Information (as-is from CV)
               - Professional Summary (tailored to job)
               - Skills (reordered by relevance to job)
               - Work Experience (bullet points rephrased for relevance)
               - Education
               - Certifications/Projects (if present)
            8. **Plain text only**: Do not use markdown formatting (no **, *, #, etc.). Use plain text with clear headings, dashes/bullets, and spacing suitable for a PDF.
            9. **Be concise**: Keep descriptions tight and impactful. Remove irrelevant filler.

            Output ONLY the tailored CV content, ready to be used. Do not add explanations or commentary.
          `;

          const response = await ai.models.generateContent({
            model: modelName,
            contents: prompt,
          });

          const text = response.text;
          
          if (!text) {
             throw new Error("Empty response from AI");
          }

          setGeneratedContent(text);
          setView('cvTailoringResult');
          return;
        } catch (err: unknown) {
          console.warn(`Failed with model ${modelName}:`, err);
          lastError = err instanceof Error ? err : new Error(String(err));
        }
      }
      
      if (lastError) throw lastError;

    } catch (err: unknown) {
      console.error("AI Generation Error:", err);
      const errorMessage = err instanceof Error ? err.message : "Failed to tailor CV. Please check your API key and try again.";
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#fafafa] flex flex-col">
      <Header currentLang={currentLang} setLanguage={setCurrentLang} />
      
      <main className="flex-grow pt-20 px-4">
        {view === 'hero' && (
          <Hero 
            onStart={() => setView('form')} 
            onStartCVTailoring={() => setView('cvTailoringForm')}
            t={t.hero} 
          />
        )}

        {view === 'form' && (
          <div className="max-w-4xl mx-auto pt-10">
            <div className="text-center mb-10">
              <h2 className="text-3xl font-bold text-gray-900">{t.hero.title1} {t.hero.title2}</h2>
              <p className="text-gray-500 mt-2">{t.form.step1.subtitle}</p>
            </div>
            <GeneratorForm 
              onGenerate={generateCoverLetter} 
              isLoading={isLoading} 
              error={error}
              t={t.form}
            />
          </div>
        )}

        {view === 'result' && (
          <div className="max-w-4xl mx-auto pt-10">
            <CoverLetterPreview 
              content={generatedContent} 
              supportingDocs={supportingDocs}
              onReset={() => {
                setGeneratedContent('');
                setSupportingDocs([]);
                setView('form');
              }}
              t={t.preview}
            />
          </div>
        )}

        {view === 'cvTailoringForm' && (
          <div className="max-w-4xl mx-auto pt-10">
            <div className="text-center mb-10">
              <h2 className="text-3xl font-bold text-gray-900">
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-emerald-500 to-teal-600">
                  {t.cvTailoring.preview.title}
                </span>
              </h2>
              <p className="text-gray-500 mt-2">{t.cvTailoring.step1.subtitle}</p>
            </div>
            <CVTailoringForm 
              onGenerate={generateTailoredCV} 
              isLoading={isLoading} 
              error={error}
              t={t.cvTailoring}
            />
          </div>
        )}

        {view === 'cvTailoringResult' && (
          <div className="max-w-4xl mx-auto pt-10">
            <CVPreview 
              content={generatedContent} 
              supportingDocs={supportingDocs}
              onReset={() => {
                setGeneratedContent('');
                setSupportingDocs([]);
                setView('cvTailoringForm');
              }}
              t={t.cvTailoring.preview}
            />
          </div>
        )}

        {view === 'guide' && (
          <div className="max-w-4xl mx-auto pt-10">
            <Guide onBack={() => setView('hero')} t={t.guide} />
          </div>
        )}
      </main>
      
      <Footer onGuideClick={() => setView('guide')} />
    </div>
  );
}

export default App;
