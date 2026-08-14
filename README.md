# Jom Cuti 🌴

A one-page travel booking site for Malaysian holidays — warm sandy colours,
hibiscus red & ocean teal accents, postcard/passport-stamp style cards,
category filters, a live Google Maps view, and a booking form that sends
straight to WhatsApp or email.

You do **not** need to know how to code to update this site. Almost
everything you'd want to change lives in **one file**: `content.js`.

---

## 📁 What's in this folder

```
jom-cuti/
├── index.html        ← the page itself (you shouldn't need to touch this)
├── content.js         ← EDIT THIS for all text, prices, destinations, photos
├── css/style.css       ← the design (colours, fonts, spacing)
├── js/main.js           ← the logic (map, filters, dates, WhatsApp/email)
├── images/               ← put your destination/package photos here
└── README.md             ← you are here
```

---

## ✏️ Editing text, prices and photos

Open `content.js` in any plain text editor. Each section is labelled with
a big comment (`// DESTINATIONS`, `// PACKAGES`, etc). Change any text
inside quote marks `" "` or any plain number, save, then refresh
`index.html` in your browser.

**Golden rule:** don't remove quote marks, commas, or curly braces — as
long as you only edit the words *inside* the quotes, you can't break
anything.

### Adding a photo
1. Save the photo into `images/` (e.g. `images/langkawi.jpg`).
2. In `content.js`, set that destination's `image` field to
   `"images/langkawi.jpg"`.
3. Leave `image: ""` to keep the automatic colour-icon fallback.

### Destination categories (used by the filter buttons)
Each destination has a `category` field, e.g. `"Beach & Islands"`. The
filter bar on the site is built automatically from whatever categories
appear in `content.js` — add a new category string and a new filter
button appears on its own.

### Changing prices
Plain numbers only, e.g. `priceFrom: 320` or `price: 899` — the site adds
"RM" formatting for you.

### Turning the ad banner on/off
```js
adBanner: {
  enabled: true,   // set to false to hide it completely
  ...
}
```

### WhatsApp number and booking email
```js
site: {
  whatsappNumber: "60123456789",              // country code + number, no + or spaces
  bookingEmail: "fatihahyusoff@ai-lumina.io",   // where the Email button sends bookings
},
```

---

## 🗺️ Google Maps

Tapping a destination card or the map list loads a live embedded Google
Map centred on that place — no API key needed. Each destination also has
a "🧭 Directions" link that opens full Google Maps with turn-by-turn
directions to that spot.

## 📅 Dates & pricing

- Real calendar date pickers for departure/return.
- The return date can never be on or before the departure date.
- Nights are calculated automatically, and an estimated total price
  updates live based on destination, package, and traveller count.

## 💬📧 How booking submission works — important to understand

This is a **static website with no backend server**, so it can't silently
send data anywhere on its own. Instead:

- **Send via WhatsApp** opens WhatsApp (web or app) with the booking
  details already typed into a message to your business number.
- **Send via Email** opens the visitor's own email app (Mail, Outlook,
  Gmail desktop client, etc.) with a new message already addressed to
  `fatihahyusoff@ai-lumina.io`, subject and body pre-filled. The visitor
  just taps send.

Both require the visitor to have WhatsApp or an email app installed and
to tap send themselves — this is normal, standard behaviour for a site
with no backend, and needs no setup on your part.

**If you want bookings to be emailed to you automatically, with no action
needed from the visitor**, that requires connecting the form to a small
third-party form/email service such as:
- [Formspree](https://formspree.io) (free tier, a few lines of setup)
- [EmailJS](https://www.emailjs.com) (free tier, sends straight from
  the browser using your own email account)

Either of these needs you to create a free account and paste an API
key/form ID into `main.js` — happy to wire this up for you if you'd like
true automatic sending; just ask.

---

## 🌐 Publishing

### Option A — Netlify Drop (easiest)
Go to https://app.netlify.com/drop and drag the whole `jom-cuti` folder
onto the page. You get a live link instantly.

### Option B — GitHub Pages
Upload the *contents* of `jom-cuti/` to a GitHub repo, then enable
**Settings → Pages** with the `main` branch and `/ (root)` folder.

### Option C — Any web host
Upload the contents of `jom-cuti/` into your hosting account's
`public_html` folder so `index.html` sits directly inside it.

---

## 🎨 Colours & fonts

Near the top of `css/style.css`:
```css
:root {
  --sand: #F6E8C9;
  --hibiscus: #E0384B;
  --teal: #0E7C7B;
  --gold: #F0A83E;
  ...
}
```
Change a hex code here to update it everywhere on the site.

---

Have a great trip. Jom cuti! 🌴🏝️
