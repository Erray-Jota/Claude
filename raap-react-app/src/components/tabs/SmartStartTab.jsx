import { useProject } from '../../contexts/ProjectContext';

const SmartStartTab = () => {
  const { switchTab } = useProject();

  return (
    <div style={{ padding: '0 8px' }}>
      {/* Hero Section */}
      <div style={{ background: 'linear-gradient(135deg, #FEF3C7 0%, #FFFBEB 100%)', padding: '32px', borderRadius: '12px', border: '4px solid #D97706', marginBottom: '28px', boxShadow: '0 8px 24px rgba(217, 119, 6, 0.2)' }}>
        <h1 style={{ fontSize: '42px', fontWeight: 900, color: '#92400E', marginBottom: '16px', textAlign: 'center', lineHeight: '1.2', fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif' }}>
          ⚡ SmartStart: The $10K Decision That Saves You $50K–$150K
        </h1>
        <p style={{ fontSize: '22px', color: '#92400E', marginBottom: '0px', lineHeight: '1.6', textAlign: 'center', fontWeight: 600, fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif' }}>
          Know everything in 2 weeks. Avoid 6 months of guesswork. Build from strength.
        </p>
      </div>

      {/* Impact Banner */}
      <div style={{ background: '#065F46', padding: '24px', borderRadius: '12px', border: '4px solid #047857', marginBottom: '28px', boxShadow: '0 8px 24px rgba(6, 95, 70, 0.2)', textAlign: 'center' }}>
        <p style={{ fontSize: '26px', fontWeight: 900, color: '#FFFFFF', margin: '0 0 12px 0', fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif', letterSpacing: '-0.5px' }}>
          SmartStart pays for itself before you even break ground. Every time.
        </p>
        <p style={{ fontSize: '16px', fontWeight: 700, color: '#D1FAE5', margin: '0px', fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif' }}>
          $40K–$90K in immediate savings + 10–20× ROI on factory-side optimization
        </p>
      </div>

      {/* Why Developers Fail */}
      <div style={{ background: 'linear-gradient(135deg, #FEE2E2 0%, #FEF2F2 100%)', padding: '24px', borderRadius: '12px', border: '3px solid #DC2626', marginBottom: '28px', boxShadow: '0 6px 18px rgba(0,0,0,0.08)' }}>
        <h2 style={{ fontSize: '24px', fontWeight: 900, color: '#7F1D1D', textAlign: 'center', marginBottom: '12px', fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif' }}>
          Why Modular Projects Fail
        </h2>
        <p style={{ fontSize: '18px', fontWeight: 700, color: '#991B1B', textAlign: 'center', margin: '0px', lineHeight: '1.7', fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif' }}>
          <strong>Reason 1:</strong> Bad pricing (±20% estimates) → cost creep kills the deal<br/>
          <strong>Reason 2:</strong> Bad design (not modular-optimized) → factory rework delays everything<br/>
          <strong>SmartStart fixes both—before they can hurt you.</strong>
        </p>
      </div>

      {/* Three-Panel Layout */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '20px', marginBottom: '28px' }}>
        {/* Panel 1: Know in 2 Weeks */}
        <div style={{ background: 'linear-gradient(135deg, #E0F2FE 0%, #ffffff 100%)', padding: '28px', borderRadius: '12px', border: '4px solid #0EA5E9', boxShadow: '0 6px 18px rgba(14, 165, 233, 0.15)' }}>
          <div style={{ fontSize: '36px', marginBottom: '12px', textAlign: 'center' }}>⏱️</div>
          <h3 style={{ fontSize: '24px', fontWeight: 900, color: '#0369A1', marginBottom: '14px', textAlign: 'center', fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif' }}>
            Know in 2 Weeks
          </h3>
          <p style={{ fontSize: '16px', fontWeight: 700, color: '#0c4a6e', marginBottom: '14px', textAlign: 'center', lineHeight: '1.6', fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif' }}>
            Certainty Before Capital
          </p>
          <ul style={{ listStyle: 'none', paddingLeft: 0, fontSize: '15px', color: '#0c4a6e', fontWeight: 600, lineHeight: '1.9' }}>
            <li>✓ Firm modular cost</li>
            <li>✓ Fabrication-ready design</li>
            <li>✓ Entitlement-ready package</li>
          </ul>
          <div style={{ marginTop: '14px', paddingTop: '14px', borderTop: '2px solid #0EA5E9', textAlign: 'center', fontSize: '13px', fontWeight: 700, color: '#0369A1' }}>
            2 weeks → answers you normally wait 4–6 months for
          </div>
        </div>

        {/* Panel 2: Save 20× */}
        <div style={{ background: 'linear-gradient(135deg, #FEF3C7 0%, #FFFBEB 100%)', padding: '28px', borderRadius: '12px', border: '4px solid #D97706', boxShadow: '0 6px 18px rgba(217, 119, 6, 0.15)' }}>
          <div style={{ fontSize: '36px', marginBottom: '12px', textAlign: 'center' }}>💰</div>
          <h3 style={{ fontSize: '24px', fontWeight: 900, color: '#92400E', marginBottom: '14px', textAlign: 'center', fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif' }}>
            Save 20× Your Spend
          </h3>
          <p style={{ fontSize: '18px', fontWeight: 900, color: '#D97706', marginBottom: '14px', textAlign: 'center', fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif' }}>
            $10K → $50K–$150K Saved
          </p>
          <ul style={{ listStyle: 'none', paddingLeft: 0, fontSize: '15px', color: '#78350F', fontWeight: 600, lineHeight: '1.9' }}>
            <li>✓ No rework during entitlement</li>
            <li>✓ No redesign at factory</li>
            <li>✓ No ±20% cost creep</li>
          </ul>
          <div style={{ marginTop: '14px', paddingTop: '14px', borderTop: '2px solid #D97706', textAlign: 'center', fontSize: '13px', fontWeight: 700, color: '#92400E' }}>
            Removes the two biggest killers of modular deals
          </div>
        </div>

        {/* Panel 3: Negotiate from Strength */}
        <div style={{ background: 'linear-gradient(135deg, #F0FDF4 0%, #ffffff 100%)', padding: '28px', borderRadius: '12px', border: '4px solid #16A34A', boxShadow: '0 6px 18px rgba(22, 163, 74, 0.15)' }}>
          <div style={{ fontSize: '36px', marginBottom: '12px', textAlign: 'center' }}>🤝</div>
          <h3 style={{ fontSize: '24px', fontWeight: 900, color: '#065F46', marginBottom: '14px', textAlign: 'center', fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif' }}>
            Negotiate from Strength
          </h3>
          <p style={{ fontSize: '16px', fontWeight: 700, color: '#047857', marginBottom: '14px', textAlign: 'center', lineHeight: '1.6', fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif' }}>
            Real Bids. Real Numbers. Real Partners.
          </p>
          <ul style={{ listStyle: 'none', paddingLeft: 0, fontSize: '15px', color: '#047857', fontWeight: 600, lineHeight: '1.9' }}>
            <li>✓ 3–5 GC/Fabricator firm bids</li>
            <li>✓ Scope + terms aligned early</li>
            <li>✓ Bank-ready budget</li>
          </ul>
          <div style={{ marginTop: '14px', paddingTop: '14px', borderTop: '2px solid #16A34A', textAlign: 'center', fontSize: '13px', fontWeight: 700, color: '#065F46' }}>
            Start entitlement with leverage—not guesswork
          </div>
        </div>
      </div>

      {/* The SmartStart Equation */}
      <div style={{ background: 'linear-gradient(135deg, #f0fdf4 0%, #ffffff 100%)', padding: '32px', borderRadius: '12px', border: '4px solid #065F46', marginBottom: '28px', boxShadow: '0 8px 24px rgba(6, 95, 70, 0.2)', textAlign: 'center' }}>
        <h2 style={{ fontSize: '26px', fontWeight: 900, color: '#065F46', marginBottom: '24px', fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif' }}>
          The SmartStart Equation
        </h2>
        
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '16px', flexWrap: 'wrap', fontSize: '18px', fontWeight: 800, color: '#065F46', fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif' }}>
          <div style={{ padding: '14px 20px', background: '#FEF3C7', borderRadius: '8px', border: '2px solid #D97706', minWidth: '100px', textAlign: 'center' }}>
            $10K
          </div>
          <div style={{ fontSize: '24px' }}>→</div>
          <div style={{ padding: '14px 20px', background: '#F0FDF4', borderRadius: '8px', border: '2px solid #16A34A', minWidth: '140px', textAlign: 'center', fontSize: '16px' }}>
            Firm Design<br/>+ Firm Price
          </div>
          <div style={{ fontSize: '24px' }}>→</div>
          <div style={{ padding: '14px 20px', background: '#E0F2FE', borderRadius: '8px', border: '2px solid #0EA5E9', minWidth: '120px', textAlign: 'center' }}>
            $50K–$150K<br/>Savings
          </div>
          <div style={{ fontSize: '24px' }}>→</div>
          <div style={{ padding: '14px 20px', background: '#FEE2E2', borderRadius: '8px', border: '2px solid #DC2626', minWidth: '110px', textAlign: 'center', fontSize: '16px' }}>
            Zero Surprises<br/>+ Fast Approval
          </div>
          <div style={{ fontSize: '24px' }}>→</div>
          <div style={{ padding: '14px 20px', background: '#F0FDF4', borderRadius: '8px', border: '3px solid #16A34A', minWidth: '130px', textAlign: 'center', fontWeight: 900, fontSize: '17px' }}>
            Modular<br/>Success ✅
          </div>
        </div>
      </div>

      {/* Final CTA */}
      <div style={{ background: '#065F46', padding: '32px', borderRadius: '12px', border: '4px solid #047857', boxShadow: '0 8px 24px rgba(6, 95, 70, 0.2)', textAlign: 'center' }}>
        <p style={{ fontSize: '32px', fontWeight: 900, color: '#FFFFFF', margin: '0 0 14px 0', lineHeight: '1.3', fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif' }}>
          Ready to Know Everything in 2 Weeks?
        </p>
        <p style={{ fontSize: '18px', fontWeight: 700, color: '#D1FAE5', margin: '0px', fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif' }}>
          Your cost savings will exceed what you pay us. Guaranteed.
        </p>
      </div>
    </div>
  );
};

export default SmartStartTab;
