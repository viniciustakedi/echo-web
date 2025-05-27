# Echo Web Application

A modern web application for reviewing and sharing travel experiences, featuring an interactive map interface and comprehensive review management system.

## 🚀 Features

- 🗺️ Interactive Map Interface with location markers
- ✍️ Review Management System
- 🌍 Multi-language Support (i18n)
- 🔐 Authentication with NextAuth.js
- 📱 Responsive Design
- 🎨 Modern UI with Tailwind CSS
- 🔄 Real-time Updates
- 📊 Dashboard Interface

## 📋 Prerequisites

- Node.js (v18 or higher)
- npm or yarn
- A MapTiler API key
- JWT Public Key for authentication

## 🛠️ Tech Stack

- **Framework**: Next.js 15.3.1
- **Language**: TypeScript
- **Authentication**: NextAuth.js
- **State Management**: Jotai
- **Styling**: Tailwind CSS
- **UI Components**: Radix UI
- **Forms**: React Hook Form + Zod
- **Maps**: MapLibre GL + React Map GL
- **HTTP Client**: Axios
- **Internationalization**: i18next
- **Component Library**: Custom components with Radix UI primitives

## 📁 Project Structure

```
src/
├── app/                    # Next.js 13+ App Router
│   ├── api/               # API Routes
│   ├── dashboard/         # Dashboard Pages
│   ├── home/             # Home Page Components
│   ├── map/              # Map View
│   ├── reviews/          # Reviews Pages
│   └── sign-in/          # Authentication
├── components/           # Shared Components
│   ├── ui/              # UI Components
│   ├── menu/            # Navigation Menu
│   └── footer/          # Footer Component
├── hooks/               # Custom React Hooks
├── lib/                 # Utility Functions
└── requests/           # API Request Functions
    ├── delete/         # DELETE Endpoints
    ├── get/            # GET Endpoints
    ├── patch/          # PATCH Endpoints
    └── post/           # POST Endpoints
```

## ⚙️ Environment Variables

Create a `.env.local` file in the root directory with the following variables:

```bash
# MapTiler API Key for map functionality
NEXT_PUBLIC_MAPTILER_KEY=your_maptiler_key

# API URL for backend services
NEXT_PUBLIC_API_URL=your_api_url

# NextAuth.js Configuration
NEXTAUTH_SECRET=your_nextauth_secret
NEXTAUTH_URL=http://localhost:3000

# JWT Configuration
JWT_VERIFYING_PUBLIC_KEY=your_jwt_public_key
```

## 📥 Installation

1. Clone the repository:
```bash
git clone git@github.com:viniciustakedi/echo-web.git
cd echo-web
```

2. Install dependencies:
```bash
npm install
# or
yarn install
```

3. Set up environment variables:
```bash
cp .env.example .env.local
```
Then edit `.env.local` with your values.

4. Start the development server:
```bash
npm run dev
# or
yarn dev
```

## 📄 Available Scripts

- `npm run dev`: Start development server
- `npm run build`: Build for production
- `npm run start`: Start production server
- `npm run lint`: Run ESLint

## 📱 Pages

- `/` - Home page with featured experiences and destinations
- `/map` - Interactive map with review markers
- `/reviews` - List of all reviews
- `/reviews/[id]` - Individual review page
- `/dashboard` - User dashboard
- `/dashboard/reviews` - User's reviews management
- `/dashboard/new-review` - Create new review
- `/dashboard/edit-review/[id]` - Edit existing review
- `/sign-in` - Authentication page

## 🔒 Authentication

This project uses NextAuth.js for authentication with a custom credentials provider. Authentication flow includes:

- JWT-based authentication
- Protected routes in dashboard
- API route protection
- Session management

## 🌐 API Integration

The application integrates with a backend API through various endpoints:

- Authentication endpoints
- Review management
- Map markers
- User data

## 📦 Key Dependencies

```json
{
  "@radix-ui/react-*": "UI component primitives",
  "@tanstack/react-query": "Data fetching and caching",
  "maplibre-gl": "Map rendering",
  "next-auth": "Authentication",
  "react-hook-form": "Form handling",
  "zod": "Schema validation",
  "i18next": "Internationalization"
}
```

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch: `git checkout -b feature/amazing-feature`
3. Commit your changes: `git commit -m 'Add some amazing feature'`
4. Push to the branch: `git push origin feature/amazing-feature`
5. Open a pull request

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.
