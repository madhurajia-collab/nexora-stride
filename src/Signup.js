import React, { useState } from 'react';

function Signup({ onSignup, onGoToLogin }) {
  const [name, setName]                   = useState('');
  const [email, setEmail]                 = useState('');
  const [password, setPassword]           = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword]   = useState(false);
  const [showConfirm, setShowConfirm]     = useState(false);
  const [error, setError]                 = useState('');
  const [success, setSuccess]             = useState(false);

  // ── Validation helpers ──
  const nameValid     = name.trim().length > 0;
  const emailValid    = email.length > 0 && email.includes('@');
  const passwordValid = password.length >= 6;
  const confirmValid  = confirmPassword.length > 0 && confirmPassword === password;

  const getBorderColor = (value, isValid) => {
    if (value.length === 0) return '#30363D';
    return isValid ? '#16A34A' : '#DC2626';
  };

  const handleSignup = () => {
    if (!nameValid) {
      setError('Please enter your full name.');
      return;
    }
    if (!emailValid) {
      setError('Please enter a valid email address.');
      return;
    }
    if (!passwordValid) {
      setError('Password must be at least 6 characters.');
      return;
    }
    if (!confirmValid) {
      setError('Passwords do not match.');
      return;
    }

    const users = JSON.parse(localStorage.getItem('stride_users') || '[]');
    const exists = users.find(u => u.email === email);
    if (exists) {
      setError('An account with this email already exists.');
      return;
    }

    const newUser = {
      id: Date.now(),
      name: name.trim(),
      email: email,
      password: password,
      role: 'member',
      joinedAt: new Date().toLocaleDateString()
    };

    users.push(newUser);
    localStorage.setItem('stride_users', JSON.stringify(users));

    setError('');
    setSuccess(true);

    setTimeout(() => {
      onSignup(newUser);
    }, 1500);
  };

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
            Create your account to get started.
          </p>
        </div>

        {/* Success Message */}
        {success && (
          <div style={{
            backgroundColor: '#14290D',
            border: '1px solid #16A34A',
            borderRadius: '8px',
            padding: '12px',
            marginBottom: '16px',
            color: '#86EFAC',
            fontSize: '13px',
            textAlign: 'center'
          }}>
            ✅ Account created! Logging you in...
          </div>
        )}

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

        {/* Name */}
        <div style={{ marginBottom: '16px' }}>
          <label style={{ display: 'block', color: '#8B949E', fontSize: '13px', marginBottom: '6px' }}>
            Full Name
          </label>
          <input
            type="text"
            value={name}
            onChange={(e) => { setName(e.target.value); setError(''); }}
            placeholder="e.g. Madhura Kulkarni"
            style={{
              width: '100%',
              backgroundColor: '#0D1117',
              border: `1px solid ${getBorderColor(name, nameValid)}`,
              borderRadius: '8px',
              padding: '12px',
              color: '#FFFFFF',
              fontSize: '14px',
              boxSizing: 'border-box'
            }}
          />
          {name.length > 0 && (
            <p style={{ margin: '4px 0 0 0', fontSize: '12px', color: nameValid ? '#16A34A' : '#DC2626' }}>
              {nameValid ? '✅ Looks good' : '❌ Name cannot be empty'}
            </p>
          )}
        </div>

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
        <div style={{ marginBottom: '16px' }}>
          <label style={{ display: 'block', color: '#8B949E', fontSize: '13px', marginBottom: '6px' }}>
            Password
          </label>
          <div style={{ position: 'relative' }}>
            <input
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={(e) => { setPassword(e.target.value); setError(''); }}
              placeholder="Minimum 6 characters"
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
              {passwordValid ? '✅ Strong enough' : '❌ Minimum 6 characters required'}
            </p>
          )}
        </div>

        {/* Confirm Password */}
        <div style={{ marginBottom: '24px' }}>
          <label style={{ display: 'block', color: '#8B949E', fontSize: '13px', marginBottom: '6px' }}>
            Confirm Password
          </label>
          <div style={{ position: 'relative' }}>
            <input
              type={showConfirm ? 'text' : 'password'}
              value={confirmPassword}
              onChange={(e) => { setConfirmPassword(e.target.value); setError(''); }}
              placeholder="Re-enter your password"
              style={{
                width: '100%',
                backgroundColor: '#0D1117',
                border: `1px solid ${getBorderColor(confirmPassword, confirmValid)}`,
                borderRadius: '8px',
                padding: '12px 44px 12px 12px',
                color: '#FFFFFF',
                fontSize: '14px',
                boxSizing: 'border-box'
              }}
            />
            <span
              onClick={() => setShowConfirm(!showConfirm)}
              style={{
                position: 'absolute',
                right: '12px',
                top: '50%',
                transform: 'translateY(-50%)',
                cursor: 'pointer',
                fontSize: '18px',
                userSelect: 'none'
              }}>
              {showConfirm ? '🙈' : '👁'}
            </span>
          </div>
          {confirmPassword.length > 0 && (
            <p style={{ margin: '4px 0 0 0', fontSize: '12px', color: confirmValid ? '#16A34A' : '#DC2626' }}>
              {confirmValid ? '✅ Passwords match' : '❌ Passwords do not match'}
            </p>
          )}
        </div>

        {/* Signup Button */}
        <button
          onClick={handleSignup}
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
          Create Account
        </button>

        {/* Go to Login */}
        <p style={{ textAlign: 'center', color: '#8B949E', fontSize: '13px', margin: '0' }}>
          Already have an account?{' '}
          <span
            onClick={onGoToLogin}
            style={{ color: '#6D28D9', cursor: 'pointer', fontWeight: 'bold' }}>
            Log In
          </span>
        </p>

      </div>
    </div>
  );
}

export default Signup;