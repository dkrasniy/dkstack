# Start an app from this repo

This repo is meant to be copied. You keep the package, the shell, the lint rules and the
skills, and swap the example pages for your own.

## Prerequisites

- Node 20.19 or 22.12 and later, which Vite 8 needs, and npm

## Directions

### Step 1: Copy the repo and install

```sh
git clone https://github.com/dkrasniy/dkstack.git my-app
cd my-app
rm -rf .git && git init
npm install
```

### Step 2: Rename it

Change these to your app's name:

- `name` in `package.json`
- `<title>` and the description in `index.html`
- The letter in the logo mark, in `NavToggle` in `src/app/layout.tsx`
- The title and description on `src/features/home/Home.tsx`

The light and dark setting is saved in `localStorage` under `app:appearance`. The key is read
in two places, `src/state/appearance.ts` and the inline script in `index.html`, so if you
change it, change both. The script sets the `dark` class before React loads, which is why
there's no flash of the wrong theme.

### Step 3: Remove the examples you don't need

The Team and Settings pages are examples. To remove Team:

1. Delete `src/features/team/`, `src/routes/_app/team.tsx` and `src/api/team.ts`.
2. Delete the `team` and `directory` keys from `src/api/keys.ts`.
3. Delete its row from `EXAMPLES` in `src/app/layout.tsx`.

Settings works the same way, without the API and key steps. When both are gone, delete the
`EXAMPLES` group from the layout too.

Keep `home`, `foundations` and `components` while you build. The component docs are the
quickest way to see what's available, and they help anyone who joins later.

### Step 4: Add your first page

Create the feature, then the route that shows it.

```tsx
// src/features/projects/Projects.tsx
export function Projects() {
  return (
    <div className="mx-auto max-w-4xl px-6 py-10 md:px-10">
      <h1 className="text-2xl font-semibold">Projects</h1>
    </div>
  )
}
```

```tsx
// src/routes/_app/projects.tsx
import { createFileRoute } from '@tanstack/react-router'
import { Projects } from '@/features/projects/Projects'

export const Route = createFileRoute('/_app/projects')({
  component: Projects,
})
```

The router plugin regenerates `src/routeTree.gen.ts` when `npm run dev` or `npm run build`
runs, so the new route is typed as soon as the dev server sees the file. Then add a row to
`NAV` in `src/app/layout.tsx` with the path, a label and a hugeicons icon.

Putting the page under `_app/` gives it the sidebar layout. A route outside `_app/`, like a
sign-in page, renders on its own.

### Step 5: Add data

1. Write the request function and its query options in `src/api/`, such as
   `src/api/projects.ts`.
2. Add its cache keys to `src/api/keys.ts`. eslint rejects a `queryKey` written as an inline
   array.
3. Read it in the feature with `useQuery`. Show failures with `ErrorState` or `describeError`
   from `src/app/errors.tsx`, and add a case to `describeError` for any error your API
   returns that needs its own wording.

If a request finishes faster than its loading state can be read, wrap it in `atLeast` from
`@dkrasniy/ui/lib/timing`.

### Step 6: Check it

```sh
npm run verify
```

It typechecks, lints, checks formatting and runs the tests. The lint tests check that every
architecture rule still fires, so if you edit `eslint.config.js`, they tell you what you
broke.

## Additional resources

- [Overview](overview.md)
- [Tokens](tokens.md)
- [TanStack Router file-based routing](https://tanstack.com/router/latest/docs/framework/react/routing/file-based-routing)
