import { cn } from './utils';

describe('cn() utility', () => {
  it('should merge multiple class strings', () => {
    expect(cn('foo', 'bar')).toBe('foo bar');
  });

  it('should handle conditional classes (falsy values)', () => {
    expect(cn('foo', undefined, null, false, 'bar')).toBe('foo bar');
  });

  it('should handle empty input', () => {
    expect(cn()).toBe('');
  });

  it('should resolve tailwind conflicts (last one wins)', () => {
    const result = cn('p-2', 'p-4');
    expect(result).toBe('p-4');
  });

  it('should merge tailwind classes without conflicts', () => {
    const result = cn('px-2', 'py-4', 'bg-red-500');
    expect(result).toBe('px-2 py-4 bg-red-500');
  });

  it('should resolve complex tailwind conflicts', () => {
    const result = cn('text-red-500', 'text-blue-700');
    expect(result).toBe('text-blue-700');
  });

  it('should work with clsx conditional object syntax', () => {
    const result = cn('base', { active: true, disabled: false });
    expect(result).toBe('base active');
  });
});
