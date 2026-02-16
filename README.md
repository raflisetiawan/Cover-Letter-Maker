# ✉️ Kuple Cover Letter Maker

AI-powered cover letter generator that transforms your CV into a professional, tailored cover letter in seconds — powered by **Google Gemini**.

## ✨ Features

- **AI-Powered Generation** — Uses Google Gemini API to craft personalized cover letters from your CV
- **PDF Upload & Parsing** — Upload your CV as a PDF and the app extracts text automatically
- **Supporting Documents** — Attach certificates, portfolios, or other documents to include in the final bundle
- **PDF Bundle Download** — Download a merged PDF containing your cover letter + all supporting documents
- **Custom Instructions** — Fine-tune the AI output with custom prompts (e.g., "Focus on leadership skills")
- **Multi-Language UI** — Full interface localization in **English** and **Indonesian** with a one-click toggle
- **Cover Letter Language** — Generate cover letters in English or Indonesian
- **Privacy-First** — Your API key is never stored; it's used only for the active session
- **Responsive Design** — Works seamlessly on desktop and mobile devices
- **Smooth Animations** — Polished UI with Framer Motion transitions

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v18+)
- A free [Google Gemini API Key](https://aistudio.google.com/app/apikey)

### Installation

```bash
# Clone the repository
git clone https://github.com/your-username/cover-letter-maker.git
cd cover-letter-maker

# Install dependencies
npm install

# Start development server
npm run dev
```

The app will be available at `http://localhost:5173`.

### Build for Production

```bash
npm run build
npm run preview
```

## 🛠️ Tech Stack

| Category | Technology |
|---|---|
| Framework | React 19 + TypeScript |
| Build Tool | Vite 7 |
| Styling | Tailwind CSS 4 |
| AI | Google Gemini (`@google/genai`) |
| PDF Parsing | `pdfjs-dist` |
| PDF Generation | `jsPDF` + `pdf-lib` |
| Animations | Framer Motion |
| Icons | Lucide React |
| Testing | Vitest + Testing Library |

## 📁 Project Structure

```
src/
├── components/
│   ├── Header.tsx           # App header with language toggle
│   ├── Hero.tsx             # Landing hero section
│   ├── GeneratorForm.tsx    # 3-step form wizard
│   ├── CoverLetterPreview.tsx  # Result view with copy/download
│   ├── Guide.tsx            # API key tutorial page
│   └── Footer.tsx           # Footer with links
├── utils/
│   ├── translations.ts      # i18n dictionary (EN/ID)
│   └── gemini.ts            # Gemini API integration
├── App.tsx                  # Root component & state management
└── index.css                # Global styles
```

## 🌐 Internationalization

The app supports **English** (`en`) and **Indonesian** (`id`) via a centralized translation dictionary in `src/utils/translations.ts`. All UI components receive translated strings through props. Switch languages instantly using the globe button in the header.

## 📝 How It Works

1. **Enter Details** — Provide the target company name and select the output language
2. **Upload CV** — Upload your CV as a PDF (supporting docs are optional)
3. **Provide API Key** — Paste your free Gemini API key
4. **Generate** — The AI creates a tailored cover letter based on your CV
5. **Download** — Copy the text or download a bundled PDF with all your documents

## 🧪 Testing

```bash
# Run tests
npm test

# Run tests in watch mode
npm run test:watch

# Run tests with coverage
npm run test:coverage
```
