module.exports = {
  ci: {
    collect: {
      startServerCommand: 'yarn start',
      startServerReadyPattern: 'ready on',
      url: [
        'https://local.dev.dadok.app/bookarchive',
        'https://local.dev.dadok.app/book/search',
        'https://local.dev.dadok.app/group',
        'https://local.dev.dadok.app/profile/me',
      ],
      numberOfRuns: 1,
    },
    upload: {
      target: 'temporary-public-storage',
      githubAppToken: process.env.LHCI_GITHUB_APP_TOKEN,
    },
  },
};
