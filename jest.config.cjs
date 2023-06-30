module.exports = {
    transform: {
      '^.+\\.jsx?$': 'babel-jest',
    },
    moduleNameMapper: {
      "^.+\\.svg$": "jest-svg-transformer",
      ".+\\.(css|styl|less|sass|scss|png|jpg|ttf|woff|woff2)$": "identity-obj-proxy"
    },
    testEnvironment: 'jest-environment-jsdom'
};