# CLAUDE.md - AI Assistant Guide for RaaP Project

## Project Overview

**RaaP (Rooms as a Product)** is a modular building feasibility and optimization platform. The application helps optimize apartment unit configurations to fit within target building constraints, handling multiple unit types, lobbies, and stairs with complex placement rules.

### Core Purpose
- Provide feasibility analysis for modular construction projects
- Optimize unit mix (studios, 1-bed, 2-bed, 3-bed apartments) within building length constraints
- Generate factory-optimized designs with detailed cost models
- Solve systemic issues in modular construction around design, costs, and factory coordination

---

## Repository Structure

```
/Claude/
├── raap-screen1-v2.jsx          # React component for Screen 1 (intro/landing)
├── raap-standalone.html         # Standalone HTML version of the application
├── Room_Mix_React_3.txt         # Room Mix Calculator React component
└── CLAUDE.md                    # This file
```

### File Descriptions

#### `raap-screen1-v2.jsx`
- **Purpose**: Landing/intro screen for RaaP ModularFeasibility (Screen 1 of 8)
- **Key Features**:
  - Custom RaaP SVG logo component
  - Progress indicator (8-step process)
  - Problem/solution presentation
  - CTA button to start demo
- **Dependencies**: React, lucide-react (ChevronRight icon)
- **Styling**: Tailwind CSS utility classes

#### `Room_Mix_React_3.txt`
- **Purpose**: Complete room mix calculator application
- **Key Features**:
  - Dual-tab interface (Calculator + Floor Plan)
  - Real-time optimization algorithm
  - Visual floor plan generator
  - Interactive unit mix controls
- **Core Logic**: Lines 42-214 (calculation and optimization)
- **Visualization**: Lines 414-617 (FloorPlanView component)

#### `raap-standalone.html`
- **Purpose**: Self-contained HTML version (no build system required)
- **Format**: Vanilla HTML/CSS/JavaScript
- **Size**: ~28K tokens (large file)

---

## Technology Stack

### Frontend Framework
- **React 18+** (using hooks: useState, useMemo)
- **JSX** syntax for component definitions
- **Functional components** (no class components)

### Styling
- **Tailwind CSS** - utility-first CSS framework
- **Inline styles** for dynamic calculations
- **SVG** for logos and floor plan visualizations

### Icons
- **lucide-react** - Icon library (ChevronRight used in Screen 1)

### State Management
- **Local state** with React hooks (useState)
- **Memoized calculations** (useMemo) for performance
- No external state management library (Redux, Zustand, etc.)

---

## Key Business Logic

### Room Mix Calculator Algorithm

The calculator optimizes apartment unit configurations to fit within a target building length. Located in `Room_Mix_React_3.txt:87-214`.

#### Inventory System (Lines 21-39)

**Units:**
- Studio: 13.5 ft, 1 bay
- 1 Bed Jr: 15.5 ft, 1 bay
- 1 Bed: 24.5 ft, 2 bays
- 2 Bed Corner: 31.0 ft, 2 bays
- 2 Bed Inline: 38.0 ft, 2 bays
- 3 Bed: 42.0 ft, 3 bays

**Lobbies:**
- 1-Bay: 13.5 ft (bonus: +1 studio per floor)
- 2-Bay: 24.5 ft (bonus: +1 one-bed per floor)
- 4-Bay: 24.5 ft (no bonus)

**Stairs:**
- Standard: 13.5 ft (used when no 3-beds OR exactly 4 three-beds)
- With 3-Beds: 11.0 ft (used when 3-beds exist)

#### Placement Rules

1. **Corridor Layout**: Units placed on both sides of central corridor
2. **Corner Positions**: Priority for corners (top/bottom):
   - 3-bed (highest priority)
   - 2-bed corner
   - 1-bed Jr (lowest priority)
3. **Fixed Stair Positions**:
   - Right stair: Always at position 2
   - Left stair: Always at position n-1
4. **Special Studio Placement**: When stairWidth = 13.5':
   - 1 studio on LEFT at position 2 (across from right stair)
   - 1 studio on RIGHT at position n-1 (across from left stair)
