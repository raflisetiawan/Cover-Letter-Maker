export const translations = {
  en: {
    header: {
      title: "Kuple CL Maker",
      github: "GitHub",
      getStarted: "Get Started",
      howTo: "How to get API Key?"
    },
    hero: {
      title1: "Craft the Perfect",
      title2: "Cover Letter with AI",
      subtitle: "Transform your CV into a professional, tailored cover letter in seconds. Powered by advanced AI to help you land your dream job.",
      cta: "Create Now",
      ctaCvTailoring: "Tailor My CV",
      features: ["ATS Friendly", "Professional Tone", "Instant Download"]
    },
    cvTailoring: {
      steps: ["Details", "Upload & Generate"],
      step1: {
        title: "Job Details",
        subtitle: "Tell us about the target job",
        companyPlaceholder: "Target Company (e.g. Google)",
        jobDescLabel: "Job Description *",
        jobDescPlaceholder: "Paste the full job description here...",
        jobDescSub: "The more detailed, the better the tailoring result",
        next: "Next Step"
      },
      step2: {
        title: "Upload & Generate",
        subtitle: "Upload your CV, provide API key, and generate",
        cvLabel: "Curriculum Vitae (PDF) *",
        cvPlaceholder: "Upload CV",
        cvSub: "PDF only (Max 5MB)",
        supportLabel: "Supporting Documents (Optional)",
        supportPlaceholder: "Add Certificates / Portfolio",
        supportSub: "PDF or Images (Max 5MB each)",
        apiKeyLabel: "Gemini API Key *",
        apiKeyPlaceholder: "Paste your Gemini API Key here",
        apiKeyWarning: "Your API key is never stored. It's used only for this session request.",
        customPromptLabel: "Custom Instructions (Optional)",
        customPromptPlaceholder: "e.g. 'Emphasize my backend development experience' or 'Highlight leadership roles'",
        back: "Back",
        generate: "Tailor My CV",
        generating: "Tailoring...",
        noKey: "Don't have a key?",
        getKey: "Get one from Google AI Studio"
      },
      errors: {
        pdfOnly: "Please upload a PDF file",
        readError: "Failed to read PDF. Please try another file."
      },
      preview: {
        title: "Tailored CV",
        description: "Use the tailored text below to update your original CV. Your original design and layout will be preserved.",
        copy: "Copy to clipboard",
        download: "Download PDF",
        merging: "Generating PDF...",
        createNew: "Tailor Another CV"
      }
    },
    form: {
      steps: ["Details", "Uploads", "API Key"],
      step1: {
        title: "Application Details",
        subtitle: "Tell us about the job and your preferences",
        companyPlaceholder: "Target Company (e.g. Google)",
        next: "Next Step"
      },
      step2: {
        title: "Upload Documents",
        subtitle: "Your CV is required. Supporting docs are optional.",
        cvLabel: "Curriculum Vitae (PDF)*",
        cvPlaceholder: "Upload CV",
        cvSub: "PDF only (Max 5MB)",
        supportLabel: "Supporting Documents (Optional)",
        supportPlaceholder: "Add Certificates / Portfolio",
        supportSub: "PDF or Images (Max 5MB each)",
        back: "Back",
        next: "Next Step"
      },
      step3: {
        title: "Gemini API Key",
        subtitle: "To power the AI generation",
        warning: "Your API key is never stored. It's used only for this session request.",
        placeholder: "Paste your Gemini API Key here",
        customPromptLabel: "Experimental: Custom Instructions (Optional)",
        customPromptPlaceholder: "e.g. 'Focus on my leadership skills' or 'Make it more casual'",
        back: "Back",
        generate: "Generate Letter",
        generating: "Generating...",
        noKey: "Don't have a key?",
        getKey: "Get one from Google AI Studio"
      },
      errors: {
        pdfOnly: "Please upload a PDF file",
        readError: "Failed to read PDF. Please try another file."
      }
    },
    footer: {
      rights: "Kuple Cover Letter Maker.",
      howTo: "How to get API Key?",
      github: "GitHub"
    },
    preview: {
      title: "Generated Cover Letter",
      copy: "Copy to clipboard",
      download: "Download PDF Bundle",
      merging: "Merging & Saving...",
      createNew: "Create New Letter"
    },
    guide: {
      title: "How to Get a Gemini API Key",
      step1Title: "Visit Google AI Studio",
      step1Desc: "Go to the Google AI Studio website. You'll need to sign in with your Google account.",
      step1Link: "Go to Google AI Studio",
      step2Title: "Create a New API Key",
      step2Desc: "Click on the \"Create API key\" button. You may be asked to create a new project or select an existing one.",
      proTip: "Pro Tip",
      proTipDesc: "Select \"Create API key in new project\" if you don't have an existing Google Cloud project. It's the fastest way.",
      step3Title: "Copy & Use",
      step3Desc: "Once created, your key will be displayed. Copy it and paste it into the \"API Key\" step in our generator form.",
      freeTag: "Free of Charge",
      freeDesc: "Google offers a generous free tier for Gemini API usage, which is more than enough for creating cover letters.",
      cta: "I have my key, let's start!"
    }
  },
  id: {
    header: {
      title: "Kuple CL Maker",
      github: "GitHub",
      getStarted: "Mulai",
      howTo: "Cara dapat API Key?"
    },
    hero: {
      title1: "Buat Cover Letter",
      title2: "Sempurna dengan AI",
      subtitle: "Ubah CV Anda menjadi cover letter profesional dalam hitungan detik. Ditenagai AI canggih untuk membantu Anda mendapatkan pekerjaan impian.",
      cta: "Buat Sekarang",
      ctaCvTailoring: "Sesuaikan CV Saya",
      features: ["Ramah ATS", "Nada Profesional", "Unduh Instan"]
    },
    cvTailoring: {
      steps: ["Detail", "Upload & Buat"],
      step1: {
        title: "Detail Pekerjaan",
        subtitle: "Ceritakan tentang pekerjaan yang dituju",
        companyPlaceholder: "Perusahaan Tujuan (cth. Google)",
        jobDescLabel: "Deskripsi Pekerjaan *",
        jobDescPlaceholder: "Tempel deskripsi pekerjaan lengkap di sini...",
        jobDescSub: "Semakin detail, semakin baik hasil penyesuaian",
        next: "Lanjut"
      },
      step2: {
        title: "Upload & Buat",
        subtitle: "Upload CV Anda, masukkan API key, dan buat",
        cvLabel: "Curriculum Vitae (PDF) *",
        cvPlaceholder: "Upload CV",
        cvSub: "Hanya PDF (Maks 5MB)",
        supportLabel: "Dokumen Pendukung (Opsional)",
        supportPlaceholder: "Tambah Sertifikat / Portofolio",
        supportSub: "PDF atau Gambar (Maks 5MB per file)",
        apiKeyLabel: "Gemini API Key *",
        apiKeyPlaceholder: "Tempel Gemini API Key Anda di sini",
        apiKeyWarning: "API key Anda tidak pernah disimpan. Hanya digunakan untuk sesi ini.",
        customPromptLabel: "Instruksi Khusus (Opsional)",
        customPromptPlaceholder: "cth. 'Tonjolkan pengalaman backend development saya' atau 'Fokus pada peran kepemimpinan'",
        back: "Kembali",
        generate: "Sesuaikan CV Saya",
        generating: "Sedang Menyesuaikan...",
        noKey: "Belum punya key?",
        getKey: "Dapatkan dari Google AI Studio"
      },
      errors: {
        pdfOnly: "Mohon upload file PDF",
        readError: "Gagal membaca PDF. Silakan coba file lain."
      },
      preview: {
        title: "CV yang Disesuaikan",
        description: "Gunakan teks yang sudah disesuaikan di bawah untuk memperbarui CV asli Anda. Desain dan layout asli CV Anda tetap terjaga.",
        copy: "Salin ke clipboard",
        download: "Unduh PDF",
        merging: "Membuat PDF...",
        createNew: "Sesuaikan CV Lain"
      }
    },
    form: {
      steps: ["Detail", "Upload", "API Key"],
      step1: {
        title: "Detail Lamaran",
        subtitle: "Ceritakan tentang pekerjaan dan preferensi Anda",
        companyPlaceholder: "Perusahaan Tujuan (cth. Google)",
        next: "Lanjut"
      },
      step2: {
        title: "Upload Dokumen",
        subtitle: "CV wajib diunggah. Dokumen pendukung opsional.",
        cvLabel: "Curriculum Vitae (PDF)*",
        cvPlaceholder: "Upload CV",
        cvSub: "Hanya PDF (Maks 5MB)",
        supportLabel: "Dokumen Pendukung (Opsional)",
        supportPlaceholder: "Tambah Sertifikat / Portofolio",
        supportSub: "PDF atau Gambar (Maks 5MB per file)",
        back: "Kembali",
        next: "Lanjut"
      },
      step3: {
        title: "Gemini API Key",
        subtitle: "Untuk menjalankan generasi AI",
        warning: "API key Anda tidak pernah disimpan. Hanya digunakan untuk sesi ini.",
        placeholder: "Tempel Gemini API Key Anda di sini",
        customPromptLabel: "Eksperimental: Instruksi Khusus (Opsional)",
        customPromptPlaceholder: "cth. 'Fokus pada skill kepemimpinan saya' atau 'Buat lebih santai'",
        back: "Kembali",
        generate: "Buat Surat",
        generating: "Sedang Membuat...",
        noKey: "Belum punya key?",
        getKey: "Dapatkan dari Google AI Studio"
      },
      errors: {
        pdfOnly: "Mohon upload file PDF",
        readError: "Gagal membaca PDF. Silakan coba file lain."
      }
    },
    footer: {
      rights: "Kuple Cover Letter Maker.",
      howTo: "Cara dapat API Key?",
      github: "GitHub"
    },
    preview: {
      title: "Cover Letter Terbuat",
      copy: "Salin ke clipboard",
      download: "Unduh Bundle PDF",
      merging: "Menggabungkan & Menyimpan...",
      createNew: "Buat Surat Baru"
    },
    guide: {
      title: "Cara Mendapatkan Gemini API Key",
      step1Title: "Kunjungi Google AI Studio",
      step1Desc: "Buka website Google AI Studio. Anda perlu login dengan akun Google Anda.",
      step1Link: "Buka Google AI Studio",
      step2Title: "Buat API Key Baru",
      step2Desc: "Klik tombol \"Create API key\". Anda mungkin diminta membuat project baru atau memilih yang sudah ada.",
      proTip: "Tips Pro",
      proTipDesc: "Pilih \"Create API key in new project\" jika Anda belum punya project Google Cloud. Ini cara tercepat.",
      step3Title: "Salin & Gunakan",
      step3Desc: "Setelah dibuat, key akan muncul. Salin dan tempel ke langkah \"API Key\" di form generator kami.",
      freeTag: "Gratis",
      freeDesc: "Google menawarkan tier gratis yang melimpah untuk penggunaan Gemini API, lebih dari cukup untuk membuat cover letter.",
      cta: "Saya sudah punya key, ayo mulai!"
    }
  }
};

export type Language = 'en' | 'id';
