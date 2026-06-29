import React, { useState, useEffect } from 'react';

function LandingPage({ onGetStarted }) {
 const [currentIndex, setCurrentIndex] = useState(0);
const words = ['Smarter.', 'Faster.', 'Together.'];

useEffect(() => {
  const interval = setInterval(() => {
    setCurrentIndex(prev => (prev + 1) % words.length);
  }, 2000);
  return () => clearInterval(interval);
}, [words.length]);

  const features = [
    { icon: '⚡', title: 'Sprint Intelligence', desc: 'AI-powered sprint planning that predicts blockers before they happen.' },
    { icon: '👥', title: 'Team Visibility', desc: 'See every team member\'s workload, progress, and blockers in real time.' },
    { icon: '📊', title: 'Smart Reports', desc: 'Auto-generated weekly digests and sprint forecasts — no manual reporting.' },
    { icon: '🎯', title: 'My Tasks', desc: 'Every team member sees their personal task queue, sorted by priority.' },
    { icon: '🔔', title: 'Blocker Alerts', desc: 'Get notified the moment a task goes silent — before it derails the sprint.' },
    { icon: '✨', title: 'AI Digest', desc: 'Plain-English summary of your team\'s week, generated automatically.' },
  ];

  const stats = [
    { value: '73%', label: 'Average sprint completion rate' },
    { value: '3x', label: 'Faster blocker resolution' },
    { value: '0', label: 'Manual status reports needed' },
    { value: '∞', label: 'Teams supported' },
  ];

  return (
    <div style={{
      backgroundColor: '#0D1117',
      minHeight: '100vh',
      fontFamily: 'Arial, sans-serif',
      color: '#FFFFFF',
      overflowX: 'hidden'
    }}>

      {/* Navbar */}
      <div style={{
        padding: '20px 48px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderBottom: '1px solid #21262D'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span style={{ color: '#6D28D9', fontWeight: 'bold', fontSize: '13px', letterSpacing: '3px' }}>NEXORA</span>
          <span style={{ color: '#FFFFFF', fontWeight: 'bold', fontSize: '22px' }}>Stride</span>
        </div>
        <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
          <button
            onClick={() => onGetStarted('login')}
            style={{
              backgroundColor: 'transparent',
              border: '1px solid #30363D',
              color: '#FFFFFF',
              borderRadius: '8px',
              padding: '8px 20px',
              fontSize: '14px',
              cursor: 'pointer'
            }}>
            Log In
          </button>
          <button
            onClick={() => onGetStarted('signup')}
            style={{
              backgroundColor: '#6D28D9',
              border: 'none',
              color: '#FFFFFF',
              borderRadius: '8px',
              padding: '8px 20px',
              fontSize: '14px',
              fontWeight: 'bold',
              cursor: 'pointer'
            }}>
            Get Started Free
          </button>
        </div>
      </div>

      {/* Hero Section */}
      <div style={{
        textAlign: 'center',
        padding: '100px 48px 80px',
        background: 'radial-gradient(ellipse at top, #1a0533 0%, #0D1117 60%)'
      }}>
        {/* Badge */}
        <div style={{
          display: 'inline-block',
          backgroundColor: '#1a0533',
          border: '1px solid #6D28D9',
          borderRadius: '999px',
          padding: '6px 16px',
          fontSize: '13px',
          color: '#C4B5FD',
          marginBottom: '32px'
        }}>
          ✨ AI-Powered Sprint Intelligence
        </div>

        {/* Main Headline */}
        <h1 style={{
          fontSize: '64px',
          fontWeight: 'bold',
          lineHeight: '1.1',
          margin: '0 0 16px 0',
          maxWidth: '800px',
          marginLeft: 'auto',
          marginRight: 'auto'
        }}>
          Your team delivers
          <br />
          <span style={{ color: '#6D28D9' }}>
            {words[currentIndex]}
          </span>
        </h1>

        {/* Subheadline */}
        <p style={{
          fontSize: '20px',
          color: '#8B949E',
          maxWidth: '560px',
          margin: '0 auto 48px',
          lineHeight: '1.6'
        }}>
          Nexora Stride is the AI sprint intelligence dashboard that tells you what's on track, what's blocked, and what to do about it — automatically.
        </p>

        {/* CTA Buttons */}
        <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', marginBottom: '64px' }}>
          <button
            onClick={() => onGetStarted('signup')}
            style={{
              backgroundColor: '#6D28D9',
              border: 'none',
              color: '#FFFFFF',
              borderRadius: '10px',
              padding: '16px 32px',
              fontSize: '16px',
              fontWeight: 'bold',
              cursor: 'pointer'
            }}>
            Start for Free →
          </button>
          <button
            onClick={() => onGetStarted('login')}
            style={{
              backgroundColor: 'transparent',
              border: '1px solid #30363D',
              color: '#FFFFFF',
              borderRadius: '10px',
              padding: '16px 32px',
              fontSize: '16px',
              cursor: 'pointer'
            }}>
            Log In
          </button>
        </div>

        {/* Stats Row */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)',
          gap: '32px',
          maxWidth: '700px',
          margin: '0 auto',
          paddingTop: '48px',
          borderTop: '1px solid #21262D'
        }}>
          {stats.map((stat, i) => (
            <div key={i}>
              <div style={{ fontSize: '36px', fontWeight: 'bold', color: '#6D28D9' }}>
                {stat.value}
              </div>
              <div style={{ fontSize: '13px', color: '#8B949E', marginTop: '4px' }}>
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Features Section */}
      <div style={{ padding: '80px 48px', backgroundColor: '#0D1117' }}>
        <div style={{ textAlign: 'center', marginBottom: '56px' }}>
          <h2 style={{ fontSize: '40px', fontWeight: 'bold', margin: '0 0 16px 0' }}>
            Everything your team needs
          </h2>
          <p style={{ color: '#8B949E', fontSize: '18px', margin: '0' }}>
            Built for engineering teams who want less chaos and more delivery.
          </p>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: '24px',
          maxWidth: '1000px',
          margin: '0 auto'
        }}>
          {features.map((feature, i) => (
            <div key={i} style={{
              backgroundColor: '#161B22',
              border: '1px solid #21262D',
              borderRadius: '12px',
              padding: '28px',
              transition: 'border-color 0.2s'
            }}
              onMouseEnter={e => e.currentTarget.style.borderColor = '#6D28D9'}
              onMouseLeave={e => e.currentTarget.style.borderColor = '#21262D'}
            >
              <div style={{ fontSize: '32px', marginBottom: '12px' }}>{feature.icon}</div>
              <h3 style={{ fontSize: '18px', fontWeight: 'bold', margin: '0 0 8px 0' }}>
                {feature.title}
              </h3>
              <p style={{ color: '#8B949E', fontSize: '14px', margin: '0', lineHeight: '1.6' }}>
                {feature.desc}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* How It Works */}
      <div style={{ padding: '80px 48px', backgroundColor: '#0D1117', borderTop: '1px solid #21262D' }}>
        <div style={{ textAlign: 'center', marginBottom: '56px' }}>
          <h2 style={{ fontSize: '40px', fontWeight: 'bold', margin: '0 0 16px 0' }}>
            How it works
          </h2>
          <p style={{ color: '#8B949E', fontSize: '18px', margin: '0' }}>
            Up and running in minutes. No complex setup.
          </p>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: '32px',
          maxWidth: '900px',
          margin: '0 auto'
        }}>
          {[
            { step: '01', title: 'Create your account', desc: 'Sign up in 30 seconds. No credit card required.' },
            { step: '02', title: 'Invite your team', desc: 'Share your unique invite link. Team members join instantly.' },
            { step: '03', title: 'Start sprinting', desc: 'Add tasks, track progress, get AI insights automatically.' },
          ].map((item, i) => (
            <div key={i} style={{ textAlign: 'center' }}>
              <div style={{
                width: '56px',
                height: '56px',
                borderRadius: '50%',
                backgroundColor: '#1a0533',
                border: '2px solid #6D28D9',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 16px',
                fontWeight: 'bold',
                color: '#6D28D9',
                fontSize: '16px'
              }}>
                {item.step}
              </div>
              <h3 style={{ fontSize: '18px', fontWeight: 'bold', margin: '0 0 8px 0' }}>
                {item.title}
              </h3>
              <p style={{ color: '#8B949E', fontSize: '14px', margin: '0', lineHeight: '1.6' }}>
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* CTA Section */}
      <div style={{
        padding: '80px 48px',
        textAlign: 'center',
        background: 'radial-gradient(ellipse at center, #1a0533 0%, #0D1117 70%)',
        borderTop: '1px solid #21262D'
      }}>
        <h2 style={{ fontSize: '48px', fontWeight: 'bold', margin: '0 0 16px 0' }}>
          Ready to stride forward?
        </h2>
        <p style={{ color: '#8B949E', fontSize: '18px', margin: '0 0 40px 0' }}>
          Join teams who ship on time, every sprint.
        </p>
        <button
          onClick={() => onGetStarted('signup')}
          style={{
            backgroundColor: '#6D28D9',
            border: 'none',
            color: '#FFFFFF',
            borderRadius: '10px',
            padding: '18px 48px',
            fontSize: '18px',
            fontWeight: 'bold',
            cursor: 'pointer'
          }}>
          Get Started Free →
        </button>
      </div>

      {/* Footer */}
      <div style={{
        padding: '32px 48px',
        borderTop: '1px solid #21262D',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span style={{ color: '#6D28D9', fontWeight: 'bold', fontSize: '11px', letterSpacing: '3px' }}>NEXORA</span>
          <span style={{ color: '#FFFFFF', fontWeight: 'bold', fontSize: '16px' }}>Stride</span>
        </div>
        <p style={{ color: '#8B949E', fontSize: '13px', margin: '0' }}>
          © 2026 Nexora · Built by Madhura Kulkarni · Kolhapur, India
        </p>
        <p style={{ color: '#8B949E', fontSize: '13px', margin: '0' }}>
          Track. Predict. Deliver.
        </p>
      </div>

    </div>
  );
}

export default LandingPage;