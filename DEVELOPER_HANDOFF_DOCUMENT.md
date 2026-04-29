# Jewellery Shop - Complete Developer Handoff Document

## 1. Project Overview

### What this project does
A comprehensive multi-vendor jewellery e-commerce platform that connects customers with verified jewellery vendors. The platform enables customers to browse, compare, and purchase jewellery products, submit custom design requests, and manage their orders. Vendors can manage their inventory, process orders, and respond to custom requests.

### Main purpose/business use case
- **Multi-vendor marketplace**: Connect jewellery sellers with buyers
- **Custom jewellery requests**: Enable customers to request bespoke designs
- **Price comparison**: Allow customers to compare products across vendors
- **Vendor management**: Provide tools for vendors to manage their business
- **Admin oversight**: Give administrators control over users, products, and platform operations

### Current development stage
**MVP to Beta stage** - Core functionality is implemented but needs refinement and production-ready features. The application has a working authentication system, product catalog, custom request workflow, and basic admin functions.

---

## 2. Tech Stack

### Frontend framework and libraries
- **React 18.3.1** with **Vite** as build tool
- **React Router 6.30.3** for navigation
- **TypeScript** support (though mostly using JSX)
- **Radix UI** components for accessibility
- **TailwindCSS** for styling (migrating to CSS Modules)
- **shadcn/ui** component library
- **React Hook Form** with **Zod** validation
- **TanStack React Query** for data fetching
- **Axios** for API calls
- **Lucide React** for icons
- **Recharts** for analytics

### Backend framework
- **Node.js Express** server (ES modules)
- **MongoDB** with **Mongoose ODM**
- **JWT** for authentication
- **Cookie-based sessions**
- **Multer** for file uploads
- **bcrypt** for password hashing
- **nodemailer** for emails
- **cors** for cross-origin requests

### Database and ORM
- **MongoDB** as primary database
- **Mongoose** as ODM with proper schema validation
- **Indexes** for performance optimization
- **Referential integrity** through ObjectId references

### Authentication system
- **JWT tokens** stored in HTTP-only cookies
- **Role-based access control** (user, vendor, admin)
- **Vendor approval workflow** (pending → approved/rejected)
- **Password hashing** with bcrypt
- **Middleware protection** for routes

### Styling framework
- **TailwindCSS** (being migrated to CSS Modules)
- **CSS Modules** for component-scoped styles
- **Radix UI** for accessible component primitives
- **Responsive design** with mobile-first approach

### State management
- **React Context** for global state (Auth, Cart, Compare)
- **Local state** with useState/useReducer
- **React Query** for server state management
- **Cookies** for session persistence

### API architecture
- **RESTful API** design
- **Express.js** router structure
- **Middleware** for authentication and validation
- **Error handling** with proper HTTP status codes
- **File upload** support for images

### Deployment setup
- **Development**: Frontend on localhost:5173, Backend on localhost:5000
- **CORS** configured for both ports
- **Environment variables** for configuration
- **Static file serving** for uploaded images

---

## 3. Full Folder/Architecture Breakdown

### Frontend Structure (`frontend/src/`)

#### `/components/`
- **Layout components**: `CustomerLayout.jsx`, `VendorLayout.jsx`, `AdminLayout.jsx`
- **UI components**: Product cards, modals, forms, navigation
- **Business components**: `CustomRequestCard.jsx`, `VendorCustomRequestCard.jsx`, `ProductCard.jsx`
- **Modal components**: `EstimateModal.jsx`, `ConvertToProductModal.jsx`, `RequestDetailsModal.jsx`
- **Utility components**: `StatCard.jsx`, `LoginPrompt.jsx`, `MetalPrices.jsx`
- **UI library**: `/ui/` folder with shadcn/ui components (49 components)

#### `/pages/`
- **Customer pages**: Index, Products, Cart, Checkout, Orders, Profile, CustomRequest
- **Vendor pages**: Dashboard, AddProduct, ManageProducts, Orders, Analytics, CustomRequests
- **Admin pages**: Dashboard, Users, Vendors, Products, Orders, Reports
- **Auth pages**: Login, Register, VendorRegister
- **Utility pages**: NotFound, Compare

