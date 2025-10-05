# FutCheck - EA FC 25 Ultimate Team Companion

A comprehensive web application for EA FC 25 Ultimate Team players, providing player statistics, prices, squad building tools, SBC solutions, and more.

## 🌟 Features

### 🔍 Player Database

- Search and browse 15,000+ EA FC 25 players
- Detailed player statistics and attributes
- Real-time price tracking and market trends
- Player comparison tools
- Evolution tracking system

### ⚽ Squad Building Tools

- Interactive drag-and-drop squad builder
- Chemistry calculation and optimization
- Formation customization (35+ formations)
- AI-powered squad recommendations
- Custom tactics and player roles

### 🏆 SBC (Squad Building Challenges)

- Complete SBC database with requirements
- Community-shared solutions
- Cost calculation and optimization
- Challenge difficulty ratings
- Reward tracking

### 📈 Market Analysis

- Price history and trend analysis
- Investment recommendations
- Market momentum indicators
- Player value predictions
- Portfolio tracking

### 🎮 Interactive Features

- StatClash mini-game
- Player evolution simulator
- Squad chemistry calculator
- Formation analyzer
- Team building wizard

### 👤 User Features

- Google OAuth authentication
- Personal club management
- Saved squads and lineups
- Premium subscription features
- Cross-device synchronization

## 🚀 Quick Start

### Prerequisites

- Node.js 16+ and npm
- Modern web browser
- Backend API server (optional for development)

### Installation

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd futcheck
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Configure environment variables**

   ```bash
   cp .env.example .env
   # Edit .env with your configuration
   ```

4. **Start development server**

   ```bash
   npm start
   ```

   Open [http://localhost:3000](http://localhost:3000) to view the app.

## 🛠️ Tech Stack

### Frontend

- **React 18** - Modern React with hooks and context
- **Redux Toolkit** - Predictable state management
- **React Router v6** - Client-side routing
- **Tailwind CSS** - Utility-first CSS framework
- **React Query** - Server state management and caching

### Key Libraries

- **React DnD** - Drag and drop functionality
- **Recharts** - Data visualization
- **React Helmet** - SEO optimization
- **PayPal SDK** - Payment processing
- **Google OAuth** - Authentication

### Development Tools

- **Create React App** - Build tooling
- **ESLint** - Code linting
- **Jest** - Testing framework
- **React Testing Library** - Component testing

## 📁 Project Structure

```
src/
├── api/                    # API services and configuration
│   ├── apiService.js      # Main API endpoints
│   ├── authService.js     # Authentication services
│   └── axiosclient.js     # Axios configuration
├── components/            # React components
│   ├── common/           # Shared components
│   ├── club/             # User club management
│   ├── evos/             # Evolution system
│   ├── games/            # Mini-games
│   ├── market/           # Market analysis
│   ├── sbc/              # SBC tools
│   ├── squadBuilder/     # Squad building
│   ├── squadWizard/      # AI recommendations
│   └── utils/            # Utilities and constants
├── redux/                # State management
│   ├── store.js          # Redux store configuration
│   └── *Slice.js         # Feature-specific slices
└── assets/               # Static assets
```

## ⚙️ Configuration

### Environment Variables

Create a `.env` file in the root directory:

```env
# API Configuration
REACT_APP_API_URL=http://localhost:8000/

# Analytics
REACT_APP_GOOGLE_ANALYTICS_ID=your-ga-id

# Authentication
REACT_APP_GOOGLE_OAUTH_CLIENT_ID=your-oauth-client-id

# CDN & Assets
REACT_APP_CDN_BASE_URL=https://cdn.futcheck.com/assets/img/fc26
REACT_APP_EA_BASE_URL=https://www.ea.com/ea-sports-fc/ultimate-team/web-app/content/...

# Payment (Premium features)
REACT_APP_PAYPAL_CLIENT_ID=your-paypal-client-id

# External Services
REACT_APP_GOOGLE_ADSENSE_ACCOUNT=your-adsense-account
```

**Important**: Never commit the `.env` file to version control. Use `.env.example` for documentation.

## 🔌 API Integration

The app integrates with a Django REST API backend. Key endpoints:

- **Players**: `/search/`, `/get_players/`, `/versions/`
- **Prices**: `/price/`, `/get_player_price_history/`
- **SBCs**: `/fetch_sbc_data/`, `/fetch_sbc_details/`
- **Evolution**: `/fetch_evo_data/`, `/get_evolved_players/`
- **Squad Building**: `/get_best_squad/`, `/get_best_club_squad/`

## 🧪 Testing

```bash
# Run test suite
npm test

# Run tests with coverage
npm test -- --coverage

# Run tests in watch mode
npm test -- --watch
```

## 🏗️ Building for Production

```bash
# Create production build
npm run build

# Serve build locally (for testing)
npx serve -s build
```

The build folder contains optimized static files ready for deployment.

## 🚀 Deployment

### Build Optimization

- Code splitting by routes
- Image optimization (WebP format)
- Bundle analysis and optimization
- CDN integration for assets

### Environment Setup

- Configure environment variables for production
- Set up HTTPS
- Configure CORS on backend
- Set up monitoring and analytics

## 🤝 Contributing

1. **Fork the repository**
2. **Create a feature branch**: `git checkout -b feature/amazing-feature`
3. **Commit changes**: `git commit -m 'Add amazing feature'`
4. **Push to branch**: `git push origin feature/amazing-feature`
5. **Open a Pull Request**

### Development Guidelines

- Follow React best practices
- Use functional components with hooks
- Implement proper error handling
- Add tests for new features
- Follow the existing code style

## 📊 Performance

### Optimization Techniques

- React.memo for expensive components
- useCallback/useMemo for expensive calculations
- Code splitting for large components
- Image lazy loading
- API response caching with React Query

### Monitoring

- Google Analytics for user behavior
- Web Vitals for performance metrics
- Error tracking for debugging
- API response time monitoring

## 🔒 Security

- Environment variables for sensitive data
- JWT authentication with httpOnly cookies
- Input validation and sanitization
- CORS configuration
- Content Security Policy headers

## 🌐 Browser Support

- Chrome (last 2 versions)
- Firefox (last 2 versions)
- Safari (last 2 versions)
- Edge (last 2 versions)
- Mobile browsers (iOS Safari, Chrome Mobile)

## 📱 Mobile Support

- Responsive design with Tailwind CSS
- Touch-friendly interface
- Mobile-optimized navigation
- Swipe gestures for card interactions
- Progressive Web App features

## 🎨 Design System

### Color Palette

- Primary: Dark theme with blue accents
- Secondary: EA FC brand colors
- Success/Error: Standard green/red indicators

### Typography

- System fonts for performance
- Consistent sizing scale
- Proper contrast ratios

### Components

- Consistent button styles
- Form input patterns
- Loading state indicators
- Error message formatting

## 🆘 Troubleshooting

### Common Issues

**Build fails to minify**

- Check for ES6+ syntax in dependencies
- Update babel configuration if needed

**API connection issues**

- Verify API URL in environment variables
- Check CORS configuration
- Ensure backend server is running

**Authentication problems**

- Verify OAuth client ID
- Check cookie settings
- Ensure HTTPS in production

### Getting Help

- Check existing GitHub issues
- Create detailed bug reports
- Include environment information
- Provide steps to reproduce

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgments

- EA Sports for FC 25 game data
- React community for excellent libraries
- Contributors and beta testers
- Ultimate Team community for feedback

---

**Built with ❤️ for the EA FC 25 Ultimate Team community**
