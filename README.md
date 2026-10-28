# dkstack

dkstack is a React app starter built on `@dkrasniy/ui`, the component library in
`packages/ui`. It comes with TanStack Router, TanStack Query, a feature-folder layout, strict
lint rules and Claude skills already set up, plus a docs page for every component with its
import line and code.

The architecture is enforced, not described. When code breaks a rule, lint fails with a
message that says what to do instead. An agent keeps fixing until `npm run verify` passes, so
nobody has to remember the rules, and no prompt has to repeat them.

## Start a new app

```sh
git clone https://github.com/dkrasniy/dkstack.git my-app
cd my-app
rm -rf .git && git init
npm install
npm run dev
```

Open http://localhost:5173. The sidebar has Home, Components, Foundations and two example
pages, Team and Settings. To make it your own, follow
[Start an app from this repo](docs/start-an-app.md).

## Layout

```text
.claude/skills/        standards Claude follows, loaded when they apply
docs/                  overview, how-to and token reference
packages/ui/           @dkrasniy/ui: components, styles, lib and hooks
src/
  api/                 request functions, query options, cache keys
  app/                 providers, the sidebar layout, the account menu, error screens
  features/            one folder per page: home, foundations, components, team, settings
  routes/              TanStack Router file routes
  state/               zustand stores
eslint.config.js       the architecture's boundaries, tested in eslint.config.test.ts
```

## What lint enforces

| Rule                                                                              | Instead                                          |
| --------------------------------------------------------------------------------- | ------------------------------------------------ |
| `packages/` can't import the app, a router or a data layer.                       | Take data as props and report through callbacks. |
| A feature can't import another feature or a route.                                | Move shared code to `src/api` or the package.    |
| Stores in `src/state/` can't import features or routes.                           | Keep stores below the code that reads them.      |
| Only `src/config.ts` reads `import.meta.env`.                                     | Import `config`.                                 |
| A query key can't be an inline array.                                             | Build it with `keys` from `src/api/keys.ts`.     |
| JSX can't render `error.message`.                                                 | Use `describeError` from `src/app/errors.tsx`.   |
| `motion`, `framer-motion`, `react-spring`, `gsap` and `lucide-react` are blocked. | Animate with CSS. Use hugeicons.                 |

`eslint.config.test.ts` checks that every rule still fires, since a broken eslint config
still exits 0.

## Commands

| Command             | What it does                                                 |
| ------------------- | ------------------------------------------------------------ |
| `npm run dev`       | Starts Vite on port 5173.                                    |
| `npm run build`     | Typechecks, then builds into `dist/`.                        |
| `npm run verify`    | Typecheck, lint, format check and tests. Run it before a PR. |
| `npm run typecheck` | Runs `tsc -b`.                                               |
| `npm run lint`      | Runs eslint.                                                 |
| `npm run format`    | Runs prettier over the repo.                                 |
| `npm test`          | Runs vitest, including the tests for the lint rules.         |

To add a shadcn primitive, run `npx shadcn@latest add <name>` from `packages/ui/`. It writes
into `packages/ui/src/components/` with the `base-luma` style. Then add its docs page in
`src/features/components/entries/`.

## Skills

`.claude/skills/` holds the standards Claude follows in this repo. `CLAUDE.md` says when
each one applies.

- **better-ui**, **better-layout**, **better-typography**, **better-colors**,
  **better-accessibility** and **better-writing** cover building and reviewing UI.
  **better-interface** runs all six as one review.
- **interface-review** reviews a branch or PR, and **break** stress tests a component. Run
  them with `/interface-review` and `/break`.
- **principle-test-behavior-not-implementation** and **tdd** keep tests few and useful.
- **write-docs** covers the README and everything in `docs/`.

## Docs

- [Overview](docs/overview.md): how the package, the app, the component docs and the lint
  rules fit together.
- [Start an app from this repo](docs/start-an-app.md): rename it, remove the examples and
  add your first page.
- [Tokens](docs/tokens.md): every color, type size, radius, shadow and easing, and the
  three corner shapes.
