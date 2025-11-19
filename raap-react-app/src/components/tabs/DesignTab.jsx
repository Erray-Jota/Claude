import { useProject } from '../../contexts/ProjectContext';
import { useCalculations } from '../../hooks/useCalculations';
import ProjectInfoBanner from '../ProjectInfoBanner';
import { ASSET_PATHS } from '../../data/constants';
import { generateFloorPlan, generateFloorPlanGrid } from '../../engines/floorplanPlacementEngine';

const DesignTab = () => {
  const { projectData, updateProjectData, switchTab, activeSubtabs, switchSubtab } = useProject();
  const calculations = useCalculations(projectData);

  const handleInputChange = (field, value) => {
    updateProjectData({ [field]: value });
  };

  const handleTargetChange = (unitType, value) => {
    updateProjectData({
      targets: {
        ...projectData.targets,
        [unitType]: parseInt(value) || 0,
      },
    });
  };

  const videoSrc = {
    3: ASSET_PATHS.VIDEO_3_FLOORS,
    4: ASSET_PATHS.VIDEO_4_FLOORS,
    5: ASSET_PATHS.VIDEO_5_FLOORS,
  }[projectData.floors];

  const remainingLength = projectData.targetLength - calculations.requiredLength;
  const isConstraintMet = remainingLength >= -5;

  return (
    <div>
      <h1 style={{ fontSize: '18px', fontWeight: 700, color: '#111827', marginBottom: '8px', textAlign: 'center' }}>
        Design Analysis
      </h1>

      {/* Design Metrics Banner */}
      <div className="project-info-banner">
        <div className="cost-column">
          <div className="metric-label">BUILDING LENGTH (REQUIRED)</div>
          <div className="metric-main-value" style={{ color: '#111827' }}>
            {calculations.requiredLength.toFixed(1)} ft
          </div>
          <div className="cost-details-inline">
            <div className="cost-sub-group">
              <span className="cost-sub-label">TARGET:</span>
              <span className="cost-sub-value">{projectData.targetLength} ft</span>
            </div>
          </div>
        </div>

        <div className="cost-column">
          <div className="metric-label">BUILDING LENGTH (REMAINING)</div>
          <div className="metric-main-value" style={{ color: isConstraintMet ? '#16A34A' : '#DC2626' }}>
            {Math.round(remainingLength)} ft
          </div>
          <div className="cost-details-inline">
            <div className="cost-sub-group">
              <span className="cost-sub-label">FLOORS:</span>
              <span className="cost-sub-value">{projectData.floors}</span>
            </div>
          </div>
        </div>

        <div className="time-column">
          <div className="metric-label">MODULES (COUNT / EFFICIENCY)</div>
          <div style={{ display: 'flex', gap: '8px', justifyContent: 'center', width: '100%' }}>
            <div className="metric-main-value" style={{ fontSize: '22px', color: '#111827' }}>
              {calculations.totalOptimized * 2}
            </div>
            <div className="cost-sub-group" style={{ alignSelf: 'center', display: 'flex', gap: '4px' }}>
              <span style={{ fontSize: '16px', fontWeight: 700, color: '#16a34a' }}>
                {((Object.values(calculations.optimized).filter(c => c > 0).length / 4) * 100).toFixed(1)}%
              </span>
            </div>
          </div>
          <span className="small-text" style={{ fontWeight: 600, marginTop: '2px' }}>
            ({Object.values(calculations.optimized).filter(c => c > 0).length} / 4 Unit Types Used)
          </span>
        </div>
      </div>

      {/* Sub-tabs */}
      <div className="subtab-container">
        <div className="subtab-nav">
          <button onClick={() => switchSubtab('design', 1)} className={`subtab-btn ${activeSubtabs.design === 1 ? 'active-subtab' : ''}`}>
            📋 Summary
          </button>
          <button onClick={() => switchSubtab('design', 2)} className={`subtab-btn ${activeSubtabs.design === 2 ? 'active-subtab' : ''}`}>
            🏠 Units
          </button>
          <button onClick={() => switchSubtab('design', 3)} className={`subtab-btn ${activeSubtabs.design === 3 ? 'active-subtab' : ''}`}>
            🗺️ Floorplan
          </button>
          <button onClick={() => switchSubtab('design', 4)} className={`subtab-btn ${activeSubtabs.design === 4 ? 'active-subtab' : ''}`}>
            🏗️ Building
          </button>
        </div>
      </div>

      {/* Subtab Content */}
      {activeSubtabs.design === 1 && (
        <div>
          {/* Hero Video */}
          <div style={{ background: 'white', borderRadius: '8px', overflow: 'hidden', marginBottom: '12px', height: '250px', boxShadow: '0 4px 8px rgba(0,0,0,0.15)' }}>
            <video controls loop muted autoPlay style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', background: '#e5e7eb' }}>
              <source src={videoSrc} type="video/mp4" />
            </video>
          </div>

          <div className="grid-2" style={{ gap: '12px' }}>
            {/* Design Configuration */}
            <div className="card">
              <h2>
                📐 Design Configuration
                <button className="btn btn-success" style={{ padding: '4px 8px', fontSize: '12px', fontWeight: 600 }}>
                  💾 Save Project
                </button>
              </h2>

              <div className="form-group">
                <label className="form-label">Project Name</label>
                <input
                  type="text"
                  className="form-input"
                  value={projectData.projectName}
                  onChange={(e) => handleInputChange('projectName', e.target.value)}
                />
              </div>

              <div className="form-group" style={{ marginTop: '4px' }}>
                <label className="form-label">
                  Building Length (Target: {projectData.targetLength} ft)
                </label>
                <input
                  type="range"
                  min="100"
                  max="400"
                  value={projectData.targetLength}
                  step="5"
                  onChange={(e) => handleInputChange('targetLength', parseInt(e.target.value))}
                  style={{ width: '100%', height: '8px' }}
                />
                <div style={{ textAlign: 'center', fontSize: '18px', fontWeight: 700, margin: '4px 0' }}>
                  {projectData.targetLength} ft
                </div>
              </div>

              <div className="grid-3" style={{ marginTop: '4px' }}>
                <div className="form-group">
                  <label className="form-label">Lobby</label>
                  <select className="form-select" value={projectData.lobbyType} onChange={(e) => handleInputChange('lobbyType', parseInt(e.target.value))}>
                    <option value="1">1-Bay</option>
                    <option value="2">2-Bay (Default)</option>
                    <option value="4">4-Bay</option>
                  </select>
                </div>
                <div className="form-group">
                  <label className="form-label">Podium</label>
                  <select className="form-select" value={projectData.podiumCount} onChange={(e) => handleInputChange('podiumCount', parseInt(e.target.value))}>
                    <option value="0">0</option>
                    <option value="1">1</option>
                    <option value="2">2</option>
                  </select>
                </div>
                <div className="form-group">
                  <label className="form-label">Ground Floor Common Area %</label>
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={projectData.commonAreaPct}
                    step="5"
                    onChange={(e) => handleInputChange('commonAreaPct', parseInt(e.target.value))}
                    style={{ width: '100%', height: '8px', padding: 0 }}
                  />
                  <div className="small-text" style={{ textAlign: 'center' }}>{projectData.commonAreaPct}%</div>
                </div>
              </div>
            </div>

            {/* Unit Mix */}
            <div className="card">
              <h2>🎯 Target Unit Mix</h2>
              <p className="small-text" style={{ marginBottom: '8px' }}>Enter target units. Final mix will be proposed below.</p>

              <div className="grid-4" style={{ gap: '8px' }}>
                <div className="unit-input-container">
                  <label>Studio</label>
                  <input type="number" value={projectData.targets.studio} min="0" onChange={(e) => handleTargetChange('studio', e.target.value)} />
                </div>
                <div className="unit-input-container">
                  <label>1 Bed</label>
                  <input type="number" value={projectData.targets.oneBed} min="0" onChange={(e) => handleTargetChange('oneBed', e.target.value)} />
                </div>
                <div className="unit-input-container">
                  <label>2 Bed</label>
                  <input type="number" value={projectData.targets.twoBed} min="0" onChange={(e) => handleTargetChange('twoBed', e.target.value)} />
                </div>
                <div className="unit-input-container">
                  <label>3 Bed</label>
                  <input type="number" value={projectData.targets.threeBed} min="0" onChange={(e) => handleTargetChange('threeBed', e.target.value)} />
                </div>
              </div>

              <h3 style={{ fontSize: '16px', fontWeight: 700, color: '#111827', marginTop: '10px', borderTop: '1px solid #f3f4f6', paddingTop: '6px' }}>
                Proposed Unit Mix ({calculations.totalOptimized} Total)
              </h3>
              <div className="grid-4" style={{ gap: '8px', marginTop: '8px' }}>
                {['Studio', '1 Bed', '2 Bed', '3 Bed'].map((label, index) => {
                  const key = ['studio', 'oneBed', 'twoBed', 'threeBed'][index];
                  const count = calculations.optimized[key];
                  return (
                    <div key={key} className="proposed-unit-mix-item">
                      <div className="small-text">{label}</div>
                      <div className="proposed-unit-count">{count}</div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* RaaP DfMA Benefits */}
          <div className="card" style={{ marginTop: '12px' }}>
            <h2>💡 RaaP DfMA Benefits</h2>
            <ul style={{ listStyle: 'none', paddingLeft: 0, margin: 0, fontSize: '16px', color: '#374151' }}>
              <li style={{ marginBottom: '6px', display: 'flex', alignItems: 'flex-start' }}>
                <span style={{ color: '#16a34a', fontWeight: 'bold', marginRight: '8px', fontSize: '18px' }}>✓</span>
                <span>Reduced factory costs: RaaP's designs can increase factory throughput by as much as 2X ($$ millions in factory savings).</span>
              </li>
              <li style={{ marginBottom: '6px', display: 'flex', alignItems: 'flex-start' }}>
                <span style={{ color: '#16a34a', fontWeight: 'bold', marginRight: '8px', fontSize: '18px' }}>✓</span>
                <span>Reduce design & engineering fees: Our conceptual designs and factory permit sets can reduce AoR scope & effort by as much as 1/3.</span>
              </li>
              <li style={{ marginBottom: 0, display: 'flex', alignItems: 'flex-start' }}>
                <span style={{ color: '#16a34a', fontWeight: 'bold', marginRight: '8px', fontSize: '18px' }}>✓</span>
                <span>Productized designs increase the efficiency of coordination minimize RFIs & Submittals.</span>
              </li>
            </ul>
          </div>
        </div>
      )}

      {activeSubtabs.design === 2 && (
        <div className="card">
          <h2>🏠 RaaP Unit Modules Used in Design</h2>
          <p className="small-text" style={{ marginBottom: '12px' }}>Click on any unit image to see the full floorplan.</p>
          <div className="grid-3" style={{ gap: '15px' }}>
            {Object.entries(calculations.optimized).map(([key, count]) => {
              if (count === 0) return null;
              const unitMap = {
                studio: { name: 'Studio', link: ASSET_PATHS.UNIT_STUDIO },
                oneBed: { name: '1BR (Inline)', link: ASSET_PATHS.UNIT_1BR_INLINE },
                twoBed: { name: '2BR (Inline)', link: ASSET_PATHS.UNIT_2BR_INLINE },
                threeBed: { name: '3BR (Corner)', link: ASSET_PATHS.UNIT_3BR_CORNER },
              };
              const unit = unitMap[key];
              return (
                <div key={key} style={{ background: 'white', border: '1px solid #d1d5db', borderRadius: '6px', overflow: 'hidden', textAlign: 'center', boxShadow: '0 2px 4px rgba(0,0,0,0.05)' }}>
                  <a href={unit.link} target="_blank" rel="noopener noreferrer" style={{ display: 'block' }}>
                    <img src={unit.link} alt={unit.name} style={{ width: '100%', height: '100px', objectFit: 'cover' }} />
                    <div style={{ padding: '8px', fontWeight: 600, fontSize: '14px', color: '#15803D' }}>{unit.name}</div>
                  </a>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {activeSubtabs.design === 3 && (
        <div className="card">
          <h2>🗺️ Floor Plan Preview</h2>
          <p className="small-text" style={{ marginBottom: '10px' }}>
            Typical floor layout showing unit placement following modular construction rules
          </p>

          {/* Floorplan Stats */}
          <div style={{ background: '#f0fdf4', padding: '12px', borderRadius: '6px', marginBottom: '12px', border: '1px solid #86efac' }}>
            <div className="grid-4" style={{ gap: '12px', textAlign: 'center' }}>
              <div>
                <div style={{ fontSize: '12px', fontWeight: 600, color: '#15803D', marginBottom: '4px' }}>Building Length</div>
                <div style={{ fontSize: '18px', fontWeight: 700, color: '#111827' }}>{projectData.targetLength} ft</div>
              </div>
              <div>
                <div style={{ fontSize: '12px', fontWeight: 600, color: '#15803D', marginBottom: '4px' }}>Layout Type</div>
                <div style={{ fontSize: '18px', fontWeight: 700, color: '#111827' }}>
                  {projectData.lobbyType === 1 ? 'Single-Loaded' : projectData.lobbyType === 3 ? 'Wrap' : 'Double-Loaded'}
                </div>
              </div>
              <div>
                <div style={{ fontSize: '12px', fontWeight: 600, color: '#15803D', marginBottom: '4px' }}>Units Per Floor</div>
                <div style={{ fontSize: '18px', fontWeight: 700, color: '#111827' }}>{calculations.totalOptimized}</div>
              </div>
              <div>
                <div style={{ fontSize: '12px', fontWeight: 600, color: '#15803D', marginBottom: '4px' }}>Total Units</div>
                <div style={{ fontSize: '18px', fontWeight: 700, color: '#111827' }}>{calculations.totalOptimized * projectData.floors}</div>
              </div>
            </div>
          </div>

          {/* Floorplan Visualization */}
          {(() => {
            const floorPlan = generateFloorPlan(calculations.optimized, projectData.targetLength, projectData.lobbyType, projectData.floors);
            const grid = generateFloorPlanGrid(floorPlan, 2);

            const cellColors = {
              'VOID': '#f3f4f6',
              'CORR': '#fef3c7',
              'CORE': '#9ca3af',
              'STUDIO': '#dbeafe',
              'ONEBR': '#93c5fd',
              'TWOBR': '#3b82f6',
              '3BDRM': '#1e40af',
            };

            const cellLabels = {
              'CORE': '🔧',
              'STUDIO': 'ST',
              'ONEBR': '1B',
              'TWOBR': '2B',
              '3BDRM': '3B',
            };

            const cellSize = 8; // pixels per grid cell
            const gridWidth = grid[0].length;
            const gridHeight = grid.length;

            return (
              <div style={{ background: '#f9fafb', padding: '16px', borderRadius: '8px', overflowX: 'auto' }}>
                <div style={{ marginBottom: '12px' }}>
                  <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap', fontSize: '12px' }}>
                    {Object.entries(cellColors).map(([type, color]) => {
                      if (type === 'VOID') return null;
                      return (
                        <div key={type} style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                          <div style={{ width: '20px', height: '20px', background: color, border: '1px solid #d1d5db', borderRadius: '2px' }}></div>
                          <span style={{ fontWeight: 600, color: '#374151' }}>
                            {type === 'CORR' ? 'Corridor' : type === 'CORE' ? 'Core (Stairs/Elevator)' : type.replace('BR', ' BR')}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>

                <div style={{ display: 'flex', justifyContent: 'center' }}>
                  <div style={{ position: 'relative', border: '2px solid #15803D', borderRadius: '4px', background: 'white', overflow: 'hidden' }}>
                    <svg width={gridWidth * cellSize} height={gridHeight * cellSize}>
                      {grid.map((row, y) => (
                        row.map((cell, x) => (
                          <g key={`${y}-${x}`}>
                            <rect
                              x={x * cellSize}
                              y={y * cellSize}
                              width={cellSize}
                              height={cellSize}
                              fill={cellColors[cell] || '#ffffff'}
                              stroke={cell === 'CORR' ? '#f59e0b' : '#e5e7eb'}
                              strokeWidth={0.5}
                            />
                            {cellLabels[cell] && x % 4 === 0 && y % 4 === 0 && (
                              <text
                                x={x * cellSize + cellSize / 2}
                                y={y * cellSize + cellSize / 2}
                                fontSize={cellSize * 0.7}
                                fontWeight="700"
                                fill={cell === 'CORE' ? '#ffffff' : cell === '3BDRM' || cell === 'TWOBR' ? '#ffffff' : '#111827'}
                                textAnchor="middle"
                                dominantBaseline="middle"
                              >
                                {cellLabels[cell]}
                              </text>
                            )}
                          </g>
                        ))
                      ))}
                      {/* North label */}
                      <text
                        x={gridWidth * cellSize / 2}
                        y={-5}
                        fontSize="14"
                        fontWeight="700"
                        fill="#15803D"
                        textAnchor="middle"
                      >
                      </text>
                    </svg>

                    {/* Directional labels */}
                    <div style={{ position: 'absolute', top: '-24px', left: '50%', transform: 'translateX(-50%)', fontSize: '14px', fontWeight: 700, color: '#15803D' }}>
                      ⬆ NORTH
                    </div>
                    <div style={{ position: 'absolute', bottom: '-24px', left: '50%', transform: 'translateX(-50%)', fontSize: '14px', fontWeight: 700, color: '#15803D' }}>
                      ⬇ SOUTH
                    </div>
                  </div>
                </div>

                {/* Floor Plan Details */}
                <div style={{ marginTop: '16px', background: 'white', padding: '12px', borderRadius: '6px', border: '1px solid #e5e7eb' }}>
                  <h3 style={{ fontSize: '14px', fontWeight: 700, color: '#111827', marginBottom: '8px' }}>📊 Layout Details</h3>
                  <div className="grid-3" style={{ gap: '12px', fontSize: '13px' }}>
                    <div>
                      <span style={{ fontWeight: 600, color: '#374151' }}>Corridor Width:</span>
                      <span style={{ marginLeft: '6px', color: '#111827' }}>{floorPlan.corridorWidth} ft</span>
                    </div>
                    <div>
                      <span style={{ fontWeight: 600, color: '#374151' }}>Building Depth:</span>
                      <span style={{ marginLeft: '6px', color: '#111827' }}>{floorPlan.buildingDepth.toFixed(0)} ft</span>
                    </div>
                    <div>
                      <span style={{ fontWeight: 600, color: '#374151' }}>Cores:</span>
                      <span style={{ marginLeft: '6px', color: '#111827' }}>{floorPlan.coresNeeded}</span>
                    </div>
                    <div>
                      <span style={{ fontWeight: 600, color: '#374151' }}>Units per Core:</span>
                      <span style={{ marginLeft: '6px', color: '#111827' }}>{floorPlan.unitsPerCore}</span>
                    </div>
                    <div>
                      <span style={{ fontWeight: 600, color: '#374151' }}>North Side Units:</span>
                      <span style={{ marginLeft: '6px', color: '#111827' }}>{floorPlan.northSide.length}</span>
                    </div>
                    <div>
                      <span style={{ fontWeight: 600, color: '#374151' }}>South Side Units:</span>
                      <span style={{ marginLeft: '6px', color: '#111827' }}>{floorPlan.southSide.length}</span>
                    </div>
                  </div>
                </div>
              </div>
            );
          })()}
        </div>
      )}

      {activeSubtabs.design === 4 && (
        <div className="card">
          <h2>🏗️ Building Massing Options (Calculated Length: {calculations.requiredLength.toFixed(1)} ft)</h2>
          <p className="small-text" style={{ marginBottom: '12px' }}>Based on your current required length, select a building massing option.</p>
          <div className="grid-3" style={{ gap: '15px' }}>
            <div style={{ background: '#f0fdf4', border: '2px solid #16a34a', borderRadius: '6px', overflow: 'hidden', textAlign: 'center', boxShadow: '0 4px 6px rgba(0,0,0,0.1)' }}>
              <img src={ASSET_PATHS.LAYOUT_MEDIUM} alt="Medium Layout" style={{ width: '100%', height: '100px', objectFit: 'cover' }} />
              <div style={{ padding: '8px', fontWeight: 700, fontSize: '14px', color: '#16a34a' }}>
                {projectData.floors}-Story Medium Layout (Recommended)
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Navigation */}
      <div className="flex-end" style={{ marginTop: '15px' }}>
        <button className="btn btn-secondary" onClick={() => switchTab(2)}>← Back to Project</button>
        <button className="btn btn-primary" onClick={() => switchTab(4)}>Continue → Cost Analysis</button>
      </div>
    </div>
  );
};

export default DesignTab;
