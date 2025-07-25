# Hunter Menu - Digital Carenderia Menu Board

A modern, responsive digital menu board for Filipino carenderias with daily editing capabilities.

## Features

- ✅ **Digital Menu Board** - Professional menu display with Hunter Menu branding
- ✅ **Daily Editor** - Easy-to-use interface for updating menu items
- ✅ **Mobile Responsive** - Works perfectly on phones, tablets, and desktops
- ✅ **Image Export** - Download menu as high-quality image for social media
- ✅ **Persistent Storage** - Menu items saved locally in browser
- ✅ **Editable Sections** - Customize section titles (Ulam ng Araw, etc.)

## Live Demo

🌐 **[https://menuhunter.vercel.app](https://menuhunter.vercel.app)**

## Business Information

- **Contact:** +63 915 686 7134
- **Location:** Arezzo Place Condominium Pasig, Philippines
- **Hours:** Monday - Saturday (7:00 am - 9:00 pm)

## How to Use

1. **Edit Menu Items** - Use the Daily Menu Editor section
2. **Update Sections** - Change "Ulam ng Araw" and "Kanin at Inumin" titles
3. **Add/Remove Items** - Click + ADD buttons or remove unwanted items
4. **Update Menu** - Click "UPDATE MENU" to apply changes
5. **Download Image** - Click "DOWNLOAD IMAGE" for social media sharing

## Local Development

```bash
# Start local server
python -m http.server 8000

# Open browser
http://localhost:8000
```

## Deployment to Vercel

This project is configured for easy Vercel deployment:

1. **Push to GitHub** (if not already done)
2. **Connect to Vercel** - Import your GitHub repository
3. **Deploy** - Vercel will automatically deploy
4. **Custom Domain** - Set up menuhunter.vercel.app in Vercel dashboard

## File Structure

```
menuapp/
├── index.html              # Main HTML file
├── css/
│   ├── style.css          # Base styles
│   ├── menu-board.css     # Menu board styling
│   └── responsive.css     # Mobile responsive styles
├── js/
│   ├── menu-manager.js    # Menu management logic
│   ├── editor.js          # Menu editing functionality
│   └── social-share.js    # Image export functionality
├── Asset/
│   └── hunter menu.jpg    # Logo image
├── data/
│   └── menu-data.json     # Sample menu data
├── vercel.json            # Vercel configuration
└── package.json           # Project metadata

```

## Technology Stack

- **Frontend:** Vanilla HTML, CSS, JavaScript
- **Styling:** CSS Grid, Flexbox, Mobile-first responsive design
- **Image Export:** html2canvas library
- **Deployment:** Vercel static hosting
- **Storage:** LocalStorage for persistence

## License

MIT License - Feel free to use and modify for your business needs.

---

**Built for Hunter Menu Carenderia** 🍽️