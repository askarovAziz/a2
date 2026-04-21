# AMARA - Complete Pages Setup Guide

## 📁 Project Structure

Your project now includes the following pages:

### Main Pages (All with Dark Theme, Luxurious Design)

1. **index.html** - Main homepage (DO NOT MODIFY - your original page)
2. **gallery.html** - Image gallery with lightbox modal
3. **services.html** - Services/Rituals showcase with filtering
4. **blog.html** - Blog articles with cards layout
5. **therapists.html** - Team showcase with amazing slider
6. **contact.html** - Contact form and information
7. **privacy.html** - Privacy Policy
8. **terms.html** - Terms & Conditions

### Supporting Files

- **styles.css** - Main stylesheet (your original)
- **pages.css** - Additional styling for new pages
- **pages.js** - JavaScript for all interactive features
- **footer.css** - Footer styling (shared across all pages)
- **footer.html** - Footer component (copy to each page)

## 🎨 Design Features

All new pages follow the AMARA design system:

✨ **Dark Mode Premium Aesthetic**
- Luxurious gold/bronze accents on dark backgrounds
- Smooth animations and transitions
- Elegant typography using Cormorant Garamond
- Professional hover effects
- Mobile-responsive design

🎬 **Interactive Features**
- Therapists page: Beautiful slider with keyboard navigation
- Gallery page: Lightbox modal with prev/next controls
- Services page: Filter functionality for categories
- Contact page: Form validation and success messages
- All pages: Smooth scroll animations

## 📝 How to Use

### Step 1: Add Footer to Each Page

Copy the entire `<footer>` element from `footer.html` and paste it at the bottom of each HTML page (before `</body>`).

```html
<!-- At the end of each page, before </body> -->
<footer class="footer">
  <!-- Footer content here -->
</footer>
```

### Step 2: Link CSS Files

Add these links to the `<head>` of each page:

```html
<link rel="stylesheet" href="styles.css">
<link rel="stylesheet" href="pages.css">
<link rel="stylesheet" href="footer.css">
```

### Step 3: Link JavaScript

Add this before `</body>` on each page:

```html
<script src="pages.js"></script>
```

### Step 4: Update Navigation Links

The header navigation has been updated to link to all pages. Update the navigation links in your header to match (or use the updated index.html as reference).

## 🎯 Features by Page

### Gallery Page
- Click any image to open lightbox
- Navigate with arrow keys or buttons
- Close with ESC key or clicking background
- Responsive grid layout (changes from 2 to 4 columns based on screen size)

### Services Page
- Filter services by category (All, Massage, Spa, Wellness)
- Beautiful card design with hover effects
- Icons and descriptions for each service
- Smooth filtering animations

### Blog Page
- Blog post cards with featured images
- Category tags
- Read more links
- Latest posts highlighted
- Responsive grid

### Therapists Page
- Main feature: Beautiful slider with smooth transitions
- Keyboard navigation (arrow keys)
- Click indicators to jump to specific therapist
- Professional profiles with specialties
- Smooth animations

### Contact Page
- Contact form with validation
- Newsletter subscription form
- Contact information display
- Location map placeholder
- Form success messages

### Policy Pages (Privacy & Terms)
- Clean, readable layouts
- Easy to scan with clear sections
- Professional styling
- Mobile-friendly

## 🚀 Customization

### Change Colors

Edit the CSS variables in `pages.css` or `footer.css`:

```css
--gold-primary: #B8866B;    /* Main accent color */
--gold-light: #D4A574;      /* Lighter accent */
--bg-dark: #0F0A14;         /* Dark background */
--text-light: #E8E8E8;      /* Light text */
```

### Update Content

Simply replace:
- Text content
- Image URLs
- Therapist names and bios
- Service descriptions
- Blog post information

### Add More Therapists

Copy the `.therapist-slide` div and add more to the slider. JavaScript automatically handles them.

### Add More Services

Copy the `.service-card` and add to the services grid. Use `data-category` for filtering.

### Add More Gallery Images

Add more `.gallery-item` divs with images. Lightbox works with any number.

## 🔧 JavaScript Functionality

The `pages.js` file includes:

- **TherapistsSlider**: Handles the therapists carousel
- **GalleryLightbox**: Handles image lightbox modal
- **Form handling**: Contact and newsletter forms
- **Scroll animations**: Fade-in effects as you scroll
- **Smooth scroll**: Internal page links
- **Filter functionality**: Service category filtering

No jQuery required - pure vanilla JavaScript!

## 📱 Responsive Design

All pages are optimized for:
- Mobile (320px and up)
- Tablet (768px and up)
- Desktop (1024px and up)

Use these CSS media queries to customize:

```css
@media (max-width: 768px) {
  /* Mobile styles */
}

@media (min-width: 769px) and (max-width: 1024px) {
  /* Tablet styles */
}

@media (min-width: 1025px) {
  /* Desktop styles */
}
```

## 🎨 Maintaining Design Consistency

**Always use:**
- Gold/bronze accent colors (RGB: 184, 134, 107)
- Cormorant Garamond for headings
- Inter font for body text
- Dark backgrounds with subtle overlays
- Smooth transitions (0.3s cubic-bezier)
- Professional spacing and padding

## ⚡ Performance Tips

1. Optimize images before uploading
2. Use modern image formats (WebP with PNG fallback)
3. Keep JavaScript files minimal
4. Use CSS animations instead of JavaScript when possible
5. Lazy load images on gallery and blog pages

## 🔗 Navigation Structure

Update your main `index.html` header to include:
```html
<a href="services.html">Services</a>
<a href="gallery.html">Gallery</a>
<a href="blog.html">Blog</a>
<a href="therapists.html">Therapists</a>
<a href="contact.html">Contact</a>
```

## 📧 Contact Form Integration

To make the contact form send emails, you'll need to:
1. Set up a backend service (Node.js, PHP, etc.)
2. Or use a form service like FormSubmit, Netlify Forms, etc.
3. Update the form action attribute

Currently, the form shows a success message locally.

## 🌙 Dark Mode

All pages are optimized for dark mode. Light mode styles are also included if you want to toggle between themes using the existing theme toggle button.

## 🐛 Troubleshooting

**Slider not working?**
- Make sure `pages.js` is loaded
- Check browser console for errors
- Verify all HTML elements have correct classes

**Images not loading?**
- Check image URLs are correct
- Verify image files exist in the img/ folder
- Check browser console for 404 errors

**Styles not applying?**
- Ensure all CSS files are linked
- Check file paths are correct
- Clear browser cache (Ctrl+Shift+Delete)

## 📞 Support

All code is vanilla HTML/CSS/JavaScript - no frameworks required!
No dependencies to install - just copy and paste into your web server.

Enjoy your beautiful AMARA website! ✨
