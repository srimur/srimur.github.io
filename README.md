# srimur.xyz — portfolio + notebook

A static site built with [Eleventy](https://www.11ty.dev/). The design is unchanged
from the hand-coded version; Eleventy only assembles the pages so you can write posts
in Markdown and get an RSS feed for free.

## Writing a new note

1. Add a Markdown file in `src/notes/posts/`, e.g. `my-new-note.md`:

   ```markdown
   ---
   title: My new note
   date: 2026-07-02
   kind: note        # note | essay | article  (shows as the small tag)
   readtime: 3 min
   ---

   Write here in plain Markdown. `##` for a subheading, `>` for a quote,
   `- ` for a list, `[text](url)` for a link.
   ```

2. That's it — the homepage ledger and the RSS feed update themselves on the next build.
   The post appears at `/notes/my-new-note.html`.

Want a Tufte sidenote in a post? Drop this inline in a paragraph:

```html
<label for="sn-x" class="margin-toggle sidenote-number"></label><input type="checkbox" id="sn-x" class="margin-toggle"><span class="sidenote">Your note text.</span>
```

(Use a unique id each time: `sn-1`, `sn-2`, …) See `commonplace-book.md` for a worked example.

## Preview locally

```bash
npm install      # first time only
npm start        # serves at http://localhost:8080 with live reload
```

## Build

```bash
npm run build    # outputs the finished site into _site/
```

## Publishing (GitHub Pages, free)

This repo includes a workflow at `.github/workflows/deploy.yml`. Once set up, every
`git push` to `main` rebuilds and deploys automatically.

1. Push this project to a GitHub repo named `srimur.github.io`.
2. In the repo: **Settings → Pages → Build and deployment → Source: GitHub Actions**.
3. Add your real photo as `src/portrait.jpg` (replacing the placeholder) and edit your
   about text in `src/index.njk`.
4. Point `srimur.xyz` at GitHub in Porkbun's DNS panel. The `src/CNAME` file (already set
   to `srimur.xyz`) ships in the build, so the custom domain sticks.

You never have to touch HTML to publish — just write Markdown and push.
