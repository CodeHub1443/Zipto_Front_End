import { useState } from 'react'
import AnalyticsLifecycle from './AnalyticsLifecycle'
import Onboarding from './Onboarding'
import SellixCopilot from './SellixCopilot'

function App() {
  const [view, setView] = useState('onboarding')

  return (
    <div style={{ position: 'relative' }}>
      <div style={{ 
        position: 'fixed', 
        top: 10, 
        right: 10, 
        zIndex: 1000, 
        display: 'flex', 
        gap: 8,
        background: 'rgba(255,255,255,0.8)',
        padding: '8px',
        borderRadius: '8px',
        boxShadow: '0 2px 10px rgba(0,0,0,0.1)'
      }}>
        <button onClick={() => setView('onboarding')} style={{ padding: '4px 8px', cursor: 'pointer', background: view === 'onboarding' ? '#6366F1' : '#eee', color: view === 'onboarding' ? '#fff' : '#000', border: 'none', borderRadius: '4px' }}>Onboarding</button>
        <button onClick={() => setView('analytics')} style={{ padding: '4px 8px', cursor: 'pointer', background: view === 'analytics' ? '#6366F1' : '#eee', color: view === 'analytics' ? '#fff' : '#000', border: 'none', borderRadius: '4px' }}>Analytics</button>
        <button onClick={() => setView('copilot')} style={{ padding: '4px 8px', cursor: 'pointer', background: view === 'copilot' ? '#6366F1' : '#eee', color: view === 'copilot' ? '#fff' : '#000', border: 'none', borderRadius: '4px' }}>Copilot</button>
      </div>

      {view === 'onboarding' && <Onboarding />}
      {view === 'analytics' && <AnalyticsLifecycle />}
      {view === 'copilot' && <SellixCopilot />}
    </div>
  )
}

export default App
