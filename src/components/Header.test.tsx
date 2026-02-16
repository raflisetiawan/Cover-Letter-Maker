import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Header } from './Header';

// Mock framer-motion to avoid animation issues in tests
vi.mock('framer-motion', () => ({
  motion: {
    div: ({ children, ...props }: React.ComponentProps<'div'>) => <div {...props}>{children}</div>,
    button: ({ children, ...props }: React.ComponentProps<'button'>) => <button {...props}>{children}</button>,
  },
  AnimatePresence: ({ children }: { children: React.ReactNode }) => <>{children}</>,
}));

describe('Header', () => {
  const mockSetLanguage = vi.fn();

  beforeEach(() => {
    mockSetLanguage.mockClear();
  });

  it('should render the app title', () => {
    render(<Header currentLang="en" setLanguage={mockSetLanguage} />);
    expect(screen.getByText('Kuple CL Maker')).toBeInTheDocument();
  });

  it('should display current language badge as "EN"', () => {
    render(<Header currentLang="en" setLanguage={mockSetLanguage} />);
    expect(screen.getByText('EN')).toBeInTheDocument();
  });

  it('should display current language badge as "ID" when Bahasa', () => {
    render(<Header currentLang="id" setLanguage={mockSetLanguage} />);
    expect(screen.getByText('ID')).toBeInTheDocument();
  });

  it('should call setLanguage with "id" when clicking toggle from "en"', async () => {
    const user = userEvent.setup();
    render(<Header currentLang="en" setLanguage={mockSetLanguage} />);

    const langButton = screen.getByText('EN');
    await user.click(langButton);
    expect(mockSetLanguage).toHaveBeenCalledWith('id');
  });

  it('should call setLanguage with "en" when clicking toggle from "id"', async () => {
    const user = userEvent.setup();
    render(<Header currentLang="id" setLanguage={mockSetLanguage} />);

    const langButton = screen.getByText('ID');
    await user.click(langButton);
    expect(mockSetLanguage).toHaveBeenCalledWith('en');
  });

  it('should render the "Get Started" button', () => {
    render(<Header currentLang="en" setLanguage={mockSetLanguage} />);
    expect(screen.getByText('Get Started')).toBeInTheDocument();
  });

  it('should render "Mulai" button when language is "id"', () => {
    render(<Header currentLang="id" setLanguage={mockSetLanguage} />);
    expect(screen.getByText('Mulai')).toBeInTheDocument();
  });
});
