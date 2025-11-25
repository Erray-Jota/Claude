# BR-IC: Barracks Resilience Through Industrialized Construction

**Defense Innovation Unit (DIU) PROJ00633 Submission Tool**

A comprehensive web application demonstrating industrialized construction capabilities for military barracks modernization, adapted from the RaaP Modular Feasibility Tool.

---

## 🎯 Project Overview

This application addresses the Defense Innovation Unit's call for innovative industrialized construction (IC) solutions for repeatable military facility types. It showcases how commercial IC innovation can revolutionize defense construction through faster timelines, reduced costs, and resilient, scalable infrastructure.

### DIU PROJ00633 Requirements Met

✅ **Innovative IC Methodologies**
- Volumetric modular construction
- Hybrid construction approaches
- Kit of Parts (KoP) systems

✅ **Geographic Adaptability**
- Domestic and international deployment scenarios
- Climate zone adaptability (Arctic, Desert, Tropical, Temperate)
- Seismic zone compliance (Zones 0-4)

✅ **Lifecycle Phase Organization**
- **Design:** Architect of Record, DfMA optimization, factory coordination
- **Manufacturing:** Fabrication partners, quality control, production scheduling
- **Assembly:** Component integration, pre-delivery inspection, logistics
- **Onsite Construction:** Site preparation, modular installation, commissioning

✅ **Track Record Documentation**
- Portfolio showcasing 3+ completed IC projects
- Each project value >$20,000,000
- Past 10 years of experience
- Demonstrated cost and schedule improvements

---

## 🏗️ Application Features

### 1. **Project Configuration**
- Military facility type selection (Enlisted Barracks, NCO Housing, Officer Quarters)
- Location-based cost adjustments
- Security level requirements
- Climate and seismic zone specifications

### 2. **Design Optimization**
- Barracks layout optimization (Single Occupancy Rooms, Squad Bays, Leadership Quarters)
- Common area planning (dayrooms, study rooms, hygiene facilities)
- Support space integration (CQ desk, mail room, gear storage)
- Floor plan visualization

### 3. **Cost Analysis**
- Traditional MILCON vs. IC cost comparison
- MasterFormat division breakdown
- Force protection and security costs
- Lifecycle cost analysis (50-year building lifespan)
- Real-time cost modeling

### 4. **Lifecycle Phase Management**
- Partner marketplace organized by construction phase
- Defense-qualified vendor network
- Security clearance tracking
- Phase completion monitoring

### 5. **Portfolio Showcase**
- Completed IC project case studies
- Project metrics (cost savings, schedule acceleration, quality)
- Geographic diversity demonstration
- IC methodology breakdown per project

### 6. **Compliance Tracking**
- 10 USC 4022 compliance documentation
- Nontraditional defense contractor participation
- Small business involvement metrics
- Section 508 accessibility standards

---

## 🛠️ Technology Stack

- **Frontend Framework:** React 19.2.0
- **Build Tool:** Vite 7.2.2
- **Mapping:** Google Maps API (optional)
- **Styling:** CSS-in-JS with custom theme system
- **State Management:** React Context API
- **Node.js:** 20.x

---

## 📦 Installation

### Prerequisites
- Node.js 20.x or higher
- npm 9.x or higher
- Git

### Setup Instructions

```bash
# Clone the repository
git clone https://github.com/Erray-Jota/br-ic.git
cd br-ic

# Navigate to the React app directory
cd raap-react-app

# Install dependencies
npm install

# Create environment file (optional)
cp .env.example .env
# Edit .env with your API keys if using Google Maps

# Start development server
npm run dev
```

The application will be available at `http://localhost:5173`

---

## 🚀 Development Workflow

### Available Scripts

```bash
# Development server with hot reload
npm run dev

# Production build
npm run build

# Preview production build
npm run preview

# Lint code
npm run lint
```

### Project Structure

