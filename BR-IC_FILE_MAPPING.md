# BR-IC File Mapping & Quick Reference

## 🗂️ Files to Modify for BR-IC Customization

### 📦 Package & Configuration Files

| File | Purpose | Changes Needed |
|------|---------|----------------|
| `raap-react-app/package.json` | App metadata | Update name, description, version |
| `raap-react-app/index.html` | HTML entry point | Update title, meta tags, favicon reference |
| `raap-react-app/vite.config.js` | Build config | Review for deployment settings |
| `raap-react-app/.env` | Environment variables | CREATE NEW - add BR-IC specific vars |

### 🎨 Branding & Theme Files

| File | Purpose | Changes Needed |
|------|---------|----------------|
| `raap-react-app/src/styles/theme.js` | Color palette, fonts | Update to military/government colors |
| `raap-react-app/src/App.css` | Global styles | Update branding colors |
| `raap-react-app/public/favicon.ico` | Browser icon | Replace with BR-IC/DoD icon |

### 📄 Tab Components (Content Pages)

| File | Current Purpose | BR-IC Purpose | Priority |
|------|----------------|---------------|----------|
| `src/components/tabs/IntroductionTab.jsx` | RaaP overview | BR-IC mission & DIU overview | 🔴 HIGH |
| `src/components/tabs/ProjectTab.jsx` | Project setup | Barracks configuration | 🔴 HIGH |
| `src/components/tabs/DesignTab.jsx` | Floor plan design | Barracks layout optimization | 🔴 HIGH |
| `src/components/tabs/CostAnalysisTab.jsx` | Cost comparison | MILCON cost analysis | 🔴 HIGH |
| `src/components/tabs/CoordinationTab.jsx` | Partner marketplace | Lifecycle phase management | 🟡 MEDIUM |
| `src/components/tabs/PortfolioTab.jsx` | Project portfolio | Case studies (3+ projects >$20M) | 🔴 HIGH |
| `src/components/tabs/SmartStartTab.jsx` | Service offering | Compliance & Track Record | 🟡 MEDIUM |

### 📊 Data & Constants

| File | Purpose | Changes Needed |
|------|---------|----------------|
| `src/data/constants.js` | All static data | Partner data, cost divisions, asset paths | 🔴 HIGH |
| `src/contexts/ProjectContext.jsx` | Global state | Review for BR-IC data structure changes | 🟢 LOW |

### 🧮 Calculation Engines

| File | Purpose | Changes Needed |
|------|---------|----------------|
| `src/engines/costEngine.js` | Cost calculations | Calibrate for MILCON standards | 🟡 MEDIUM |
| `src/engines/floorplanEngine.js` | Layout optimization | Adapt for barracks layouts | 🟢 LOW |
| `src/engines/unitOptimizationEngine.js` | Unit optimization | Update for military occupancy standards | 🟢 LOW |

### 🖼️ Assets (Images & Videos)

| Location | Current Content | BR-IC Content Needed |
|----------|----------------|---------------------|
| `public/images/` | Commercial building videos/images | Military barracks imagery |
| `public/images/HeroVideo.mp4` | RaaP intro | BR-IC mission video |
| `public/images/*Story.mp4` | Building stories | Barracks configurations |
| `public/images/STUDIO.png` etc. | Unit types | Barracks room types (SOR, Squad Bay) |

### 📝 Documentation

| File | Purpose | Action |
|------|---------|--------|
| `README.md` | Project overview | REPLACE with BR-IC description |
| `raap-react-app/README.md` | Technical docs | UPDATE for BR-IC context |
| `BR-IC_CUSTOMIZATION_GUIDE.md` | Customization guide | REFERENCE (this guide) |
| `BR-IC_FILE_MAPPING.md` | File reference | REFERENCE (this file) |

---

## 🚀 Quick Start Workflow

### Step 1: Clone Repository to Desktop
```bash
git clone https://github.com/Erray-Jota/Claude.git bric-source
cd bric-source
git checkout claude/br-ic-project-01E9qXFPGjZWXa9QW7o15rCc
```

