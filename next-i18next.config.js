module.exports = {
  i18n: {
    defaultLocale: 'pt',
    locales: ['pt', 'es', 'en', 'fr'],
  },
  localePath: './public/locales',
  reloadOnPrerender: process.env.NODE_ENV === 'development',
};