```
br-ic/
├── raap-react-app/              # Main React application
│   ├── src/
│   │   ├── components/          # React components
│   │   │   ├── tabs/            # Main tab components
│   │   │   ├── Header.jsx
│   │   │   ├── GoogleMapsLoader.jsx
│   │   │   └── ...
│   │   ├── contexts/            # React Context for state management
│   │   │   └── ProjectContext.jsx
│   │   ├── engines/             # Calculation engines
│   │   │   ├── costEngine.js
│   │   │   ├── floorplanEngine.js
│   │   │   └── unitOptimizationEngine.js
│   │   ├── data/                # Constants and configuration
│   │   │   └── constants.js
│   │   ├── hooks/               # Custom React hooks
│   │   ├── styles/              # Styling and theme
│   │   ├── App.jsx              # Root component
│   │   └── main.jsx             # Entry point
│   ├── public/                  # Static assets
│   │   ├── images/              # Images and videos
│   │   └── favicon.ico
│   ├── index.html               # HTML entry point
│   ├── vite.config.js           # Vite configuration
│   └── package.json             # Dependencies
├── BR-IC_CUSTOMIZATION_GUIDE.md # Detailed customization guide
├── BR-IC_FILE_MAPPING.md        # File reference and mapping
├── BR-IC_QUICKSTART_CHECKLIST.md # Step-by-step task list
└── README.md                    # This file
```

---

## 📚 Customization Documentation

This repository includes comprehensive documentation for customizing the application:

### 📖 [BR-IC_CUSTOMIZATION_GUIDE.md](./BR-IC_CUSTOMIZATION_GUIDE.md)
Complete strategy document covering:
- 6 implementation phases
- Detailed file-by-file modifications
- DIU compliance mapping
- Military construction standards integration
- Code examples and best practices

### 📋 [BR-IC_FILE_MAPPING.md](./BR-IC_FILE_MAPPING.md)
Quick reference guide including:
- Complete file inventory with modification priorities
- Search & replace patterns
- Testing checklists
- Common issues and solutions
- Quick start workflow

### ✅ [BR-IC_QUICKSTART_CHECKLIST.md](./BR-IC_QUICKSTART_CHECKLIST.md)
Actionable task list with:
- 9 phases with daily breakdown
- Checkbox format for tracking progress
- Git commit guidance per phase
- Estimated timeline: 8-10 days full-time work

---

## 🔧 Customization for BR-IC

This application is based on the RaaP Modular Feasibility Tool and requires customization for the specific BR-IC submission. Key customization areas:

### Phase 1: Branding & Identity
- Update application name and metadata
- Replace logos and visual branding
- Apply military/government color palette

### Phase 2: Content Transformation
- Adapt all tab content for military context
- Update terminology (commercial → military)
- Replace imagery with barracks configurations

### Phase 3: Data Updates
- Update partner network with defense-qualified vendors
- Calibrate cost models to MILCON standards
- Add force protection and security cost divisions

### Phase 4: Feature Enhancements
- Add compliance tracking module
- Implement geographic adaptability tool
- Create lifecycle phase dashboard
- Build project portfolio showcase

See the customization guides for detailed instructions.

---

## 🔒 Security & Compliance

### Security Considerations
- Regular dependency audits: `npm audit`
- Input validation and sanitization
- Secure API key management via environment variables
- No sensitive data in version control

### Compliance Standards
- **Section 508:** Accessibility for federal systems
- **10 USC 4022:** Nontraditional defense contractor requirements
- **ITAR/CUI:** Controlled information safeguards (if applicable)
- **ATO:** Authority to Operate for DoD systems (if required)

---

## 🌐 Deployment

### Build for Production

```bash
cd raap-react-app
npm run build
```

The production-ready files will be in `raap-react-app/dist/`

### Deployment Options

- **Static Site Hosting:** Netlify, Vercel, AWS S3 + CloudFront
- **Traditional Server:** Node.js server with static file serving
- **Government Cloud:** AWS GovCloud, Azure Government
- **Container:** Docker deployment (see PRODUCTION_READY.md)

### Environment Variables

Create a `.env` file in `raap-react-app/` directory:

```env
VITE_APP_NAME=BR-IC Barracks IC Tool
VITE_APP_VERSION=1.0.0
VITE_DIU_PROJECT_ID=PROJ00633
VITE_GOOGLE_MAPS_API_KEY=your_api_key_here
VITE_CONTACT_EMAIL=bric-inquiries@yourcompany.com
```

---

## 📊 Cost Calculation Engines

The application includes sophisticated calculation engines:

### Cost Engine
- MasterFormat division-based costing
- Location factor adjustments
- Unit ratio scaling
- Floor multiplier calculations
- See: [COST_ENGINE.md](./raap-react-app/COST_ENGINE.md)

