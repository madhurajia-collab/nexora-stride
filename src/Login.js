import React, { useState } from 'react';

function Login({ onLogin, onGoToSignup }) {
  const [email, setEmail]       = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError]       = useState('');
  const [screen, setScreen]     = useState('login'); // 'login' or 'forgot'
  const [forgotEmail, setForgotEmail] = useState('');
  const [forgotMsg, setForgotMsg]     = useState('');

  // ── Validation helpers ──
  const emailValid   = email.length > 0 && email.includes('@');
  const passwordValid = password.length >= 6;

  const getBorderColor = (value, isValid) => {
    if (value.length === 0) return '#30363D';
    return isValid ? '#16A34A' : '#DC2626';
  };

  const handleLogin = () => {
    if (!emailValid) {
      setError('Please enter a valid email address.');
      return;
    }
    if (!passwordValid) {
      setError('Password must be at least 6 characters.');
      return;
    }

    const users = JSON.parse(localStorage.getItem('stride_users') || '[]');
    const user  = users.find(u => u.email === email && u.password === password);

    if (!user) {
      setError('Invalid email or password. Please try again.');
      return;
    }

    setError('');
    onLogin(user);
  };

  const handleForgot = () => {
    const users = JSON.parse(localStorage.getItem('stride_users') || '[]');
    const user  = users.find(u => u.email === forgotEmail);
    if (!user) {
      setForgotMsg('No account found with this email.');
      return;
    }
    setForgotMsg(`Your password is: ${user.password}`);
  };

  // ── FORGOT PASSWORD SCREEN ──
  if (screen === 'forgot') {
    return (
      <div style={{
        backgroundColor: '#0D1117',
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontFamily: 'Arial, sans-serif'
      }}>
        <div style={{
          backgroundColor: '#161B22',
          border: '1px solid #30363D',
          borderRadius: '16px',
          padding: '48px',
          width: '400px'
        }}>
          <div style={{ textAlign: 'center', marginBottom: '32px' }}>
            <div style={{ fontSize: '14px', color: '#6D28D9', fontWeight: 'bold', letterSpacing: '4px', marginBottom: '8px' }}>
              NEXORA
            </div>
            <h1 style={{ fontSize: '28px', fontWeight: 'bold', color: '#FFFFFF', margin: '0 0 8px 0' }}>
              Forgot Password?
            </h1>
            <p style={{ color: '#8B949E', fontSize: '14px', margin: '0' }}>
              Enter your email and we'll find your account.
            </p>
          </div>

          {forgotMsg && (
            <div style={{
              backgroundColor: forgotMsg.includes('No account') ? '#2D1515' : '#14290D',
              border: `1px solid ${forgotMsg.includes('No account') ? '#DC2626' : '#16A34A'}`,
              borderRadius: '8px',
              padding: '12px',
              marginBottom: '16px',
              color: forgotMsg.includes('No account') ? '#FCA5A5' : '#86EFAC',
              fontSize: '13px',
              textAlign: 'center'
            }}>
              {forgotMsg}
            </div>
          )}

          <div style={{ marginBottom: '20px' }}>
            <label style={{ display: 'block', color: '#8B949E', fontSize: '13px', marginBottom: '6px' }}>
              Email Address
            </label>
            <input
              type="email"
              value={forgotEmail}
              onChange={(e) => { setForgotEmail(e.target.value); setForgotMsg(''); }}
              placeholder="you@example.com"
              style={{
                width: '100%',
                backgroundColor: '#0D1117',
                border: '1px solid #30363D',
                borderRadius: '8px',
                padding: '12px',
                color: '#FFFFFF',
                fontSize: '14px',
                boxSizing: 'border-box'
              }}
            />
          </div>

          <button
            onClick={handleForgot}
            style={{
              width: '100%',
              backgroundColor: '#6D28D9',
              color: '#FFFFFF',
              border: 'none',
              borderRadius: '8px',
              padding: '14px',
              fontSize: '15px',
              fontWeight: 'bold',
              cursor: 'pointer',
              marginBottom: '16px'
            }}>
            Find My Account
          </button>

          <p style={{ textAlign: 'center', color: '#8B949E', fontSize: '13px', margin: '0' }}>
            <span
              onClick={() => { setScreen('login'); setForgotMsg(''); setForgotEmail(''); }}
              style={{ color: '#6D28D9', cursor: 'pointer', fontWeight: 'bold' }}>
              ← Back to Login
            </span>
          </p>
        </div>
      </div>
    );
  }

  // ── LOGIN SCREEN ──
  return (
    <div style={{
      backgroundColor: '#0D1117',
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontFamily: 'Arial, sans-serif'
    }}>
      <div style={{
        backgroundColor: '#161B22',
        border: '1px solid #30363D',
        borderRadius: '16px',
        padding: '48px',
        width: '400px'
      }}>

        {/* Logo */}
        <div style={{ textAlign: 'center', marginBottom: '32px' }}>
          <div style={{ fontSize: '14px', color: '#6D28D9', fontWeight: 'bold', letterSpacing: '4px', marginBottom: '8px' }}>
            NEXORA
          </div>
          <h1 style={{ fontSize: '36px', fontWeight: 'bold', color: '#FFFFFF', margin: '0 0 8px 0' }}>
            Stride
          </h1>
          <p style={{ color: '#8B949E', fontSize: '14px', margin: '0' }}>
            Welcome back! Log in to continue.
          </p>
        </div>

        {/* Error */}
        {error && (
          <div style={{
            backgroundColor: '#2D1515',
            border: '1px solid #DC2626',
            borderRadius: '8px',
            padding: '12px',
            marginBottom: '16px',
            color: '#FCA5A5',
            fontSize: '13px'
          }}>
            {error}
          </div>
        )}

        {/* Email */}
        <div style={{ marginBottom: '16px' }}>
          <label style={{ display: 'block', color: '#8B949E', fontSize: '13px', marginBottom: '6px' }}>
            Email Address
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => { setEmail(e.target.value); setError(''); }}
            placeholder="you@example.com"
            style={{
              width: '100%',
              backgroundColor: '#0D1117',
              border: `1px solid ${getBorderColor(email, emailValid)}`,
              borderRadius: '8px',
              padding: '12px',
              color: '#FFFFFF',
              fontSize: '14px',
              boxSizing: 'border-box'
            }}
          />
          {email.length > 0 && (
            <p style={{ margin: '4px 0 0 0', fontSize: '12px', color: emailValid ? '#16A34A' : '#DC2626' }}>
              {emailValid ? '✅ Valid email' : '❌ Enter a valid email address'}
            </p>
          )}
        </div>

        {/* Password */}
        <div style={{ marginBottom: '8px' }}>
          <label style={{ display: 'block', color: '#8B949E', fontSize: '13px', marginBottom: '6px' }}>
            Password
          </label>
          <div style={{ position: 'relative' }}>
            <input
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={(e) => { setPassword(e.target.value); setError(''); }}
              placeholder="Enter your password"
              style={{
                width: '100%',
                backgroundColor: '#0D1117',
                border: `1px solid ${getBorderColor(password, passwordValid)}`,
                borderRadius: '8px',
                padding: '12px 44px 12px 12px',
                color: '#FFFFFF',
                fontSize: '14px',
                boxSizing: 'border-box'
              }}
            />
            <span
              onClick={() => setShowPassword(!showPassword)}
              style={{
                position: 'absolute',
                right: '12px',
                top: '50%',
                transform: 'translateY(-50%)',
                cursor: 'pointer',
                fontSize: '18px',
                userSelect: 'none'
              }}>
              {showPassword ? '🙈' : '👁'}
            </span>
          </div>
          {password.length > 0 && (
            <p style={{ margin: '4px 0 0 0', fontSize: '12px', color: passwordValid ? '#16A34A' : '#DC2626' }}>
              {passwordValid ? '✅ Password looks good' : '❌ Minimum 6 characters required'}
            </p>
          )}
        </div>

        {/* Forgot Password */}
        <div style={{ textAlign: 'right', marginBottom: '24px' }}>
          <span
            onClick={() => { setScreen('forgot'); setError(''); }}
            style={{ color: '#6D28D9', fontSize: '13px', cursor: 'pointer' }}>
            Forgot Password?
          </span>
        </div>

        {/* Login Button */}
        <button
          onClick={handleLogin}
          style={{
            width: '100%',
            backgroundColor: '#6D28D9',
            color: '#FFFFFF',
            border: 'none',
            borderRadius: '8px',
            padding: '14px',
            fontSize: '15px',
            fontWeight: 'bold',
            cursor: 'pointer',
            marginBottom: '16px'
          }}>
          Log In
        </button>

        {/* Go to Signup */}
        <p style={{ textAlign: 'center', color: '#8B949E', fontSize: '13px', margin: '0' }}>
          Don't have an account?{' '}
          <span
            onClick={onGoToSignup}
            style={{ color: '#6D28D9', cursor: 'pointer', fontWeight: 'bold' }}>
            Sign Up
          </span>
        </p>

      </div>
    </div>
  );
}

export default Login;