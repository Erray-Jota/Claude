import { useState } from 'react';
import { useProject } from '../../contexts/ProjectContext';
import { useCalculations, formatCurrency, formatMega } from '../../hooks/useCalculations';
import { MASTER_DIVISIONS } from '../../data/constants';

const CostAnalysisTab = () => {
  const { projectData, switchTab, activeSubtabs, switchSubtab } = useProject();
  const calculations = useCalculations(projectData);

  const [scenarioA, setScenarioA] = useState({ property: 0.87, factory: 0.87 });
  const [scenarioB, setScenarioB] = useState({ property: 1.35, factory: 0.87 });

  const renderDivisionTable = () => {
    const rows = MASTER_DIVISIONS.map(div => {
      const scaleFactor = 1000 * calculations.unitRatio * calculations.floorMultiplier;
      const siteAdj = div.site * projectData.propertyFactor * scaleFactor;
      const gcAdj = div.gc * projectData.propertyFactor * scaleFactor;
      const fabAdj = div.fab * projectData.factoryFactor * scaleFactor;
      const modTotal = gcAdj + fabAdj;

      return { ...div, siteAdj, gcAdj, fabAdj, modTotal };
    });

    const totals = rows.reduce((acc, row) => ({
      site: acc.site + row.siteAdj,
      gc: acc.gc + row.gcAdj,
      fab: acc.fab + row.fabAdj,
      mod: acc.mod + row.modTotal,
    }), { site: 0, gc: 0, fab: 0, mod: 0 });

    return (
      <div className="card" style={{ marginTop: '12px', padding: 0, boxShadow: 'none' }}>
        <h2>📊 Cost Breakdown by Division (MasterFormat)</h2>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ background: '#f3f4f6', borderBottom: '2px solid #d1d5db' }}>
              <th style={{ padding: '8px', textAlign: 'left', fontSize: '14px' }}>Division</th>
              <th style={{ padding: '8px', textAlign: 'right', fontSize: '14px' }}>Site Build</th>
              <th style={{ padding: '8px', textAlign: 'right', fontSize: '14px', color: '#2563eb' }}>Mod GC</th>
              <th style={{ padding: '8px', textAlign: 'right', fontSize: '14px', color: '#16a34a' }}>Mod Fab</th>
              <th style={{ padding: '8px', textAlign: 'right', fontSize: '14px' }}>Modular Total</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row, i) => (
              <tr key={i} style={{ borderBottom: '1px solid #e5e7eb' }}>
                <td style={{ padding: '8px', paddingLeft: '16px' }}>{row.code} {row.name}</td>
                <td style={{ padding: '8px', textAlign: 'right' }}>{formatCurrency(row.siteAdj)}</td>
                <td style={{ padding: '8px', textAlign: 'right', color: '#2563eb' }}>{formatCurrency(row.gcAdj)}</td>
                <td style={{ padding: '8px', textAlign: 'right', color: '#16a34a' }}>{formatCurrency(row.fabAdj)}</td>
                <td style={{ padding: '8px', textAlign: 'right' }}><strong>{formatCurrency(row.modTotal)}</strong></td>
              </tr>
            ))}
            <tr style={{ borderTop: '2px solid #374151', background: '#e5e7eb' }}>
              <td style={{ padding: '8px', fontWeight: 'bold', fontSize: '16px' }}>Total Cost</td>
              <td style={{ padding: '8px', textAlign: 'right', fontWeight: 'bold', fontSize: '16px' }}>{formatMega(totals.site)}</td>
              <td colSpan="3" style={{ padding: '8px', textAlign: 'right', fontWeight: 'bold', fontSize: '16px' }}>{formatMega(totals.mod)}</td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  };

  return (
    <div>
      <h1 style={{ fontSize: '18px', fontWeight: 700, color: '#111827', marginBottom: '8px', textAlign: 'center' }}>
        Cost Analysis
      </h1>

      {/* Project Info Banner */}
      <div className="project-info-banner">
        <div className="cost-column">
          <div className="metric-label">SITE COST (EST)</div>
          <div className="metric-main-value" style={{ color: calculations.isSavings ? '#DC2626' : '#111827' }}>
            {formatMega(calculations.siteCost)}
          </div>
          <div className="cost-details-inline">
            <div className="cost-sub-group">
              <span className="cost-sub-label">Cost/SF:</span>
              <span className="cost-sub-value">{formatCurrency(calculations.siteCostPerSF)}</span>
            </div>
            <div className="cost-sub-group">
              <span className="cost-sub-label">Cost/Unit:</span>
              <span className="cost-sub-value">{formatCurrency(calculations.siteCostPerUnit / 1000)}K</span>
            </div>
          </div>
        </div>

        <div className="cost-column">
          <div className="metric-label">MODULAR COST (EST)</div>
          <div className="metric-main-value" style={{ color: calculations.isSavings ? '#16A34A' : '#DC2626' }}>
            {formatMega(calculations.modularCost)}
          </div>
          <div className="cost-details-inline">
            <div className="cost-sub-group">
              <span className="cost-sub-label">Cost/SF:</span>
              <span className="cost-sub-value">{formatCurrency(calculations.modularCostPerSF)}</span>
            </div>
            <div className="cost-sub-group">
              <span className="cost-sub-label">Cost/Unit:</span>
              <span className="cost-sub-value">{formatCurrency(calculations.modularCostPerUnit / 1000)}K</span>
            </div>
          </div>
        </div>

        <div className="time-column">
          <div className="time-metrics-row">
            <div className="time-metric-group">
              <div className="time-label">SITE BUILD TIME</div>
              <div className="time-main-value">{calculations.siteBuildTimeMonths} mo</div>
            </div>
            <div className="time-metric-group">
              <div className="time-label">MODULAR BUILD TIME</div>
              <div className="time-main-value">{calculations.modularBuildTimeMonths} mo</div>
            </div>
          </div>
          <span className="time-savings">Savings: {calculations.timeSavings} mo</span>
        </div>
      </div>

      {/* Sub-tabs */}
      <div className="subtab-container">
        <div className="subtab-nav">
          <button onClick={() => switchSubtab('cost', 1)} className={`subtab-btn ${activeSubtabs.cost === 1 ? 'active-subtab' : ''}`}>
            📊 Summary & MasterFormat
          </button>
          <button onClick={() => switchSubtab('cost', 2)} className={`subtab-btn ${activeSubtabs.cost === 2 ? 'active-subtab' : ''}`}>
            🔄 Scenario Comparison
          </button>
          <button onClick={() => switchSubtab('cost', 3)} className={`subtab-btn ${activeSubtabs.cost === 3 ? 'active-subtab' : ''}`}>
            📚 Assembly Explorer
          </button>
        </div>
      </div>

      {/* Content */}
      <div>
        <div className="card" style={{ background: 'linear-gradient(135deg, #15803D 0%, #0F6630 100%)', color: 'white', padding: '16px', marginBottom: '12px' }}>
          <h2 style={{ color: 'white', marginBottom: '6px' }}>{projectData.projectName}</h2>
          <p style={{ opacity: 0.9, fontSize: '14px' }}>
            {projectData.floors} Floors • {calculations.totalOptimized} Units • {Math.round(calculations.totalGSF).toLocaleString()} GSF
          </p>
        </div>

        <div className="grid-2">
          <div className="card" style={{ border: '1px solid #d1d5db', padding: '16px' }}>
            <h3 style={{ fontSize: '16px', marginBottom: '10px' }}>🏗️ Traditional Build</h3>
            <p className="small-text">📍 Property Factor: {projectData.propertyFactor.toFixed(2)}</p>
            <div style={{ fontSize: '28px', fontWeight: 'bold' }}>{formatMega(calculations.siteCost)}</div>
            <div style={{ display: 'flex', gap: '16px', marginTop: '8px' }}>
              <div>
                <div style={{ fontSize: '20px', fontWeight: 'bold', color: '#111827' }}>{formatCurrency(calculations.siteCostPerSF)}</div>
                <div style={{ fontSize: '14px', color: '#6b7280' }}>per sq ft</div>
              </div>
              <div>
                <div style={{ fontSize: '20px', fontWeight: 'bold', color: '#111827' }}>{formatCurrency(calculations.siteCostPerUnit / 1000)}K</div>
                <div style={{ fontSize: '14px', color: '#6b7280' }}>per unit</div>
              </div>
            </div>
          </div>

          <div className="card" style={{ border: '2px solid #16a34a', background: '#f0fdf4', padding: '16px' }}>
            <h3 style={{ fontSize: '16px', marginBottom: '10px' }}>🏭 RaaP Modular</h3>
            <p className="small-text">📍 Site: {projectData.propertyFactor.toFixed(2)} | 🏭 Factory: {projectData.factoryFactor.toFixed(2)}</p>
            <div style={{ color: '#16a34a', fontSize: '28px', fontWeight: 'bold' }}>{formatMega(calculations.modularCost)}</div>
            <div style={{ display: 'flex', gap: '16px', marginTop: '8px' }}>
              <div>
                <div style={{ fontSize: '20px', fontWeight: 'bold', color: '#16a34a' }}>{formatCurrency(calculations.modularCostPerSF)}</div>
                <div style={{ fontSize: '14px', color: '#15803d' }}>per sq ft</div>
              </div>
              <div>
                <div style={{ fontSize: '20px', fontWeight: 'bold', color: '#16a34a' }}>{formatCurrency(calculations.modularCostPerUnit / 1000)}K</div>
                <div style={{ fontSize: '14px', color: '#15803d' }}>per unit</div>
              </div>
            </div>

            <div style={{ background: '#16a34a', color: 'white', padding: '8px', borderRadius: '6px', marginTop: '8px' }}>
              <p style={{ fontSize: '14px', fontWeight: 600, margin: 0 }}>
                {calculations.isSavings ? '💚 YOU SAVE' : '⚠️ ADDITIONAL INVESTMENT'}
              </p>
              <p style={{ fontSize: '20px', fontWeight: 'bold', margin: '4px 0' }}>
                {formatMega(Math.abs(calculations.savings))}
              </p>
              <p style={{ fontSize: '16px', margin: 0 }}>
                {Math.abs(calculations.savingsPercent).toFixed(1)}% {calculations.isSavings ? 'Less' : 'More'}
              </p>
            </div>
          </div>
        </div>

        {activeSubtabs.cost === 1 && renderDivisionTable()}

        {activeSubtabs.cost === 2 && (
          <div className="card" style={{ marginTop: '12px' }}>
            <h2>🔄 Scenario Comparison</h2>
            <p className="small-text">Compare different location combinations</p>
            <div style={{ padding: '20px', textAlign: 'center', color: '#6b7280' }}>
              Scenario comparison feature coming soon...
            </div>
          </div>
        )}

        {activeSubtabs.cost === 3 && (
          <div className="card" style={{ marginTop: '12px' }}>
            <h2>📚 Assembly Explorer</h2>
            <p className="small-text">Explore construction assemblies with RSMeans codes</p>
            <div style={{ padding: '20px', textAlign: 'center', color: '#6b7280' }}>
              Assembly explorer feature coming soon...
            </div>
          </div>
        )}

        <div className="flex-end" style={{ marginTop: '15px' }}>
          <button className="btn btn-secondary" onClick={() => switchTab(3)}>← Back to Design</button>
          <button className="btn btn-primary" onClick={() => switchTab(5)}>Continue → Other Factors</button>
        </div>
      </div>
    </div>
  );
};

export default CostAnalysisTab;
