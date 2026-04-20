import React, { useState } from 'react';
import { NeoCard, ProgressBar } from '../components/ui';

// ─── Step 1: Welcome ──────────────────────────────────────────────────
function Step1Welcome({ onNext }) {
  return (
    <div style={{ textAlign: 'center' }}>
      <div style={{ width: 80, height: 80, background: 'var(--a1-soft)', borderRadius: 24, display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 28px', boxShadow: 'var(--shadow-neu-out)' }}>
        <svg width="36" height="36" fill="none" stroke="var(--a1)" strokeWidth="2" viewBox="0 0 24 24">
          <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
        </svg>
      </div>
      <h1 style={{ fontSize: 32, fontWeight: 800, color: 'var(--t1)', marginBottom: 16 }}>Welcome to Zipto</h1>
      <p style={{ fontSize: 16, color: 'var(--t2)', lineHeight: 1.6, maxWidth: 480, margin: '0 auto 40px' }}>
        Hi! I'm Sellix, your AI co-pilot. I'll help you set up your marketing machine in less than 2 minutes. Ready to scale?
      </p>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 12, maxWidth: 320, margin: '0 auto' }}>
        <button onClick={onNext} className="z-btn z-btn-p" style={{ padding: '16px', fontSize: 16 }}>
          Let's get started! 🚀
        </button>
        <button onClick={onNext} className="z-btn" style={{ padding: '14px', fontSize: 14 }}>
          Show me how it works
        </button>
      </div>
    </div>
  );
}

// ─── Step 2: Business Type ────────────────────────────────────────────
function Step2BusinessType({ onNext, onBack }) {
  const options = [
    { label: 'E-commerce', icon: '🛍️' },
    { label: 'Travel / Tourism', icon: '✈️' },
    { label: 'Local Service', icon: '🏠' },
    { label: 'Agency', icon: '🏢' },
    { label: 'SaaS / Tech', icon: '⚡' },
    { label: 'Food / Restaurant', icon: '🍽️' },
  ];
  return (
    <div style={{ width: '100%', maxWidth: 700 }}>
      <h2 style={{ fontSize: 28, fontWeight: 800, color: 'var(--t1)', marginBottom: 10, textAlign: 'center' }}>What kind of business?</h2>
      <p style={{ fontSize: 14, color: 'var(--t3)', textAlign: 'center', marginBottom: 32 }}>Select your industry to help Sellix tailor your initial strategy.</p>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16, marginBottom: 40 }}>
        {options.map(o => (
          <NeoCard key={o.label} innerStyle={{ padding: 24, textAlign: 'center', cursor: 'pointer' }} onClick={onNext}>
            <div style={{ fontSize: 32, marginBottom: 12 }}>{o.icon}</div>
            <div style={{ fontSize: 14, fontWeight: 700, color: 'var(--t1)' }}>{o.label}</div>
          </NeoCard>
        ))}
      </div>

      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <button onClick={onBack} className="z-btn z-btn-s">Back</button>
      </div>
    </div>
  );
}

// ─── Step 3: Identity ──────────────────────────────────────────────────
function Step3Identity({ onNext, onBack, bizName, setBizName }) {
  return (
    <div style={{ maxWidth: 420, margin: '0 auto' }}>
      <h2 style={{ fontSize: 28, fontWeight: 800, color: 'var(--t1)', marginBottom: 10, textAlign: 'center' }}>Business Identity</h2>
      <p style={{ fontSize: 14, color: 'var(--t3)', textAlign: 'center', marginBottom: 32 }}>What is the name of your brand or workspace?</p>

      <NeoCard innerStyle={{ padding: 24 }}>
        <label className="z-flbl">Workspace / Brand Name</label>
        <input 
          className="z-inp mb20" 
          placeholder="e.g. KB Aviation" 
          value={bizName} 
          onChange={e => setBizName(e.target.value)}
          autoFocus 
        />
        
        <label className="z-flbl">Business Location</label>
        <input className="z-inp mb24" placeholder="e.g. Seoul, South Korea" defaultValue="Seoul, South Korea" />

        <button onClick={onNext} className="z-btn z-btn-p" style={{ width: '100%' }} disabled={!bizName.trim()}>
          Continue →
        </button>
      </NeoCard>

      <button onClick={onBack} className="z-btn z-btn-s" style={{ width: '100%', marginTop: 12 }}>Go back</button>
    </div>
  );
}

