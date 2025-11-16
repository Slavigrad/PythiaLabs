# CLAUDE.md - AI Assistant Guide for PythiaLabs

## Project Overview

**Pythia Vector Lab** is an interactive educational playground that demonstrates how embeddings, cosine distance, and vector search power modern IT talent search. It visualizes how words exist in a geometric space where meaning is captured by position and distance.

**Repository**: Slavigrad/PythiaLabs
**License**: MIT
**Primary Language**: TypeScript (React)

## Technology Stack

### Core Framework
- **React**: 18.3.1 with functional components and hooks
- **TypeScript**: 5.8.3 with lenient configuration
- **Vite**: 5.4.19 as build tool and dev server
- **React Router DOM**: 6.30.1 for client-side routing

### UI & Styling
- **Tailwind CSS**: 3.4.17 with custom configuration
- **shadcn/ui**: Component library based on Radix UI primitives
- **Framer Motion**: 12.23.24 for animations
- **Lucide React**: Icon library
- **Design System**: Custom glassmorphic theme with HSL colors

### 3D Visualization
- **React Three Fiber**: 8.18.0 (@react-three/fiber)
- **Drei**: 9.122.0 (@react-three/drei) - Three.js helpers
- **Three.js**: 0.160.1

### Data & Forms
- **TanStack Query**: 5.83.0 (React Query v5)
- **React Hook Form**: 7.61.1
- **Zod**: 3.25.76 for schema validation
- **@hookform/resolvers**: For form validation integration

### Development Tools
- **ESLint**: 9.32.0 with TypeScript support
- **PostCSS**: 8.5.6 with Autoprefixer
- **Bun**: Alternative package manager (lockfile present)

## Project Structure

```
PythiaLabs/
├── pythia-labs/                 # Main application directory
│   ├── public/                  # Static assets
│   │   ├── favicon.ico
│   │   ├── placeholder.svg
│   │   └── robots.txt
│   ├── src/
│   │   ├── components/          # React components
│   │   │   ├── ui/             # shadcn/ui component library
│   │   │   ├── DistancePlayground.tsx
│   │   │   ├── EmbeddingSpaceMap.tsx
│   │   │   ├── Hero.tsx
│   │   │   ├── HowPythiaWorks.tsx
│   │   │   └── NavLink.tsx
│   │   ├── hooks/              # Custom React hooks
│   │   │   ├── use-mobile.tsx
│   │   │   └── use-toast.ts
│   │   ├── lib/                # Utility functions
│   │   │   └── utils.ts        # cn() helper for class merging
│   │   ├── pages/              # Route pages
│   │   │   ├── Index.tsx       # Home page
│   │   │   └── NotFound.tsx    # 404 page
│   │   ├── App.css
│   │   ├── App.tsx             # Root component with routing
│   │   ├── index.css           # Global styles & design system
│   │   ├── main.tsx            # Application entry point
│   │   └── vite-env.d.ts       # Vite type definitions
│   ├── components.json         # shadcn/ui configuration
│   ├── eslint.config.js        # ESLint configuration
│   ├── index.html              # HTML entry point
│   ├── package.json            # Dependencies & scripts
│   ├── postcss.config.js       # PostCSS configuration
│   ├── tailwind.config.ts      # Tailwind configuration
│   ├── tsconfig.json           # TypeScript root config
│   ├── tsconfig.app.json       # TypeScript app config
│   ├── tsconfig.node.json      # TypeScript Node config
│   └── vite.config.ts          # Vite configuration
├── .gitignore
├── LICENSE                      # MIT License
└── README.md
```

## Development Workflows

### Setup & Installation

```bash
cd pythia-labs
npm install
# or
bun install
```

### Development Commands

```bash
# Start dev server (runs on port 8080)
npm run dev

# Build for production
npm run build

# Build for development
npm run build:dev

# Preview production build
npm run preview

# Run linter
npm run lint

# Clean and reinstall
npm run clean:install
```

### Dev Server Configuration
- **Host**: `::` (IPv6, all interfaces)
- **Port**: `8080`
- Configured in `vite.config.ts`

## Code Conventions & Best Practices

### TypeScript Configuration

The project uses **lenient TypeScript settings**:
- `noImplicitAny`: false
- `noUnusedParameters`: false
- `noUnusedLocals`: false
- `strictNullChecks`: false
- `allowJs`: true
- `skipLibCheck`: true

**When modifying code**: Match this lenient style. Don't add strict type annotations unless required.

### Import Aliases

Use path aliases defined in `tsconfig.json`:

```typescript
import { Hero } from "@/components/Hero";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
```

**Aliases**:
- `@/*` → `./src/*`
- `@/components` → Component directory
- `@/lib` → Library utilities
- `@/hooks` → Custom hooks
- `@/components/ui` → UI components

### Component Patterns

#### 1. Functional Components with TypeScript

