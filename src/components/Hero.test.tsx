import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Hero } from './Hero';
import { translations } from '../utils/translations';

// Mock framer-motion
vi.mock('framer-motion', () => ({
  motion: {
    div: ({ children, ...props }: React.ComponentProps<'div'>) => <div {...props}>{children}</div>,
  },
  AnimatePresence: ({ children }: { children: React.ReactNode }) => <>{children}</>,
}));

describe('Hero', () => {
  const mockOnStart = vi.fn();
  const t = translations.en.hero;

  beforeEach(() => {
    mockOnStart.mockClear();
  });

  it('should render the title', () => {
    render(<Hero onStart={mockOnStart} t={t} />);
    expect(screen.getByText(t.title1)).toBeInTheDocument();
    expect(screen.getByText(t.title2)).toBeInTheDocument();
  });

  it('should render the subtitle', () => {
    render(<Hero onStart={mockOnStart} t={t} />);
    expect(screen.getByText(t.subtitle)).toBeInTheDocument();
  });

  it('should render the CTA button', () => {
    render(<Hero onStart={mockOnStart} t={t} />);
    expect(screen.getByText(t.cta)).toBeInTheDocument();
  });

  it('should call onStart when CTA button is clicked', async () => {
    const user = userEvent.setup();
    render(<Hero onStart={mockOnStart} t={t} />);

    await user.click(screen.getByText(t.cta));
    expect(mockOnStart).toHaveBeenCalledTimes(1);
  });

  it('should render all feature badges', () => {
    render(<Hero onStart={mockOnStart} t={t} />);
    for (const feature of t.features) {
      expect(screen.getByText(feature)).toBeInTheDocument();
    }
  });
});
