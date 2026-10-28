---
name: write-docs
description: Write or revise a README or a page in docs/ so a capable engineer who hasn't seen the code can follow it on the first read. Covers page types, page structure, sentence rules and accuracy checks. Use whenever you write or edit a README or anything in docs/.
---

# Write docs

The reader is a capable engineer who hasn't seen this code. Tell them what it does, why it
works that way and what to do, in that order.

Read the code before you write about it. Every claim has to match the code as it is now.

## Pick the page type first

Every page is exactly one type. Don't mix them.

| Type       | What it does                         | Shape                                                                                                      | In this repo           |
| ---------- | ------------------------------------ | ---------------------------------------------------------------------------------------------------------- | ---------------------- |
| README     | Says what it is and how to start     | Two or three sentences on what it is, what it produces, the shortest way to run it, then links             | `README.md`            |
| Conceptual | Explains how something works and why | Scope line, the bigger picture, then sections. No steps                                                    | `docs/overview.md`     |
| How-to     | Gets one task done                   | Title that reads after "How to", a short intro, Prerequisites, Directions as `### Step 1: …` with one action each | `docs/start-an-app.md` |
| Reference  | Gets looked up, not read through     | A one-line intro, then tables and exact lists                                                              | `docs/tokens.md`       |

A package usually needs a README, then a `docs/` folder with one overview, one how-to per
common task and one reference page.

## Page structure

- The title is the only H1. Use H2 for sections and H3 for parts, all in sentence case.
- Open a conceptual page with an italic scope line that points elsewhere for detail:
  _This is a high-level look at X. For every option, see [the reference](reference.md)._
- Put concepts before procedures. Question headings work well on conceptual pages: "Why
  can't the package fetch or route?"
- For anything that writes files, show a `text` directory tree.
- For command output, paste a real run and explain the lines that matter. Show a second run
  as a `diff` when you're comparing.
- Show a restriction as a rule sentence, then a pair of examples marked `// OK:` and
  `// Doesn't work:` with the reason, then what to do instead.
- Use `> **Note:**` only for the one thing the reader would otherwise get wrong.
- End conceptual pages and how-tos with "Additional resources". Link text says where it
  goes, never "here".

## Sentences

- Write to "you", in present tense and active voice: "The router writes…", not "Files are
  written…".
- Keep paragraphs to one to four sentences, one idea each.
- Put the reason in the same sentence as the fact: "A signed URL expires, so it can't go
  into a built page."
- Italicize a term the first time you define it, in plain words.
- Use real names, numbers and output: "a 1600px image becomes 640, 828, 1080 and 1600",
  not "various sizes".
- Say what happens when something goes wrong: what's reported, what's skipped and what the
  reader sees.
- State a limit with its workaround: "Browsers don't run modules from disk. Serve the site
  over HTTP."
- Put the condition first when the reader may not need the sentence: "If you know where
  the site is served, pass `--base-path`."
- Use contractions.
- No comma before "and" or "or" in a list: "styles, fonts and images".
- Bullets are for parallel items. Start each with the thing it describes.

## Never

- "easy", "simple", "simply", "just", "obviously", "of course", "note that", "it's worth
  noting"
- Openers that announce the page: "In this section we will…", "This document describes…"
- Restating the heading in the first sentence
- Em dashes. Use a period, a comma or a colon.
- Metaphors, marketing words ("powerful", "seamless", "blazing"), exclamation marks and
  emojis
- Hedges like "might possibly" or "in some cases". Say when it applies.
- Bold for emphasis inside a sentence. Bold is only for a label at the start of a bullet.

## Accuracy

- If you haven't checked a claim against the code or a real run, check it or leave it out.
- One exact example beats an abstract description.
- Each fact lives on one page. Link to it instead of repeating it.
- When code changes, reread the docs that describe it. A doc that describes the old
  behavior is a bug.

## Before you finish

Reread each page as a newcomer:

1. Does the first paragraph say what this is and why the reader would care?
2. Could they follow every step without asking a question?
3. Does any sentence break a rule under Never?
4. Is every claim true of the code right now?
