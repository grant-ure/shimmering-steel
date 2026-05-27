# Shimmering Steel

Static site for the Shimmering Steel Thames boat-share syndicate, built with
[Eleventy](https://www.11ty.dev/) and edited through
[Decap CMS](https://decapcms.org/) with Netlify Identity login.

## Local development

```bash
npm install
npm run serve     # live-reload dev server at http://localhost:8080
npm run build     # one-off production build into _site/
```

## How the site is structured

| Path | Purpose |
| --- | --- |
| `src/index.njk` | The single page. Renders CMS-managed sections, then the static sections. |
| `src/content/*.md` | One file per CMS-managed section (front matter + body text). |
| `src/_data/site.json` | Site-wide values (title, hero text, footer). |
| `src/css/styles.css` | All styles. |
| `src/js/main.js` | Nav switching, gallery/lightbox, contact form. |
| `images/` | Image library (also the CMS media folder). |
| `admin/` | Decap CMS — `index.html` loads it, `config.yml` defines the editable fields. |
| `_site/` | Build output (git-ignored). |

The site is a single page; the nav switches between sections client-side.

### Migration status

This is an in-progress migration. **Home** is fully CMS-managed (body text,
gallery images, and a Single/Two-column layout option). The other five sections
(The Boat, The Syndicate, The Costs, Alternatives, Contact) are still static
HTML in `src/index.njk` and will be converted to CMS content next.

## One-time Netlify setup (done in the Netlify dashboard)

The CMS needs Netlify to host the site and handle editor login. Do this once:

1. **Create the site:** Netlify → *Add new site* → *Import from Git* → pick the
   `grant-ure/shimmering-steel` repo. Build settings come from `netlify.toml`
   automatically (build `npm run build`, publish `_site`).
2. **Enable Identity:** Site configuration → *Identity* → *Enable Identity*.
3. **Invite-only registration:** Identity → *Registration* → set to
   **Invite only** (matches the small, hand-picked editor group).
4. **Enable Git Gateway:** Identity → *Services* → *Git Gateway* → *Enable*.
   This lets the CMS commit content changes back to GitHub.
5. **Invite editors:** Identity → *Invite users* → enter each editor's email.
   They get an email, set a password, and land in the CMS.

Editors then log in at **`https://<your-site>.netlify.app/admin/`**.

> Note: `admin/config.yml` has `backend.branch: main`, so CMS edits commit to
> `main`. Keep that in sync with whichever branch Netlify deploys from.

## Adding or editing content

- **Editors:** use `/admin/` — no code or Git needed. Saving commits to GitHub
  and Netlify rebuilds the site within a minute or two.
- **Developers:** edit the files under `src/` directly and push.
