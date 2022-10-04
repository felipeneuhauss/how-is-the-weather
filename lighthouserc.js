module.exports = {
  ci: {
    collect: {
      startServerCommand: 'yarn start',
      startServerReadyPattern: 'ready on',
      url: [
        'http://localhost:3000/',
      ],
    },
    upload: {
      target: 'temporary-public-storage',
    },
  },
};
