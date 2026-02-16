import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Guide } from './Guide';
import { translations } from '../utils/translations';

// Mock framer-motion
vi.mock('framer-motion', () => ({
  motion: {
    div: ({ children, ...props }: React.ComponentProps<'div'>) => <div {...props}>{children}</div>,
  },
  AnimatePresence: ({ children }: { children: React.ReactNode }) => <>{children}</>,
}));

describe('Guide', () => {
  const mockOnBack = vi.fn();
  const t = translations.en.guide;

  beforeEach(() => {
    mockOnBack.mockClear();
  });

  it('should render the guide title', () => {
    render(<Guide onBack={mockOnBack} t={t} />);
    expect(screen.getByText(t.title)).toBeInTheDocument();
  });

  it('should render all 3 guide steps', () => {
    render(<Guide onBack={mockOnBack} t={t} />);
    expect(screen.getByText(t.step1Title)).toBeInTheDocument();
    expect(screen.getByText(t.step2Title)).toBeInTheDocument();
    expect(screen.getByText(t.step3Title)).toBeInTheDocument();
  });

  it('should render step descriptions', () => {
    render(<Guide onBack={mockOnBack} t={t} />);
    expect(screen.getByText(t.step1Desc)).toBeInTheDocument();
    expect(screen.getByText(t.step2Desc)).toBeInTheDocument();
    expect(screen.getByText(t.step3Desc)).toBeInTheDocument();
  });

  it('should render the Google AI Studio link', () => {
    render(<Guide onBack={mockOnBack} t={t} />);
    const link = screen.getByText(t.step1Link);
    expect(link.closest('a')).toHaveAttribute('href', 'https://aistudio.google.com/app/apikey');
    expect(link.closest('a')).toHaveAttribute('target', '_blank');
  });

  it('should render the "Pro Tip" section', () => {
    render(<Guide onBack={mockOnBack} t={t} />);
    expect(screen.getByText(t.proTip)).toBeInTheDocument();
    expect(screen.getByText(t.proTipDesc)).toBeInTheDocument();
  });

  it('should render the free tier info', () => {
    render(<Guide onBack={mockOnBack} t={t} />);
    expect(screen.getByText(t.freeTag)).toBeInTheDocument();
    expect(screen.getByText(t.freeDesc)).toBeInTheDocument();
  });

  it('should call onBack when back button is clicked', async () => {
    const user = userEvent.setup();
    render(<Guide onBack={mockOnBack} t={t} />);

    // The back arrow button at the top
    const buttons = screen.getAllByRole('button');
    // First button is the arrow back
    await user.click(buttons[0]);
    expect(mockOnBack).toHaveBeenCalledTimes(1);
  });

  it('should call onBack when CTA button is clicked', async () => {
    const user = userEvent.setup();
    render(<Guide onBack={mockOnBack} t={t} />);

    await user.click(screen.getByText(t.cta));
    expect(mockOnBack).toHaveBeenCalledTimes(1);
  });
});
