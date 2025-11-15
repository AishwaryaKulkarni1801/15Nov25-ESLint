/** jest.config.js */
module.exports = {
  preset: 'jest-preset-angular',
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['<rootDir>/setup-jest.ts'],
  testMatch: ['**/+(*.)+(spec).+(ts)'],
  moduleFileExtensions: ['ts', 'html', 'js', 'json'],
  transform: {
    '^.+\\.(ts|js|mjs|html)$': 'jest-preset-angular'
  },
  // transform node_modules packages that are ESM (Angular packages are often ESM)
  transformIgnorePatterns: [
    'node_modules/(?!(\@angular|rxjs|tslib)/)'
  ],
  moduleNameMapper: {
    '\\.(css|scss|sass|less)$': 'identity-obj-proxy',
    '^src/(.*)$': '<rootDir>/src/$1'
  },
  collectCoverage: false,
  coverageDirectory: '<rootDir>/coverage/',
  coverageReporters: ['html', 'lcov', 'text'],
  collectCoverageFrom: [
    'src/app/**/*.ts',
    '!src/app/**/*.module.ts',
    '!src/app/**/*.routing.ts',
    '!src/main.ts'
  ],
  verbose: true,
  testTimeout: 30000,
  globals: {
    'ts-jest': {
      tsconfig: 'tsconfig.spec.json',
      stringifyContentPathRegex: '\\.(html|svg)$'
    }
  },
};
