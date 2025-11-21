import { useProject } from '../../contexts/ProjectContext';

const PortfolioTab = () => {
  const { switchTab } = useProject();

  const products = [
    {
      id: 'smartstart',
      icon: '⚡',
      title: 'SmartStart: Know in 2 Weeks, Save 20x.',
      subtitle: 'Turn your vision into a modular-ready project with firm pricing and a conceptual design optimized for fabrication.',
      badge: 'PHASE 1: FEASIBILITY & PRICE',
      gradient: 'linear-gradient(135deg, #FEF3C7 0%, #FFFBEB 100%)',
      headerBg: '#D97706',
      borderColor: '#D97706',
      textColor: '#92400E',
      benefits: [
        { label: 'Investment', smart: '$10K Flat Fee', traditional: '$50K - $150K soft costs' },
        { label: 'Design Focus', smart: 'Factory Optimized Conceptual Design', traditional: 'Often Designed for Stick-Build' },
        { label: 'Pricing Detail', smart: 'Firm Bids (3-5 GCs/Fabs)', traditional: 'Rough Estimates (±20% Extrapolation)' },
        { label: 'Outputs', smart: 'Entitlement & Funding Ready Package', traditional: 'Requires major Rework for Coordination' },
      ],
      message: 'SmartStart pays for itself 10–20× on the factory side alone.',
    },
    {
      id: 'fabassure',
      icon: '🔒',
      title: 'FabAssure: Risk & Cost Mitigation.',
      subtitle: 'Confidently select the right fabricator and manage the contract process to lock in quality, scope, and price.',
      badge: 'PHASE 2: PARTNER SELECTION & AWARD',
      gradient: 'linear-gradient(135deg, #FEE2E2 0%, #FEF2F2 100%)',
      headerBg: '#DC2626',
      borderColor: '#DC2626',
      textColor: '#991B1B',
      benefits: [
        { label: 'Selection Criteria', smart: 'Detailed 4-Factor Evaluation (Viability, Price, Quality, Design)', traditional: 'Limited Vetting; High Risk of Misalignment' },
        { label: 'Scope Alignment', smart: 'RaaP Manages Scope/Term Negotiation for modular core', traditional: 'Direct Negotiation; Risk of Missed Scope' },
        { label: 'Payment Model', smart: 'Paid from Savings, Not Upfront', traditional: 'Standard Consulting Fees (Upfront)' },
        { label: 'Outcome', smart: 'Saves Millions, Reduces RFIs & Submittals', traditional: 'Cost Creep & Execution Risk' },
      ],
      message: 'We don\'t get fully paid unless you save real dollars.',
    },
    {
      id: 'easydesign',
      icon: '🏗️',
      title: 'EasyDesign: Fixed Price Architecture.',
      subtitle: 'A Product Architecture Package defining the design, performance, and factory-ready details for your modular core.',
      badge: 'PHASE 3: DESIGN & PERMITTING',
      gradient: 'linear-gradient(135deg, #EBF8EE 0%, #F0FDF4 100%)',
      headerBg: '#16A34A',
      borderColor: '#16A34A',
      textColor: '#065F46',
      benefits: [
        { label: 'Modular Core', smart: '80% Factory Permit Set', traditional: 'Standard Design (Needs Factory Rework)' },
        { label: 'AHJ Submission', smart: '~40% of AHJ Permit Set Completed', traditional: 'Modular Details Must be Re-engineered' },
        { label: 'Efficiency', smart: 'Eliminates Factory Rework & Saves Design Fees', traditional: 'High Rework/RFI Rate During Fabrication' },
        { label: 'Costing', smart: 'Fixed Fee developed with AoR', traditional: 'Hourly/Percentage Fees; Uncertain Final Cost' },
      ],
      message: 'Reduces overall design fees & speeds delivery by optimizing for modularity first.',
    },
  ];

  return (
    <div style={{ padding: '0 8px' }}>
      {/* Hero Section */}
      <div style={{ background: 'linear-gradient(135deg, #f0fdf4 0%, #e8f5e9 100%)', padding: '28px', borderRadius: '12px', border: '4px solid #065F46', marginBottom: '28px', boxShadow: '0 8px 24px rgba(6, 95, 70, 0.2)' }}>
        <h1 style={{ fontSize: '38px', fontWeight: 900, color: '#065F46', marginBottom: '16px', textAlign: 'center', lineHeight: '1.3', fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif' }}>
          Three Products. One Mission: De-Risk Modular.
        </h1>
        <p style={{ fontSize: '20px', color: '#047857', marginBottom: '0px', lineHeight: '1.8', textAlign: 'center', fontWeight: 600, fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif' }}>
          From feasibility to fabrication, RaaP guides you through modular construction with firm costs, partner certainty, and factory-ready design.
        </p>
      </div>

      {/* Product Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '28px' }}>
        {products.map((product) => (
          <div key={product.id} style={{ background: product.gradient, padding: '32px', borderRadius: '12px', border: `4px solid ${product.borderColor}`, boxShadow: `0 8px 24px rgba(0, 0, 0, 0.1)` }}>
            
            {/* Badge */}
            <div style={{ display: 'inline-block', background: 'rgba(255,255,255,0.9)', padding: '8px 16px', borderRadius: '8px', marginBottom: '16px', border: `2px solid ${product.borderColor}` }}>
              <span style={{ fontSize: '12px', fontWeight: 900, color: product.textColor, letterSpacing: '0.5px' }}>
                {product.badge}
              </span>
            </div>

            {/* Title & Subtitle */}
            <h2 style={{ fontSize: '32px', fontWeight: 900, color: product.textColor, marginBottom: '12px', lineHeight: '1.2', fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif' }}>
              {product.icon} {product.title}
            </h2>
            <p style={{ fontSize: '18px', color: product.textColor, marginBottom: '24px', lineHeight: '1.7', fontWeight: 600, fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif', opacity: 0.9 }}>
              {product.subtitle}
            </p>

            {/* Comparison Table */}
            <div style={{ background: '#FFFFFF', padding: '24px', borderRadius: '12px', marginBottom: '20px', boxShadow: '0 4px 12px rgba(0,0,0,0.08)', overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '16px', fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif' }}>
                <thead>
                  <tr style={{ background: product.headerBg, borderBottom: '4px solid ' + product.borderColor }}>
                    <th style={{ padding: '16px', textAlign: 'left', fontWeight: 900, color: '#FFFFFF', fontSize: '16px' }}>Metric</th>
                    <th style={{ padding: '16px', textAlign: 'left', fontWeight: 900, color: '#FFFFFF', fontSize: '16px' }}>RaaP {product.id === 'smartstart' ? 'SmartStart' : product.id === 'fabassure' ? 'FabAssure' : 'EasyDesign'}</th>
                    <th style={{ padding: '16px', textAlign: 'left', fontWeight: 900, color: '#FFFFFF', fontSize: '16px' }}>Status Quo</th>
                  </tr>
                </thead>
                <tbody>
                  {product.benefits.map((benefit, index) => (
                    <tr key={index} style={{ borderBottom: '2px solid #e5e7eb', background: index % 2 === 0 ? '#f9fafb' : '#ffffff' }}>
                      <td style={{ padding: '16px', fontWeight: 800, color: '#111827', fontSize: '16px' }}>{benefit.label}</td>
                      <td style={{ padding: '16px', color: '#065F46', fontWeight: 700, fontSize: '15px' }}>✓ {benefit.smart}</td>
                      <td style={{ padding: '16px', color: '#6b7280', fontWeight: 600, fontSize: '15px' }}>✗ {benefit.traditional}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Key Message */}
            <div style={{ background: 'rgba(255,255,255,0.95)', padding: '18px', borderRadius: '10px', border: `2px solid ${product.borderColor}`, textAlign: 'center' }}>
              <p style={{ fontSize: '16px', fontWeight: 900, color: product.textColor, margin: 0, fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif' }}>
                {product.message}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PortfolioTab;
