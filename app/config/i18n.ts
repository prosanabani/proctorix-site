import { i18n } from '@lingui/core';

export type Locale = {
  // direction: 'rtl' | 'ltr';
  label: string;
  locale: string;
};

type TLocale = {
  get availableLocales(): string[];
  locales: Record<string, Locale>;
  set: (value: 'en' | 'ar') => Promise<void>;
  toggleLocales: () => Promise<void>;
  get value(): 'en' | 'ar';
};

export const locale: TLocale = {
  get availableLocales() {
    return Object.keys(this.locales);
  },
  locales: {
    ar: {
      // direction: 'rtl',
      label: 'العربية',
      locale: 'ar',
    },
    en: {
      // direction: 'ltr',
      label: 'English',
      locale: 'en',
    },
  },
  async set(value) {
    // load and activate locale
    const { messages } = await import(`../locales/${value}.po`);
    i18n.load(value, messages);
    i18n.activate(value);

    // change page direction
    document.documentElement.setAttribute('lang', value);
    // document.documentElement.setAttribute('dir', this.locales[value].direction);

    // set localStorage
    localStorage.setItem('language', value);
  },
  async toggleLocales() {
    const locales = locale.availableLocales;
    const newLocale =
      locales[(locales.indexOf(locale.value) + 1) % locales.length];

    // @ts-expect-error fix later
    await locale.set(newLocale);
  },

  get value() {
    return (localStorage.getItem('language') ||
      navigator.language.slice(0, 2) ||
      navigator.language[0].slice(0, 2)) as 'en' | 'ar';
  },
};

// load default language
await locale.set(locale.value);
export { i18n } from '@lingui/core';