#### `/context/`
- **AuthContext.jsx**: User authentication state
- **CartContext.jsx**: Shopping cart management
- **CompareContext.jsx**: Product comparison functionality

#### `/hooks/`
- **use-mobile.jsx**: Mobile detection hook
- **use-toast.js**: Toast notification hook

#### `/lib/`
- Utility functions and configurations

#### `/utils/`
- Helper functions and utilities

#### `/assets/`
- Static assets (images, icons)

#### `/data/`
- Static data and mock data

### Backend Structure (`backend/`)

#### `/controllers/`
- **authController.js**: User registration, login, logout
- **productController.js**: Product CRUD operations
- **orderController.js**: Order management and processing
- **customRequestController.js**: Custom request workflow
- **vendorController.js**: Vendor management
- **adminController.js**: Admin operations
- **analyticsController.js**: Business analytics
- **cartController.js**: Shopping cart operations
- **reviewController.js**: Product reviews
- **metalController.js**: Metal price management

#### `/models/`
- **User.js**: User schema with roles (user/vendor/admin)
- **Product.js**: Product catalog with vendor relationships
- **Order.js**: Order management with multi-vendor support
- **CustomRequest.js**: Custom design request workflow
- **Vendor.js**: Vendor business information
- **Review.js**: Product review system

#### `/routes/`
- **authRoutes.js**: Authentication endpoints
- **productRoutes.js**: Product management endpoints
- **orderRoutes.js**: Order processing endpoints
- **customRequestRoutes.js**: Custom request endpoints
- **vendorRoutes.js**: Vendor management endpoints
- **adminRoutes.js**: Admin-only endpoints
- **cartRoutes.js**: Cart operations
- **reviewRoutes.js**: Review management
- **analyticsRoutes.js**: Analytics endpoints
- **metalRoutes.js**: Metal price endpoints

#### `/middleware/`
- **authMiddleware.js**: JWT authentication and role-based access

#### `/config/`
- **db.js**: MongoDB connection configuration

#### `/utils/`
- **uploadConfig.js**: File upload configuration
- **generateToken.js**: JWT token generation

#### `/uploads/`
- Image storage for products and custom requests

---

## 4. Current Features Implemented

### Authentication System ✅
**What works**:
- User registration (customer, vendor, admin)
- Login/logout with JWT cookies
- Role-based access control
- Vendor approval workflow
- Password hashing and validation

**What is partially implemented**:
- Email verification (not implemented)
- Password reset (not implemented)
- Two-factor authentication (not implemented)

**What is missing**:
- Social login options
- Account deletion
- Session management UI

### Product Management ✅
**What works**:
- Product CRUD for vendors
- Product catalog browsing
- Image uploads for products
- Product categorization
- Search and filtering
- Product comparison

**What is partially implemented**:
- Advanced search (basic only)
- Product recommendations (not implemented)
- Inventory management (basic only)

**What is missing**:
- Bulk product operations
- Product variants
- Advanced analytics

### Custom Request Workflow ✅
**What works**:
- Customer can submit custom requests
- Vendors can provide estimates
- Customer can approve/reject estimates
- Vendors can convert approved requests to products
- File upload for design images

**What is partially implemented**:
- Request tracking (basic only)
- Communication between customer and vendor (limited)

**What is missing**:
- Real-time chat
- Request status notifications
- Design revision workflow

### Order Management ✅
**What works**:
- Order creation from cart
- Multi-vendor order support
- Order status tracking
- Payment status management
- Order cancellation
- Vendor order processing

**What is partially implemented**:
- Payment gateway integration (not implemented)
- Shipping integration (not implemented)
- Order analytics (basic only)

**What is missing**:
- Return/refund workflow
- Order modification
- Bulk order operations