### Step 2: Set Up New BR-IC Repository
```bash
# Remove old git history
rm -rf .git

# Initialize new repo
git init
git remote add origin https://github.com/Erray-Jota/br-ic.git

# Initial commit
git add .
git commit -m "Initial commit: BR-IC tool based on RaaP modular feasibility app"
git branch -M main
git push -u origin main
```

### Step 3: Install Dependencies
```bash
cd raap-react-app
npm install
npm run dev  # Test that app runs
```

### Step 4: Systematic Customization
Follow this order for efficiency:

#### Phase 1: Quick Wins (30 minutes)
1. ✅ `package.json` - Update name/description
2. ✅ `index.html` - Update title
3. ✅ `README.md` - Replace with BR-IC overview

#### Phase 2: Visual Branding (1-2 hours)
4. ✅ `src/styles/theme.js` - Update colors to military palette
5. ✅ `public/favicon.ico` - Replace icon
6. ✅ Test app - verify new colors applied

#### Phase 3: Content Transformation (4-6 hours)
7. ✅ `src/components/tabs/IntroductionTab.jsx` - BR-IC overview
8. ✅ `src/components/tabs/ProjectTab.jsx` - Barracks types
9. ✅ `src/components/tabs/DesignTab.jsx` - Barracks layouts
10. ✅ `src/components/tabs/PortfolioTab.jsx` - Case studies

#### Phase 4: Data Updates (2-3 hours)
11. ✅ `src/data/constants.js` - Partners, costs, assets
12. ✅ Replace images in `public/images/`

#### Phase 5: Advanced Features (6-8 hours)
13. ✅ Update Cost Analysis for MILCON
14. ✅ Reorganize Coordination for lifecycle phases
15. ✅ Add compliance tracking features

#### Phase 6: Polish & Deploy (2-3 hours)
16. ✅ Security audit
17. ✅ Accessibility review
18. ✅ Final testing
19. ✅ Deploy

---

## 🔍 Search & Replace Quick Reference

### Global Text Replacements

| Find | Replace |
|------|---------|
| "RaaP" | "BR-IC" |
| "modular feasibility" | "industrialized construction for military barracks" |
| "developer" / "developers" | "military facility planners" / "DoD stakeholders" |
| "multifamily" | "enlisted barracks" |
| "project" (in some contexts) | "installation" or "facility" |
| "commercial" | "military" or "defense" |

### Component-Specific Replacements

**IntroductionTab.jsx:**
- "Make Modular Predictable" → "Barracks Resilience Through Industrialized Construction"
- "Skip months of uncertainty" → "Delivering resilient military infrastructure faster"

**ProjectTab.jsx:**
- "Building Type" → "Facility Type"
- "Multifamily" → "Enlisted Barracks"
- "Senior Housing" → "NCO Housing"

**DesignTab.jsx:**
- "Studio" → "Single Occupancy Room (SOR)"
- "1BR Corner" → "Two-Person Room"
- "2BR" → "Squad Bay"

**CostAnalysisTab.jsx:**
- "Site-Built" → "Traditional MILCON"
- "Modular" → "Industrialized Construction"

---

## 📋 Content Checklist by File

### src/components/tabs/IntroductionTab.jsx
- [ ] Hero title updated to BR-IC
- [ ] Problem statements military-focused
- [ ] Solution section emphasizes IC methodologies
- [ ] Video replaced with BR-IC content
- [ ] All "RaaP" references removed

### src/components/tabs/ProjectTab.jsx
- [ ] Building types = military facilities
- [ ] Location selector includes military installations
- [ ] Parameters include security levels
- [ ] Climate/seismic zones for adaptability

### src/components/tabs/DesignTab.jsx
- [ ] Unit types = barracks configurations
- [ ] Floor plans show military layouts
- [ ] Common areas (dayrooms, latrines) included
- [ ] Support spaces (CQ, mail room) shown

### src/components/tabs/CostAnalysisTab.jsx
- [ ] Cost comparison: Traditional MILCON vs IC
- [ ] MasterFormat divisions include force protection
- [ ] Lifecycle costs (50-year analysis)
- [ ] MILCON cost standards applied

