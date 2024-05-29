module.exports = {
  ci: {
    collect: {
      staticDistDir: './dist',
      url: ['http://localhost:3000'],
      numberOfRuns: 5,
    },
    upload: {
      target: 'temporary-public-storage',
      githubAppToken: process.env.LHCI_GITHUB_APP_TOKEN,
    },
  },
};