```typescript
export const ComponentName = () => {
  return (
    <div>
      {/* Component JSX */}
    </div>
  );
};
```

#### 2. Use Framer Motion for Animations

```typescript
import { motion } from "framer-motion";

<motion.div
  initial={{ opacity: 0, y: 30 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.8 }}
>
  {/* Content */}
</motion.div>
```

#### 3. Glassmorphic Design Pattern

Apply glass card styling using utility classes:

```typescript
<div className="glass-card p-6">
  {/* Content */}
</div>

<div className="glass-card glass-card-hover p-8">
  {/* Hoverable card */}
</div>
```

### Styling Conventions

#### CSS Color System

**CRITICAL**: All colors MUST be defined in HSL format in `src/index.css`

```css
:root {
  --primary: 190 95% 55%;      /* Cyan */
  --secondary: 260 60% 50%;    /* Purple */
  --accent: 180 100% 65%;      /* Light cyan */
  --background: 240 30% 8%;    /* Dark blue */
  /* ... */
}
```

#### Custom Utility Classes

Defined in `src/index.css`:

- `.glass-card` - Glassmorphic card with blur and border
- `.glass-card-hover` - Hover effects for glass cards
- `.gradient-bg` - Background gradient (dark blue to purple)
- `.glow-text-cyan` - Cyan glowing text
- `.glow-text-purple` - Purple glowing text
- `.bubble-glow` - Glowing bubble effect

#### Tailwind Customization

Custom animations defined in `tailwind.config.ts`:
- `animate-fade-in` - Fade in with upward motion
- `animate-scale-in` - Scale in animation
- `animate-glow-pulse` - Pulsing glow effect
- `animate-float` - Floating motion

### Routing

Routes are defined in `App.tsx`:

```typescript
<Routes>
  <Route path="/" element={<Index />} />
  {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
  <Route path="*" element={<NotFound />} />
</Routes>
```

**When adding new routes**:
1. Create page component in `src/pages/`
2. Import in `App.tsx`
3. Add route BEFORE the `*` catch-all route

### Component Organization

#### Page Components
- Location: `src/pages/`
- Purpose: Top-level route components
- Current pages: `Index.tsx`, `NotFound.tsx`

#### Feature Components
- Location: `src/components/`
- Purpose: Main feature/section components
- Examples: `Hero.tsx`, `EmbeddingSpaceMap.tsx`, `DistancePlayground.tsx`, `HowPythiaWorks.tsx`

#### UI Components
- Location: `src/components/ui/`
- Purpose: Reusable UI primitives from shadcn/ui
- Examples: `button.tsx`, `card.tsx`, `dialog.tsx`, etc.
- **Note**: These are generated by shadcn CLI

#### Custom Hooks
- Location: `src/hooks/`
- Current hooks: `use-mobile.tsx`, `use-toast.ts`

## Design System

### Theme Architecture

The project uses a **dark glassmorphic theme** with cyan and purple accents.

#### Primary Colors
- **Primary**: Cyan (`hsl(190, 95%, 55%)`)
- **Secondary**: Purple (`hsl(260, 60%, 50%)`)
- **Accent**: Light Cyan (`hsl(180, 100%, 65%)`)
- **Background**: Dark Blue (`hsl(240, 30%, 8%)`)

#### Glass Effect Components
- Background: Semi-transparent dark with blur
- Border: Subtle cyan glow
- Shadow: Layered shadows for depth
- Hover: Increased opacity and glow

### Animation Philosophy

Use Framer Motion for:
- Page transitions
- Component entrance animations
- Hover interactions
- Continuous animations (floating orbs, glows)

**Timing**: Prefer smooth, slower animations (0.6-0.8s) for premium feel

## Key Files & Their Purposes

### Configuration Files

| File | Purpose |
|------|---------|
| `vite.config.ts` | Vite build configuration, dev server, path aliases |
| `tailwind.config.ts` | Tailwind theme, colors, animations |
| `tsconfig.json` | TypeScript compiler options (lenient) |
| `eslint.config.js` | Linting rules (unused vars disabled) |
| `components.json` | shadcn/ui component configuration |
| `postcss.config.js` | PostCSS plugins (Tailwind, Autoprefixer) |

### Application Entry

1. `index.html` - HTML shell
2. `src/main.tsx` - React entry point
3. `src/App.tsx` - Root component with providers
4. `src/pages/Index.tsx` - Home page

### Styling

- `src/index.css` - Design system variables, utility classes
- `src/App.css` - Additional app-level styles

## Adding shadcn/ui Components

The project uses shadcn/ui. To add new components:

```bash
npx shadcn@latest add [component-name]
```

Configuration in `components.json`:
- Style: `default`
- Base color: `slate`
- CSS variables: `true`
- TypeScript: `true`

## Common Modifications

### Adding a New Page

1. Create component in `src/pages/NewPage.tsx`:
```typescript
const NewPage = () => {
  return (
    <div className="min-h-screen gradient-bg">
      {/* Content */}
    </div>
  );
};

export default NewPage;
```