### Floorplan Placement Engine
- Optimal unit placement algorithms
- Corridor optimization
- Building configuration analysis
- See: [FLOORPLAN_PLACEMENT_ENGINE.md](./raap-react-app/FLOORPLAN_PLACEMENT_ENGINE.md)

### Unit Optimization Engine
- Unit mix optimization
- Efficiency calculations
- Net-to-gross ratio analysis
- See: [UNIT_OPTIMIZATION_ENGINE.md](./raap-react-app/UNIT_OPTIMIZATION_ENGINE.md)

---

## 🧪 Testing

### Manual Testing Checklist
- [ ] All tabs navigate correctly
- [ ] Forms submit and validate properly
- [ ] Cost calculations produce reasonable estimates
- [ ] Map displays locations correctly
- [ ] Responsive design works (mobile/tablet/desktop)
- [ ] Images and videos load properly

### Accessibility Testing
- Use browser DevTools Lighthouse audit
- Test keyboard navigation
- Verify color contrast ratios
- Test with screen readers (if possible)

### Performance Testing
- Lighthouse performance score
- Page load time analysis
- Bundle size optimization

---

## 📞 Support & Contact

### DIU Resources
- **DIU Website:** https://www.diu.mil
- **PROJ00633 Submission:** https://www.diu.mil/work-with-us/submit-solution/PROJ00633
- **Commercial Solutions Opening:** HQ0854-20-S-C0001 on SAM.gov

### Technical Support
For technical issues or questions about this application, please contact:
- Email: [Your contact email]
- GitHub Issues: https://github.com/Erray-Jota/br-ic/issues

---

## 📄 License

[Specify your license here]

---

## 🙏 Acknowledgments

This application is adapted from the RaaP Modular Feasibility Tool, originally designed for commercial multifamily construction feasibility analysis. It has been customized to address the unique requirements of military barracks industrialized construction for the Defense Innovation Unit's PROJ00633 initiative.

### Original RaaP Features Retained
- Comprehensive cost analysis framework
- Unit optimization algorithms
- Floor plan placement engine
- Partner coordination marketplace
- Project portfolio management

### BR-IC Enhancements
- Military facility type configurations
- MILCON cost standards integration
- Force protection and security requirements
- Lifecycle phase organization
- DIU compliance tracking
- Geographic adaptability tools

---

## 🚀 Getting Started

Ready to customize this application for your BR-IC submission?

1. **Read the documentation:** Start with [BR-IC_QUICKSTART_CHECKLIST.md](./BR-IC_QUICKSTART_CHECKLIST.md)
2. **Set up your environment:** Follow the installation instructions above
3. **Begin customization:** Work through the 9 phases systematically
4. **Test thoroughly:** Use the testing checklists provided
5. **Deploy:** Follow deployment best practices for your target environment

**Estimated customization time:** 8-10 days (full-time work)

---

## 📈 Success Criteria

Your BR-IC application is ready for submission when:

- ✅ All commercial terminology replaced with military/government language
- ✅ Portfolio showcases 3+ qualifying IC projects (>$20M each)
- ✅ Lifecycle phases clearly organized and demonstrated
- ✅ Geographic adaptability shown for multiple scenarios
- ✅ IC methodologies (volumetric, hybrid, KoP) explained with visuals
- ✅ Partner network includes defense-qualified vendors
- ✅ Cost models reflect MILCON standards
- ✅ Compliance tracking implemented for 10 USC 4022
- ✅ Professional, government-appropriate branding applied
- ✅ Security and accessibility requirements met
- ✅ Application deployed and accessible via URL

---

**Version:** 1.0.0
**Last Updated:** November 2025
**For:** Defense Innovation Unit PROJ00633
**Repository:** https://github.com/Erray-Jota/br-ic

---

## 🎯 Quick Links

- [Customization Guide](./BR-IC_CUSTOMIZATION_GUIDE.md)
- [File Mapping Reference](./BR-IC_FILE_MAPPING.md)
- [Quick Start Checklist](./BR-IC_QUICKSTART_CHECKLIST.md)
- [Cost Engine Documentation](./raap-react-app/COST_ENGINE.md)
- [Production Deployment Guide](./raap-react-app/PRODUCTION_READY.md)
- [DIU PROJ00633](https://www.diu.mil/work-with-us/submit-solution/PROJ00633)