### Shopping Cart ✅
**What works**:
- Add/remove products
- Quantity management
- Cart persistence
- Checkout process
- Multi-vendor cart support

**What is partially implemented**:
- Cart sharing (not implemented)
- Saved carts (not implemented)

**What is missing**:
- Cart abandonment recovery
- Promo code support

### Vendor Management ✅
**What works**:
- Vendor registration with business details
- Vendor approval workflow
- Product management
- Order processing
- Sales analytics (basic)
- Custom request handling

**What is partially implemented**:
- Vendor verification (basic only)
- Performance analytics (limited)

**What is missing**:
- Vendor dashboard customization
- Advanced reporting
- Commission management

### Admin Features ✅
**What works**:
- User management
- Vendor approval/rejection
- Product management
- Order oversight
- Basic analytics
- System reports

**What is partially implemented**:
- Advanced analytics (limited)
- System configuration (basic only)

**What is missing**:
- Content management
- Advanced reporting
- System monitoring

### Review System ✅
**What works**:
- Product reviews
- Rating calculation
- Verified purchase validation
- Vendor responses
- Review moderation

**What is partially implemented**:
- Review analytics (basic only)

**What is missing**:
- Review helpfulness voting
- Photo reviews
- Review incentives

---

## 5. Route Map

### Customer Routes
| Route Path | Page Component | Purpose | Protected | Related API Endpoints |
|------------|----------------|---------|-----------|----------------------|
| `/` | Index | Homepage with featured products | Public | GET /api/products |
| `/products` | ProductsPage | Product catalog | Public | GET /api/products |
| `/product/:id` | ProductDetailPage | Product details | Public | GET /api/products/:id |
| `/compare` | ComparePage | Product comparison | Public | - |
| `/cart` | CartPage | Shopping cart | Protected | GET/POST /api/cart |
| `/checkout` | CheckoutPage | Order checkout | Protected | POST /api/orders |
| `/orders` | OrdersPage | Order history | Protected | GET /api/orders/my |
| `/profile` | ProfilePage | User profile | Protected | GET /api/auth/me |
| `/custom-request` | CustomRequestPage | Submit custom request | Protected | POST /api/custom-requests |
| `/custom-requests` | CustomRequestsPage | My custom requests | Protected | GET /api/custom-requests/my |

### Authentication Routes
| Route Path | Page Component | Purpose | Protected | Related API Endpoints |
|------------|----------------|---------|-----------|----------------------|
| `/login` | LoginPage | User login | Public | POST /api/auth/login |
| `/register` | RegisterPage | User registration | Public | POST /api/auth/register |
| `/register/vendor` | VendorRegisterPage | Vendor registration | Public | POST /api/auth/register |

### Vendor Routes
| Route Path | Page Component | Purpose | Protected | Related API Endpoints |
|------------|----------------|---------|-----------|----------------------|
| `/vendor` | VendorDashboard | Vendor dashboard | Vendor | GET /api/analytics |
| `/vendor/add-product` | AddProductPage | Add new product | Vendor | POST /api/products |
| `/vendor/products` | ManageProductsPage | Manage products | Vendor | GET /api/products/my |
| `/vendor/orders` | VendorOrdersPage | Vendor orders | Vendor | GET /api/orders/vendor/my |
| `/vendor/inventory` | InventoryPage | Inventory management | Vendor | - |
| `/vendor/analytics` | SalesAnalyticsPage | Sales analytics | Vendor | GET /api/analytics |
| `/vendor/custom-requests` | VendorCustomRequestsPage | Custom requests | Vendor | GET /api/custom-requests/vendor |
| `/vendor/approved-requests` | ApprovedCustomRequestsPage | Approved requests | Vendor | GET /api/custom-requests/vendor |

