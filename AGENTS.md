# Agent notes

This repo publishes static checklist pages. `node scripts/build.js` rewrites `examples/*/checklist.html` and `checklist.txt` from `questions.json`, `tasks.json`, and `src/checklist.template.html`. Opening a page does not build anything. There is no `dist/` step.

## Before finishing

From the repository root, with Node.js 22 or newer:

```bash
npm install
npm run check
```

`npm run check` is the single check. It formats, lints, typechecks, spellchecks, validates HTML, CSS, links, and the GitHub Actions workflow, runs the tests with coverage floors, checks the size budget, rebuilds the pages, and runs the browser smoke test. CI runs that same command.

`npm run format` rewrites formatting. `node scripts/build.js` then `node scripts/serve.js 8000` serves the site at http://127.0.0.1:8000/.

## Rules

- Keep it simple, with no new build step.
- Don't add a dependency without a stated reason.
- Keep archived content.
- Every bug fix gets a test.
- Never lower the coverage floor or the size budget. The coverage floors are the `--test-coverage-*` flags in `scripts/check.js`. The size budget is the byte ceiling in `size-budget.txt` for `index.html`, `llms.txt`, `README.md`, `lib/`, and `examples/`.
- Don't make visible UI changes unless asked.
- Keep existing URLs working, including `lib/css/bootswatch.css` and every example `checklist.html`.

## Why these tools are installed

- `typescript` typechecks the JavaScript with `tsc --noEmit` and `checkJs`.
- `eslint` and `prettier` check the JavaScript and formatting.
- `stylelint` checks `lib/css/checklist.css`. `lib/css/bootswatch.css` is the used subset of Bootswatch 3.3.2 and is left as published so the pages look the same.
- `html-validate` checks the HTML pages with the recommended rules, except the submit-button rule, the radio `autocomplete` rules, and void-tag style. The questions are radio groups without a submit button, `autocomplete="off"` keeps the browser from restoring answers, and void tags are valid either way. `linkinator` checks their links.
- `codespell` (in `requirements.txt`) spellchecks the repo except `examples/`, which is checklist wording.
- `lefthook` installs the pre-commit hook in `lefthook.yml`. The hook runs the fast checks: Prettier, ESLint, Stylelint, html-validate, `tsc`, and codespell.
- `actionlint` is downloaded by `npm run check` at the version pinned in `scripts/check.js`. It is not an npm package.

## CI

`.github/workflows/ci.yml` checks out the repo, installs Node.js 22, Chrome, and the npm dependencies, then runs `npm run check`. The token can read repository contents and nothing else. Dependabot updates npm, pip, and GitHub Actions weekly, with one grouped pull request per ecosystem.
