# Filsino - Professional Business Website

A modern, responsive, and feature-rich business website built with PHP and TailwindCSS, featuring beautiful animations, interactive elements, and professional design.

## 🚀 Features

- **Modern Design**: Clean, professional design with beautiful gradients and animations
- **Responsive Layout**: Fully responsive design that works on all devices
- **Interactive Elements**: Smooth animations, hover effects, and interactive buttons
- **Contact Form**: Working PHP contact form with validation and email notifications
- **Portfolio Section**: Showcase projects with filtering and modal views
- **Blog System**: Full blog functionality with categories and pagination
- **Newsletter Signup**: Email subscription functionality
- **SEO Optimized**: Meta tags, structured data, and SEO-friendly URLs
- **Database Integration**: MySQL database for storing contacts, blog posts, and more
- **Security Features**: CSRF protection, input validation, and rate limiting

## 📁 File Structure

```
Filsino_html/
├── index.php                 # Main landing page
├── portfolio.php             # Portfolio showcase page
├── blog.php                  # Blog listing page
├── contact_handler.php       # Contact form processor
├── setup_database.php        # Database setup script
├── config.php                # Configuration file
├── includes/
│   ├── header.php            # Common header
│   └── footer.php            # Common footer
├── assets/
│   ├── css/
│   │   └── style.css         # Custom styles and animations
│   ├── js/
│   │   └── main.js           # Interactive functionality
│   └── images/               # Image assets
├── uploads/                  # File upload directory
└── logs/                     # Error logs
```

## 🛠️ Installation & Setup

### Prerequisites

- PHP 7.4 or higher
- MySQL 5.7 or higher
- Web server (Apache, Nginx, or local development server)
- Composer (optional, for future extensions)

### Step 1: Download and Extract

1. Download or clone this repository
2. Extract to your web server directory (e.g., `htdocs`, `www`, or your hosting root)

### Step 2: Database Setup

1. Create a MySQL database for the website
2. Update database credentials in `config.php`:

   ```php
   define('DB_HOST', 'localhost');
   define('DB_NAME', 'your_database_name');
   define('DB_USER', 'your_username');
   define('DB_PASS', 'your_password');
   ```

3. Run the database setup script by visiting: `yoursite.com/setup_database.php`
   Or run it via command line: `php setup_database.php`

### Step 3: Configuration

1. Open `config.php` and update the following settings:

   - Site information (name, URL, email, phone)
   - Email configuration for contact form
   - Social media links
   - API keys (Google Maps, reCAPTCHA, etc.)

2. Update email settings in `contact_handler.php`:
   ```php
   $to = 'your_email@domain.com'; // Your contact email
   ```

### Step 4: File Permissions

Ensure the following directories are writable:

```bash
chmod 755 uploads/
chmod 755 logs/
```

### Step 5: Test the Website

1. Visit your website URL
2. Test the contact form
3. Check all navigation links
4. Verify responsive design on different devices

## 🎨 Customization

### Colors and Branding

The website uses CSS custom properties and TailwindCSS. To customize colors:

1. Update the gradient colors in `assets/css/style.css`
2. Modify TailwindCSS configuration in `includes/header.php`
3. Update logo and brand colors throughout the PHP files

### Content Updates

1. **Homepage**: Edit `index.php` to update hero text, services, and company information
2. **Portfolio**: Modify the `$projects` array in `portfolio.php`
3. **Blog**: Update the `$articles` array in `blog.php` or connect to the database
4. **Contact Info**: Update contact details in `config.php` and footer

### Adding New Pages

1. Create a new PHP file (e.g., `about.php`)
2. Include the header and footer:

   ```php
   <?php
   $page_title = 'About Us';
   include_once 'includes/header.php';
   ?>

   <!-- Your content here -->

   <?php include_once 'includes/footer.php'; ?>
   ```

3. Add navigation links in `includes/header.php`

## 🔧 Technical Details

### Technologies Used

- **Backend**: PHP 7.4+
- **Frontend**: HTML5, CSS3, JavaScript (ES6+)
- **CSS Framework**: TailwindCSS (CDN)
- **Database**: MySQL
- **Fonts**: Google Fonts (Inter)
- **Icons**: Heroicons (SVG)

### Browser Support

- Chrome 60+
- Firefox 60+
- Safari 12+
- Edge 79+

### Performance Features

- Optimized images and assets
- Minified CSS and JavaScript
- Efficient database queries
- Responsive image loading
- Browser caching headers

## 📧 Contact Form Setup

The contact form includes:

- Client-side validation
- Server-side validation and sanitization
- CSRF protection
- Rate limiting
- Email notifications
- Auto-reply functionality
- Database logging

### Email Configuration

For production use, configure SMTP settings in `config.php`:

```php
define('SMTP_HOST', 'smtp.gmail.com');
define('SMTP_PORT', 587);
define('SMTP_USER', 'your_email@gmail.com');
define('SMTP_PASS', 'your_app_password');
```

## 🛡️ Security Features

- Input validation and sanitization
- SQL injection prevention (PDO prepared statements)
- XSS protection
- CSRF token validation
- Rate limiting
- Session security
- Error logging

## 📱 Mobile Optimization

- Fully responsive design
- Touch-friendly interface
- Optimized animations for mobile
- Fast loading on mobile networks
- Mobile-first CSS approach

## 🚀 Deployment

### Shared Hosting

1. Upload files via FTP/cPanel File Manager
2. Create database through hosting control panel
3. Update `config.php` with hosting database details
4. Run `setup_database.php` once
5. Set proper file permissions

### VPS/Dedicated Server

1. Clone repository to server
2. Set up web server (Apache/Nginx)
3. Configure PHP and MySQL
4. Set up SSL certificate
5. Configure firewall and security

## 📊 Analytics and SEO

### SEO Features Included

- Meta tags and descriptions
- Open Graph tags
- Structured data markup
- XML sitemap (can be generated)
- SEO-friendly URLs
- Fast loading times

### Adding Analytics

Add your Google Analytics code to `includes/header.php`:

```html
<!-- Google Analytics -->
<script
  async
  src="https://www.googletagmanager.com/gtag/js?id=GA_TRACKING_ID"
></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag() {
    dataLayer.push(arguments);
  }
  gtag("js", new Date());
  gtag("config", "GA_TRACKING_ID");
</script>
```

## 🔄 Updates and Maintenance

### Regular Maintenance

1. Update PHP and dependencies
2. Backup database regularly
3. Monitor error logs
4. Update content regularly
5. Check for broken links
6. Monitor website performance

### Adding Features

The website is built with extensibility in mind:

- Add new page templates
- Extend database schema
- Integrate third-party APIs
- Add e-commerce functionality
- Implement user authentication

## 📞 Support

For questions or support:

- Email: contact@filsino.com
- Documentation: Check code comments
- Issues: Submit via repository issues

## 📄 License

This project is licensed under the MIT License. See the LICENSE file for details.

## 🙏 Credits

- **TailwindCSS**: For the utility-first CSS framework
- **Heroicons**: For beautiful SVG icons
- **Google Fonts**: For the Inter font family
- **PHP Community**: For the excellent documentation and resources

---

**Built with ❤️ by the Filsino Team**
