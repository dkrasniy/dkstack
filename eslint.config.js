import { readdirSync } from 'node:fs'
import js from '@eslint/js'
import globals from 'globals'
import tseslint from 'typescript-eslint'
import reactHooks from 'eslint-plugin-react-hooks'
import importX from 'eslint-plugin-import-x'
import { createTypeScriptImportResolver } from 'eslint-import-resolver-typescript'

const NO_LUCIDE = {
  name: 'lucide-react',
  message: 'Icons come from @hugeicons/core-free-icons, rendered with HugeiconsIcon.',
}

const JS_MOTION = {
  group: [
    'motion',
    'motion/*',
    'framer-motion',
    'react-spring',
    '@react-spring/*',
    'gsap',
  ],
  message:
    'Animate with CSS transitions and keyframes, or element.animate() for a measured morph.',
}

const features = readdirSync('src/features', { withFileTypes: true })
  .filter((entry) => entry.isDirectory())
  .map((entry) => entry.name)

export default tseslint.config(
  {
    ignores: ['dist', 'coverage', 'src/routeTree.gen.ts'],
  },

  js.configs.recommended,
  tseslint.configs.recommendedTypeChecked,
  reactHooks.configs.flat['recommended-latest'],

  {
    plugins: { 'import-x': importX },
    languageOptions: {
      globals: globals.browser,
      parserOptions: {
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },
    settings: {
      'import-x/resolver-next': [
        createTypeScriptImportResolver({ project: './tsconfig.app.json' }),
      ],
    },
    rules: {
      'no-restricted-imports': ['error', { paths: [NO_LUCIDE], patterns: [JS_MOTION] }],

      'import-x/no-restricted-paths': [
        'error',
        {
          zones: [
            {
              target: './packages',
              from: './src',
              message: 'Packages cannot import the app. Pass what you need as a prop.',
            },
            ...features.map((name) => ({
              target: `./src/features/${name}`,
              from: './src/features',
              except: [`./${name}`],
              message:
                'A feature cannot import another feature. Move the shared code to src/api or @dkrasniy/ui.',
            })),
            {
              target: './src/features',
              from: './src/routes',
              message:
                'Routes import features, not the reverse. Take the value as a prop.',
            },
            {
              target: './src/state',
              from: ['./src/features', './src/routes'],
              message:
                'Stores sit below the features that read them. Move the shared code into src/state.',
            },
            {
              target: './src/features',
              from: './src/app',
              except: ['./errors.tsx'],
              message: 'Features can import @/app/errors and nothing else from src/app.',
            },
          ],
        },
      ],

      'import-x/no-extraneous-dependencies': ['error', { devDependencies: true }],
    },
  },

  {
    files: ['packages/**/*.{ts,tsx}'],
    rules: {
      'import-x/no-extraneous-dependencies': [
        'error',
        { devDependencies: ['**/*.test.{ts,tsx}'] },
      ],
      'no-restricted-imports': [
        'error',
        {
          paths: [NO_LUCIDE],
          patterns: [
            JS_MOTION,
            {
              group: ['@tanstack/react-query', '@tanstack/react-router', '@tanstack/*/*'],
              message:
                '@dkrasniy/ui takes data as props and reports changes through callbacks. The app fetches and routes.',
            },
          ],
        },
      ],
    },
  },

  {
    files: ['src/**/*.{ts,tsx}'],
    ignores: ['src/config.ts'],
    rules: {
      'no-restricted-syntax': [
        'error',
        {
          selector: 'MemberExpression[object.type="MetaProperty"][property.name="env"]',
          message: "Read env through `config` from '@/config'.",
        },
        {
          selector: 'Property[key.name="queryKey"] > ArrayExpression',
          message: "Build query keys with `keys` from '@/api/keys'.",
        },
        {
          selector: 'JSXExpressionContainer MemberExpression[property.name="message"]',
          message: 'Show errors with describeError from @/app/errors.',
        },
      ],
    },
  },

  {
    ...tseslint.configs.disableTypeChecked,
    files: ['vite.config.ts', 'eslint.config.js'],
  },
  {
    files: ['vite.config.ts', 'eslint.config.js'],
    languageOptions: { globals: globals.node },
  },

  {
    files: ['**/*.test.ts', '**/*.test.tsx'],
    rules: { '@typescript-eslint/no-non-null-assertion': 'off' },
  },
)
