import { translations } from './translations';
import type { Language } from './translations';

describe('translations', () => {
  const languages: Language[] = ['en', 'id'];

  it('should have both "en" and "id" translations', () => {
    expect(translations).toHaveProperty('en');
    expect(translations).toHaveProperty('id');
  });

  // Helper to get flat keys from a nested object
  function getKeys(obj: Record<string, any>, prefix = ''): string[] {
    return Object.entries(obj).flatMap(([key, value]) => {
      const fullKey = prefix ? `${prefix}.${key}` : key;
      if (typeof value === 'object' && value !== null && !Array.isArray(value)) {
        return getKeys(value, fullKey);
      }
      return [fullKey];
    });
  }

  it('should have the same structure for "en" and "id"', () => {
    const enKeys = getKeys(translations.en).sort();
    const idKeys = getKeys(translations.id).sort();
    expect(enKeys).toEqual(idKeys);
  });

  it('should not have any empty string values', () => {
    for (const lang of languages) {
      const keys = getKeys(translations[lang]);
      for (const key of keys) {
        const value = key.split('.').reduce((obj: any, k) => obj[k], translations[lang]);
        if (typeof value === 'string') {
          expect(value.trim()).not.toBe('');
        }
      }
    }
  });

  it('should have non-empty feature arrays for both languages', () => {
    expect(translations.en.hero.features.length).toBeGreaterThan(0);
    expect(translations.id.hero.features.length).toBeGreaterThan(0);
    expect(translations.en.hero.features.length).toBe(translations.id.hero.features.length);
  });

  it('should have form steps arrays of equal length', () => {
    expect(translations.en.form.steps.length).toBe(3);
    expect(translations.id.form.steps.length).toBe(3);
  });

  it('should export Language type as union of "en" | "id"', () => {
    // Type-level test: this should compile without errors
    const validLang1: Language = 'en';
    const validLang2: Language = 'id';
    expect(validLang1).toBe('en');
    expect(validLang2).toBe('id');
  });
});
