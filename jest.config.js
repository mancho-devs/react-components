module.exports = {
  transform: {
    "^.+\\.[jt]sx?$": "<rootDir>/jest/jest-preprocess.js"
  },
  moduleNameMapper: {
    ".+\\.(css|styl|less|sass|scss)$": `identity-obj-proxy`,
    ".+\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$": `<rootDir>/jest/__mocks__/file-mock.js`,
    "^gatsby$": `<rootDir>/jest/__mocks__/gatsby.js`,
  },
  testPathIgnorePatterns: [`node_modules`, `\\.cache`, `<rootDir>.*/public`],
  transformIgnorePatterns: [`node_modules/(?!(gatsby)/)`],
  globals: {
    __PATH_PREFIX__: ``,
  },
  setupFiles: [`<rootDir>/jest/loadershim.js`],
};