// ─── Step 4: Platforms ────────────────────────────────────────────────
function Step4Platforms({ onNext, onBack }) {
  const platforms = [
    { 
      id: 'fb', 
      bg: '#1877F2', 
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24">
          <path fill="#1877F2" d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
        </svg>
      ), 
      label: 'Facebook' 
    },
    { 
      id: 'ig', 
      bg: '#E1306C', 
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24">
          <path fill="#E1306C" d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.791-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.209-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
        </svg>
      ), 
      label: 'Instagram' 
    },
    { 
      id: 'li', 
      bg: '#0A66C2', 
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24">
          <path fill="#0A66C2" d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
        </svg>
      ), 
      label: 'LinkedIn' 
    },
    { 
      id: 'wa', 
      bg: '#25D366', 
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24">
          <path fill="#25D366" d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L0 24l6.335-1.662c1.72.94 3.659 1.437 5.634 1.44h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413" />
        </svg>
      ), 
      label: 'WhatsApp' 
    },
  ];
  return (
    <div>
      <h2 style={{ fontSize: 28, fontWeight: 800, color: 'var(--t1)', marginBottom: 10, textAlign: 'center' }}>Social Channels</h2>
      <p style={{ fontSize: 14, color: 'var(--t3)', textAlign: 'center', marginBottom: 32 }}>Connect your platforms to start automating your growth.</p>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 40 }}>
        {platforms.map(p => (
          <NeoCard key={p.id} innerStyle={{ padding: '16px 20px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', cursor: 'pointer' }} onClick={onNext}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <div style={{ fontSize: 20 }}>{p.icon}</div>
              <span style={{ fontSize: 14, fontWeight: 700, color: 'var(--t1)' }}>{p.label}</span>
            </div>
            <button className="z-btn z-btn-sm" style={{ pointerEvents: 'none' }}>Connect</button>
          </NeoCard>
        ))}
      </div>

      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <button onClick={onNext} className="z-btn z-btn-s">Skip for now →</button>
      </div>
    </div>
  );
}

// ─── Step 5: Brand AI ────────────────────────────────────────────────
function Step5BrandAI({ onNext, onBack }) {
  const voices = ['Friendly', 'Professional', 'Exciting', 'Informative', 'Casual', 'Formal'];
  return (
    <div style={{ maxWidth: 500, margin: '0 auto' }}>
      <h2 style={{ fontSize: 28, fontWeight: 800, color: 'var(--t1)', marginBottom: 10, textAlign: 'center' }}>Brand AI Profile</h2>
      <p style={{ fontSize: 14, color: 'var(--t3)', textAlign: 'center', marginBottom: 32 }}>Tell Sellix how your brand should sound in every post.</p>

      <NeoCard innerStyle={{ padding: 24 }}>
        <div style={{ marginBottom: 24 }}>
          <label className="z-flbl">Primary Business Tone</label>
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
            {voices.map(v => (
              <div key={v} className={`z-chip ${v === 'Friendly' || v === 'Exciting' ? 'active' : ''}`} style={{ cursor: 'pointer' }}>{v}</div>
            ))}
          </div>
        </div>

        <button onClick={onNext} className="z-btn z-btn-p" style={{ width: '100%' }}>
          Finalize Brand Profile →
        </button>
      </NeoCard>
    </div>
  );
}