### Admin Routes
| Route Path | Page Component | Purpose | Protected | Related API Endpoints |
|------------|----------------|---------|-----------|----------------------|
| `/admin` | AdminDashboard | Admin dashboard | Admin | GET /api/analytics |
| `/admin/users` | ManageUsersPage | User management | Admin | GET /api/admin/users |
| `/admin/vendors` | ManageVendorsPage | Vendor management | Admin | GET /api/admin/vendors |
| `/admin/products` | AdminProductsPage | Product management | Admin | GET /api/admin/products |
| `/admin/orders` | AdminOrdersPage | Order management | Admin | GET /api/orders |
| `/admin/reports` | ReportsPage | System reports | Admin | GET /api/analytics |

---

## 6. Data Models / Database

### User Model
**Purpose**: Core user authentication and profile management
**Key Fields**:
- `username`, `email`, `password` (authentication)
- `role` (user/vendor/admin)
- `firstName`, `lastName`, `phone`, `dob`, `gender` (profile)
- `address` (shipping/billing)
- `isApproved` (vendor approval status)
- `wishlist`, `cart`, `orders` (relationships)

**Relations**: One-to-one with Vendor (for vendors), One-to-many with Orders, Products (as vendor)

### Product Model
**Purpose**: Product catalog and inventory
**Key Fields**:
- `name`, `description`, `category` (basic info)
- `price`, `comparePrice`, `weight`, `purity` (jewelry specifics)
- `stock`, `sku`, `hallmark` (inventory)
- `images` (product photos)
- `vendor` (reference to vendor)
- `status` (draft/active)
- `isCustom` (custom product flag)
- `averageRating`, `reviewCount` (reviews)

**Relations**: Many-to-one with Vendor (via User), One-to-many with Reviews, OrderItems

### Order Model
**Purpose**: Order processing and management
**Key Fields**:
- `customer` (customer reference)
- `items` (order items with product, quantity, price)
- `subtotal`, `tax`, `shipping`, `discount`, `total` (pricing)
- `shippingAddress`, `billingAddress` (addresses)
- `status` (pending/confirmed/processing/shipped/delivered/cancelled)
- `paymentStatus`, `paymentMethod` (payment info)
- `vendors` (multi-vendor support)
- `trackingNumber`, `estimatedDelivery` (shipping)

**Relations**: Many-to-one with Customer (User), One-to-many with Reviews

