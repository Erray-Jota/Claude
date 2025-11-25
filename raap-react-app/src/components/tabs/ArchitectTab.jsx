import { COLORS, FONTS, SPACING, STYLE_PRESETS } from '../../styles/theme';

const ArchitectTab = () => {
  return (
    <div style={{ padding: '0 8px' }}>
      {/* Hero Section */}
      <div style={STYLE_PRESETS.heroGreenGradient}>
        <h1 style={{ ...STYLE_PRESETS.heroTitle, color: COLORS.green.dark }}>
          🏛️ Architect of Record (AoR)
        </h1>
        <p style={{ ...STYLE_PRESETS.heroSubtitle, color: COLORS.green.dark }}>
          DfMA-optimized architectural services for industrialized construction
        </p>
      </div>

      {/* Overview Card */}
      <div className="card" style={{ marginBottom: SPACING.lg }}>
        <h2 style={{ fontSize: FONTS.sizes.xl, fontWeight: FONTS.weight.black, color: COLORS.green.dark, marginBottom: SPACING.md }}>
          Design for Manufacturing and Assembly (DfMA)
        </h2>
        <p style={{ fontSize: FONTS.sizes.base, color: COLORS.gray.dark, lineHeight: '1.6', marginBottom: SPACING.md }}>
          Our architectural partners specialize in designing for industrialized construction, ensuring your building is optimized for factory fabrication from day one.
        </p>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: SPACING.md, marginTop: SPACING.md }}>
          <div style={{ padding: SPACING.md, background: COLORS.green.bg, borderRadius: '8px', border: `1px solid ${COLORS.green.light}` }}>
            <div style={{ fontSize: FONTS.sizes['2xl'], marginBottom: SPACING.sm }}>📐</div>
            <h3 style={{ fontSize: FONTS.sizes.md, fontWeight: FONTS.weight.bold, color: COLORS.green.dark, marginBottom: SPACING.xs }}>
              Factory-First Design
            </h3>
            <p style={{ fontSize: FONTS.sizes.sm, color: COLORS.gray.medium, lineHeight: '1.5' }}>
              Layouts optimized for modular fabrication and efficient assembly
            </p>
          </div>
          <div style={{ padding: SPACING.md, background: COLORS.blue.bg, borderRadius: '8px', border: `1px solid ${COLORS.blue.main}` }}>
            <div style={{ fontSize: FONTS.sizes['2xl'], marginBottom: SPACING.sm }}>🔧</div>
            <h3 style={{ fontSize: FONTS.sizes.md, fontWeight: FONTS.weight.bold, color: COLORS.blue.dark, marginBottom: SPACING.xs }}>
              Coordination Ready
            </h3>
            <p style={{ fontSize: FONTS.sizes.sm, color: COLORS.gray.medium, lineHeight: '1.5' }}>
              Seamless integration with fabricators and general contractors
            </p>
          </div>
        </div>
      </div>

      {/* Services Section */}
      <div className="card" style={{ marginBottom: SPACING.lg }}>
        <h2 style={{ fontSize: FONTS.sizes.xl, fontWeight: FONTS.weight.black, color: COLORS.green.dark, marginBottom: SPACING.md }}>
          Architectural Services
        </h2>
        <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
          {[
            'Schematic Design optimized for IC',
            'Design Development with fabricator coordination',
            'Construction Documents (100% CD set)',
            'Factory coordination and shop drawing review',
            'Building permit support',
            'Construction administration',
          ].map((service, index) => (
            <li key={index} style={{ padding: `${SPACING.sm} 0`, borderBottom: index < 5 ? `1px solid ${COLORS.gray.light}` : 'none', display: 'flex', alignItems: 'center', gap: SPACING.sm }}>
              <span style={{ color: COLORS.green.dark, fontSize: FONTS.sizes.xl }}>✓</span>
              <span style={{ fontSize: FONTS.sizes.base, color: COLORS.gray.dark }}>{service}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Partner Architects Section */}
      <div className="card" style={{ marginBottom: SPACING.lg }}>
        <h2 style={{ fontSize: FONTS.sizes.xl, fontWeight: FONTS.weight.black, color: COLORS.green.dark, marginBottom: SPACING.md }}>
          Featured Architectural Partners
        </h2>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: SPACING.md }}>
          {[
            {
              name: 'Design Synergy AoR',
              specialty: 'DfMA Expert',
              location: 'National',
              team: '15 Architects',
              projects: '50+ modular projects',
            },
            {
              name: 'Zeta Architecture',
              specialty: 'Affordable Housing',
              location: 'West Coast',
              team: '8 Architects',
              projects: '30+ multifamily projects',
            },
          ].map((architect, index) => (
            <div key={index} style={{ padding: SPACING.md, background: COLORS.white, border: `2px solid ${COLORS.green.light}`, borderRadius: '8px' }}>
              <h3 style={{ fontSize: FONTS.sizes.lg, fontWeight: FONTS.weight.bold, color: COLORS.green.dark, marginBottom: SPACING.xs }}>
                {architect.name}
              </h3>
              <div style={{ fontSize: FONTS.sizes.sm, color: COLORS.gray.medium, lineHeight: '1.6' }}>
                <div style={{ marginBottom: SPACING.xs }}>
                  <strong>Specialty:</strong> {architect.specialty}
                </div>
                <div style={{ marginBottom: SPACING.xs }}>
                  <strong>Location:</strong> {architect.location}
                </div>
                <div style={{ marginBottom: SPACING.xs }}>
                  <strong>Team:</strong> {architect.team}
                </div>
                <div>
                  <strong>Experience:</strong> {architect.projects}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* CTA Section */}
      <div style={{
        ...STYLE_PRESETS.ctaSection,
        textAlign: 'center',
        marginBottom: SPACING['3xl']
      }}>
        <p style={{ fontSize: FONTS.sizes.xl, fontWeight: FONTS.weight.black, color: COLORS.white, margin: `0 0 ${SPACING.sm} 0` }}>
          Ready to work with DfMA experts?
        </p>
        <p style={{ fontSize: FONTS.sizes.base, fontWeight: FONTS.weight.bold, color: COLORS.lightGreen, margin: '0' }}>
          Connect with our architectural partners to optimize your design for IC.
        </p>
      </div>
    </div>
  );
};

export default ArchitectTab;
