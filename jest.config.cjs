module.exports = {
    transform: {
      '^.+\\.jsx?$': 'babel-jest',
    },
    moduleNameMapper: {
      "^.+\\.svg$": "jest-svg-transformer",
    },
    testEnvironment: 'jsdom',
};