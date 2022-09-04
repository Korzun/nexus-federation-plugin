export default {
  coveragePathIgnorePatterns: ['.mock.ts', '.fixture.ts'],
  rootDir: 'src',
  preset: 'ts-jest',
  reporters: ['default', 'jest-junit'],
};
