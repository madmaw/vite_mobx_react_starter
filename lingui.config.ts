import type { LinguiConfig } from '@lingui/conf';

const config: LinguiConfig = {
  locales: [
    'en',
    'pseudo_en',
  ],
  pseudoLocale: 'pseudo_en',
  sourceLocale: 'en',
  fallbackLocales: {
    pseudo_en: 'en',
  },
  catalogs: [
    {
      path: '<rootDir>/src/app/pages/example/locales/{locale}',
      // note that lingui cannot parse annotations, so we are stuck
      // only looking at tsx files which (by convention) do not have
      // annotations
      include: ['src/app/pages/example/**/*.tsx'],
    },
  ],
};

export default config;
