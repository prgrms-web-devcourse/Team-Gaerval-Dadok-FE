module.exports = {
  ci: {
    collect: {
      startServerCommand: 'yarn start-ssl',
      startServerReadyPattern: 'ready on',
      url: [
        'https://local.dev.dadok.app:3000/bookarchive',
        'https://local.dev.dadok.app:3000/book/search',
        'https://local.dev.dadok.app:3000/group',
        'https://local.dev.dadok.app:3000/profile/me',
      ],
      numberOfRuns: 1,
    },
    upload: {
      target: 'temporary-public-storage',
      githubAppToken: process.env.LHCI_GITHUB_APP_TOKEN,
    },
  },
};
