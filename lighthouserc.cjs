// Explicit targets only; ci:smoke provides a temporary local fixture URL.
const urls = JSON.parse(process.env.WEBCHEK_CI_URLS || '[]');
if (!Array.isArray(urls) || urls.length === 0) throw new Error('WEBCHEK_CI_URLS must contain a JSON array of target URLs.');
for (const value of urls) {
  const url = new URL(value);
  if (!['http:', 'https:'].includes(url.protocol) || url.username || url.password) {
    throw new Error('Only HTTP(S) targets without embedded credentials are allowed.');
  }
}
module.exports = {
  ci: {
    collect: {
      url: urls,
      numberOfRuns: 3,
      ...(process.env.WEBCHEK_BROWSER ? { chromePath: process.env.WEBCHEK_BROWSER } : {}),
      settings: {
        onlyCategories: ['performance', 'accessibility', 'best-practices', 'seo'],
        chromeFlags: process.env.WEBCHEK_NO_SANDBOX === '1' ? '--no-sandbox' : '',
      },
    },
    assert: {
      assertions: {
        'categories:performance': ['error', { minScore: 0.8, aggregationMethod: 'median' }],
        'categories:accessibility': ['error', { minScore: 0.9, aggregationMethod: 'median' }],
        'categories:seo': ['error', { minScore: 0.9, aggregationMethod: 'median' }],
        'categories:best-practices': ['error', { minScore: 0.9, aggregationMethod: 'median' }],
      },
    },
    upload: { target: 'filesystem', outputDir: './reports' },
  },
};
