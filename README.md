# EasyDoc Frontend (HTML/CSS/JS)

No Node.js or npm is required.

## Files
- `index.html` : Landing page with login modal
- `dashboard.html` : Dashboard page
- `documents.html` : Incoming documents list + multi-step create modal
- `documents-completed.html` : Outgoing/completed documents list
- `document-review.html` : Document detail and approval page
- `styles.css` : Shared styles
- `app.js` : Login modal + wizard modal + success popup interactions

## Run
1. Open `index.html` in your browser.
2. Click `Нэвтрэх` to open the modal.
3. Click modal `Нэвтрэх` to go to `dashboard.html`.
4. Use sidebar links to open the next pages.

## Optional asset
If you have a hero PNG from your design, place it at:
- `public/assets/hero-illustration.png`

If the PNG is missing, the page uses CSS fallback visuals.

## Icons
The pages use Bootstrap Icons via CDN:
- `https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.min.css`
