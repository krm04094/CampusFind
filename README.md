# CampusFind — Lost & Found Portal

A responsive static website for campus lost-and-found reports.

## Files
- `index.html` — page structure and report form
- `styles.css` — responsive styling
- `script.js` — sample listings, search, filters, and browser-local posting

## Run locally
Open `index.html` in a browser, or serve the folder:
- Python: `python -m http.server 8080`
- Visit `http://localhost:8080`

## Deploy free as a static site
### GitHub Pages
1. Create a GitHub repository named `campusfind`.
2. Upload `index.html`, `styles.css`, and `script.js` to the repository root.
3. Open **Settings → Pages**.
4. Under **Build and deployment**, choose **Deploy from a branch**, select `main` and `/ (root)`, then Save.
5. Wait for the published URL shown on the Pages settings screen.

Alternative: drag the folder into Netlify Drop, or import the repository into Netlify/Vercel.

## Important limitation
This is a front-end demo. New listings are saved only in the browser that created them using localStorage; they are not shared across students or devices. Contact buttons for sample listings show a demo message. A real campus-wide portal needs a backend/database, moderation, and a safe contact workflow. Do not use real student personal data in the demo.
