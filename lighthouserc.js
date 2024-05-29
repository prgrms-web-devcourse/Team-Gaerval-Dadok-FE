module.exports = {
  ci: {
    collect: {
      startServerCommand: 'yarn start',
      startServerReadyPattern: 'ready on',
      url: [
        'http://local.dev.dadok.app:3000/bookarchive',
        'http://local.dev.dadok.app:3000/book/search',
        'http://local.dev.dadok.app:3000/group',
        'http://local.dev.dadok.app:3000/profile/me',
      ],
      numberOfRuns: 1,
    },
    upload: {
      target: 'temporary-public-storage',
      githubAppToken: process.env.LHCI_GITHUB_APP_TOKEN,
    },
  },
};
