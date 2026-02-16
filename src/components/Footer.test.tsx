import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Footer } from './Footer';

describe('Footer', () => {
  const mockOnGuideClick = vi.fn();

  beforeEach(() => {
    mockOnGuideClick.mockClear();
  });

  it('should render the copyright text with current year', () => {
    render(<Footer onGuideClick={mockOnGuideClick} />);
    const year = new Date().getFullYear().toString();
    expect(screen.getByText(new RegExp(year))).toBeInTheDocument();
  });

  it('should render the "How to get API Key?" button', () => {
    render(<Footer onGuideClick={mockOnGuideClick} />);
    expect(screen.getByText('How to get API Key?')).toBeInTheDocument();
  });

  it('should call onGuideClick when the guide button is clicked', async () => {
    const user = userEvent.setup();
    render(<Footer onGuideClick={mockOnGuideClick} />);

    await user.click(screen.getByText('How to get API Key?'));
    expect(mockOnGuideClick).toHaveBeenCalledTimes(1);
  });

  it('should render the GitHub link', () => {
    render(<Footer onGuideClick={mockOnGuideClick} />);
    const githubLink = screen.getByText('GitHub');
    expect(githubLink).toBeInTheDocument();
    expect(githubLink.closest('a')).toHaveAttribute('href', 'https://github.com');
    expect(githubLink.closest('a')).toHaveAttribute('target', '_blank');
  });
});