2. Add route in `src/App.tsx`:
```typescript
import NewPage from "./pages/NewPage";

// In Routes:
<Route path="/new-page" element={<NewPage />} />
```

### Adding a New Feature Component

1. Create in `src/components/FeatureName.tsx`
2. Use glassmorphic styling and Framer Motion
3. Export as named export: `export const FeatureName = () => { ... }`
4. Import in page: `import { FeatureName } from "@/components/FeatureName";`

### Modifying Colors

Edit `src/index.css` in the `:root` section:

```css
:root {
  --custom-color: 200 80% 60%; /* HSL values only */
}
```

Then use in Tailwind: `bg-[hsl(var(--custom-color))]`

Or add to `tailwind.config.ts`:

```typescript
colors: {
  custom: {
    DEFAULT: "hsl(var(--custom-color))",
  },
}
```

## Testing & Quality

### Linting

ESLint is configured with:
- React Hooks rules
- React Refresh warnings
- Unused variables disabled (`@typescript-eslint/no-unused-vars: "off"`)

Run: `npm run lint`

### Build

Production build outputs to `dist/`:
```bash
npm run build
```

Development build:
```bash
npm run build:dev
```

## Git Workflow

The repository uses standard Git practices:

1. Work on feature branches with prefix `claude/`
2. Commit with descriptive messages
3. Push to remote: `git push -u origin <branch-name>`

**Current branch**: `claude/claude-md-mi1en02rg0g62g53-01NoFa2RqbfGzh9jYQnQ62Z4`

## Performance Considerations

### Vite Optimization

- Uses SWC for React compilation (`@vitejs/plugin-react-swc`)
- Fast HMR (Hot Module Replacement)
- Tree-shaking in production builds

### React Optimization

- Use React.memo() for expensive components
- Leverage TanStack Query for data caching
- Framer Motion animations are GPU-accelerated

## Common Pitfalls & Solutions

### 1. Import Path Issues

**Problem**: Module not found errors
**Solution**: Use `@/` alias, verify path in `tsconfig.json`

### 2. TypeScript Errors

**Problem**: Strict type errors
**Solution**: Project uses lenient settings; avoid over-typing

### 3. Styling Not Applying

**Problem**: Tailwind classes not working
**Solution**:
- Verify class exists in Tailwind
- Check if custom utility is defined in `index.css`
- Run `npm run dev` to regenerate styles

### 4. Glass Effect Not Visible

**Problem**: Glassmorphic cards look wrong
**Solution**:
- Ensure `glass-card` class is applied
- Check backdrop-blur support in browser
- Verify CSS variables are defined in `:root`

## Environment & Deployment

### Development
- Server: `localhost:8080`
- Hot reload enabled
- Source maps available

### Production
- Build command: `npm run build`
- Output: `dist/` directory
- Static site ready for deployment

## Dependencies Management

### Package Manager

Both npm and bun are supported:
- `package-lock.json` for npm
- `bun.lockb` for bun

When installing new packages:
```bash
npm install <package>
# or
bun add <package>
```

### Updating Dependencies

```bash
npm update
# or
bun update
```

## AI Assistant Guidelines

### When Modifying Code

1. **Preserve Design System**: Always use existing color variables and utilities
2. **Match Animation Style**: Use Framer Motion with similar timing/easing
3. **Follow Component Patterns**: Export as named or default per convention
4. **Use Path Aliases**: Always use `@/` imports
5. **Maintain Glassmorphic Aesthetic**: Apply glass effects to new components
6. **Respect TypeScript Settings**: Don't add strict types unnecessarily

### When Adding Features

1. **Check Existing Components**: Reuse shadcn/ui components when possible
2. **Follow File Organization**: Place files in correct directories
3. **Update Routes Properly**: Add before catch-all route
4. **Test Responsiveness**: Ensure mobile compatibility
5. **Add Animations**: Use Framer Motion for smooth UX

### When Debugging

1. **Check Console**: Vite provides detailed error messages
2. **Verify Imports**: Path alias issues are common
3. **Inspect CSS Variables**: HSL color definitions in `:root`
4. **Review Component Tree**: Use React DevTools
5. **Check Build Output**: Run production build to catch issues

## Resources & Documentation

- [Vite Documentation](https://vitejs.dev/)
- [React Documentation](https://react.dev/)
- [Tailwind CSS](https://tailwindcss.com/)
- [shadcn/ui](https://ui.shadcn.com/)
- [Framer Motion](https://www.framer.com/motion/)
- [React Three Fiber](https://docs.pmnd.rs/react-three-fiber/)
- [TanStack Query](https://tanstack.com/query/latest)

---

**Last Updated**: 2025-11-16
**Maintained By**: AI assistants working with the PythiaLabs repository
**Purpose**: Guide AI assistants in understanding and modifying the codebase effectively
