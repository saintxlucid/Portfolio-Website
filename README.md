# Saint Lucid - Portfolio Website

A modern, production-ready portfolio website showcasing the creative work of Saint Lucid across music, code, and design. Built with React, Vite, Tailwind CSS, and Framer Motion, featuring immersive 3D elements and smooth animations.

![Portfolio Preview](https://via.placeholder.com/1200x630?text=Saint+Lucid+Portfolio)

## ✨ Features

- **🎨 Modern Design**: Dark theme with gradient accents and clean typography
- **🎭 Animated Hero**: 3D sigil created with Three.js and @react-three/fiber
- **📱 Fully Responsive**: Seamless experience across all device sizes
- **♿ Accessible**: ARIA labels, keyboard navigation, and focus indicators
- **🎬 Smooth Animations**: Powered by Framer Motion with prefers-reduced-motion support
- **⚡ Performance Optimized**: Lazy-loading for 3D components and code splitting
- **📝 MDX Ready**: Case study system ready for detailed project documentation

## 🏗️ Built With

- **React** - UI library
- **Vite** - Build tool and dev server
- **Tailwind CSS** - Utility-first CSS framework
- **Framer Motion** - Animation library
- **@react-three/fiber** - React renderer for Three.js
- **@react-three/drei** - Useful helpers for react-three-fiber
- **Three.js** - 3D graphics library

## 📋 Sections

1. **Hero** - Eye-catching introduction with animated 3D sigil
2. **About** - Personal introduction and philosophy
3. **Domains** - Creative areas of expertise
4. **Experience** - Professional journey and roles
5. **Projects** - Featured work with case study links
6. **Skills** - Technical proficiencies with visual indicators
7. **Contact** - Get in touch with email and social links

## 🚀 Getting Started

### Prerequisites

- Node.js (v18 or higher recommended)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/saintxlucid/Portfolio-Website.git
cd Portfolio-Website
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and visit `http://localhost:5173`

## 📜 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Lint code with ESLint

## 🎨 Customization

### Colors

The color scheme is defined in `tailwind.config.js`. You can customize the dark theme colors:

```javascript
colors: {
  dark: {
    bg: '#0a0a0a',
    surface: '#1a1a1a',
    hover: '#2a2a2a',
  },
}
```

### Content

Update the content in the component files:
- `src/components/About/About.jsx` - Personal bio
- `src/components/Domains/Domains.jsx` - Areas of expertise
- `src/components/Experience/Experience.jsx` - Work history
- `src/components/Projects/Projects.jsx` - Featured projects
- `src/components/Skills/Skills.jsx` - Technical skills
- `src/components/Contact/Contact.jsx` - Contact information and social links

### Case Studies

Add detailed case studies in the `public/case-studies/` directory using MDX format. Stubs are already provided for:
- `ethereal-soundscapes.mdx`
- `neural-canvas.mdx`
- `quantum-beats.mdx`
- `lucid-portfolio.mdx`

## 🌐 Deployment

### Build for Production

```bash
npm run build
```

The optimized files will be in the `dist/` directory.

### Deploy to Vercel

1. Install Vercel CLI: `npm i -g vercel`
2. Run: `vercel`
3. Follow the prompts

### Deploy to Netlify

1. Build the project: `npm run build`
2. Drag and drop the `dist/` folder to Netlify
3. Or connect your GitHub repository for automatic deployments

## ♿ Accessibility

This portfolio is built with accessibility in mind:

- Semantic HTML structure
- ARIA labels for interactive elements
- Keyboard navigation support
- Focus indicators for all interactive elements
- Respects `prefers-reduced-motion` user preference
- High contrast ratios for text readability

## 📱 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👤 Author

**Saint Lucid**
- Website: [saintlucid.com](https://saintlucid.com)
- GitHub: [@saintxlucid](https://github.com/saintxlucid)
- Twitter: [@saintxlucid](https://twitter.com/saintxlucid)

## 🙏 Acknowledgments

- Design inspiration from modern creative portfolios
- Three.js community for 3D graphics resources
- Framer Motion for excellent animation capabilities

---

Built with ❤️ by Saint Lucid