### src/components/tabs/CoordinationTab.jsx
- [ ] Reorganized around 4 lifecycle phases
- [ ] Partners categorized by phase
- [ ] Defense-qualified vendors shown
- [ ] Security clearances noted

### src/components/tabs/PortfolioTab.jsx
- [ ] Minimum 3 projects displayed
- [ ] Each project >$20M value
- [ ] IC methodology specified for each
- [ ] Metrics: cost savings, schedule, quality
- [ ] Geographic diversity shown

### src/components/tabs/SmartStartTab.jsx
- [ ] Renamed to "Compliance & Track Record"
- [ ] 10 USC 4022 compliance addressed
- [ ] Non-traditional defense contractor participation
- [ ] Small business involvement tracked

### src/data/constants.js
- [ ] DUMMY_PARTNERS = defense industry vendors
- [ ] MASTER_DIVISIONS include military-specific items
- [ ] ASSET_PATHS point to barracks imagery
- [ ] All commercial references removed

---

## 🎯 Testing Checklist

### Functional Testing
- [ ] App builds without errors (`npm run build`)
- [ ] All tabs navigate correctly
- [ ] Forms submit and validate properly
- [ ] Map displays military installations (if using Google Maps)
- [ ] Cost calculations produce reasonable MILCON estimates
- [ ] Portfolio projects display correctly

### Content Review
- [ ] No "RaaP" references remain
- [ ] No commercial real estate terminology
- [ ] All military/government terms accurate
- [ ] Professional tone throughout
- [ ] DIU requirements addressed in UI

### Visual Testing
- [ ] Colors match military/government palette
- [ ] Favicon displays correctly
- [ ] Images load properly
- [ ] Videos play (if included)
- [ ] Responsive design works (mobile/tablet/desktop)

### Compliance
- [ ] Accessibility (Section 508) checked
- [ ] No placeholder/dummy data in production
- [ ] Security audit completed
- [ ] Documentation complete

---

## 💡 Tips for Efficient Customization

### 1. Use Find & Replace Wisely
Most code editors support:
- Find in files (search entire project)
- Replace in files (bulk updates)
- Regex support for complex patterns

### 2. Test Incrementally
After each phase:
```bash
npm run dev  # Test in development
npm run build  # Verify production build
```

### 3. Version Control Strategy
```bash
# Create feature branches for major changes
git checkout -b feature/branding
git checkout -b feature/content-update
git checkout -b feature/portfolio

# Commit frequently with clear messages
git commit -m "feat: Update IntroductionTab to BR-IC content"
git commit -m "fix: Correct military facility terminology in ProjectTab"
```

### 4. Keep Original for Reference
Before making changes, you might want to:
```bash
# Tag the original RaaP version
git tag v0-raap-original
```

### 5. Document Custom Changes
If you add new features beyond the guide:
- Update README.md
- Add comments in code
- Document in separate CHANGES.md file

---

## 🆘 Common Issues & Solutions

### Issue: App won't build after changes
**Solution:** Check for:
- Missing imports after renaming files
- Broken image paths in constants.js
- Syntax errors in JSX files

### Issue: Styling looks wrong after color changes
**Solution:**
- Clear browser cache
- Check theme.js exports correctly
- Verify CSS class names unchanged

### Issue: Data not displaying in tabs
**Solution:**
- Check constants.js exports
- Verify data structure matches component expectations
- Console log data to debug

### Issue: Videos/images not loading
**Solution:**
- Ensure files in `public/images/` folder
- Check ASSET_PATHS in constants.js
- Verify file names match exactly (case-sensitive)

---

## 📞 Support

If you encounter issues not covered here:
1. Check the main customization guide (BR-IC_CUSTOMIZATION_GUIDE.md)
2. Review original RaaP documentation
3. Test against original code before customization
4. Document the issue for troubleshooting

---

**Last Updated:** 2025-11-25
**Version:** 1.0
**For:** DIU PROJ00633 BR-IC Submission
