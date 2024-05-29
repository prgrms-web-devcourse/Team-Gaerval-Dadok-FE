module.exports = {
  ci: {
    collect: {
      staticDistDir: './dist',
      url: [
        'http://localhost:3000/bookarchive',
        'http://localhost:3000/book/search',
        'http://localhost:3000/group',
        'http://localhost:3000/profile/me',
      ],
      numberOfRuns: 5,
    },
    upload: {
      target: 'temporary-public-storage',
      githubAppToken: process.env.LHCI_GITHUB_APP_TOKEN,
    },
  },
};
