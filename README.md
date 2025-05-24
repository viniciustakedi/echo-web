# echo-web

A modern, responsive web application built with Next.js, TypeScript, Tailwind CSS, and ShadCN UI components. **echo-web** provides interactive map visualizations, themed UI, markdown-based content rendering, and multi-language support.

## Table of Contents

* [Demo](#demo)
* [Features](#features)
* [Tech Stack](#tech-stack)
* [Getting Started](#getting-started)

  * [Prerequisites](#prerequisites)
  * [Installation](#installation)
  * [Environment Variables](#environment-variables)
  * [Running the App](#running-the-app)
* [Project Structure](#project-structure)
* [Deployment](#deployment)
* [Contributing](#contributing)
* [License](#license)
* [Contact](#contact)

## Demo

Live demo: *Coming soon or replace with your deployment URL*

## Features

* **Interactive Map**: Visualize data on an interactive map using MapLibre GL and React Map GL.
* **Theming**: Light and dark mode support with `next-themes`.
* **Markdown Rendering**: Render rich Markdown content with `react-markdown` and `remark-gfm`.
* **Internationalization**: Multi-language support using `i18next` and `react-i18next`.
* **UI Components**: Built with ShadCN UI (Radix UI) components and Tailwind CSS.
* **Carousel**: Embla Carousel for image/content sliders.
* **Notifications**: Toast notifications with Sonner.
* **Performance**: Data fetching and caching with TanStack React Query.

## Tech Stack

* [Next.js](https://nextjs.org/) v15
* [React](https://reactjs.org/) v19
* TypeScript
* [Tailwind CSS](https://tailwindcss.com/) v4
* [ShadCN UI](https://ui.shadcn.com/)
* [Radix UI](https://www.radix-ui.com/)
* [MapLibre GL](https://maplibre.org/) & [React Map GL](https://visgl.github.io/react-map-gl/)
* [TanStack React Query](https://tanstack.com/query/)
* [i18next](https://www.i18next.com/) & [react-i18next](https://react.i18next.com/)
* [react-markdown](https://github.com/remarkjs/react-markdown) & [remark-gfm](https://github.com/remarkjs/remark-gfm)
* [Embla Carousel React](https://www.embla-carousel.com/)
* [Sonner](https://github.com/lucasford/sonner)
* `next-themes`

## Getting Started

### Prerequisites

* Node.js (>=18.x)
* npm or Yarn or pnpm or Bun

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/viniciustakedi/echo-web.git
   cd echo-web
   ```
2. Install dependencies:

   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   ```

### Environment Variables

Create a `.env.local` file in the root directory and add the required variables based on `.env.example`:

```env
NEXT_PUBLIC_MAPTILER_KEY=<your_maptiler_api_key>
```

### Running the App

* **Development**:

  ```bash
  npm run dev
  # or
  yarn dev
  # or
  pnpm dev
  bun dev
  ```

  Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

* **Production build**:

  ```bash
  npm run build
  npm start
  ```

## Project Structure

```plaintext
.
├── .env.example         # Example env variables
├── config/              # App configuration files
├── public/              # Static assets (images, fonts)
├── src/
│   ├── app/             # Next.js App Router pages and layouts
│   ├── components/      # Reusable React components
│   ├── lib/             # Utility functions and hooks
│   ├── home/            # Home page feature components
│   ├── hooks/           # Custom React hooks
│   └── styles/          # Global CSS and Tailwind utilities
├── .github/             # GitHub workflows (CI/CD)
├── .vscode/             # Editor settings
├── package.json         # Project metadata and scripts
├── tsconfig.json        # TypeScript configuration
└── README.md            # This file
```

## Deployment

Deploy the application to [Vercel](https://vercel.com/) for seamless integration:

1. Sign in to Vercel and create a new project.
2. Link the GitHub repository.
3. Add the `NEXT_PUBLIC_MAPTILER_KEY` environment variable in Vercel settings.
4. Deploy!

For other platforms, refer to Next.js deployment docs: [https://nextjs.org/docs/deployment](https://nextjs.org/docs/deployment)

## Contributing

Contributions are welcome! Please open an issue or submit a pull request for bug fixes and improvements.

## License

This project is private. If you wish to open-source it, add a LICENSE file.

## Contact

For questions or feedback, feel free to open an issue or connect via GitHub:

* GitHub: [@viniciustakedi](https://github.com/viniciustakedi)