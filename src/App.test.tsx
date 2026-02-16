import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from './App';

// Mock framer-motion
vi.mock('framer-motion', () => ({
  motion: {
    div: ({ children, ...props }: React.ComponentProps<'div'>) => <div {...props}>{children}</div>,
    button: ({ children, ...props }: React.ComponentProps<'button'>) => <button {...props}>{children}</button>,
  },
  AnimatePresence: ({ children }: { children: React.ReactNode }) => <>{children}</>,
}));

// Mock @google/genai
vi.mock('@google/genai', () => ({
  GoogleGenAI: vi.fn().mockImplementation(() => ({
    models: {
      generateContent: vi.fn().mockResolvedValue({
        text: 'Dear Hiring Manager,\n\nMock generated cover letter content.',
      }),
    },
  })),
}));

// Mock pdfjs-dist
vi.mock('pdfjs-dist', () => ({
  GlobalWorkerOptions: { workerSrc: '' },
  getDocument: vi.fn().mockReturnValue({
    promise: Promise.resolve({
      numPages: 1,
      getPage: vi.fn().mockResolvedValue({
        getTextContent: vi.fn().mockResolvedValue({
          items: [{ str: 'John Doe' }, { str: 'Software Engineer' }],
        }),
      }),
    }),
  }),
}));

vi.mock('pdfjs-dist/build/pdf.worker.min.mjs?url', () => ({
  default: 'mock-worker-url',
}));

// Mock jspdf
vi.mock('jspdf', () => ({
  jsPDF: vi.fn().mockImplementation(() => ({
    setFont: vi.fn(),
    setFontSize: vi.fn(),
    internal: { pageSize: { getWidth: () => 210, getHeight: () => 297 } },
    splitTextToSize: vi.fn().mockReturnValue(['line1']),
    text: vi.fn(),
    addPage: vi.fn(),
    output: vi.fn().mockReturnValue(new ArrayBuffer(8)),
  })),
}));

// Mock pdf-lib
vi.mock('pdf-lib', () => ({
  PDFDocument: {
    create: vi.fn().mockResolvedValue({
      copyPages: vi.fn().mockResolvedValue([{}]),
      addPage: vi.fn(),
      getPageIndices: vi.fn().mockReturnValue([0]),
      save: vi.fn().mockResolvedValue(new Uint8Array(8)),
    }),
    load: vi.fn().mockResolvedValue({
      copyPages: vi.fn().mockResolvedValue([{}]),
      getPageIndices: vi.fn().mockReturnValue([0]),
    }),
  },
}));

describe('App - Integration Tests', () => {
  describe('Initial render', () => {
    it('should render the Hero view by default', () => {
      render(<App />);
      expect(screen.getByText('Craft the Perfect')).toBeInTheDocument();
      expect(screen.getByText('Cover Letter with AI')).toBeInTheDocument();
    });

    it('should render the Header', () => {
      render(<App />);
      expect(screen.getByText('Kuple CL Maker')).toBeInTheDocument();
    });

    it('should render the Footer', () => {
      render(<App />);
      expect(screen.getByText(/Kuple Cover Letter Maker/)).toBeInTheDocument();
    });
  });

  describe('Navigation flow', () => {
    it('should navigate from Hero to Form when CTA is clicked', async () => {
      const user = userEvent.setup();
      render(<App />);

      await user.click(screen.getByText('Create Now'));

      // Form step 1 should be visible
      expect(screen.getByText('Application Details')).toBeInTheDocument();
    });

    it('should navigate to Guide view when footer link is clicked', async () => {
      const user = userEvent.setup();
      render(<App />);

      await user.click(screen.getByText('How to get API Key?'));

      expect(screen.getByText('How to Get a Gemini API Key')).toBeInTheDocument();
    });

    it('should navigate back from Guide to Hero', async () => {
      const user = userEvent.setup();
      render(<App />);

      // Go to Guide
      await user.click(screen.getByText('How to get API Key?'));
      expect(screen.getByText('How to Get a Gemini API Key')).toBeInTheDocument();

      // Click the CTA to go back
      await user.click(screen.getByText("I have my key, let's start!"));
      expect(screen.getByText('Craft the Perfect')).toBeInTheDocument();
    });
  });

  describe('Language switching', () => {
    it('should switch from English to Indonesian', async () => {
      const user = userEvent.setup();
      render(<App />);

      // Click the language toggle
      await user.click(screen.getByText('EN'));

      // Verify Indonesian text
      expect(screen.getByText('Buat Cover Letter')).toBeInTheDocument();
      expect(screen.getByText('Sempurna dengan AI')).toBeInTheDocument();
    });

    it('should switch back from Indonesian to English', async () => {
      const user = userEvent.setup();
      render(<App />);

      // Switch to Indonesian
      await user.click(screen.getByText('EN'));
      expect(screen.getByText('ID')).toBeInTheDocument();

      // Switch back to English
      await user.click(screen.getByText('ID'));
      expect(screen.getByText('Craft the Perfect')).toBeInTheDocument();
    });
  });

  describe('View exclusivity', () => {
    it('should only show one view at a time (Hero)', () => {
      render(<App />);
      expect(screen.getByText('Craft the Perfect')).toBeInTheDocument();
      expect(screen.queryByText('Application Details')).not.toBeInTheDocument();
      expect(screen.queryByText('How to Get a Gemini API Key')).not.toBeInTheDocument();
    });

    it('should only show form when navigated to', async () => {
      const user = userEvent.setup();
      render(<App />);

      await user.click(screen.getByText('Create Now'));

      expect(screen.getByText('Application Details')).toBeInTheDocument();
      expect(screen.queryByText('Craft the Perfect')).not.toBeInTheDocument();
    });
  });
});
