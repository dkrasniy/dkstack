# Tokens

Every design token in `packages/ui/src/styles/globals.css`, with its Tailwind class. The
Foundations page at `/foundations` renders them live in both themes.

## Colors

Each color is a CSS variable set on `:root` and again on `.dark`, and mapped to a Tailwind
color in `@theme inline`. Use the class, such as `bg-muted` or `text-subtle-foreground`, and
it follows the theme.

### Greys and surfaces

| Class suffix        | Light              | Dark               | Use                                |
| ------------------- | ------------------ | ------------------ | ---------------------------------- |
| `frame`             | `oklch(0.961 0 0)` | `oklch(0.168 0 0)` | The app background and the sidebar |
| `background`        | `oklch(0.991 0 0)` | `oklch(0.222 0 0)` | The page next to the sidebar       |
| `card`              | `oklch(1 0 0)`     | same as background | Cards                              |
| `popover`           | `oklch(1 0 0)`     | `oklch(0.252 0 0)` | Menus, popovers and dialogs        |
| `muted`             | `oklch(0.967 0 0)` | `oklch(0.285 0 0)` | Trays, skeletons, quiet fills      |
| `border`            | `oklch(0.94 0 0)`  | `oklch(0.285 0 0)` | Dividers                           |
| `foreground`        | `oklch(0.159 0 0)` | `oklch(0.943 0 0)` | Body text                          |
| `muted-foreground`  | `oklch(0.531 0 0)` | `oklch(0.725 0 0)` | Secondary text                     |
| `subtle-foreground` | `oklch(0.566 0 0)` | `oklch(0.657 0 0)` | Hints, counts, captions            |

### Brand and status

| Class suffix           | Light                         | Dark                        | Use                     |
| ---------------------- | ----------------------------- | --------------------------- | ----------------------- |
| `brand`, `ring`        | `oklch(0.5629 0.1933 256.16)` | `oklch(0.669 0.181 251.84)` | Links, focus, selection |
| `primary`              | `oklch(0.5629 0.1933 256.16)` | same                        | Primary buttons         |
| `success`              | `oklch(0.6149 0.2058 142.87)` | `oklch(0.739 0.179 148.05)` | Done, live              |
| `success-solid`        | `oklch(0.517 0.173 142.88)`   | same                        | Filled success buttons  |
| `warning`              | `oklch(0.6767 0.1971 43.92)`  | `oklch(0.862 0.151 85.01)`  | In progress, caution    |
| `attention`            | `oklch(0.907 0.167 97.42)`    | `oklch(0.363 0.071 94.64)`  | Yellow highlight badges |
| `attention-foreground` | `oklch(0.367 0.075 92.1)`     | `oklch(0.916 0.128 94.13)`  | Text on `attention`     |
| `destructive`          | `oklch(0.575 0.236 29.23)`    | `oklch(0.663 0.224 28.29)`  | Delete, errors          |
| `purple`               | `oklch(0.546 0.188 286.65)`   | `oklch(0.723 0.144 290.03)` | Reserved                |

### Aliases for shadcn

shadcn components ask for `secondary`, `accent`, `input`, `card-foreground` and the
`sidebar-*` colors. They're mapped onto the colors above in the `:root, .dark` block, so a
component added with the CLI picks up the palette without edits.

## Type

Inter Variable, from `@fontsource-variable/inter`. The default scale is cleared, so a size
outside this list produces no CSS. Tracking tightens as the size grows.

| Class       | Size      | Line height | Letter spacing |
| ----------- | --------- | ----------- | -------------- |
| `text-xs`   | 0.75rem   | 1.4         | 0              |
| `text-13`   | 0.8125rem | 1.125rem    | -0.003em       |
| `text-sm`   | 0.875rem  | 1.25rem     | -0.006em       |
| `text-base` | 1rem      | 1.5rem      | -0.011em       |
| `text-lg`   | 1.125rem  | 1.5rem      | -0.012em       |
| `text-xl`   | 1.25rem   | 1.75rem     | -0.015em       |
| `text-2xl`  | 1.5rem    | 2rem        | -0.019em       |
| `text-3xl`  | 1.875rem  | 2.25rem     | -0.021em       |
| `text-4xl`  | 2.25rem   | 2.5rem      | -0.022em       |
| `text-5xl`  | 3rem      | 1           | -0.024em       |
| `text-6xl`  | 3.75rem   | 1           | -0.026em       |
| `text-7xl`  | 4.5rem    | 1           | -0.028em       |

## Radii

The default scale is cleared too. Each radius has three values, one per corner shape.

| Class          | Round  | Soft | Sharp |
| -------------- | ------ | ---- | ----- |
| `rounded-xs`   | 6px    | 4px  | 2px   |
| `rounded-sm`   | 10px   | 6px  | 4px   |
| `rounded-md`   | 12px   | 8px  | 6px   |
| `rounded-lg`   | 16px   | 10px | 6px   |
| `rounded-xl`   | 18px   | 12px | 8px   |
| `rounded-2xl`  | 24px   | 16px | 10px  |
| `rounded-pill` | 9999px | 10px | 6px   |

`rounded-pill` is for controls that are fully round by default: buttons, inputs, tabs,
segmented controls, toggles and switches. Shapes that stay circles in every theme, like
avatars, radio dots and spinners, use `rounded-full`.

Round is the default. Soft and Sharp apply wherever `data-shape="soft"` or
`data-shape="sharp"` is set. The Display page in the account menu sets it on `<html>` and
saves the choice under `app:shape`. To ship one shape, put the attribute on `<body>` in
`index.html` and remove the Corners group from the Display page.

## Shadows

`shadow-card`, `shadow-btn`, `shadow-input`, `shadow-focus`, `shadow-invalid`,
`shadow-float`, `shadow-overlay` and `shadow-solid`. Each one has a light and a dark value.

## Easings

| Class         | Value                                                         |
| ------------- | ------------------------------------------------------------- |
| `ease-smooth` | `cubic-bezier(0.22, 1, 0.36, 1)`                              |
| `ease-settle` | a `linear()` spring that overshoots 1.5% and settles in 480ms |
| `ease-bounce` | a `linear()` spring that overshoots 12.6%, made for 450ms     |

`cn` from `@dkrasniy/ui/lib/utils` knows these, along with the custom shadows and `text-13`,
so a later class replaces an earlier one: `cn('ease-smooth', 'ease-settle')` keeps
`ease-settle`.

## Animations

| Class                  | What it does                                   |
| ---------------------- | ---------------------------------------------- |
| `animate-rise-in`      | Fades in and rises 2px over 180ms              |
| `animate-pop-in`       | Fades in and rises 4px over 200ms              |
| `animate-dissolve-in`  | Fades in from 97% scale over 150ms, after 25ms |
| `animate-dissolve-out` | Fades out over 100ms                           |
| `animate-panel-in`     | Fades in over 180ms, after 30ms                |
| `animate-panel-out`    | Fades out over 120ms                           |
| `animate-sheet-up`     | Slides up from the bottom over 360ms           |
| `animate-sheet-down`   | Slides down out of view over 290ms             |
| `animate-shimmer`      | Sweeps a highlight across text every 1.8s      |
| `animate-dots`         | Pulses the working dots every 1.2s             |

`fade-up` is a plain keyframe for staged entrances. Use it as
`animate-[fade-up_520ms_cubic-bezier(0.22,1,0.36,1)_both]` with an `animation-delay` per
item.