5. **3-Bed Alignment**: When stairWidth = 11' with 2x3-beds:
   - 3-bed (42') on LEFT position 1 aligns with
   - 2-bed corner (31') + stair (11') on RIGHT positions 1-2
6. **Lobby Centering**: Lobby centered with inline units distributed around it
7. **Bonus Units**: Some lobby types provide additional units

#### Optimization Process (Lines 86-214)

1. **Calculate per-floor targets** from total unit targets
2. **Initial placement** - assign units to corner and inline positions
3. **Check length constraint** - if fits, return result
4. **If too long, reduce units** in priority order:
   - 3-bed (remove first)
   - 2-bed inline
   - 2-bed corner
   - Studio
   - 1-bed (remove last)
5. **Handle stair width transitions** - when removing last 3-bed, stair width changes from 11' to 13.5'

### Length Calculation (Lines 42-55)

```javascript
calculateLength(placement, lobbyType)
// Returns: { length, stairWidthFinal }
// Sums all unit widths + lobby width + stair width
```

### Total Units Calculation (Lines 58-77)

```javascript
calculateTotalUnits(placement, totalFloors, lobbyType)
// Returns: { studio, oneBed, twoBed, threeBed }
// Multiplies per-floor counts by total floors
// Adds bonus units from lobby type
```

---

## Component Architecture

### Component Patterns

#### State Management Pattern
```javascript
const [stateVar, setStateVar] = useState(defaultValue);
```

#### Memoized Calculations
```javascript
const result = useMemo(() => {
  // expensive calculation
  return computedValue;
}, [dependency1, dependency2]);
```

#### Component Composition
- Main App component contains layout and controls
- Separate FloorPlanView component for visualization
- Inline SVG components for logos and graphics

### Component Hierarchy

```
App (Room_Mix_React_3.txt)
├── Header (tabs)
├── Calculator Tab
│   ├── Status Banner (length calculation)
│   ├── Building Configuration Card
│   │   ├── Floors selector
│   │   ├── Lobby selector
│   │   └── Target Length slider
│   ├── Unit Mix Targets Card
│   │   ├── Target inputs (studio, 1B, 2B, 3B)
│   │   └── Optimized output display
│   └── Inventory Reference Card
└── Floor Plan Tab
    └── FloorPlanView
        └── SVG visualization
```

```
RaaPModularFeasibility (raap-screen1-v2.jsx)
├── Header
│   ├── RaaPLogo (SVG component)
│   ├── Title
│   └── Progress indicator
├── Hero section
├── Image section
├── Problems section (3 problems)
├── Solution section
└── CTA button
```

---

## Development Conventions

### Code Style

#### Naming Conventions
- **Components**: PascalCase (`RaaPModularFeasibility`, `FloorPlanView`)
- **Functions**: camelCase (`calculateLength`, `generateFloorPlan`)
- **Constants**: camelCase for objects (`INVENTORY`), SCREAMING_SNAKE_CASE acceptable for primitives
- **Variables**: camelCase (`currentScreen`, `totalFloors`)

#### File Naming
- **React components**: kebab-case with extension (`raap-screen1-v2.jsx`)
- **Text files**: PascalCase with underscores (`Room_Mix_React_3.txt`)

### React Patterns

#### Hooks Usage
- Always call hooks at the top level
- Use `useMemo` for expensive calculations
- Use `useState` for component state
- No custom hooks currently in codebase

#### Props Destructuring
```javascript
function FloorPlanView({ result, lobbyType }) {
  // preferred pattern
}
```

#### Event Handlers
```javascript
onClick={() => setCurrentScreen(2)}
onChange={(e) => setFloors(Number(e.target.value))}
```

### Styling Conventions

#### Tailwind CSS Patterns
- Responsive design: Mobile-first approach
- Color system:
  - Primary: blue-600, green-600
  - Success: green-500 to green-700
  - Warning: orange-500 to orange-600
  - Error: red-50 to red-600
- Spacing: Consistent use of padding/margin scale (px-6, py-3, etc.)
- Shadows: sm, md, lg variants for depth
- Rounded corners: rounded-lg, rounded-xl for modern look

#### Color Coding by Unit Type
- Studio: `#93C5FD` (blue)
- 1 Bed: `#86EFAC` or `#6EE7B7` (green)
- 2 Bed: `#C4B5FD` or `#D8B4FE` (purple)
- 3 Bed: `#FCA5A5` (red)
- Lobby: `#FDE047` (yellow)
- Stairs: `#D1D5DB` (gray)

### Data Validation
- Always use `Number()` for input coercion
- Use `Math.max(0, value)` to prevent negative values
- Use `Math.min(value, max)` to enforce caps (e.g., 3-bed cap)

---

## Git Workflow

### Branch Strategy

- **Development branch**: `claude/claude-md-mi5aj9979zggr6sb-01AxoEmJYYFJG5GS1EF7ASDU`
- All changes must be committed to this branch
- Never push to main/master without explicit permission

### Commit Message Guidelines

Based on recent commits:
- Use imperative mood ("Add Screen 1" not "Added Screen 1")
- Be descriptive about what was added/changed
- Examples from history:
  - "Add Screen 1 and second HTML demo file"
  - "Initial commit of React application"

### Git Commands

**Always use:**
```bash
git push -u origin claude/claude-md-mi5aj9979zggr6sb-01AxoEmJYYFJG5GS1EF7ASDU
```

**Network retry strategy:**
- Retry up to 4 times on network failures
- Exponential backoff: 2s, 4s, 8s, 16s

---

## Common Tasks for AI Assistants

### Adding New Screens

When adding new screens to the multi-step flow:

1. **Update progress indicator** in header (currently 8 screens)
2. **Follow Screen 1 pattern**:
   - Import React and useState
   - Create component with screen state management
   - Include RaaPLogo component
   - Add progress tracker
   - Include navigation buttons
3. **Maintain consistent styling**:
   - Use established color scheme
   - Follow Tailwind utility patterns
   - Keep responsive design
4. **Update state management** if adding to existing component

### Modifying Calculator Logic

When changing optimization algorithm:

1. **Review placement rules** (lines 9-19 in Room_Mix_React_3.txt)
2. **Update INVENTORY** if adding new unit types
3. **Modify calculation functions**:
   - `calculateLength` - for new unit type dimensions
   - `calculateTotalUnits` - for new counting logic
   - Main `useMemo` - for optimization changes
4. **Update FloorPlanView** to visualize new units
5. **Test edge cases**:
   - Maximum 3-bed constraint (4 per floor)
   - Stair width transitions
   - Lobby bonus unit calculations

### Updating Styles

1. **Prefer Tailwind utilities** over inline styles
2. **Maintain color consistency** using established palette
3. **Test responsive behavior** at different breakpoints
4. **Use gradients sparingly** - primarily for status banners and CTAs

### Creating New Components

1. **Use functional components** with hooks
2. **Destructure props** in function signature
3. **Add PropTypes or TypeScript** if type safety needed (not currently used)
4. **Keep components focused** - separate concerns (e.g., FloorPlanView)
5. **Use meaningful names** that describe purpose

---

## Testing Considerations

### Current State
- No formal test suite currently in repository
- No test files (*.test.js, *.spec.js)
- No test configuration

### When Adding Tests (Future)

Consider testing:
1. **Calculator logic**:
   - Length calculations with different unit mixes
   - Optimization algorithm edge cases
   - 3-bed cap enforcement
   - Stair width transitions
2. **Component rendering**:
   - Screen navigation
   - Form input handling
   - Floor plan visualization
3. **Data validation**:
   - Negative value prevention
   - Maximum value enforcement

Recommended frameworks:
- **Jest** for unit tests
- **React Testing Library** for component tests
- **Vitest** as modern alternative to Jest

---

## Known Constraints and Limitations

### 3-Bed Unit Cap
- Maximum 4 three-bedroom units per floor (2 per side)
- Total cap = 4 × totalFloors
- Calculator automatically caps user input to this maximum
- When cap is exceeded, warning displayed in UI

### Stair Width Logic
- Complex interaction between 3-bed count and stair width
- When removing last 3-bed, stair adds 2.5 ft (11' → 13.5')
- This can create counter-intuitive optimization results

### Floor Plan Generation
- Assumes symmetrical layout (same units on both sides)
- Fixed stair positions (cannot be customized)
- Lobby must be centered
- Corner unit placement has strict priority order

### Current Limitations
- No backend/API integration
- No data persistence (all state in memory)
- No user authentication
- No multi-building comparison
- No cost calculations (mentioned in concept, not implemented)

---

## Performance Considerations

### Optimization Strategies

1. **useMemo for expensive calculations** (Room_Mix_React_3.txt:87)
   - Recalculates only when inputs change
   - Prevents unnecessary re-renders

2. **Avoid inline object creation** in render
   - SVG components defined outside render
   - Configuration objects defined as constants

3. **Component splitting**
   - FloorPlanView separate from main App
   - Reduces re-render scope

### Potential Improvements

- Virtualization for large floor plan lists (if needed)
- Web Workers for complex calculations (currently not necessary)
- Code splitting for multi-screen application
- Lazy loading for screen components

---

## Debugging Tips

### Common Issues

1. **Length calculation doesn't match**
   - Check stair width logic (lines 52-53)
   - Verify all unit types included in sum
   - Check for floating-point precision errors

2. **Floor plan visualization incorrect**
   - Review `generateFloorPlan` logic (lines 415-548)
   - Check placement rule implementation
   - Verify studio special placement logic

3. **Optimization produces unexpected results**
   - Add console.log to reduction loop (lines 145-190)
   - Check reduction priority order
   - Verify stair width adjustment (line 162)

### Console Logging Strategy

```javascript
console.log('Placement:', p);
console.log('Length:', currentLength, 'Target:', targetLength);
console.log('Stair width:', stairWidthFinal);
```

### Browser DevTools

- React DevTools for component state inspection
- Performance tab for render profiling
- Console for error messages and warnings

---

## External Dependencies

### Current Dependencies

Based on imports in code:
- `react` - Core React library
- `lucide-react` - Icon library (ChevronRight)

### Missing Configuration

**Note**: No package.json found in repository. When setting up development environment:

```json
{
  "dependencies": {
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "lucide-react": "^0.263.0"
  },
  "devDependencies": {
    // Add build tools as needed (Vite, webpack, etc.)
  }
}
```

### Styling Dependencies

- Tailwind CSS (referenced in className attributes)
- May need tailwind.config.js and postcss.config.js

---

## Future Development Roadmap

### Planned Features (Inferred from Screen 1)

Screen 1 mentions "Screen 1 of 8", suggesting:
- Screen 2-8 implementation
- Multi-step workflow for ModularFeasibility
- Progressive disclosure of information
- Form wizard pattern

### Potential Enhancements

1. **Cost Calculation Module**
   - Mentioned in Screen 1 ("detailed cost model")
   - Not yet implemented in codebase

2. **Factory Integration**
   - Factory-optimized design output
   - Coordination between AoR-GC-Fabricator

3. **Design Export**
   - Export floor plans as PDF/CAD
   - Generate specifications document

4. **Project Management**
   - Save/load projects
   - Version history
   - Collaboration features

5. **Advanced Optimization**
   - Multi-objective optimization (cost + space + efficiency)
   - Genetic algorithms for better solutions
   - Constraint solver integration

---

## Security Considerations

### Current Security Posture

- **Client-side only** - No API endpoints to secure
- **No authentication** - No user data to protect
- **No sensitive data** - All calculations are ephemeral

### Future Security Needs

When adding backend:
1. **Input validation** on server-side
2. **Authentication/authorization** for user projects
3. **Data encryption** for stored projects
4. **XSS prevention** when rendering user content
5. **CSRF protection** for state-changing operations

---

## Questions to Ask Users

When working on this codebase, consider asking:

1. **Scope questions**:
   - "Are you working on the room mix calculator or the multi-screen workflow?"
   - "Should changes apply to both JSX and HTML versions?"

2. **Design questions**:
   - "Should the new feature follow the existing Tailwind styling patterns?"
   - "Do you want the color scheme to match the existing palette?"

3. **Business logic questions**:
   - "Should the optimization prioritize unit count or building utilization?"
   - "Are there new unit types or lobby configurations to add?"

4. **Technical questions**:
   - "Do you want to add TypeScript for type safety?"
   - "Should we set up a proper build system (Vite, Next.js, etc.)?"

---

## Quick Reference

### Key Files and Line Numbers

| Feature | File | Lines |
|---------|------|-------|
| INVENTORY constants | Room_Mix_React_3.txt | 21-39 |
| Length calculation | Room_Mix_React_3.txt | 42-55 |
| Total units calculation | Room_Mix_React_3.txt | 58-77 |
| Main optimization algorithm | Room_Mix_React_3.txt | 87-214 |
| Floor plan generation | Room_Mix_React_3.txt | 415-548 |
| Floor plan SVG rendering | Room_Mix_React_3.txt | 556-599 |
| RaaP Logo SVG | raap-screen1-v2.jsx | 7-17 |
| Screen 1 problems section | raap-screen1-v2.jsx | 68-98 |

### Color Palette Quick Reference

```css
/* Primary Actions */
--blue-600: #2563eb
--green-600: #16a34a

/* Unit Types */
--studio: #93C5FD
--one-bed: #86EFAC
--two-bed: #C4B5FD
--three-bed: #FCA5A5

/* Status */
--success: #16a34a to #15803d
--warning: #ea580c to #c2410c

/* Neutrals */
--gray-50: #f9fafb
--gray-600: #4b5563
--gray-900: #111827
```

### Common Formulas

```javascript
// Units per side from total target
Math.ceil(totalTarget / totalFloors / 2)

// 3-bed maximum cap
4 * totalFloors

// Remaining length
targetLength - calculatedLength

// Total units across all types
studio + oneBed + twoBed + threeBed
```

---

## Change Log

| Date | Change | Author |
|------|--------|--------|
| 2025-11-19 | Initial CLAUDE.md creation | AI Assistant |

---

## Additional Resources

### Related Documentation
- **Tailwind CSS**: https://tailwindcss.com/docs
- **React Hooks**: https://react.dev/reference/react
- **lucide-react**: https://lucide.dev/guide/packages/lucide-react

### Design Patterns
- **Memoization**: Optimize expensive calculations
- **Component composition**: Build complex UIs from simple pieces
- **Controlled components**: Form inputs controlled by React state

---

**Last Updated**: 2025-11-19
**Repository**: /home/user/Claude
**Branch**: claude/claude-md-mi5aj9979zggr6sb-01AxoEmJYYFJG5GS1EF7ASDU
