import { useState } from 'react';
import { useProject } from '../../contexts/ProjectContext';
import { DUMMY_PARTNERS } from '../../data/constants';
import { COLORS, FONTS, SPACING, BORDERS } from '../../styles/theme';
import { MapComponent } from '../MapComponent';

const CoordinationTab = () => {
  const { switchTab, activeSubtabs, switchSubtab, projectData } = useProject();
  const [filterCategory, setFilterCategory] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [routeMetadata, setRouteMetadata] = useState(null);

  const apiKey = import.meta.env.VITE_GOOGLE_API_KEY || '';

  const getCategoryColor = (category) => {
    const colors = {
      'Fabricator': '#F59E0B',
      'GC': '#3B82F6',
      'AoR': '#8B5CF6',
      'Consultant': '#10B981'
    };
    return colors[category] || '#6B7280';
  };

  const getCategoryIcon = (category) => {
    const icons = {
      'Fabricator': '🏭',
      'GC': '👷',
      'AoR': '🏗️',
      'Consultant': '📋'
    };
    return icons[category] || '📍';
  };

  const getCategoryShape = (category) => {
    const shapes = {
      'Fabricator': '●',  // Circle
      'GC': '■',          // Square
      'AoR': '▲',         // Triangle
      'Consultant': '◆'   // Diamond
    };
    return shapes[category] || '●';
  };

  const getCategoryMapPath = (category) => {
    if (typeof window === 'undefined' || !window.google) return null;

    const paths = {
      'Fabricator': window.google.maps.SymbolPath.CIRCLE,
      'GC': 'M -2,-2 L 2,-2 L 2,2 L -2,2 Z',  // Square SVG path
      'AoR': 'M 0,-2.5 L 2.5,2 L -2.5,2 Z',   // Triangle SVG path
      'Consultant': 'M 0,-2.5 L 2.5,0 L 0,2.5 L -2.5,0 Z'  // Diamond SVG path
    };
    return paths[category] || window.google.maps.SymbolPath.CIRCLE;
  };

  // Generate marketplace map URL using project site location
  const getMarketplaceMapUrl = () => {
    if (!projectData.propertyCoordinates?.lat || !projectData.propertyCoordinates?.lng) {
      return null;
    }

    const siteLat = projectData.propertyCoordinates.lat;
    const siteLng = projectData.propertyCoordinates.lng;

    // Get partner markers (up to 10)
    const partnerMarkers = filteredPartners.slice(0, 10).map((p) => {
      return `color:0xF59E0B|${p.lat},${p.lng}`;
    }).join('&markers=');

    return `https://maps.googleapis.com/maps/api/staticmap?center=${siteLat},${siteLng}&zoom=4&size=800x400&markers=color:0x2D5A3D|label:S|${siteLat},${siteLng}${partnerMarkers ? '&markers=' + partnerMarkers : ''}&key=${apiKey}`;
  };

  // Generate logistics map URL using project site and factory locations
  const getLogisticsMapUrl = () => {
    const siteLat = projectData.propertyCoordinates?.lat;
    const siteLng = projectData.propertyCoordinates?.lng;
    const factoryLat = projectData.factoryCoordinates?.lat;
    const factoryLng = projectData.factoryCoordinates?.lng;

    // If no site location, can't show map
    if (!siteLat || !siteLng) {
      return null;
    }

    // If no factory location, show only site
    if (!factoryLat || !factoryLng) {
      return `https://maps.googleapis.com/maps/api/staticmap?center=${siteLat},${siteLng}&zoom=6&size=800x400&markers=color:0x2D5A3D|label:S|${siteLat},${siteLng}&key=${apiKey}`;
    }

    // Show both factory and site
    return `https://maps.googleapis.com/maps/api/staticmap?center=${siteLat},${siteLng}&zoom=6&size=800x400&markers=color:0xF59E0B|label:F|${factoryLat},${factoryLng}&markers=color:0x2D5A3D|label:S|${siteLat},${siteLng}&key=${apiKey}`;
  };

  const filteredPartners = DUMMY_PARTNERS.filter(partner => {
    const categoryMatch = filterCategory === 'All' || partner.category === filterCategory;
    const searchMatch = !searchTerm ||
      partner.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      partner.region.toLowerCase().includes(searchTerm.toLowerCase()) ||
      partner.type.toLowerCase().includes(searchTerm.toLowerCase());
    return categoryMatch && searchMatch;
  });

  return (
    <div>
      <div style={{ background: `linear-gradient(135deg, ${COLORS.green.bg} 0%, #ffffff 100%)`, padding: SPACING['2xl'], borderRadius: '12px', border: `3px solid ${COLORS.green.light}`, marginBottom: SPACING['3xl'], boxShadow: '0 4px 12px rgba(6, 95, 70, 0.1)', textAlign: 'center' }}>
        <h1 style={{ fontSize: FONTS.sizes['2xl'], fontWeight: FONTS.weight.black, color: COLORS.green.dark, margin: 0, marginBottom: SPACING.sm }}>
          🎯 De-Risk, Accelerate & Lock In Savings
        </h1>
        <p style={{ fontSize: FONTS.sizes.base, color: COLORS.gray.medium, margin: 0, fontWeight: FONTS.weight.bold }}>
          Three critical levers to derisk modular construction and protect your project's timeline, costs, and quality
        </p>
      </div>

      {/* Sub-tabs */}
      <div className="subtab-container">
        <div className="subtab-nav">
          <button onClick={() => switchSubtab('factors', 1)} className={`subtab-btn ${activeSubtabs.factors === 1 ? 'active-subtab' : ''}`}>
            🗺️ Marketplace
          </button>
          <button onClick={() => switchSubtab('factors', 2)} className={`subtab-btn ${activeSubtabs.factors === 2 ? 'active-subtab' : ''}`}>
            🔍 Fabricator
          </button>
          <button onClick={() => switchSubtab('factors', 3)} className={`subtab-btn ${activeSubtabs.factors === 3 ? 'active-subtab' : ''}`}>
            🚚 Logistics
          </button>
          <button onClick={() => switchSubtab('factors', 4)} className={`subtab-btn ${activeSubtabs.factors === 4 ? 'active-subtab' : ''}`}>
            🏗️ Construction
          </button>
        </div>
      </div>

      <div style={{ padding: '0 8px' }}>
        {/* Marketplace Tab */}
        {activeSubtabs.factors === 1 && (
          <div className="card" style={{ padding: SPACING.lg }}>
            <h2 style={{ fontSize: '24px', color: '#2D5A3D', fontWeight: 800, marginBottom: SPACING.sm }}>
              🛡️ RISK: Partner Selection That Prevents Project Failure
            </h2>
            <p style={{ fontSize: FONTS.sizes.md, color: '#4b5563', marginBottom: '15px' }}>
              A factory that can't deliver. A GC misaligned with modular logic. Scope creep that derails costs. We mitigate these risks through a rigorous 4-pillar evaluation framework ensuring long-term success.
            </p>


            {/* Google Maps - Partner Locations */}
            {apiKey && projectData.propertyCoordinates && (
              <div style={{ marginBottom: SPACING['2xl'], borderRadius: BORDERS.radius.md, overflow: 'hidden', border: '2px solid #e5e7eb' }}>
                <MapComponent
                  height="400px"
                  center={projectData.propertyCoordinates}
                  zoom={6}
                  markers={[
                    {
                      position: projectData.propertyCoordinates,
                      title: 'Project Site',
                      label: { text: 'S', color: 'white' }
                    },
                    ...filteredPartners.slice(0, 10).map((partner) => ({
                      position: { lat: partner.lat, lng: partner.lng },
                      title: partner.name,
                      icon: {
                        path: getCategoryMapPath(partner.category),
                        fillColor: getCategoryColor(partner.category),
                        fillOpacity: 0.9,
                        strokeColor: '#FFFFFF',
                        strokeWeight: 2,
                        scale: 8
                      }
                    }))
                  ]}
                />
              </div>
            )}
            {(!apiKey || !projectData.propertyCoordinates) && (
              <div style={{ marginBottom: SPACING['2xl'], padding: '20px', background: COLORS.gold.bg, border: '2px solid #FCD34D', borderRadius: BORDERS.radius.md, textAlign: 'center' }}>
                <p style={{ fontSize: FONTS.sizes.base, color: COLORS.gold.dark, margin: 0 }}>
                  {!apiKey ? '📍 Google Maps API key not configured' : '📍 Set project site location in Project tab to view map'}
                </p>
              </div>
            )}

            {/* Legend */}
            <div style={{ display: 'flex', gap: '20px', marginBottom: '15px', padding: '12px', background: '#F9FAFB', borderRadius: '8px', border: '1px solid #E5E7EB', flexWrap: 'wrap' }}>
              <div style={{ fontSize: FONTS.sizes.sm, fontWeight: FONTS.weight.bold, color: COLORS.gray.darker }}>Legend:</div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <span style={{ fontSize: '18px', color: '#F59E0B' }}>●</span>
                <span style={{ fontSize: FONTS.sizes.sm, color: COLORS.gray.dark }}>Fabricator</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <span style={{ fontSize: '18px', color: '#3B82F6' }}>■</span>
                <span style={{ fontSize: FONTS.sizes.sm, color: COLORS.gray.dark }}>GC</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <span style={{ fontSize: '18px', color: '#8B5CF6' }}>▲</span>
                <span style={{ fontSize: FONTS.sizes.sm, color: COLORS.gray.dark }}>AoR</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <span style={{ fontSize: '18px', color: '#10B981' }}>◆</span>
                <span style={{ fontSize: FONTS.sizes.sm, color: COLORS.gray.dark }}>Consultant</span>
              </div>
            </div>

            {/* Filters */}
            <div style={{ display: 'flex', gap: '10px', marginBottom: '15px' }}>
              <select
                className="form-select"
                value={filterCategory}
                onChange={(e) => setFilterCategory(e.target.value)}
                style={{ maxWidth: '220px' }}
              >
                <option value="All">All Categories</option>
                <option value="Fabricator">● Fabricators</option>
                <option value="GC">■ General Contractors</option>
                <option value="AoR">▲ Architects of Record</option>
                <option value="Consultant">◆ Consultants</option>
              </select>
              <input
                type="text"
                className="form-input"
                placeholder="Search by name, region, or building type..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            {/* Partner Cards */}
            <div className="grid-3" style={{ gap: '15px' }}>
              {filteredPartners.map((partner, index) => (
                <div key={index} className="partner-card" style={{ position: 'relative' }}>
                  {/* Category Shape Indicator */}
                  <div style={{
                    position: 'absolute',
                    top: '12px',
                    right: '12px',
                    fontSize: '24px',
                    color: getCategoryColor(partner.category),
                    lineHeight: 1
                  }}>
                    {getCategoryShape(partner.category)}
                  </div>

                  <div className="partner-name" style={{ paddingRight: '35px' }}>{partner.name}</div>
                  <div style={{ marginBottom: SPACING.sm }}>
                    <span className="partner-tag" style={{
                      background: `${getCategoryColor(partner.category)}15`,
                      color: getCategoryColor(partner.category),
                      border: `1px solid ${getCategoryColor(partner.category)}40`
                    }}>
                      {getCategoryShape(partner.category)} {partner.category}
                    </span>
                    <span className="partner-tag">{partner.type}</span>
                  </div>
                  <div className="partner-detail">
                    <span style={{ fontWeight: 600 }}>Region:</span> {partner.region}<br />
                    <span style={{ fontWeight: 600 }}>Capacity:</span> {partner.capacity}<br />
                    <span style={{ fontWeight: 600 }}>Est:</span> {partner.established}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Fabricator Tab */}
        {activeSubtabs.factors === 2 && (
          <div style={{ padding: '0 8px' }}>
            {/* Main Hero Section */}
            <div style={{ background: 'linear-gradient(135deg, #f0fdf4 0%, #e8f5e9 100%)', padding: '28px', borderRadius: '12px', border: '4px solid #065F46', marginBottom: '28px', boxShadow: '0 8px 24px rgba(6, 95, 70, 0.2)' }}>
              <h2 style={{ fontSize: '38px', color: COLORS.green.dark, fontWeight: 900, marginBottom: SPACING.lg, textAlign: 'center', lineHeight: '1.3', fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif' }}>
                🔒 FabAssure Eliminates Hidden Partner Risks
              </h2>
              <p style={{ fontSize: FONTS.sizes.xl, color: '#047857', marginBottom: '0px', lineHeight: '1.8', textAlign: 'center', fontWeight: 600, fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif' }}>
                Traditional projects pick fabricators based on incomplete proposals. RaaP scores every fabricator across the four failure points that ruin modular projects—surfacing the true best partner.
              </p>
            </div>

            {/* What RaaP Does */}
            <div style={{ background: 'linear-gradient(135deg, #f0fdf4 0%, #ffffff 100%)', padding: '24px', borderRadius: '12px', border: '3px solid #16A34A', marginBottom: '28px', boxShadow: '0 6px 18px rgba(22, 163, 74, 0.15)' }}>
              <p style={{ fontSize: '22px', fontWeight: 900, color: COLORS.green.dark, marginBottom: '18px', textAlign: 'center', fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif' }}>How RaaP Protects Your Project:</p>
              <ul style={{ listStyle: 'none', paddingLeft: 0, fontSize: FONTS.sizes.lg, color: '#047857', margin: 0, lineHeight: '2.2', fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif' }}>
                <li style={{ marginBottom: SPACING.md, fontWeight: FONTS.weight.bold }}>✓ Normalizes all bids so developers see real cost vs scope</li>
                <li style={{ marginBottom: SPACING.md, fontWeight: FONTS.weight.bold }}>✓ Verifies design fit to prevent late-stage redesign</li>
                <li style={{ marginBottom: SPACING.md, fontWeight: FONTS.weight.bold }}>✓ Evaluates factory quality systems to ensure repeatable performance</li>
                <li style={{ fontWeight: FONTS.weight.bold }}>✓ Reviews contracts and financial stability so onboarding is safe</li>
              </ul>
            </div>

            {/* Results */}
            <div style={{ background: 'linear-gradient(135deg, #FEF3C7 0%, #FFFBEB 100%)', padding: '22px', borderRadius: '12px', border: '4px solid #D97706', marginBottom: '28px', boxShadow: '0 6px 18px rgba(217, 119, 6, 0.15)' }}>
              <p style={{ fontSize: '24px', fontWeight: 900, color: COLORS.gold.dark, marginBottom: '18px', textAlign: 'center', fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif' }}>The FabAssure Result:</p>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', fontSize: FONTS.sizes.md, fontWeight: FONTS.weight.bold, color: COLORS.gold.dark, fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif' }}>
                <div style={{ textAlign: 'center', padding: SPACING.lg, background: '#FFFFFF', borderRadius: BORDERS.radius.md, border: '3px solid #D97706' }}>🚫 No Surprises</div>
                <div style={{ textAlign: 'center', padding: SPACING.lg, background: '#FFFFFF', borderRadius: BORDERS.radius.md, border: '3px solid #D97706' }}>🚫 No Missing Scope</div>
                <div style={{ textAlign: 'center', padding: SPACING.lg, background: '#FFFFFF', borderRadius: BORDERS.radius.md, border: '3px solid #D97706' }}>🚫 No Weak Partners</div>
                <div style={{ textAlign: 'center', padding: SPACING.lg, background: '#FFFFFF', borderRadius: BORDERS.radius.md, border: '4px solid #065F46', fontWeight: 900 }}>✅ A Fabricator Who Can Deliver</div>
              </div>
            </div>

            {/* 4-Pillar Risk Reduction Table */}
            <div style={{ background: '#FFFFFF', padding: '24px', borderRadius: '12px', border: '3px solid #065F46', marginBottom: '28px', boxShadow: '0 6px 18px rgba(0,0,0,0.1)', overflowX: 'auto' }}>
              <h3 style={{ fontSize: '24px', marginBottom: SPACING['2xl'], fontWeight: 900, color: COLORS.green.dark, textAlign: 'center', fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif' }}>FabAssure 4-Pillar Risk Reduction</h3>
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: FONTS.sizes.md, fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif' }}>
                <thead>
                  <tr style={{ background: '#065F46', borderBottom: '4px solid #047857' }}>
                    <th style={{ padding: SPACING.lg, textAlign: 'left', fontWeight: 900, color: '#FFFFFF', fontSize: FONTS.sizes.md }}>Pillar</th>
                    <th style={{ padding: SPACING.lg, textAlign: 'left', fontWeight: 900, color: '#FFFFFF', fontSize: FONTS.sizes.md }}>What Goes Wrong</th>
                    <th style={{ padding: SPACING.lg, textAlign: 'left', fontWeight: 900, color: '#FFFFFF', fontSize: FONTS.sizes.md }}>What FabAssure Catches</th>
                    <th style={{ padding: SPACING.lg, textAlign: 'left', fontWeight: 900, color: '#FFFFFF', fontSize: FONTS.sizes.md }}>Impact Avoided</th>
                  </tr>
                </thead>
                <tbody>
                  <tr style={{ borderBottom: '2px solid #e5e7eb' }}>
                    <td style={{ padding: SPACING.lg, fontWeight: 800, color: COLORS.green.dark, fontSize: FONTS.sizes.md }}>💼 Commercial</td>
                    <td style={{ padding: SPACING.lg, color: '#1F2937', fontWeight: 600, fontSize: FONTS.sizes.base }}>Weak balance sheet, bad contract terms, no bonding</td>
                    <td style={{ padding: SPACING.lg, color: COLORS.green.dark, fontWeight: FONTS.weight.bold, fontSize: FONTS.sizes.base }}>Financial review, T&C normalization, bonding verification</td>
                    <td style={{ padding: SPACING.lg, color: '#0c4a6e', fontWeight: FONTS.weight.bold, fontSize: FONTS.sizes.base }}>Prevents project shutdowns</td>
                  </tr>
                  <tr style={{ borderBottom: '2px solid #e5e7eb', background: '#f9fafb' }}>
                    <td style={{ padding: SPACING.lg, fontWeight: 800, color: COLORS.green.dark, fontSize: FONTS.sizes.md }}>💰 Cost</td>
                    <td style={{ padding: SPACING.lg, color: '#1F2937', fontWeight: 600, fontSize: FONTS.sizes.base }}>"Lowball" bids hiding exclusions</td>
                    <td style={{ padding: SPACING.lg, color: COLORS.green.dark, fontWeight: FONTS.weight.bold, fontSize: FONTS.sizes.base }}>Full bid normalization + scope crosswalk</td>
                    <td style={{ padding: SPACING.lg, color: '#0c4a6e', fontWeight: FONTS.weight.bold, fontSize: FONTS.sizes.base }}>Prevents budget blowouts</td>
                  </tr>
                  <tr style={{ borderBottom: '2px solid #e5e7eb' }}>
                    <td style={{ padding: SPACING.lg, fontWeight: 800, color: COLORS.green.dark, fontSize: FONTS.sizes.md }}>📐 Design Fit</td>
                    <td style={{ padding: SPACING.lg, color: '#1F2937', fontWeight: 600, fontSize: FONTS.sizes.base }}>Factory cannot meet spans, units, assemblies</td>
                    <td style={{ padding: SPACING.lg, color: COLORS.green.dark, fontWeight: FONTS.weight.bold, fontSize: FONTS.sizes.base }}>Compatibility check with prototypes</td>
                    <td style={{ padding: SPACING.lg, color: '#0c4a6e', fontWeight: FONTS.weight.bold, fontSize: FONTS.sizes.base }}>Prevents redesign + delays</td>
                  </tr>
                  <tr style={{ background: '#f0fdf4' }}>
                    <td style={{ padding: SPACING.lg, fontWeight: 800, color: COLORS.green.dark, fontSize: FONTS.sizes.md }}>✓ Quality</td>
                    <td style={{ padding: SPACING.lg, color: '#1F2937', fontWeight: 600, fontSize: FONTS.sizes.base }}>Poor QA/QC, inconsistent inspections</td>
                    <td style={{ padding: SPACING.lg, color: COLORS.green.dark, fontWeight: FONTS.weight.bold, fontSize: FONTS.sizes.base }}>Factory audit + assembly comparison</td>
                    <td style={{ padding: SPACING.lg, color: '#0c4a6e', fontWeight: FONTS.weight.bold, fontSize: FONTS.sizes.base }}>Prevents field rework</td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* 4-Quadrant Risk Wheel */}
            <div style={{ background: 'linear-gradient(135deg, #f0fdf4 0%, #ffffff 100%)', padding: '32px', borderRadius: '12px', border: '4px solid #065F46', marginBottom: '24px', boxShadow: '0 8px 24px rgba(6, 95, 70, 0.2)' }}>
              <h3 style={{ fontSize: '26px', marginBottom: '24px', fontWeight: 900, color: COLORS.green.dark, textAlign: 'center', fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif' }}>RaaP FabAssure: Verified Partner Reliability</h3>

              {/* 4-Quadrant Grid */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                {/* Top Left: Commercial Viability */}
                <div style={{ background: '#E0F2FE', padding: '22px', borderRadius: '10px', border: '4px solid #0EA5E9', textAlign: 'center', boxShadow: '0 4px 12px rgba(14, 165, 233, 0.15)' }}>
                  <div style={{ fontSize: FONTS.sizes.xl, fontWeight: 900, color: '#0369A1', marginBottom: '14px', fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif' }}>💼 Commercial</div>
                  <div style={{ fontSize: FONTS.sizes.md, color: '#0c4a6e', lineHeight: '2', fontWeight: FONTS.weight.bold, fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif' }}>
                    <div>🏦 Balance Sheet Review</div>
                    <div>📋 Contract Terms</div>
                    <div>🛡️ Bonding Check</div>
                  </div>
                </div>

                {/* Top Right: Cost */}
                <div style={{ background: '#F0FDF4', padding: '22px', borderRadius: '10px', border: '4px solid #16A34A', textAlign: 'center', boxShadow: '0 4px 12px rgba(22, 163, 74, 0.15)' }}>
                  <div style={{ fontSize: FONTS.sizes.xl, fontWeight: 900, color: COLORS.green.dark, marginBottom: '14px', fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif' }}>💰 Cost</div>
                  <div style={{ fontSize: FONTS.sizes.md, color: '#047857', lineHeight: '2', fontWeight: FONTS.weight.bold, fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif' }}>
                    <div>📊 Bid Normalization</div>
                    <div>📈 Scope Crosswalk</div>
                    <div>✓ Real Cost Visibility</div>
                  </div>
                </div>

                {/* Bottom Left: Design Fit */}
                <div style={{ background: '#FFFBEB', padding: '22px', borderRadius: '10px', border: '4px solid #D97706', textAlign: 'center', boxShadow: '0 4px 12px rgba(217, 119, 6, 0.15)' }}>
                  <div style={{ fontSize: FONTS.sizes.xl, fontWeight: 900, color: COLORS.gold.dark, marginBottom: '14px', fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif' }}>📐 Design Fit</div>
                  <div style={{ fontSize: FONTS.sizes.md, color: '#78350F', lineHeight: '2', fontWeight: FONTS.weight.bold, fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif' }}>
                    <div>🏗️ Prototype Check</div>
                    <div>📏 Span Verification</div>
                    <div>🔧 Assembly Alignment</div>
                  </div>
                </div>

                {/* Bottom Right: Quality */}
                <div style={{ background: '#FEF2F2', padding: '22px', borderRadius: '10px', border: '4px solid #DC2626', textAlign: 'center', boxShadow: '0 4px 12px rgba(220, 38, 38, 0.15)' }}>
                  <div style={{ fontSize: FONTS.sizes.xl, fontWeight: 900, color: '#991B1B', marginBottom: '14px', fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif' }}>✓ Quality</div>
                  <div style={{ fontSize: FONTS.sizes.md, color: COLORS.red.dark, lineHeight: '2', fontWeight: FONTS.weight.bold, fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif' }}>
                    <div>🔍 Factory Audit</div>
                    <div>📋 QA/QC Systems</div>
                    <div>✅ Track Record</div>
                  </div>
                </div>
              </div>

              {/* Closing Statement */}
              <div style={{ marginTop: '22px', padding: SPACING.lg, background: '#065F46', borderRadius: BORDERS.radius.md, textAlign: 'center', fontSize: FONTS.sizes.md, fontWeight: 900, color: '#FFFFFF', border: '2px solid #047857', fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif' }}>
                Only partners who score green in all four areas advance to bidding.
              </div>
            </div>
          </div>
        )}

        {/* Logistics Tab */}
        {activeSubtabs.factors === 3 && (
          <div className="card" style={{ padding: SPACING.lg }}>
            <h2 style={{ fontSize: '24px', color: '#2563EB', fontWeight: 800, marginBottom: SPACING.sm }}>
              🚚 LOGISTICS: Zero Surprises. Maximum Site Efficiency.
            </h2>
            <p style={{ fontSize: FONTS.sizes.md, color: '#4b5563', marginBottom: '15px' }}>
              Transportation clearance, crane staging, site access—we solve these upfront so your setting team executes flawlessly and on schedule.
            </p>

            {/* Location Info */}
            <div style={{ marginBottom: SPACING.lg, padding: '12px', background: '#F3F4F6', border: '1px solid #D1D5DB', borderRadius: BORDERS.radius.md }}>
              <div style={{ marginBottom: SPACING.sm }}>
                <strong style={{ fontSize: FONTS.sizes.base, color: COLORS.gray.darker }}>Project Site:</strong>
                <span style={{ fontSize: FONTS.sizes.base, color: COLORS.gray.dark, marginLeft: SPACING.sm }}>
                  {projectData.propertyLocation || 'Not set'}
                </span>
              </div>
              <div>
                <strong style={{ fontSize: FONTS.sizes.base, color: COLORS.gray.darker }}>Factory Location:</strong>
                <span style={{ fontSize: FONTS.sizes.base, color: COLORS.gray.dark, marginLeft: SPACING.sm }}>
                  {projectData.factoryLocation || 'Not set'}
                </span>
              </div>
              {!projectData.propertyLocation || !projectData.factoryLocation ? (
                <div style={{ marginTop: SPACING.sm, fontSize: FONTS.sizes.sm, color: COLORS.gray.base, fontStyle: 'italic' }}>
                  Set both locations in Project tab to view route map
                </div>
              ) : null}
            </div>

            {/* Route Metadata Display */}
            {routeMetadata && (
              <div style={{
                marginBottom: SPACING.md,
                padding: '16px',
                background: '#EFF6FF',
                border: '2px solid #3B82F6',
                borderRadius: BORDERS.radius.md
              }}>
                <div style={{ fontSize: FONTS.sizes.base, fontWeight: FONTS.weight.bold, color: '#1E40AF', marginBottom: '12px' }}>
                  📊 Route Information
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '12px' }}>
                  <div>
                    <div style={{ fontSize: FONTS.sizes.xs, color: '#6B7280', marginBottom: '2px' }}>Distance</div>
                    <div style={{ fontSize: FONTS.sizes.base, fontWeight: FONTS.weight.semibold, color: '#111827' }}>
                      {routeMetadata.distance}
                    </div>
                  </div>
                  <div>
                    <div style={{ fontSize: FONTS.sizes.xs, color: '#6B7280', marginBottom: '2px' }}>Est. Drive Time</div>
                    <div style={{ fontSize: FONTS.sizes.base, fontWeight: FONTS.weight.semibold, color: '#111827' }}>
                      {routeMetadata.duration}
                    </div>
                  </div>
                </div>
              </div>
            )}


            {/* Interactive Map */}
            {apiKey && (projectData.factoryCoordinates || projectData.propertyCoordinates) && (() => {
              // Calculate center point between factory and site
              const factory = projectData.factoryCoordinates;
              const site = projectData.propertyCoordinates;
              const center = factory && site
                ? { lat: (factory.lat + site.lat) / 2, lng: (factory.lng + site.lng) / 2 }
                : (site || factory);

              return (
                <div style={{ marginBottom: SPACING['2xl'], borderRadius: BORDERS.radius.md, overflow: 'hidden', border: '2px solid #e5e7eb' }}>
                  <MapComponent
                    height="600px"
                    center={center}
                    zoom={5}
                    showRoute={factory && site}
                    onRouteCalculated={setRouteMetadata}
                    markers={[
                      ...(factory ? [{ position: factory, title: 'Factory' }] : []),
                      ...(site ? [{ position: site, title: 'Site' }] : [])
                    ]}
                  />
                </div>
              );
            })()}
            {(!apiKey || (!projectData.factoryCoordinates && !projectData.propertyCoordinates)) && (
              <div style={{ marginBottom: SPACING['2xl'], padding: '20px', background: COLORS.gold.bg, border: '2px solid #FCD34D', borderRadius: BORDERS.radius.md, textAlign: 'center' }}>
                <p style={{ fontSize: FONTS.sizes.base, color: COLORS.gold.dark, margin: 0 }}>
                  {!apiKey ? '🗺️ Google Maps API key not configured' : '🗺️ Set project site and factory locations in Project tab to view map'}
                </p>
              </div>
            )}

            <div className="grid-2" style={{ gap: '20px' }}>
              <div>
                <h3 style={{ fontSize: FONTS.sizes.md, fontWeight: FONTS.weight.bold, color: '#1E40AF', marginBottom: SPACING.sm }}>
                  1. Transportation Analysis: Factory-to-Site
                </h3>
                <ul style={{ listStyle: 'none', paddingLeft: 0, fontSize: FONTS.sizes.base, color: COLORS.gray.medium, lineHeight: 1.4 }}>
                  <li style={{ marginBottom: '4px' }}>• Optimized travel distance and drive time.</li>
                  <li style={{ marginBottom: '4px' }}>• Evaluation of street access, bridge clearances, and turning radius.</li>
                  <li style={{ marginBottom: '4px' }}>• Pre-confirming rules for 13.5' & 15.9' wide modules.</li>
                  <li style={{ marginBottom: '4px' }}>• Assessment of setting and transportation liability/damages.</li>
                </ul>
              </div>
              <div>
                <h3 style={{ fontSize: FONTS.sizes.md, fontWeight: FONTS.weight.bold, color: '#1E40AF', marginBottom: SPACING.sm }}>
                  2. Site Installation & Staging
                </h3>
                <ul style={{ listStyle: 'none', paddingLeft: 0, fontSize: FONTS.sizes.base, color: COLORS.gray.medium, lineHeight: 1.4 }}>
                  <li style={{ marginBottom: '4px' }}>• Staging area suitability and site access for modules.</li>
                  <li style={{ marginBottom: '4px' }}>• Detailed crane logistics and setup location planning.</li>
                  <li style={{ marginBottom: '4px' }}>• Establishing the scope for the setting crew (stitching, connections, repairs).</li>
                  <li style={{ marginBottom: '4px' }}>• Final setting schedule provided.</li>
                </ul>
              </div>
            </div>
          </div>
        )}

        {/* Construction Tab */}
        {activeSubtabs.factors === 4 && (
          <div style={{ padding: '0 8px' }}>
            {/* Main Hero Section */}
            <div style={{ background: 'linear-gradient(135deg, #f0fdf4 0%, #e8f5e9 100%)', padding: '28px', borderRadius: '12px', border: '4px solid #065F46', marginBottom: '28px', boxShadow: '0 8px 24px rgba(6, 95, 70, 0.2)' }}>
              <h2 style={{ fontSize: '38px', color: COLORS.green.dark, fontWeight: 900, marginBottom: SPACING.lg, textAlign: 'center', lineHeight: '1.3', fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif' }}>
                🏗️ Construction Planning & Execution
              </h2>
              <p style={{ fontSize: FONTS.sizes.xl, color: '#047857', marginBottom: '0px', lineHeight: '1.8', textAlign: 'center', fontWeight: 600, fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif' }}>
                Streamlined on-site construction with factory-built modules for faster, more predictable project delivery and quality assurance.
              </p>
            </div>

            {/* Central Hero Image Placeholder */}
            <div style={{ background: '#FFFFFF', padding: '24px', borderRadius: '12px', border: '3px solid #065F46', marginBottom: '28px', boxShadow: '0 6px 18px rgba(0,0,0,0.1)', textAlign: 'center' }}>
              <div style={{ background: '#f0fdf4', border: '3px dashed #16A34A', borderRadius: '8px', padding: '80px 40px', minHeight: '400px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                <div style={{ fontSize: '64px', marginBottom: '20px' }}>🏗️</div>
                <h3 style={{ fontSize: '24px', fontWeight: 900, color: COLORS.green.dark, marginBottom: '12px', fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif' }}>
                  Hero Image Placeholder
                </h3>
                <p style={{ fontSize: FONTS.sizes.lg, color: COLORS.gray.medium, maxWidth: '600px', fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif' }}>
                  Construction process visualization, site installation, or modular assembly imagery will be displayed here
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CoordinationTab;
