import type { UserConfig } from '@commitlint/types';

export const Configuration: UserConfig = {
  parserPreset: 'conventional-changelog-conventionalcommits',
  rules: {
    'subject-empty': [2, 'never'],
    'subject-full-stop': [2, 'never', '.'],
    'type-case': [2, 'always', 'lower-case'],
    'type-empty': [2, 'never'],
    'type-enum': [2, 'always', ['chore', 'docs', 'feat', 'fix', 'revert']],
  },
};

module.exports = Configuration;
