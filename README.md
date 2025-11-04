# Saint Lucid Portfolio

[![CI](https://github.com/saintxlucid/Portfolio-Website/actions/workflows/ci.yml/badge.svg)](https://github.com/saintxlucid/Portfolio-Website/actions/workflows/ci.yml)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![Next.js](https://img.shields.io/badge/Next.js-16-black)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue)](https://www.typescriptlang.org/)

A production-ready portfolio website for **Saint Lucid** (Karim Al-Sharif) - Media Specialist, Creative Technologist, and AI Systems Architect.

## ✨ Features

- 🎨 **Modern Design**: Black + limestone + amethyst color scheme with luminous accents
- 🚀 **Performance**: Built with Next.js 16 App Router for optimal performance
- ♿ **Accessibility**: WCAG AA compliant with focus states and screen reader support
- 🌐 **Internationalization**: Bilingual support (English, Arabic)
- 📱 **Responsive**: Mobile-first design that works on all devices
- 🎭 **3D Graphics**: Optional animated Three.js hero with lazy loading
- 🎬 **Animations**: Smooth Framer Motion animations with reduced-motion support
- 📝 **MDX**: Dynamic project case studies with rich content
- 🔍 **SEO**: OpenGraph, Twitter Cards, JSON-LD structured data
- 🔒 **Security**: Comprehensive security headers and CSP
- 🧪 **Testing**: Unit tests (Vitest) and E2E tests (Playwright with a11y)
- 🎯 **Type-Safe**: Full TypeScript coverage

## 🛠️ Tech Stack

- **Framework**: [Next.js 16](https://nextjs.org/) with App Router
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
- **Animation**: [Framer Motion](https://www.framer.com/motion/)
- **3D Graphics**: [@react-three/fiber](https://docs.pmnd.rs/react-three-fiber) + [@react-three/drei](https://github.com/pmndrs/drei)
- **Content**: [MDX](https://mdxjs.com/) with gray-matter
- **Testing**: [Vitest](https://vitest.dev/) + [Playwright](https://playwright.dev/) + [axe-core](https://github.com/dequelabs/axe-core)
- **Linting**: [ESLint](https://eslint.org/) + [Prettier](https://prettier.io/)
- **CI/CD**: GitHub Actions
- **Deployment**: [Vercel](https://vercel.com/)

## 🚀 Quick Start

### Prerequisites

- Node.js 20+ (specified in `.nvmrc`)
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/saintxlucid/Portfolio-Website.git
cd Portfolio-Website

# Install dependencies
npm install

# Set up environment variables (optional)
cp .env.example .env.local

# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the site.

## 📜 Available Scripts

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Lint code
npm run lint:fix     # Lint and auto-fix issues
npm run format       # Format code with Prettier
npm run format:check # Check formatting
npm run typecheck    # TypeScript type checking
npm run test         # Run unit tests
npm run test:e2e     # Run E2E tests
npm run test:e2e:ui  # Run E2E tests with UI
npm run analyze      # Analyze bundle size
```

## 📁 Project Structure

```
Portfolio-Website/
├── .github/
│   └── workflows/
│       └── ci.yml           # CI/CD pipeline
├── public/
│   └── images/              # Static images
├── src/
│   ├── app/
│   │   ├── layout.tsx       # Root layout with SEO
│   │   ├── page.tsx         # Home page
│   │   ├── not-found.tsx    # 404 page
│   │   ├── sitemap.ts       # Dynamic sitemap
│   │   ├── robots.ts        # Robots.txt
│   │   ├── globals.css      # Global styles
│   │   └── projects/
│   │       └── [slug]/
│   │           └── page.tsx # Dynamic project pages
│   ├── components/
│   │   ├── Hero/            # Hero section with 3D
│   │   ├── About/           # About section
│   │   ├── Domains/         # Domains section
│   │   ├── Experience/      # Experience timeline
│   │   ├── Projects/        # Projects grid
│   │   ├── Skills/          # Skills section
│   │   ├── Contact/         # Contact section
│   │   ├── layout/          # Header, Footer
│   │   ├── ui/              # Reusable UI components
│   │   └── mdx/             # MDX components
│   ├── content/
│   │   └── projects/        # MDX case studies
│   ├── lib/
│   │   ├── content.ts       # Content data
│   │   ├── i18n.ts          # Internationalization
│   │   └── seo.ts           # SEO utilities
│   ├── locales/             # Translation files
│   └── types/               # TypeScript types
├── tests/
│   ├── e2e/                 # Playwright tests
│   ├── unit/                # Vitest tests
│   └── setup.ts             # Test setup
├── .editorconfig            # Editor configuration
├── .nvmrc                   # Node version
├── .prettierrc              # Prettier config
├── CODEOWNERS               # Code ownership
├── CONTENT-LICENSE.md       # Content license
├── SECURITY.md              # Security policy
├── eslint.config.mjs        # ESLint config
├── next.config.ts           # Next.js config
├── playwright.config.ts     # Playwright config
├── tsconfig.json            # TypeScript config
├── vercel.json              # Vercel config
└── vitest.config.ts         # Vitest config
```

## 📝 Adding a New Project

1. Create a new MDX file in `src/content/projects/`:

```mdx
---
title: 'Your Project Title'
slug: 'your-project-slug'
role: 'Your Role'
summary: 'Brief project summary'
tags: ['Tag1', 'Tag2']
cover: '/images/projects/your-project.jpg'
date: '2024-11-01'
links:
  - label: 'GitHub'
    href: 'https://github.com/...'
---

## Your Content Here

Write your case study content in Markdown...
```

2. Add project cover image to `public/images/projects/`
3. Update sitemap in `src/app/sitemap.ts`
4. Build and test

## 🎨 Design System

### Colors

```css
--color-bg: #0b0b0e /* Background */ --color-limestone: #d7d3c8
  /* Primary text */ --color-amethyst: #b88cff /* Accent purple */
  --color-ice: #70e1f5 /* Accent cyan */ --color-mint: #8ef5c3
  /* Accent green */ --color-gold: #e6c670 /* Accent gold */
  --color-surface: #1a1a1e /* Surface */ --color-border: #2a2a2e /* Border */;
```

### Typography

- **Headings**: Bold, gradient effects
- **Body**: System font stack for optimal performance
- **Code**: Monospace for technical content

## ♿ Accessibility

- Semantic HTML structure
- ARIA labels where needed
- Keyboard navigation support
- Focus visible states
- Skip to main content link
- `prefers-reduced-motion` support
- Color contrast ≥ WCAG AA
- Automated a11y testing with axe-core

## 🔒 Security

- Strict Content Security Policy
- Security headers (HSTS, X-Frame-Options, etc.)
- No inline scripts (except JSON-LD)
- Environment variable management
- Dependency vulnerability scanning

## 🌐 Deployment

### Vercel (Recommended)

1. Push to GitHub
2. Import repository to Vercel
3. Deploy automatically on push

### Environment Variables

Create `.env.local` for local development:

```env
NEXT_PUBLIC_SITE_URL=http://localhost:3000
NEXT_PUBLIC_PLAUSIBLE_DOMAIN=your-domain.com
```

## 📊 Performance

- Lighthouse scores: 95+ across all categories
- Core Web Vitals optimized
- Image optimization with Next/Image
- Code splitting and lazy loading
- Minimal JavaScript bundle

## 🧪 Testing

### Unit Tests

```bash
npm run test
```

### E2E Tests

```bash
npm run test:e2e
```

### A11y Tests

Accessibility tests run automatically with E2E tests using axe-core.

## 🤝 Contributing

This is a personal portfolio project, but suggestions are welcome:

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## 📄 License

- **Code**: [MIT License](LICENSE)
- **Content**: © 2024 Karim Al-Sharif (Saint Lucid). See [CONTENT-LICENSE.md](CONTENT-LICENSE.md)

## 📞 Contact

- **Email**: saintxlucid@proton.me, karimkotb.alsharif@gmail.com
- **GitHub**: [@saintxlucid](https://github.com/saintxlucid)
- **LinkedIn**: [Karim Al-Sharif](https://www.linkedin.com/in/karimalsharif)
- **SoundCloud**: [Saint Lucid](https://soundcloud.com/saintxlucid)

## 🙏 Acknowledgments

Built with modern web technologies and inspired by the intersection of art, technology, and human experience.

---

**Crafted with precision and beauty in structure** ✨
