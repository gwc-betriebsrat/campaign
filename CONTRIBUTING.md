# Contributing to the GWC Campaign Website

Welcome! This guide will walk you through everything you need to know to make changes to the GWC campaign website — even if you've never touched code in a version control system before.

---

## What is this website, and where does it live?

The campaign website is a set of HTML files hosted on **GitHub Pages** — a free hosting service by GitHub. When someone saves a change here, it automatically becomes live on the web within a minute or two.

The website is embedded inside **zLife** (our company intranet, powered by Haiilo) using an iframe widget. So when colleagues click on the GWC page in zLife, they're actually viewing this website inside a small frame.

**The GitHub repository (repo) is the source of truth for everything on the site.**

---

## Step 1 — Get access to the repository

The repo is at:

> **https://github.com/gwc-betriebsrat/campaign**

You'll need a GitHub account. If you don't have one:
1. Go to [github.com](https://github.com) and sign up (it's free).
2. Share your GitHub username with the team admin so they can add you as a collaborator.

Once added, you'll be able to read and edit files directly in the browser — no software to install.

---

## Step 2 — Understand the project structure

```
gwc/
├── CONTRIBUTING.md          ← You are here
├── shared/
│   └── _shared.css          ← Shared styles (colours, fonts, card layouts)
└── pages/
    ├── who-we-are/          ← Candidate list, team story, regions, ERGs
    ├── mission/             ← Our mission and 3 core principles (EN + DE)
    ├── commitment/          ← 4 commitments + 10 beliefs
    ├── values/              ← 6 core values
    ├── join/                ← Volunteer sign-up + feedback forms
    ├── accomplishments/     ← Track record (work in progress)
    └── meet-the-team/       ← Placeholder template (not in active use)
```

Each page folder contains an `index.html` file — that's the actual page — and a `README.md` that explains what's on it and how to edit it.

---

## Step 3 — Making a simple edit (no software needed)

For text changes, you can edit directly in the GitHub web interface:

1. Go to the repo: **https://github.com/gwc-betriebsrat/campaign**
2. Navigate to the file you want to change (e.g. `pages/commitment/index.html`)
3. Click the **pencil icon** (✏️) in the top-right of the file view
4. Make your changes
5. Scroll to the bottom — you'll see a **"Commit changes"** box
6. Write a short description of what you changed (e.g. `Update commitment #3 description`)
7. Click **"Commit changes"**

That's it. The site updates automatically within about 60 seconds.

> **Tip:** If you're unsure about a change, use the **"Preview"** tab in the editor to see a basic rendering before committing.

---

## Step 4 — Understanding the HTML (just enough)

You don't need to know how to write HTML from scratch. The files follow a very consistent pattern. Here's what you'll encounter:

### Text content
```html
<p>This is a paragraph of text.</p>
<h2>This is a heading</h2>
<h3>This is a sub-heading</h3>
```
Just change the text between the tags. Don't touch the tags themselves.

### Bold / coloured text
```html
<strong>This text is bold</strong>
<strong style="color:var(--red);">This text is red and bold</strong>
```

### Links
```html
<a href="https://example.com">Click here</a>
```
To update a link, change the URL inside the quotes after `href=`.

### Lists
```html
<ul>
  <li>First item</li>
  <li>Second item</li>
</ul>
```

### Candidate cards
There are two kinds. One **without** a link (no article yet):
```html
<div class="team-card">
  <div class="team-avatar">AB</div>
  <div class="team-name">Alex Bauer</div>
  <div class="team-role">Senior Engineer</div>
</div>
```
And one **with** a link and photo (article published on zLife):
```html
<a class="team-card" href="https://zlife.zalando.net/...article-url..." target="_top">
  <div class="team-avatar"><img src="https://zlife.zalando.net/...photo-url..." alt="Alex Bauer" /></div>
  <div class="team-name">Alex Bauer</div>
  <div class="team-role">Senior Engineer</div>
  <div class="team-link-hint">Get to know me ↗</div>
</a>
```
See the [who-we-are README](pages/who-we-are/README.md) for full instructions on updating candidates.

---

## Step 5 — Things to be careful about

| Do | Don't |
|----|-------|
| Change text between tags | Delete or rename the tags themselves |
| Copy an existing card and edit it | Change CSS class names |
| Keep the same indentation style | Remove `</div>` or `</a>` closing tags |
| Test after each change | Make 10 changes at once without testing |

### Checking your change is live
After committing, wait ~60 seconds, then open the zLife GWC page and hard-refresh (`Ctrl+Shift+R` on Windows, `Cmd+Shift+R` on Mac).

### If something breaks
Go to the repo → click **"History"** on the file → find the last good version → click **"..."** → **"Revert"**. Or ask a team member for help.

---

## Step 6 — For more complex changes

Some things are better done with a proper code editor installed locally (like VS Code). These include:
- Adding a new page
- Changing the shared design (colours, fonts, card layouts)
- Updating the candidate list in bulk

For these, ask someone comfortable with git on the team to help, or refer to the relevant page README below.

---

## Page READMEs

Each page has its own README with specific instructions:

| Page | What you can edit |
|------|-------------------|
| [who-we-are](pages/who-we-are/README.md) | Candidate list, story text, regions, ERGs |
| [mission](pages/mission/README.md) | Mission statement, 3 principles (EN + DE) |
| [commitment](pages/commitment/README.md) | 4 commitments, 10 beliefs |
| [values](pages/values/README.md) | 6 value cards |
| [join](pages/join/README.md) | Form options, department list |
| [accomplishments](pages/accomplishments/README.md) | Timeline milestones |

---

## Colours and brand

All brand colours are defined in `shared/_shared.css` as named variables:

| Variable | Value | Used for |
|----------|-------|----------|
| `--red` | `#b22222` | Primary brand colour |
| `--red-light` | `#f7e8e8` | Card backgrounds, icon fills |
| `--dark` | `#1a1a1a` | Main text |
| `--muted` | `#777` | Secondary/hint text |
| `--border` | `#e8e8e8` | Card borders, dividers |

To use the brand red in inline styles, write: `style="color:var(--red);"` — never hardcode `#b22222` directly in a page file.

---

## Questions?

Open an **Issue** in the GitHub repo (the "Issues" tab at the top) and tag the relevant person. That keeps all decisions documented and visible to the whole team.
