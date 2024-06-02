module.exports = {
  ci: {
    collect: {
      startServerCommand: 'yarn next start',
      startServerReadyPattern: 'ready on',
      url: [
        'http://localhost:3000/bookarchive',
        'http://localhost:3000/book/search',
        'http://localhost:3000/group',
        'http://localhost:3000/profile/me',
      ],
      numberOfRuns: 2,
    },
    upload: {
      target: 'filesystem',
      outputDir: './lhci_reports',
      reportFilenamePattern: '%%PATHNAME%%-%%DATETIME%%-report.%%EXTENSION%%',
    },
  },
};
