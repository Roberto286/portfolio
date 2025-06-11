# Roberto Saliola - Portfolio Website

A modern, responsive portfolio website built with React, showcasing the work and experience of Roberto Saliola, a Full Stack Web Developer.

## 🚀 Features

- **Modern Design**: Clean, professional design with smooth animations
- **Responsive**: Mobile-first approach ensuring optimal viewing on all devices
- **Dark Mode**: System preference detection with manual toggle
- **Internationalization**: Support for 5 languages (IT, EN, FR, ES, DE)
- **Performance Optimized**: Fast loading with optimized assets
- **Accessibility**: WCAG compliant with proper ARIA labels
- **SEO Friendly**: Optimized meta tags and semantic HTML

## 🛠️ Tech Stack

- **Frontend**: React 18, JavaScript (ES6+)
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Build Tool**: Vite
- **Internationalization**: react-i18next
- **Form Handling**: React Hook Form
- **Code Quality**: ESLint, Prettier

## 📁 Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── Button.jsx
│   ├── Card.jsx
│   ├── Icon.jsx
│   ├── LanguageSelector.jsx
│   ├── Navigation.jsx
│   ├── ScrollToTop.jsx
│   ├── ThemeToggle.jsx
│   └── Footer.jsx
├── sections/            # Main page sections
│   ├── Hero.jsx
│   ├── About.jsx
│   ├── Experience.jsx
│   ├── Projects.jsx
│   ├── Skills.jsx
│   ├── Blog.jsx
│   └── Contact.jsx
├── config/              # Configuration files
│   ├── blog.config.js
│   ├── experience.config.js
│   ├── projects.config.js
│   └── skills.config.js
├── hooks/               # Custom React hooks
│   ├── useTheme.js
│   └── useScrollSpy.js
├── i18n/                # Internationalization
│   ├── index.js
│   └── locales/
│       ├── it.json
│       ├── en.json
│       ├── fr.json
│       ├── es.json
│       └── de.json
├── App.jsx
├── main.jsx
└── index.css
```

## 🎨 Design System

### Colors
- **Primary**: Green color palette (50-950)
- **Secondary**: Emerald color palette
- **Accent**: Lime color palette
- **Neutral**: Gray color palette

### Typography
- **Primary Font**: Inter (Google Fonts)
- **Monospace**: JetBrains Mono

### Spacing
- Consistent 8px spacing system
- Responsive breakpoints: sm (640px), md (768px), lg (1024px), xl (1280px)

## 🌐 Internationalization

The website supports 5 languages with automatic browser language detection:
- **Italian** (default)
- **English**
- **French**
- **Spanish**
- **German**

Language preference is stored in localStorage and persists across sessions.

## 📱 Responsive Design

- **Mobile-first approach**
- **Optimized navigation** for mobile devices
- **Touch-friendly interactions**
- **Flexible grid layouts**
- **Scalable typography**

## ⚡ Performance Features

- **Lazy loading** for images
- **Optimized animations** with Framer Motion
- **Efficient re-renders** with React best practices
- **Minimal bundle size** with tree shaking
- **Fast development** with Vite HMR

## 🔧 Development

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation
```bash
# Clone the repository
git clone [repository-url]

# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Lint code
npm run lint

# Format code
npm run format
```

### Environment Setup
The project uses Vite for development and building. No additional environment variables are required for basic functionality.

## 📄 Content Management

Content is managed through configuration files in the `src/config/` directory:

- **Blog posts**: `blog.config.js`
- **Work experience**: `experience.config.js`
- **Projects**: `projects.config.js`
- **Skills**: `skills.config.js`

All text content is externalized to translation files for easy localization.

## 🚀 Deployment

The project is optimized for deployment on modern hosting platforms:

- **Netlify** (recommended)
- **Vercel**
- **GitHub Pages**
- **Any static hosting service**

Build command: `npm run build`
Output directory: `dist`

## 📧 Contact

For questions or collaboration opportunities:

- **Email**: roberto.saliola96@gmail.com
- **LinkedIn**: [Roberto Saliola](https://www.linkedin.com/in/roberto-saliola-340077224/)
- **GitHub**: [Roberto286](https://github.com/Roberto286)

## 📝 License

This project is private and proprietary. All rights reserved.

---

Built with ❤️ by Roberto Saliola