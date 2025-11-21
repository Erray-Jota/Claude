import { useState } from 'react';
import { useProject } from '../../contexts/ProjectContext';
import { DUMMY_PARTNERS, DEFAULT_SITE_LOCATION, FACTORY_LOCATIONS } from '../../data/constants';

const OtherFactorsTab = () => {
  const { switchTab, activeSubtabs, switchSubtab, projectData } = useProject();
  const [filterCategory, setFilterCategory] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFactory, setSelectedFactory] = useState('');
  
  const apiKey = import.meta.env.VITE_GOOGLE_API_KEY || '';
  
  const getCategoryIcon = (category) => {
    const icons = {
      'Fabricator': '🏭',
      'GC': '👷',
      'AoR': '🏗️',
      'Consultant': '📋'
    };
    return icons[category] || '📍';
  };
  
  const getMarketplaceMapUrl = () => {
    const markers = filteredPartners.slice(0, 25).map((p, i) => {
      const colors = { 'Fabricator': 'FFA500', 'GC': '4169E1', 'AoR': '9370DB', 'Consultant': 'FF69B4' };
      const color = colors[p.category] || 'FF0000';
      return `${p.lat},${p.lng}`;
    }).join('|');
    
    return `https://maps.googleapis.com/maps/api/staticmap?center=${DEFAULT_SITE_LOCATION.lat},${DEFAULT_SITE_LOCATION.lng}&zoom=4&size=800x400&style=feature:all|element:labels|visibility:off&markers=color:0x2D5A3D|${DEFAULT_SITE_LOCATION.lat},${DEFAULT_SITE_LOCATION.lng}|label:S&markers=color:0xF59E0B|${markers.split('|').slice(0, 10).join('|')}&key=${apiKey}`;
  };
  
  const getLogisticsMapUrl = () => {
    if (!selectedFactory || !FACTORY_LOCATIONS[selectedFactory]) {
      return `https://maps.googleapis.com/maps/api/staticmap?center=${DEFAULT_SITE_LOCATION.lat},${DEFAULT_SITE_LOCATION.lng}&zoom=6&size=800x400&markers=color:0x2D5A3D|${DEFAULT_SITE_LOCATION.lat},${DEFAULT_SITE_LOCATION.lng}&key=${apiKey}`;
    }
    
    const factory = FACTORY_LOCATIONS[selectedFactory];
    return `https://maps.googleapis.com/maps/api/staticmap?center=${DEFAULT_SITE_LOCATION.lat},${DEFAULT_SITE_LOCATION.lng}&zoom=6&size=800x400&markers=color:0xF59E0B|${factory.lat},${factory.lng}|label:F&markers=color:0x2D5A3D|${DEFAULT_SITE_LOCATION.lat},${DEFAULT_SITE_LOCATION.lng}|label:S&key=${apiKey}`;
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
      <h1 style={{ fontSize: '28px', fontWeight: 800, color: '#2D5A3D', marginBottom: '8px', textAlign: 'center' }}>
        De-Risk, Accelerate & Lock In Savings
      </h1>
      <p style={{ fontSize: '16px', color: '#6b7280', textAlign: 'center', marginBottom: '20px' }}>
        Three critical levers to derisk modular construction and protect your project's timeline, costs, and quality.
      </p>

      {/* Sub-tabs */}
      <div className="subtab-container">
        <div className="subtab-nav">
          <button onClick={() => switchSubtab('factors', 1)} className={`subtab-btn ${activeSubtabs.factors === 1 ? 'active-subtab' : ''}`}>
            ⏱️ Build Time
          </button>
          <button onClick={() => switchSubtab('factors', 2)} className={`subtab-btn ${activeSubtabs.factors === 2 ? 'active-subtab' : ''}`}>
            🗺️ Marketplace
          </button>
          <button onClick={() => switchSubtab('factors', 3)} className={`subtab-btn ${activeSubtabs.factors === 3 ? 'active-subtab' : ''}`}>
            🔍 Selection
          </button>
          <button onClick={() => switchSubtab('factors', 4)} className={`subtab-btn ${activeSubtabs.factors === 4 ? 'active-subtab' : ''}`}>
            🚚 Logistics
          </button>
          <button onClick={() => switchSubtab('factors', 5)} className={`subtab-btn ${activeSubtabs.factors === 5 ? 'active-subtab' : ''}`}>
            🌎 Sustainability
          </button>
        </div>
      </div>

      <div style={{ padding: '0 8px' }}>
        {/* Build Time Tab */}
        {activeSubtabs.factors === 1 && (
          <div className="card" style={{ padding: '16px' }}>
            <h2 style={{ fontSize: '24px', color: '#16A34A', fontWeight: 800, marginBottom: '8px' }}>
              ⚡ PARALLEL PROCESSES: 10 Months to Market vs. 22 Months
            </h2>
            <p style={{ fontSize: '16px', color: '#4b5563', marginBottom: '15px' }}>
              Traditional construction follows a linear path: design → permits → construction. RaaP innovates through parallel workflows. While design documentation is being finalized, fabrication and construction begin simultaneously—groundbreaking 4 months before design is complete.
            </p>

            {/* Key Metrics */}
            <div className="grid-3" style={{ marginBottom: '20px', gap: '12px' }}>
              <div style={{ textAlign: 'center', padding: '12px', borderRadius: '6px', background: '#D1FAE5', border: '2px solid #16A34A' }}>
                <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#065F46', marginBottom: '4px' }}>10 Months</div>
                <div style={{ fontSize: '11px', color: '#065F46', fontWeight: 600 }}>RaaP Total Timeline</div>
              </div>
              <div style={{ textAlign: 'center', padding: '12px', borderRadius: '6px', background: '#FEE2E2', border: '2px solid #DC2626' }}>
                <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#7F1D1D', marginBottom: '4px' }}>22 Months</div>
                <div style={{ fontSize: '11px', color: '#7F1D1D', fontWeight: 600 }}>Traditional Timeline</div>
              </div>
              <div style={{ textAlign: 'center', padding: '12px', borderRadius: '6px', background: '#FEF3C7', border: '2px solid #F59E0B' }}>
                <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#92400E', marginBottom: '4px' }}>12 Months</div>
                <div style={{ fontSize: '11px', color: '#92400E', fontWeight: 600 }}>Time Saved to Revenue</div>
              </div>
            </div>

            {/* Timeline Breakdown Table */}
            <div style={{ background: '#f9fafb', padding: '16px', borderRadius: '8px', border: '1px solid #e5e7eb', marginTop: '15px', overflowX: 'auto' }}>
              <h3 style={{ fontSize: '14px', marginBottom: '12px', fontWeight: 700, color: '#111827' }}>Detailed Process Comparison</h3>
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '13px' }}>
                <thead>
                  <tr style={{ background: '#e5e7eb', borderBottom: '2px solid #d1d5db' }}>
                    <th style={{ padding: '10px', textAlign: 'left', fontWeight: 700 }}>Phase</th>
                    <th style={{ padding: '10px', textAlign: 'center', fontWeight: 700 }}>RaaP (Parallel)</th>
                    <th style={{ padding: '10px', textAlign: 'center', fontWeight: 700 }}>Traditional (Sequential)</th>
                  </tr>
                </thead>
                <tbody>
                  <tr style={{ borderBottom: '1px solid #e5e7eb' }}>
                    <td style={{ padding: '10px', fontWeight: 600, color: '#111827' }}>Design & Documentation</td>
                    <td style={{ padding: '10px', textAlign: 'center', color: '#065F46', fontWeight: 600 }}>2 months</td>
                    <td style={{ padding: '10px', textAlign: 'center', color: '#374151' }}>3 months</td>
                  </tr>
                  <tr style={{ borderBottom: '1px solid #e5e7eb' }}>
                    <td style={{ padding: '10px', fontWeight: 600, color: '#111827' }}>Entitlements & Permits</td>
                    <td style={{ padding: '10px', textAlign: 'center', color: '#065F46', fontWeight: 600 }}>6 months</td>
                    <td style={{ padding: '10px', textAlign: 'center', color: '#374151' }}>12 months</td>
                  </tr>
                  <tr style={{ borderBottom: '1px solid #e5e7eb' }}>
                    <td style={{ padding: '10px', fontWeight: 600, color: '#111827' }}>Construction (Fabrication + On-Site)</td>
                    <td style={{ padding: '10px', textAlign: 'center', color: '#065F46', fontWeight: 600 }}>8 months<br/><span style={{ fontSize: '11px', color: '#059669' }}>(Overlaps with permits)</span></td>
                    <td style={{ padding: '10px', textAlign: 'center', color: '#374151' }}>8 months</td>
                  </tr>
                  <tr style={{ background: '#f0fdf4', borderTop: '2px solid #16A34A' }}>
                    <td style={{ padding: '12px', fontWeight: 700, color: '#065F46' }}>TOTAL TIMELINE</td>
                    <td style={{ padding: '12px', textAlign: 'center', fontWeight: 700, color: '#065F46', fontSize: '14px' }}>10 months</td>
                    <td style={{ padding: '12px', textAlign: 'center', fontWeight: 700, color: '#7F1D1D', fontSize: '14px' }}>22 months</td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Process Flow Visual */}
            <div style={{ marginTop: '16px', padding: '12px', background: '#F0FDF4', borderRadius: '6px', border: '1px solid #86EFAC' }}>
              <p style={{ fontSize: '12px', fontWeight: 600, color: '#065F46', marginBottom: '8px' }}>🔄 The RaaP Parallel Advantage:</p>
              <p style={{ fontSize: '13px', color: '#047857', lineHeight: '1.6', margin: 0 }}>
                While entitlements are finalized, RaaP mobilizes your fabricator and GC simultaneously. Modules are fabricated on a factory schedule (not waiting for permit clearance). Ground-breaking occurs 4 months before design sign-off—converting timeline risk into market advantage.
              </p>
            </div>

            {/* Key Takeaway */}
            <div style={{ marginTop: '12px', padding: '12px', background: '#FEF3C7', borderRadius: '6px', border: '1px solid #FCD34D' }}>
              <p style={{ fontSize: '12px', fontWeight: 600, color: '#92400E', marginBottom: '4px' }}>💡 What This Means for Your Project:</p>
              <p style={{ fontSize: '13px', color: '#78350F', margin: 0 }}>
                Revenue from operations starts 12 months earlier than traditional development. At $5K–$8K annual rent per unit, a 100-unit project generates $600K–$800K in incremental annual rent.
              </p>
            </div>
          </div>
        )}

        {/* Marketplace Tab */}
        {activeSubtabs.factors === 2 && (
          <div className="card" style={{ padding: '16px' }}>
            <h2 style={{ fontSize: '24px', color: '#2D5A3D', fontWeight: 800, marginBottom: '8px' }}>
              🛡️ RISK: Partner Selection That Prevents Project Failure
            </h2>
            <p style={{ fontSize: '16px', color: '#4b5563', marginBottom: '15px' }}>
              A factory that can't deliver. A GC misaligned with modular logic. Scope creep that derails costs. We mitigate these risks through a rigorous 4-pillar evaluation framework ensuring long-term success.
            </p>
            
            {/* Google Maps - Partner Locations */}
            {apiKey && (
              <div style={{ marginBottom: '20px', borderRadius: '8px', overflow: 'hidden', border: '2px solid #e5e7eb' }}>
                <img 
                  src={getMarketplaceMapUrl()} 
                  alt="Partner Locations Map" 
                  style={{ width: '100%', height: '400px', objectFit: 'cover' }}
                  onError={() => console.log('Map failed to load')}
                />
              </div>
            )}
            {!apiKey && (
              <div style={{ marginBottom: '20px', padding: '20px', background: '#FEF3C7', border: '2px solid #FCD34D', borderRadius: '8px', textAlign: 'center' }}>
                <p style={{ fontSize: '14px', color: '#92400E', margin: 0 }}>
                  📍 Google Maps will display partner locations once API key is configured
                </p>
              </div>
            )}

            {/* Filters */}
            <div style={{ display: 'flex', gap: '10px', marginBottom: '15px' }}>
              <select
                className="form-select"
                value={filterCategory}
                onChange={(e) => setFilterCategory(e.target.value)}
                style={{ maxWidth: '200px' }}
              >
                <option value="All">Filter by All Categories</option>
                <option value="Fabricator">Fabricators</option>
                <option value="GC">General Contractors</option>
                <option value="AoR">Architects of Record</option>
                <option value="Consultant">Consultants</option>
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
                <div key={index} className="partner-card">
                  <div className="partner-name">{partner.name}</div>
                  <div style={{ marginBottom: '8px' }}>
                    <span className="partner-tag">{partner.category}</span>
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

        {/* Selection Tab */}
        {activeSubtabs.factors === 3 && (
          <div className="card" style={{ padding: '16px' }}>
            <h2 style={{ fontSize: '24px', color: '#DC2626', fontWeight: 800, marginBottom: '8px' }}>
              💰 COST: Real Numbers Before You Commit Capital
            </h2>
            <p style={{ fontSize: '16px', color: '#4b5563', marginBottom: '15px' }}>
              Know if your project pencils BEFORE entitlement. Firm bids from 3–5 fabricators eliminate speculative estimates and give you negotiation power to lock in your margin.
            </p>

            {/* 4-Pillar Banner */}
            <div className="grid-4" style={{ gap: '8px', marginBottom: '20px' }}>
              <div style={{ textAlign: 'center', padding: '10px', borderRadius: '6px', background: '#E0F2FE', border: '1px solid #93C5FD' }}>
                <div style={{ fontSize: '20px', fontWeight: 'bold', color: '#1E40AF' }}>Commercial Viability</div>
                <div style={{ fontSize: '12px', color: '#4b5563' }}>25% Weight</div>
              </div>
              <div style={{ textAlign: 'center', padding: '10px', borderRadius: '6px', background: '#F0FDF4', border: '1px solid #86EFAC' }}>
                <div style={{ fontSize: '20px', fontWeight: 'bold', color: '#065F46' }}>Cost</div>
                <div style={{ fontSize: '12px', color: '#4b5563' }}>25% Weight</div>
              </div>
              <div style={{ textAlign: 'center', padding: '10px', borderRadius: '6px', background: '#FFFBEB', border: '1px solid #FDE68A' }}>
                <div style={{ fontSize: '20px', fontWeight: 'bold', color: '#B45309' }}>Design Fit</div>
                <div style={{ fontSize: '12px', color: '#4b5563' }}>25% Weight</div>
              </div>
              <div style={{ textAlign: 'center', padding: '10px', borderRadius: '6px', background: '#FEF2F2', border: '1px solid #FCA5A5' }}>
                <div style={{ fontSize: '20px', fontWeight: 'bold', color: '#991B1B' }}>Quality</div>
                <div style={{ fontSize: '12px', color: '#4b5563' }}>25% Weight</div>
              </div>
            </div>

            <div style={{ background: '#FEF2F2', border: '1px solid #FCA5A5', color: '#991B1B', padding: '12px', borderRadius: '8px' }}>
              <p style={{ fontSize: '14px', fontWeight: 600, marginBottom: 0 }}>
                We don't just optimize cost; we guarantee partner reliability, preventing construction delays and financial fallout caused by poor partner selection.
              </p>
            </div>
          </div>
        )}

        {/* Logistics Tab */}
        {activeSubtabs.factors === 4 && (
          <div className="card" style={{ padding: '16px' }}>
            <h2 style={{ fontSize: '24px', color: '#2563EB', fontWeight: 800, marginBottom: '8px' }}>
              🚚 LOGISTICS: Zero Surprises. Maximum Site Efficiency.
            </h2>
            <p style={{ fontSize: '16px', color: '#4b5563', marginBottom: '15px' }}>
              Transportation clearance, crane staging, site access—we solve these upfront so your setting team executes flawlessly and on schedule.
            </p>
            
            {/* Factory Selection for Route */}
            <div style={{ marginBottom: '15px' }}>
              <label style={{ fontSize: '14px', fontWeight: 600, color: '#111827', marginBottom: '8px', display: 'block' }}>
                Select Factory for Route Analysis:
              </label>
              <select
                value={selectedFactory}
                onChange={(e) => setSelectedFactory(e.target.value)}
                style={{
                  width: '100%',
                  maxWidth: '300px',
                  padding: '8px',
                  border: '1px solid #d1d5db',
                  borderRadius: '4px',
                  fontSize: '14px'
                }}
              >
                <option value="">-- Select Factory --</option>
                {Object.keys(FACTORY_LOCATIONS).map((factoryName) => (
                  <option key={factoryName} value={factoryName}>{factoryName}</option>
                ))}
              </select>
            </div>
            
            {/* Google Maps - Route */}
            {apiKey && (
              <div style={{ marginBottom: '20px', borderRadius: '8px', overflow: 'hidden', border: '2px solid #e5e7eb' }}>
                <img 
                  src={getLogisticsMapUrl()} 
                  alt="Logistics Route Map" 
                  style={{ width: '100%', height: '400px', objectFit: 'cover' }}
                  onError={() => console.log('Map failed to load')}
                />
              </div>
            )}
            {!apiKey && (
              <div style={{ marginBottom: '20px', padding: '20px', background: '#FEF3C7', border: '2px solid #FCD34D', borderRadius: '8px', textAlign: 'center' }}>
                <p style={{ fontSize: '14px', color: '#92400E', margin: 0 }}>
                  🗺️ Route mapping will display once API key is configured
                </p>
              </div>
            )}

            <div className="grid-2" style={{ gap: '20px' }}>
              <div>
                <h3 style={{ fontSize: '16px', fontWeight: 700, color: '#1E40AF', marginBottom: '8px' }}>
                  1. Transportation Analysis: Factory-to-Site
                </h3>
                <ul style={{ listStyle: 'none', paddingLeft: 0, fontSize: '14px', color: '#374151', lineHeight: 1.4 }}>
                  <li style={{ marginBottom: '4px' }}>• Optimized travel distance and drive time.</li>
                  <li style={{ marginBottom: '4px' }}>• Evaluation of street access, bridge clearances, and turning radius.</li>
                  <li style={{ marginBottom: '4px' }}>• Pre-confirming rules for 13.5' & 15.9' wide modules.</li>
                  <li style={{ marginBottom: '4px' }}>• Assessment of setting and transportation liability/damages.</li>
                </ul>
              </div>
              <div>
                <h3 style={{ fontSize: '16px', fontWeight: 700, color: '#1E40AF', marginBottom: '8px' }}>
                  2. Site Installation & Staging
                </h3>
                <ul style={{ listStyle: 'none', paddingLeft: 0, fontSize: '14px', color: '#374151', lineHeight: 1.4 }}>
                  <li style={{ marginBottom: '4px' }}>• Staging area suitability and site access for modules.</li>
                  <li style={{ marginBottom: '4px' }}>• Detailed crane logistics and setup location planning.</li>
                  <li style={{ marginBottom: '4px' }}>• Establishing the scope for the setting crew (stitching, connections, repairs).</li>
                  <li style={{ marginBottom: '4px' }}>• Final setting schedule provided.</li>
                </ul>
              </div>
            </div>
          </div>
        )}

        {/* Sustainability Tab */}
        {activeSubtabs.factors === 5 && (
          <div className="card" style={{ padding: '16px' }}>
            <h2 style={{ fontSize: '24px', color: '#16A34A', fontWeight: 800, marginBottom: '8px' }}>
              🌱 SUSTAINABILITY: Performance Standards Built Into Modular.
            </h2>
            <p style={{ fontSize: '16px', color: '#4b5563', marginBottom: '15px' }}>
              Modular factory QC and precision assembly deliver Net Zero Energy standards inherently. We optimize for minimal costed upgrades while maximizing long-term ROI.
            </p>

            {/* Summary Metrics */}
            <div className="grid-2" style={{ maxWidth: '600px', marginBottom: '20px', marginTop: '10px' }}>
              <div style={{ textAlign: 'center', padding: '10px', borderRadius: '6px', background: '#F0FDF4', border: '1px solid #86EFAC' }}>
                <div style={{ fontSize: '20px', fontWeight: 'bold', color: '#065F46' }}>Guaranteed Performance</div>
                <div style={{ fontSize: '12px', color: '#4b5563' }}>Factory Quality Control (QC)</div>
              </div>
              <div style={{ textAlign: 'center', padding: '10px', borderRadius: '6px', background: '#F0FDF4', border: '1px solid #86EFAC' }}>
                <div style={{ fontSize: '20px', fontWeight: 'bold', color: '#065F46' }}>Up to 50%</div>
                <div style={{ fontSize: '12px', color: '#4b5563' }}>Reduction in Construction Waste</div>
              </div>
            </div>

            <div style={{ background: '#ECFDF5', border: '1px solid #A7F3D0', color: '#059669', padding: '12px', borderRadius: '8px', marginTop: '20px' }}>
              <p style={{ fontSize: '14px', fontWeight: 600, marginBottom: 0 }}>
                The modular system provides the high-performance foundation (Score 5.0/5). We identify the minimum, costed upgrades necessary for guaranteed Net Zero certification, protecting your long-term ROI.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default OtherFactorsTab;
