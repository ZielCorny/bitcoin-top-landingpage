# Bitcoin Top Frontend

A modern Next.js application built with Tailwind CSS and shadcn/ui components, featuring custom TT Norms Pro fonts and a sleek dark theme.

## Features

- ⚡ **Next.js 15** with App Router and TypeScript
- 🎨 **Tailwind CSS** with custom design system
- 🧩 **shadcn/ui** components for beautiful UI
- 🔤 **Custom Fonts** - TT Norms Pro family
- 🌙 **Dark Theme** with neon lime accents
- 📱 **Responsive Design** for all devices

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. Install dependencies:
```bash
npm install
# or
yarn install
```

2. Run the development server:
```bash
npm run dev
# or
yarn dev
```

3. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
├── app/                    # Next.js App Router
│   ├── globals.css        # Global styles with custom fonts
│   ├── layout.tsx         # Root layout component
│   └── page.tsx          # Homepage
├── components/            # Reusable components
│   └── ui/               # shadcn/ui components
├── lib/                  # Utility functions
├── public/               # Static assets
│   ├── fonts/           # Custom font files
│   └── zielzone_logo.svg # Company logo
└── global.css           # Original global styles (moved to app/globals.css)
```

## Custom Fonts

The project includes the complete TT Norms Pro font family:

- **TT Norms Pro** (Regular, Medium, Bold)
- **TT Norms Pro Mono** (Regular, Medium) 
- **TT Norms Pro Expanded** (Regular)

Fonts are automatically loaded and configured in the Tailwind CSS setup.

## Design System

The project uses a custom dark theme with:

- **Primary Color**: Neon Lime (#00FF00)
- **Background**: Pure Black (#000000)
- **Text**: White (#FFFFFF)
- **Accents**: Various chart colors for data visualization

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## Technologies Used

- [Next.js 15](https://nextjs.org/) - React framework
- [TypeScript](https://www.typescriptlang.org/) - Type safety
- [Tailwind CSS](https://tailwindcss.com/) - Styling
- [shadcn/ui](https://ui.shadcn.com/) - UI components
- [Radix UI](https://www.radix-ui.com/) - Accessible primitives
- [Lucide React](https://lucide.dev/) - Icons

## License

This project is private and proprietary.