### CustomRequest Model
**Purpose**: Custom jewelry request workflow
**Key Fields**:
- `customer`, `vendor` (participants)
- `title`, `description`, `designImage` (request details)
- `status` (pending/under_review/estimated/approved/rejected/converted/ordered)
- `estimate` (vendor's price estimate)
- `customerResponse` (customer decision)
- `convertedProduct` (resulting product)

**Relations**: Many-to-one with Customer and Vendor (both Users), One-to-one with Product (when converted)

### Vendor Model
**Purpose**: Vendor business information
**Key Fields**:
- `user` (reference to User)
- `shopName`, `shopType`, `yearsInBusiness` (business info)
- `gstNumber`, `panNumber`, `bisHallmark` (legal documents)
- `bankName`, `accountNumber`, `ifscCode` (bank details)
- `isVerified`, `verificationDocuments` (verification status)
- `totalProducts`, `totalSales`, `averageRating` (performance)

**Relations**: One-to-one with User, One-to-many with Products

### Review Model
**Purpose**: Product review system
**Key Fields**:
- `customer`, `product`, `order` (review context)
- `rating`, `title`, `content` (review content)
- `images` (review photos)
- `helpful`, `notHelpful` (voting)
- `isVerifiedPurchase` (verification flag)
- `status` (pending/approved/rejected/hidden)
- `vendorResponse` (vendor reply)

**Relations**: Many-to-one with Customer, Product, Order

---

## 7. Component Dependency Map

### Core Layout Components
**CustomerLayout.jsx** → 
- Navigation components
- Cart dropdown
- User profile menu
- Metal price ticker

**VendorLayout.jsx** → 
- Vendor navigation
- Quick stats
- Notification center

**AdminLayout.jsx** → 
- Admin navigation
- System status
- Quick actions

### Business Logic Components
**ProductCard.jsx** → 
- Used in: Index, ProductsPage, ComparePage
- Dependencies: CartContext, CompareContext
- Impacts: Cart operations, Product comparison

**CustomRequestCard.jsx** → 
- Used in: CustomRequestsPage
- Dependencies: AuthContext
- Impacts: Custom request workflow

**VendorCustomRequestCard.jsx** → 
- Used in: VendorCustomRequestsPage
- Dependencies: AuthContext
- Impacts: Estimate submission workflow

### Modal Components
**EstimateModal.jsx** → 
- Used in: VendorCustomRequestCard
- Dependencies: Custom request data
- Impacts: Custom request pricing

**ConvertToProductModal.jsx** → 
- Used in: VendorCustomRequestCard
- Dependencies: Custom request, Product creation
- Impacts: Product catalog

**RequestDetailsModal.jsx** → 
- Used in: CustomRequestCard, VendorCustomRequestCard
- Dependencies: Request status, workflow
- Impacts: Request tracking

### Context Dependencies
**AuthContext** → 
- Used by: All protected pages
- Provides: User state, login/logout
- Critical for: Route protection, role-based UI

**CartContext** → 
- Used by: ProductCard, CartPage, CheckoutPage
- Provides: Cart state, cart operations
- Critical for: E-commerce functionality

**CompareContext** → 
- Used by: ProductCard, ComparePage
- Provides: Product comparison state
- Critical for: Comparison feature

---

## 8. Current Problem Areas / Technical Debt

### High Priority Issues

#### 1. Hardcoded API URLs
**Problem**: API URLs are hardcoded to localhost:5000
**Impact**: Will break in production deployment
**Files affected**: 
- `frontend/src/context/AuthContext.jsx`
- `frontend/src/pages/CustomRequestPage.jsx`
- All API calling components

#### 2. Incomplete CSS Modules Migration
**Problem**: 77% migrated to CSS Modules, 6 components still using Tailwind
**Impact**: Inconsistent styling, maintenance issues
**Components remaining**:
- Index.jsx (31 Tailwind classes)
- VendorRegisterPage.jsx (38 Tailwind classes)
- ProfilePage.jsx (26 Tailwind classes)
- AdminDashboard.jsx (17 Tailwind classes)
- ReportsPage.jsx (4 Tailwind classes)
- OrdersPage.jsx (minimal Tailwind usage)

#### 3. Missing Error Handling
**Problem**: No global error boundary, limited error recovery
**Impact**: Poor user experience, difficult debugging
**Areas affected**: All API calls, form submissions

#### 4. No Environment Configuration
**Problem**: Environment variables not properly configured
**Impact**: Security risks, deployment issues
**Files affected**: All API calling components

### Medium Priority Issues

#### 5. Limited Loading States
**Problem**: Inconsistent loading indicators
**Impact**: Poor user experience during data fetching
**Areas affected**: Product listings, order processing, custom requests

#### 6. No Input Validation
**Problem**: Forms lack comprehensive validation
**Impact**: Data integrity issues, user frustration
**Areas affected**: Registration, custom requests, product creation

#### 7. Missing Search Functionality
**Problem**: Basic search only, no advanced filtering
**Impact**: Limited product discovery
**Areas affected**: ProductsPage, Index

#### 8. No Payment Integration
**Problem**: Payment processing not implemented
**Impact**: Cannot complete actual transactions
**Areas affected**: CheckoutPage, order processing

### Low Priority Issues

#### 9. Limited Testing
**Problem**: No automated tests
**Impact**: Regression risks, difficult maintenance
**Areas affected**: Entire application

#### 10. No Analytics Implementation
**Problem**: User behavior tracking not implemented
**Impact**: Limited business insights
**Areas affected**: Marketing, product decisions

---

## 9. Safe Editing Guide

### Files That Require Extreme Caution

#### Authentication Files
**`backend/controllers/authController.js`**
- **Risk**: Breaking all user authentication
- **Dependencies**: All protected routes
- **Safe approach**: Test authentication flows after any changes

**`frontend/src/context/AuthContext.jsx`**
- **Risk**: Breaking user session management
- **Dependencies**: All protected pages
- **Safe approach**: Verify login/logout flows work

#### Database Models
**`backend/models/User.js`**
- **Risk**: Breaking user data, authentication
- **Dependencies**: All user-related functionality
- **Safe approach**: Create migration scripts, test with sample data

**`backend/models/Order.js`**
- **Risk**: Breaking order processing, financial data
- **Dependencies**: Checkout, order management, analytics
- **Safe approach**: Test order creation and status updates

#### Core Routes
**`backend/server.js`**
- **Risk**: Breaking entire API
- **Dependencies**: All frontend-backend communication
- **Safe approach**: Test all API endpoints after changes

### Files That Affect Many Features

#### Layout Components
**`frontend/src/components/CustomerLayout.jsx`**
- **Risk**: Breaking all customer-facing pages
- **Dependencies**: All customer routes
- **Safe approach**: Test navigation, cart, user menu

**`frontend/src/components/VendorLayout.jsx`**
- **Risk**: Breaking all vendor pages
- **Dependencies**: All vendor routes
- **Safe approach**: Test vendor navigation and quick actions

#### API Controllers
**`backend/controllers/productController.js`**
- **Risk**: Breaking product catalog
- **Dependencies**: Product browsing, vendor management, cart
- **Safe approach**: Test product CRUD operations

**`backend/controllers/orderController.js`**
- **Risk**: Breaking order processing
- **Dependencies**: Checkout, order management, vendor operations
- **Safe approach**: Test order creation and status updates

### Areas Where Changes Could Break Other Flows

#### Custom Request Workflow
**Files**: `customRequestController.js`, `CustomRequestPage.jsx`, `VendorCustomRequestCard.jsx`
- **Risk**: Breaking custom request pipeline
- **Dependencies**: Customer requests, vendor estimates, product conversion
- **Safe approach**: Test complete request-to-product flow

#### Cart and Checkout
**Files**: `cartController.js`, `CartContext.jsx`, `CheckoutPage.jsx`
- **Risk**: Breaking purchase flow
- **Dependencies**: Product browsing, order creation, payment processing
- **Safe approach**: Test add-to-cart through checkout

#### Vendor Management
**Files**: `vendorController.js`, `VendorRegisterPage.jsx`, vendor dashboard pages
- **Risk**: Breaking vendor operations
- **Dependencies**: Vendor registration, product management, order processing
- **Safe approach**: Test vendor registration and product creation

---

## 10. Feature Change Protocol

### Before Making Changes

#### 1. Audit Impacted Files
```bash
# Find all files that use the component/function
grep -r "ComponentName" src/
grep -r "apiEndpoint" src/
grep -r "functionName" src/
```

#### 2. Understand Dependencies
- Identify which components depend on the target
- Check if the change affects data models
- Verify if API contracts will change
- Consider impact on authentication/authorization

#### 3. Plan Minimal Changes
- Start with the smallest possible change
- Avoid breaking existing APIs
- Maintain backward compatibility when possible
- Use feature flags for major changes

### During Development

#### 1. Make Incremental Edits
- Change one thing at a time
- Test after each significant change
- Commit frequently with descriptive messages
- Keep changes focused and minimal

#### 2. Preserve Existing UI
- Don't change layouts unless requested
- Maintain existing component structure
- Keep styling consistent with current design
- Respect existing user workflows

#### 3. Test Thoroughly
- Test the specific feature being changed
- Test related features that might be affected
- Test with different user roles
- Test edge cases and error conditions

### After Making Changes

#### 1. Verify Core Functionality
- Authentication still works
- Navigation functions properly
- Key user flows are intact
- No console errors

#### 2. Test Cross-Feature Impact
- Product browsing still works
- Cart operations function
- Order processing works
- Vendor operations unaffected

#### 3. Document Changes
- Update relevant documentation
- Add comments for complex logic
- Note any breaking changes
- Update API documentation if needed

### Change Priority Guidelines

#### 1. Bug Fixes (High Priority)
- Fix security issues immediately
- Fix broken functionality before adding features
- Address data integrity issues first
- Resolve user experience problems

#### 2. Feature Enhancements (Medium Priority)
- Improve existing workflows
- Add requested functionality
- Enhance user experience
- Optimize performance

#### 3. Refactoring (Low Priority)
- Clean up code only when stable
- Improve architecture without breaking features
- Add tests before refactoring
- Get approval for major architectural changes

---

## 11. Current Git/Code State Summary

### Clean Areas
- **No TODO/FIXME comments found** - Code is relatively clean
- **No console.log statements** - Production-ready logging
- **No obvious dead code** - Most code appears to be in use

### Areas Needing Attention

#### 1. Environment Configuration
**Status**: Missing proper environment setup
**Risk**: Production deployment issues
**Action**: Create .env templates, configure environment variables

#### 2. API URL Hardcoding
**Status**: Multiple hardcoded localhost URLs
**Risk**: Production breakage
**Action**: Create environment-based API configuration

#### 3. CSS Migration Incomplete
**Status**: 6 components still using Tailwind
**Risk**: Inconsistent styling
**Action**: Complete CSS Modules migration

#### 4. Error Handling
**Status**: Limited error boundaries and recovery
**Risk**: Poor user experience
**Action**: Implement global error handling

### Development State
- **Active development**: Features are being actively worked on
- **MVP stage**: Core functionality implemented, needs refinement
- **Production roadmap**: Detailed plan exists in PRODUCTION_EXCELLENCE_ROADMAP.md
- **Code quality**: Generally good structure, some technical debt

---

## 12. "How To Continue Development" Summary

### For New AI Assistant Joining The Project

#### Immediate Priorities (First Week)
1. **Fix API Configuration**
   - Create environment-based API URL configuration
   - Set up proper .env files for development/production
   - Test all API endpoints with new configuration

2. **Complete CSS Migration**
   - Migrate remaining 6 components to CSS Modules
   - Ensure visual consistency across the application
   - Test responsive design after migration

3. **Implement Error Handling**
   - Add global error boundary component
   - Implement proper error recovery mechanisms
   - Add user-friendly error messages

#### Understanding The Codebase

#### Key Architectural Patterns
- **Role-based routing**: Different layouts for customer/vendor/admin
- **Context-based state**: Auth, Cart, Compare contexts for global state
- **RESTful API**: Clean separation between frontend and backend
- **Multi-vendor support**: Complex order and product relationships

#### Critical Business Logic
- **Custom Request Workflow**: Customer request → Vendor estimate → Customer approval → Product conversion
- **Multi-vendor Orders**: Single order can span multiple vendors
- **Vendor Approval**: Vendors must be approved before accessing features
- **Review System**: Verified purchase validation for reviews

#### Data Flow Understanding
1. **Authentication Flow**: Login → JWT cookie → AuthContext → Route protection
2. **Product Flow**: Vendor creates product → Product catalog → Customer browsing → Cart → Order
3. **Custom Request Flow**: Customer submits → Vendor estimates → Customer decides → Product conversion

#### Development Environment Setup
1. **Backend**: `cd backend && npm install && npm run dev`
2. **Frontend**: `cd frontend && npm install && npm run dev`
3. **Database**: MongoDB connection required (configure in .env)
4. **Ports**: Backend on 5000, Frontend on 5173

#### Testing Strategy
1. **Manual Testing**: Test all user flows for different roles
2. **Cross-browser Testing**: Ensure Chrome, Firefox, Safari compatibility
3. **Mobile Testing**: Verify responsive design on mobile devices
4. **API Testing**: Test all endpoints with proper authentication

#### Common Pitfalls to Avoid
1. **Don't break authentication**: Always test login/logout after changes
2. **Don't hardcode URLs**: Use environment configuration
3. **Don't ignore role-based access**: Test with different user roles
4. **Don't break custom request flow**: Test complete workflow
5. **Don't ignore mobile responsiveness**: Test on different screen sizes

#### Code Style Guidelines
1. **Use functional components**: Prefer React functional components with hooks
2. **Follow existing patterns**: Use similar structure to existing components
3. **Maintain CSS Modules**: Continue the CSS Modules migration
4. **Use TypeScript types**: Add types when creating new components
5. **Follow REST conventions**: Maintain consistent API endpoint patterns

#### Before Making Any Changes
1. **Read the existing code**: Understand current implementation
2. **Check dependencies**: Identify what might be affected
3. **Test current state**: Verify functionality works before changing
4. **Plan the change**: Have clear understanding of what needs to be done
5. **Start small**: Make minimal changes first

---

## 13. Files I Should Inspect First Before Making Any Edits

### Critical Files (Read First)
1. **`backend/server.js`** - Main server configuration and route setup
2. **`frontend/src/App.jsx`** - Main application routing and context setup
3. **`backend/middleware/authMiddleware.js`** - Authentication and authorization logic
4. **`frontend/src/context/AuthContext.jsx`** - Client-side authentication state
5. **`backend/models/User.js`** - Core user model and relationships

### Configuration Files (Understand Setup)
6. **`backend/config/db.js`** - Database connection configuration
7. **`backend/.env`** - Environment variables (if exists)
8. **`frontend/vite.config.js`** - Frontend build configuration
9. **`backend/package.json`** - Backend dependencies and scripts
10. **`frontend/package.json`** - Frontend dependencies and scripts

### Key Business Logic Files
11. **`backend/controllers/customRequestController.js`** - Custom request workflow
12. **`backend/controllers/orderController.js`** - Order processing logic
13. **`backend/controllers/productController.js`** - Product management
14. **`frontend/src/pages/CustomRequestPage.jsx`** - Custom request UI
15. **`frontend/src/pages/CheckoutPage.jsx`** - Checkout process

### Layout and Navigation
16. **`frontend/src/components/CustomerLayout.jsx`** - Customer-facing layout
17. **`frontend/src/components/VendorLayout.jsx`** - Vendor dashboard layout
18. **`frontend/src/components/AdminLayout.jsx`** - Admin interface layout

### Data Models (Understand Schema)
19. **`backend/models/Order.js`** - Order structure and relationships
20. **`backend/models/CustomRequest.js`** - Custom request schema
21. **`backend/models/Product.js`** - Product catalog structure
22. **`backend/models/Vendor.js`** - Vendor business information

### Styling and UI
23. **`frontend/src/index.css`** - Global styles and Tailwind configuration
24. **`frontend/PRODUCTION_EXCELLENCE_ROADMAP.md`** - Development roadmap and priorities

### Route Definitions
25. **`backend/routes/authRoutes.js`** - Authentication endpoints
26. **`backend/routes/productRoutes.js`** - Product management endpoints
27. **`backend/routes/orderRoutes.js`** - Order processing endpoints

### Before Editing Any Component:
1. **Check if it uses hardcoded API URLs** - Look for "localhost:5000"
2. **Verify authentication requirements** - Check for protected routes
3. **Understand data dependencies** - What API calls does it make?
4. **Check styling approach** - CSS Modules or Tailwind?
5. **Identify context usage** - Does it use Auth, Cart, or Compare context?

### Before Editing Any Controller:
1. **Check authentication middleware** - Is the route protected?
2. **Understand data validation** - What input validation exists?
3. **Check error handling** - How are errors managed?
4. **Verify database operations** - What Mongoose operations are used?
5. **Check response format** - What data structure is returned?

### Before Editing Any Model:
1. **Understand relationships** - What other models reference this?
2. **Check validation rules** - What constraints exist?
3. **Verify indexes** - What performance optimizations are in place?
4. **Check middleware** - Are there pre/post save hooks?
5. **Understand virtual fields** - What computed properties exist?

This comprehensive handoff document provides everything needed to safely continue development on this jewellery e-commerce platform while maintaining existing functionality and following established patterns.