// ─── Step 6: First Post ──────────────────────────────────────────────
function Step6FirstPost({ onNext, bizName }) {
  return (
    <div style={{ textAlign: 'center' }}>
      <div style={{ width: 64, height: 64, background: 'var(--a1-soft)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px' }}>
        <svg width="28" height="28" fill="none" stroke="var(--a1)" strokeWidth="2.5" viewBox="0 0 24 24"><path d="M22 2L11 13 M22 2L15 22l-4-9-9-4 22-7z" /></svg>
      </div>
      <h2 style={{ fontSize: 28, fontWeight: 800, color: 'var(--t1)', marginBottom: 10 }}>Ready to Fly!</h2>
      <p style={{ fontSize: 14, color: 'var(--t3)', marginBottom: 32 }}>Sellix has prepared your first high-converting post for {bizName}.</p>

      <div style={{ background: 'var(--bg-card)', borderRadius: 24, padding: 32, boxShadow: 'var(--shadow-neu-out)', marginBottom: 40, textAlign: 'left' }}>
        <div style={{ display: 'flex', gap: 12, marginBottom: 16 }}>
          <div style={{ width: 40, height: 40, borderRadius: 10, background: 'var(--a1)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: 18, fontWeight: 800 }}>{bizName ? bizName[0] : 'K'}</div>
          <div>
            <div style={{ fontSize: 14, fontWeight: 700, color: 'var(--t1)' }}>Draft: Launch Campaign</div>
            <div style={{ fontSize: 12, color: 'var(--t3)' }}>Facebook & Instagram · AI Generated</div>
          </div>
        </div>
        <p style={{ fontSize: 13, color: 'var(--t2)', lineHeight: 1.6, background: 'var(--bg-inner)', padding: 16, borderRadius: 12, border: '1px solid var(--border)' }}>
          "✈️ Welcome to a new era of travel with {bizName || 'our brand'}. We're excited to help you explore the world with luxury, comfort, and unbeatable value. Book your next journey today! 🌍 #Travel #NewStart"
        </p>
      </div>

      <button onClick={onNext} className="z-btn z-btn-p" style={{ width: '100%', maxWidth: 320, padding: '16px', fontSize: 16 }}>
        Finish & Go to Dashboard
      </button>
    </div>
  );
}

// ─── Step 7: Done/Dashboard ──────────────────────────────────────────
function Step7Done({ onComplete }) {
  return (
    <div style={{ textAlign: 'center', maxWidth: 450, margin: '0 auto' }}>
      <div style={{ width: 72, height: 72, borderRadius: '50%', background: 'rgba(34, 197, 94, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px' }}>
        <svg width="30" height="30" fill="none" stroke="#22C55E" strokeWidth="2.5" viewBox="0 0 24 24"><path d="M20 6L9 17l-5-5" /></svg>
      </div>
      <h2 style={{ fontSize: 24, fontWeight: 700, color: 'var(--t1)', marginBottom: 12 }}>You're all set!</h2>
      <p style={{ fontSize: 14, color: 'var(--t2)', lineHeight: 1.7, marginBottom: 28 }}>Your setup is complete. Sellix will now monitor your business 24/7 to suggest high-performing marketing moves.</p>
      
      <NeoCard innerStyle={{ padding: 20, textAlign: 'left', background: 'var(--bg-inner)' }}>
        <div style={{ fontSize: 10, fontWeight: 800, color: 'var(--t3)', textTransform: 'uppercase', marginBottom: 12 }}>Quick Next Steps</div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {['Check your Analytics', 'Run your first Boost', 'Explore AI Copilot'].map(s => (
            <div key={s} style={{ display: 'flex', alignItems: 'center', gap: 10, fontSize: 13, color: 'var(--t1)', fontWeight: 600 }}>
              <div style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--a1)' }} />
              {s}
            </div>
          ))}
        </div>
      </NeoCard>

      <button onClick={onComplete} className="z-btn z-btn-p" style={{ width: '100%', marginTop: 24 }}>
        Enter Dashboard →
      </button>
    </div>
  );
}

export default function Onboarding({ onComplete }) {
  const [step, setStep] = useState(1);
  const [bizName, setBizName] = useState('');
  const totalSteps = 6;

  const next = () => setStep(s => Math.min(s + 1, 7));
  const back = () => setStep(s => Math.max(s - 1, 1));

  return (
    <div style={{
      background: 'var(--bg-page)', minHeight: '100vh', display: 'flex', flexDirection: 'column',
      alignItems: 'center', justifyContent: 'center', padding: 20, fontFamily: 'inherit'
    }}>
      {/* Progress Header */}
      {step < 7 && (
        <div style={{ width: '100%', maxWidth: 700, marginBottom: 40 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <div style={{ width: 32, height: 32, borderRadius: 10, background: 'var(--a1)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff' }}>
                <svg width="14" height="14" fill="none" stroke="white" strokeWidth="2.5" viewBox="0 0 24 24"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" /></svg>
              </div>
              <span style={{ fontSize: 14, fontWeight: 700, color: 'var(--t1)' }}>Setup Progress</span>
            </div>
            <span style={{ fontSize: 13, fontWeight: 800, color: 'var(--a1)' }}>{step} / {totalSteps}</span>
          </div>
          <ProgressBar pct={(step / totalSteps) * 100} color="var(--a1)" height={6} />
        </div>
      )}

      <div style={{ width: '100%', maxWidth: 800 }}>
        {step === 1 && <Step1Welcome onNext={next} />}
        {step === 2 && <Step2BusinessType onNext={next} onBack={back} />}
        {step === 3 && <Step3Identity onNext={next} onBack={back} bizName={bizName} setBizName={setBizName} />}
        {step === 4 && <Step4Platforms onNext={next} onBack={back} />}
        {step === 5 && <Step5BrandAI onNext={next} onBack={back} />}
        {step === 6 && <Step6FirstPost onNext={next} bizName={bizName} />}
        {step === 7 && <Step7Done onComplete={onComplete} />}
      </div>
    </div>
  );
}
