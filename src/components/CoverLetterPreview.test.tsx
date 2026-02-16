import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { CoverLetterPreview } from './CoverLetterPreview';
import { translations } from '../utils/translations';

// Mock framer-motion
vi.mock('framer-motion', () => ({
  motion: {
    div: ({ children, ...props }: any) => <div {...props}>{children}</div>,
  },
  AnimatePresence: ({ children }: any) => <>{children}</>,
}));

// Mock jspdf
vi.mock('jspdf', () => ({
  jsPDF: vi.fn().mockImplementation(() => ({
    setFont: vi.fn(),
    setFontSize: vi.fn(),
    internal: { pageSize: { getWidth: () => 210, getHeight: () => 297 } },
    splitTextToSize: vi.fn().mockReturnValue(['line1', 'line2']),
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

describe('CoverLetterPreview', () => {
  const mockOnReset = vi.fn();
  const t = translations.en.preview;
  const sampleContent = 'Dear Hiring Manager,\n\nI am writing to express my interest in the position at Google.';

  beforeEach(() => {
    mockOnReset.mockClear();
    vi.clearAllMocks();
  });

  it('should render the title', () => {
    render(
      <CoverLetterPreview content={sampleContent} supportingDocs={[]} onReset={mockOnReset} t={t} />
    );
    expect(screen.getByText(t.title)).toBeInTheDocument();
  });

  it('should render the generated content', () => {
    const { container } = render(
      <CoverLetterPreview content={sampleContent} supportingDocs={[]} onReset={mockOnReset} t={t} />
    );
    // Target the innermost prose div directly
    const proseDiv = container.querySelector('.prose');
    expect(proseDiv).not.toBeNull();
    expect(proseDiv!.textContent).toBe(sampleContent);
  });

  it('should show copied feedback when copy button is clicked', async () => {
    const { container } = render(
      <CoverLetterPreview content={sampleContent} supportingDocs={[]} onReset={mockOnReset} t={t} />
    );

    // Before click: Copy icon should be present (lucide-copy)
    expect(container.querySelector('.lucide-copy')).not.toBeNull();

    const copyButton = screen.getByTitle(t.copy);
    // Use fireEvent to avoid userEvent clipboard interception
    fireEvent.click(copyButton);

    // After click: Check icon should appear (lucide-check), indicating copied state
    await waitFor(() => {
      expect(container.querySelector('.lucide-check')).not.toBeNull();
    });
  });

  it('should call onReset when "Create New" button is clicked', async () => {
    const user = userEvent.setup();
    render(
      <CoverLetterPreview content={sampleContent} supportingDocs={[]} onReset={mockOnReset} t={t} />
    );

    await user.click(screen.getByText(t.createNew));
    expect(mockOnReset).toHaveBeenCalledTimes(1);
  });

  it('should render the download button', () => {
    render(
      <CoverLetterPreview content={sampleContent} supportingDocs={[]} onReset={mockOnReset} t={t} />
    );
    expect(screen.getByText(t.download)).toBeInTheDocument();
  });

  it('should render with empty content', () => {
    render(
      <CoverLetterPreview content="" supportingDocs={[]} onReset={mockOnReset} t={t} />
    );
    expect(screen.getByText(t.title)).toBeInTheDocument();
  });
});
