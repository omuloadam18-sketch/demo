# Loving Blooms Academy — Website

A multi-page, interactive website for Loving Blooms Academy, a growing
CBC school in Embakasi, Fedha Kwa Ndege, Nairobi (Pre-Primary – Grade 6).

## Folder structure

```
LovingBloomsAcademy/
├── html/
│   ├── index.html         Home page (hero, growth path, why-us, stats)
│   ├── about.html         About page — has its own swappable background image
│   ├── facilities.html    Facilities list + Photo Gallery
│   ├── contact.html       Contact page with working inquiry form
│   └── location.html      Map + directions to the Embakasi campus
├── css/
│   └── style.css          All styling: blue + red theme, dark/light mode, animations
├── js/
│   ├── main.js             Navigation, dark/light toggle, scroll animations, data loader
│   ├── gallery.js          Renders + filters the photo gallery, lightbox viewer
│   └── contact.js          Validates and submits the contact form
├── api/
│   └── contact-api.js      Bridges the contact form to a Google Apps Script "API"
├── googlestorage/
│   └── gallery-config.js   <-- ADD YOUR SCHOOL PHOTOS HERE (see instructions inside)
├── data/
│   └── school-data.json    Site "database": stats, contact info, facility list
└── assets/images/          Local images (e.g. about-hero.jpg)
```

## How to open the site

Because a couple of pages load `data/school-data.json` via `fetch()`,
opening `index.html` directly by double-clicking it may block that one
feature in some browsers (a `file://` security restriction) — everything
else (nav, dark mode, form, gallery) still works fine either way.

For the smoothest experience, serve the folder with any simple local
server, for example (from inside the `LovingBloomsAcademy` folder):

```
python3 -m http.server 8000
```

Then open `http://localhost:8000/html/index.html`.

## 1. Adding your gallery photos (Google Storage)

Open `googlestorage/gallery-config.js` — full step-by-step instructions
are written inside as comments, covering both:
- **Google Cloud Storage** (a public bucket + `storage.googleapis.com` URLs), and
- **Google Drive** (simpler, share-link based) as an easier alternative.

You only ever need to edit that one file to add, remove, or re-caption
photos on the Facilities page.

## 2. Making the contact form actually deliver messages

The form works out of the box in "demo mode" (validates and shows a
success message). To make it truly send inquiries somewhere you can
read them, open `api/contact-api.js` and follow the 4-step setup:
it uses a free **Google Apps Script Web App** to write every inquiry
as a new row into a Google Sheet — effectively a free, no-hosting
database of inquiries.

## 3. About the "Power Query" request

Power Query is an Excel/Power BI data tool, not something that runs
inside a website — it lives in Excel, not in a browser. What this
project gives you instead is `data/school-data.json`, a clean,
structured data file that:

- the website itself reads to populate stats and facility cards, **and**
- you can also pull straight into Excel for reporting using Power Query:
  in Excel, go to **Data → Get Data → From File → From JSON** (or
  **From Web** if you host the file online) and point it at
  `data/school-data.json`. Power Query will load it as a table you can
  refresh any time the file changes.

If you'd instead like Power Query to pull from a live Google Sheet
(e.g. the inquiries sheet from step 2 above), use **Data → Get Data →
From Web** in Excel and paste the Sheet's published CSV link.

## 4. Changing the About page background image

See `assets/images/README.txt` — drop a photo in as `about-hero.jpg`
and it appears automatically; no code edits required.

## Theme

- Primary blue: `#154C8C` / deep navy `#0B2C5C`
- Accent red: `#D62828`
- Dark mode toggle (🌙 / ☀️ button in the nav) — preference is
  remembered per-browser via `localStorage`.

## Office contact details (already wired into the site)

- Phone: **+254 726 381 944**
- P.O. Box: **525285-00100, Nairobi**
- Campus: **Embakasi, Fedha Kwa Ndege, Nairobi**
