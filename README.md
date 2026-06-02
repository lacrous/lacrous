# Hassan El-Deghidy Portfolio

> **"I don't build apps. I build ecosystems."**

A modern, futuristic portfolio website for **Hassan El-Deghidy** (also known as Storm | Lacrous) — a Software Developer & CS Student building the **Nurovia Ecosystem**.

![Portfolio Preview](./preview.png)

## Live Demo

[https://3yzegjolo3s66.kimi.page](https://3yzegjolo3s66.kimi.page)

## Features

- **Interactive 3D Hero** — Wireframe globe with orbiting particles (Three.js)
- **10 Sections** — Hero, About, Vision, Ecosystem, Skills, Stats, Journey, Achievements, Projects, Contact
- **Scroll Animations** — GSAP ScrollTrigger powered entrance animations
- **Glassmorphism Design** — Modern glass-card UI with backdrop blur
- **Multi-Language** — Full i18n support (English, Arabic, Russian) with RTL
- **Dark/Light Theme** — Toggle between themes with localStorage persistence
- **Smooth Scrolling** — Lenis smooth scroll integration
- **Contact Form** — Validated form with React Hook Form + Zod
- **Responsive** — Fully responsive on mobile, tablet, and desktop
- **Loading Screen** — Animated preloader while 3D scene initializes

## Tech Stack

| Technology | Purpose |
|-----------|---------|
| React 19 | UI Framework |
| TypeScript | Type Safety |
| Vite | Build Tool |
| Tailwind CSS | Styling |
| Three.js + React Three Fiber | 3D Hero Scene |
| GSAP + ScrollTrigger | Animations |
| Lenis | Smooth Scroll |
| i18next | Internationalization |
| React Hook Form + Zod | Form Validation |
| Lucide React | Icons |

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) 18+ installed
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/lacrous/portfolio.git
   cd portfolio
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Run development server**
   ```bash
   npm run dev
   ```
   Open [http://localhost:5173](http://localhost:5173) in your browser.

4. **Build for production**
   ```bash
   npm run build
   ```
   The `dist/` folder will contain the production build.

## Customizing Photos

Replace the placeholder photos with your own:

| File Path | Used For | Recommended Size |
|-----------|----------|-----------------|
| `public/assets/profile1.jpg` | Hero photo 1 | 400x400px (square) |
| `public/assets/profile2.jpg` | Hero photo 2 | 400x400px (square) |
| `public/assets/projects/project-xeno.jpg` | Xeno Mini screenshot | 800x450px (16:9) |
| `public/assets/projects/project-landing.jpg` | Landing Page screenshot | 800x450px (16:9) |
| `public/assets/projects/project-movie.jpg` | Movie App screenshot | 800x450px (16:9) |
| `public/assets/projects/project-ecommerce.jpg` | E-Commerce screenshot | 800x450px (16:9) |

After replacing photos, rebuild:
```bash
npm run build
```

## Project Structure

```
portfolio/
├── public/
│   └── assets/
│       ├── profile1.jpg
│       ├── profile2.jpg
│       └── projects/
├── src/
│   ├── components/       # Reusable components
│   ├── sections/         # Page sections
│   ├── context/          # React contexts (theme, language)
│   ├── hooks/            # Custom hooks
│   ├── config/           # Configuration files
│   ├── i18n/             # Translations (EN, AR, RU)
│   ├── App.tsx
│   └── main.tsx
├── index.html
├── package.json
├── vite.config.ts
├── tailwind.config.js
└── tsconfig.json
```

## Social Links

- **GitHub**: [@lacrous](https://github.com/lacrous)
- **LinkedIn**: [Hassan El-Deghidy](https://www.linkedin.com/in/lacrous)
- **Telegram**: [@lacrous](https://t.me/lacrous)
- **Email**: hassan0deghedy@gmail.com

## License

This project is open source and available under the [MIT License](LICENSE).

---

Built with passion by **Hassan El-Deghidy** | Storm | Lacrous
