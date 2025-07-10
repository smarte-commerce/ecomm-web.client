# Next.js Multi-Vendor Ecommerce Platform

[![Deployed on Vercel](https://img.shields.io/badge/Deployed%20on-Vercel-black?style=for-the-badge&logo=vercel)](https://vercel.com/loiwibu2k4s-projects/v0-next-js-ecommerce-base)
[![Built with v0](https://img.shields.io/badge/Built%20with-v0.dev-black?style=for-the-badge)](https://v0.dev/chat/projects/0523vsmbQZm)
[![Next.js](https://img.shields.io/badge/Next.js-15.3-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4-38B2AC?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com/)

A modern, scalable multi-vendor ecommerce platform built with Next.js 15, featuring role-based authentication, real-time updates, and comprehensive vendor management capabilities.

## 🚀 Features

### 🛍️ Customer Experience
- **Modern Shopping Interface** - Clean, responsive design with intuitive navigation
- **Advanced Product Search** - Full-text search with filters, sorting, and pagination
- **Product Categories** - Hierarchical category browsing with dynamic filtering
- **Shopping Cart** - Persistent cart with guest support and quantity management
- **Wishlist** - Save products for later with user account integration
- **Product Reviews** - Customer reviews with ratings and verified purchase badges
- **Order Tracking** - Real-time order status updates and delivery tracking
- **Multi-language Support** - Internationalization with English and Spanish

### 🏪 Vendor Management
- **Vendor Dashboard** - Comprehensive analytics and sales reporting
- **Product Management** - Add, edit, and manage product inventory
- **Order Processing** - Order fulfillment and shipping management
- **Revenue Analytics** - Sales performance tracking and insights
- **Profile Management** - Vendor store customization and branding

### 👨‍💼 Admin Panel
- **User Management** - Customer and vendor account administration
- **Platform Analytics** - System-wide performance metrics and reporting
- **Content Management** - Homepage banners, categories, and promotions
- **Order Oversight** - Platform-wide order monitoring and dispute resolution
- **Revenue Management** - Commission tracking and payment processing

### 🔧 Technical Features
- **Role-Based Authentication** - Secure JWT-based auth with role-specific routing
- **Real-time Updates** - WebSocket integration for live notifications
- **Progressive Web App** - PWA capabilities with offline support
- **Responsive Design** - Mobile-first approach with Tailwind CSS
- **API Integration** - RESTful APIs with gRPC fallback support
- **State Management** - React Context with optimistic updates
- **Image Optimization** - Next.js Image component with lazy loading
- **SEO Optimized** - Server-side rendering with meta tag management

## 🏗️ Architecture

### Frontend Stack
- **Framework**: Next.js 15.3 with App Router
- **Language**: TypeScript 5.0
- **Styling**: Tailwind CSS 3.4 + shadcn/ui components
- **State Management**: React Context API
- **Authentication**: JWT with role-based access control
- **Real-time**: WebSocket client for live updates
- **Forms**: React Hook Form with Zod validation
- **HTTP Client**: Fetch API with error handling
- **Internationalization**: Custom i18n implementation

### Project Structure
\`\`\`
├── app/                    # Next.js App Router pages
│   ├── admin/             # Admin panel routes
│   ├── auth/              # Authentication pages
│   ├── customer/          # Customer dashboard
│   ├── products/          # Product pages
│   └── vendor/            # Vendor dashboard
├── components/            # Reusable UI components
│   ├── auth/             # Authentication components
│   ├── cart/             # Shopping cart components
│   ├── home/             # Homepage sections
│   ├── layout/           # Layout components
│   ├── products/         # Product-related components
│   ├── theme/            # Theme management
│   └── ui/               # shadcn/ui components
├── contexts/             # React Context providers
├── hooks/                # Custom React hooks
├── lib/                  # Utility libraries
│   ├── i18n/            # Internationalization
│   └── services/        # API clients
├── types/                # TypeScript type definitions
└── utils/                # Helper functions
\`\`\`

## 🚀 Getting Started

### Prerequisites
- Node.js 18.0 or later
- npm, yarn, or pnpm package manager
- Git for version control

### Installation

1. **Clone the repository**
   \`\`\`bash
   git clone https://github.com/your-username/nextjs-ecommerce-platform.git
   cd nextjs-ecommerce-platform
   \`\`\`

2. **Install dependencies**
   \`\`\`bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   \`\`\`

3. **Environment Setup**
   \`\`\`bash
   cp .env.example .env.local
   \`\`\`

4. **Configure environment variables**
   \`\`\`env
   # API Configuration
   NEXT_PUBLIC_API_BASE_URL=http://localhost:3001/api
   NEXT_PUBLIC_GRPC_ENDPOINT=http://localhost:50051
   NEXT_PUBLIC_WS_URL=ws://localhost:3001

   # Authentication
   JWT_SECRET=your-jwt-secret-key
   NEXTAUTH_SECRET=your-nextauth-secret
   NEXTAUTH_URL=http://localhost:3000

   # Database (if using)
   DATABASE_URL=postgresql://username:password@localhost:5432/ecommerce

   # Payment Processing
   STRIPE_PUBLIC_KEY=pk_test_...
   STRIPE_SECRET_KEY=sk_test_...

   # File Storage
   CLOUDINARY_CLOUD_NAME=your-cloud-name
   CLOUDINARY_API_KEY=your-api-key
   CLOUDINARY_API_SECRET=your-api-secret
   \`\`\`

5. **Run the development server**
   \`\`\`bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   \`\`\`

6. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 📱 User Roles & Access

### Customer (`/customer`)
- Browse and search products
- Manage shopping cart and wishlist
- Place and track orders
- Write product reviews
- Manage account settings

### Vendor (`/vendor`)
- Manage product inventory
- Process customer orders
- View sales analytics
- Customize store profile
- Handle customer inquiries

### Admin (`/admin`)
- Oversee platform operations
- Manage users and vendors
- Monitor system analytics
- Handle disputes and support
- Configure platform settings

## 🔧 Development

### Available Scripts
\`\`\`bash
# Development
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
npm run type-check   # Run TypeScript compiler

# Testing
npm run test         # Run unit tests
npm run test:e2e     # Run end-to-end tests
npm run test:watch   # Run tests in watch mode

# Code Quality
npm run format       # Format code with Prettier
npm run lint:fix     # Fix ESLint issues
npm run analyze      # Analyze bundle size
\`\`\`

### Code Style
- **ESLint** - Code linting with Next.js recommended rules
- **Prettier** - Code formatting with consistent style
- **TypeScript** - Strict type checking enabled
- **Husky** - Pre-commit hooks for code quality

### Component Guidelines
- Use TypeScript for all components
- Follow React best practices and hooks patterns
- Implement proper error boundaries
- Use shadcn/ui components when possible
- Ensure accessibility (WCAG 2.1 AA compliance)
- Write unit tests for complex logic

## 🚀 Deployment

### Vercel (Recommended)
1. Connect your GitHub repository to Vercel
2. Configure environment variables in Vercel dashboard
3. Deploy automatically on push to main branch

### Docker
\`\`\`bash
# Build Docker image
docker build -t nextjs-ecommerce .

# Run container
docker run -p 3000:3000 nextjs-ecommerce
\`\`\`

### Manual Deployment
\`\`\`bash
# Build the application
npm run build

# Start production server
npm run start
\`\`\`

## 🔒 Security

- **Authentication**: JWT-based with secure HTTP-only cookies
- **Authorization**: Role-based access control (RBAC)
- **Input Validation**: Zod schema validation on all forms
- **CSRF Protection**: Built-in Next.js CSRF protection
- **XSS Prevention**: Sanitized user inputs and CSP headers
- **Rate Limiting**: API rate limiting to prevent abuse

## 🌐 API Integration

### REST API Endpoints
\`\`\`typescript
// Products
GET    /api/products              # List products
GET    /api/products/:id          # Get product details
POST   /api/products              # Create product (vendor)
PUT    /api/products/:id          # Update product (vendor)
DELETE /api/products/:id          # Delete product (vendor)

// Orders
GET    /api/orders                # List user orders
POST   /api/orders                # Create new order
GET    /api/orders/:id            # Get order details
PUT    /api/orders/:id/status     # Update order status

// Authentication
POST   /api/auth/login            # User login
POST   /api/auth/register         # User registration
POST   /api/auth/logout           # User logout
GET    /api/auth/me               # Get current user
\`\`\`

### WebSocket Events
\`\`\`typescript
// Real-time notifications
'order:created'     # New order notification
'order:updated'     # Order status update
'product:updated'   # Product inventory change
'message:received'  # New customer message
\`\`\`

## 🧪 Testing

### Unit Tests
\`\`\`bash
npm run test
\`\`\`

### E2E Tests
\`\`\`bash
npm run test:e2e
\`\`\`

### Test Coverage
- Components: 85%+
- Utilities: 90%+
- API Routes: 80%+
- Overall: 85%+

## 📊 Performance

### Core Web Vitals
- **LCP**: < 2.5s (Largest Contentful Paint)
- **FID**: < 100ms (First Input Delay)
- **CLS**: < 0.1 (Cumulative Layout Shift)

### Optimization Features
- Image optimization with Next.js Image
- Code splitting and lazy loading
- Service worker for caching
- Bundle analysis and optimization
- Database query optimization

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Development Guidelines
- Follow the existing code style and patterns
- Write tests for new features
- Update documentation as needed
- Ensure all tests pass before submitting PR
- Use conventional commit messages

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

### Documentation
- [Next.js Documentation](https://nextjs.org/docs)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [shadcn/ui Documentation](https://ui.shadcn.com)

### Community
- [GitHub Issues](https://github.com/your-username/nextjs-ecommerce-platform/issues)
- [Discussions](https://github.com/your-username/nextjs-ecommerce-platform/discussions)
- [Discord Community](https://discord.gg/your-discord)

### Professional Support
For enterprise support and custom development, contact us at [support@yourcompany.com](mailto:support@yourcompany.com)

---

**Built with ❤️ using [v0.dev](https://v0.dev) and Next.js**

*Last updated: January 2025*
