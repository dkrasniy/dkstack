# Overview

_This is a high-level look at how the repo fits together. For every token, see
[tokens.md](tokens.md)._

The repo holds two things: a component library and an app. The library, `@dkrasniy/ui`, is
an npm workspace package in `packages/ui`. The app in `src/` uses it, has a docs page for every
component and comes with example pages. When you start a new app, you keep both and
replace the example pages with your own.

## What's in the package?

`packages/ui/src` has four folders:

- `components/` holds one file per component. Most started from the shadcn CLI with the
  `base-luma` style and were restyled. The rest, like `morph-menu`, `confirm-button`,
  `steps` and `setup-screen`, are patterns pulled out of real features.
- `styles/globals.css` holds every token, keyframe and base style. The app imports it once
  from `src/index.css`.
- `lib/` holds `cn` for merging classes, `timing` for minimum durations and `format` for
  dates.
- `hooks/` holds `useIsMobile`.

Components import each other by package path, like `@dkrasniy/ui/components/button`, so a
file reads the same in the package and in the app. The package is built on base-ui
primitives and uses hugeicons for icons.

## Why can't the package fetch or route?

The package takes data as props and reports changes through callbacks. That's enforced:
eslint rejects `@tanstack/react-query`, `@tanstack/react-router` and any import from `src/`
inside `packages/`. So a component can't depend on one app's API or URLs, and you can drop
the package into another app without bringing this one along. `MorphMenu`, for example,
renders whatever pages you give it, and the app's account menu decides what goes in them.

## How is the app laid out?

```text
src/
  api/          request functions, query options, cache keys and error classes
  app/          the shell: providers, layout, account menu, error screens
  features/     one folder per page or area
  routes/       file routes for TanStack Router, each a few lines
  state/        small zustand stores, like the light and dark setting
  config.ts     the only file that reads import.meta.env
  main.tsx
```

A route file only wires a URL to a feature. The feature holds the page. Features can't
import each other, so shared code moves down into `src/api`, `src/state` or the package.

The examples are features too: `home`, `foundations`, `components`, `team` and `settings`.
`team` runs against a fake API in `src/api/team.ts` with real latency, so you can see the
loading, empty and error states without a backend.

## How does a component get its docs page?

Each file in `src/features/components/entries/` exports an `entry` with a title, a group, the
import line, guidance and examples. `registry.ts` collects them with `import.meta.glob`, so
adding a file adds a page at `/components/<slug>`. There's no list to update.

## Why are the rules lint errors?

A rule written in a doc or a prompt depends on someone reading it and remembering it. A
lint error doesn't. When code breaks a rule, `npm run verify` fails and the message says
what to do instead, so an agent that runs it keeps fixing until the code fits. That's why
`AGENTS.md` lists the rules under "enforced, not remembered" and asks that none be
silenced with an eslint-disable.

## What do the lint tests do?

A broken eslint config still exits 0, so a rule can stop working without anyone noticing.
`eslint.config.test.ts` writes a file that breaks each rule, lints it and checks that the
rule fired. `npm test` runs it with the other tests.

## Additional resources

- [Start an app from this repo](start-an-app.md)
- [Tokens](tokens.md)
