"use client";

import { useState } from "react";
import Link from "next/link";
import axios from "axios";
import { baseAPI } from "@/lib/constants";

export default function Signup() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);

    const signup = async () => {
        try {
            await axios.post(
                `${baseAPI}/api/auth/signup`,
                { name, email, password },
                { withCredentials: true }
            );
            alert(
                "✅ Account created successfully! Please login."
            );


            window.location.href = "/login";
        } catch (err) {
            alert("Signup Failed");
        } finally {
            setLoading(false);
        }
    };

    const handleKeyDown = (e) => {
        if (e.key === "Enter") signup();
    };

    return (
        <>
            <style>{`
                .signup-wrapper * { box-sizing: border-box; margin: 0; padding: 0; }

.signup-wrapper {
    min-height: 100vh;
    display: flex;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
    background: #F8FAFC;
}

                /* ── Left Brand Panel ── */
                .brand-panel {
                    display: none;
                    flex-direction: column;
                    justify-content: space-between;
                    width: 45%;
                    background: #0F172A;
                    padding: 48px 52px;
                    position: relative;
                    overflow: hidden;
                }

                @media (min-width: 900px) {
                    .brand-panel { display: flex; }
                }

                .brand-panel::before {
                    content: '';
                    position: absolute;
                    top: -120px;
                    right: -120px;
                    width: 400px;
                    height: 400px;
                    border-radius: 50%;
                    background: radial-gradient(circle, rgba(99,102,241,0.25) 0%, transparent 70%);
                    pointer-events: none;
                }

                .brand-panel::after {
                    content: '';
                    position: absolute;
                    bottom: -80px;
                    left: -80px;
                    width: 300px;
                    height: 300px;
                    border-radius: 50%;
                    background: radial-gradient(circle, rgba(129,140,248,0.15) 0%, transparent 70%);
                    pointer-events: none;
                }

                .brand-logo {
                    display: flex;
                    align-items: center;
                    gap: 10px;
                }

                .brand-logo-mark {
                    width: 36px;
                    height: 36px;
                    background: #6366F1;
                    border-radius: 10px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                }

                .brand-logo-mark svg {
                    width: 20px;
                    height: 20px;
                    fill: #fff;
                }

                .brand-logo-name {
                    font-size: 18px;
                    font-weight: 700;
                    color: #fff;
                    letter-spacing: -0.3px;
                }

                .brand-main {
                    z-index: 1;
                }

                .brand-headline {
                    font-size: 38px;
                    font-weight: 800;
                    color: #fff;
                    line-height: 1.15;
                    letter-spacing: -1px;
                    margin-bottom: 16px;
                }

                .brand-headline span {
                    color: #818CF8;
                }

                .brand-sub {
                    font-size: 15px;
                    color: #94A3B8;
                    line-height: 1.6;
                    max-width: 340px;
                }

                .brand-footer {
                    font-size: 13px;
                    color: #475569;
                    z-index: 1;
                }

                /* ── Right Form Panel ── */
                .form-panel {
                    flex: 1;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    padding: 48px 24px;
                }

                .form-card {
                    width: 100%;
                    max-width: 400px;
                }

                /* Mobile-only logo */
                .mobile-logo {
                    display: flex;
                    align-items: center;
                    gap: 10px;
                    margin-bottom: 36px;
                }

                @media (min-width: 900px) {
                    .mobile-logo { display: none; }
                }

                .mobile-logo-mark {
                    width: 32px;
                    height: 32px;
                    background: #6366F1;
                    border-radius: 9px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                }

                .mobile-logo-mark svg {
                    width: 18px;
                    height: 18px;
                    fill: #fff;
                }

                .mobile-logo-name {
                    font-size: 16px;
                    font-weight: 700;
                    color: #0F172A;
                }

                .form-heading {
                    font-size: 26px;
                    font-weight: 800;
                    color: #0F172A;
                    letter-spacing: -0.5px;
                    margin-bottom: 6px;
                }

                .form-subheading {
                    font-size: 14px;
                    color: #64748B;
                    margin-bottom: 32px;
                }

                .field {
                    margin-bottom: 16px;
                }

                .field label {
                    display: block;
                    font-size: 13px;
                    font-weight: 600;
                    color: #374151;
                    margin-bottom: 6px;
                    letter-spacing: 0.2px;
                }

                .field input {
                    width: 100%;
                    padding: 11px 14px;
                    border: 1.5px solid #E2E8F0;
                    border-radius: 10px;
                    font-size: 14.5px;
                    color: #0F172A;
                    background: #fff;
                    outline: none;
                    transition: border-color 0.15s, box-shadow 0.15s;
                    -webkit-appearance: none;
                }

                .field input::placeholder {
                    color: #CBD5E1;
                }

                .field input:focus {
                    border-color: #6366F1;
                    box-shadow: 0 0 0 3px rgba(99,102,241,0.12);
                }

                .signup-btn {
                    width: 100%;
                    padding: 12px;
                    background: #6366F1;
                    color: #fff;
                    font-size: 15px;
                    font-weight: 600;
                    border: none;
                    border-radius: 10px;
                    cursor: pointer;
                    margin-top: 8px;
                    transition: background 0.15s, transform 0.1s, box-shadow 0.15s;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    gap: 8px;
                    letter-spacing: 0.1px;
                }

                .signup-btn:hover:not(:disabled) {
                    background: #4F46E5;
                    box-shadow: 0 4px 14px rgba(99,102,241,0.35);
                }

                .signup-btn:active:not(:disabled) {
                    transform: scale(0.99);
                }

                .signup-btn:disabled {
                    opacity: 0.7;
                    cursor: not-allowed;
                }

                .spinner {
                    width: 16px;
                    height: 16px;
                    border: 2px solid rgba(255,255,255,0.35);
                    border-top-color: #fff;
                    border-radius: 50%;
                    animation: spin 0.7s linear infinite;
                }

                @keyframes spin {
                    to { transform: rotate(360deg); }
                }

                .terms {
                    font-size: 12px;
                    color: #94A3B8;
                    text-align: center;
                    margin-top: 14px;
                    line-height: 1.6;
                }

                .terms a {
                    color: #6366F1;
                    text-decoration: none;
                    font-weight: 500;
                }

                .terms a:hover {
                    text-decoration: underline;
                }

                .divider {
                    display: flex;
                    align-items: center;
                    gap: 12px;
                    margin: 22px 0;
                }

                .divider-line {
                    flex: 1;
                    height: 1px;
                    background: #E2E8F0;
                }

                .divider-text {
                    font-size: 12px;
                    color: #94A3B8;
                    white-space: nowrap;
                }

                .login-row {
                    text-align: center;
                    font-size: 13.5px;
                    color: #64748B;
                }

                .login-row a {
                    color: #6366F1;
                    font-weight: 600;
                    text-decoration: none;
                }

                .login-row a:hover {
                    text-decoration: underline;
                }
            `}</style>

            <div className="signup-wrapper">

                {/* ── Brand Panel (desktop) ── */}
                <div className="brand-panel">
                    <div className="brand-logo">
                        <div className="brand-logo-mark">
                            <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
                            </svg>
                        </div>
                        <span className="brand-logo-name">NextCart</span>
                    </div>

                    <div className="brand-main">
                        <h2 className="brand-headline">
                            Start your journey<br />with <span>us today.</span>
                        </h2>
                        <p className="brand-sub">
                            Create your free account in seconds and unlock everything your workspace has to offer.
                        </p>
                    </div>

                    <p className="brand-footer">© 2025 YourApp, Inc.</p>
                </div>

                {/* ── Form Panel ── */}
                <div className="form-panel">
                    <div className="form-card">

                        {/* Mobile logo */}
                        <div className="mobile-logo">
                            <div className="mobile-logo-mark">
                                <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
                                </svg>
                            </div>
                            <span className="mobile-logo-name">NextCart</span>
                        </div>

                        <h1 className="form-heading">Create an account</h1>
                        <p className="form-subheading">Free forever. No credit card required.</p>

                        {/* Name */}
                        <div className="field">
                            <label htmlFor="name">Full name</label>
                            <input
                                id="name"
                                type="text"
                                placeholder="John Doe"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                onKeyDown={handleKeyDown}
                                autoComplete="name"
                            />
                        </div>

                        {/* Email */}
                        <div className="field">
                            <label htmlFor="email">Email address</label>
                            <input
                                id="email"
                                type="email"
                                placeholder="you@example.com"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                onKeyDown={handleKeyDown}
                                autoComplete="email"
                            />
                        </div>

                        {/* Password */}
                        <div className="field">
                            <label htmlFor="password">Password</label>
                            <input
                                id="password"
                                type="password"
                                placeholder="Min. 8 characters"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                onKeyDown={handleKeyDown}
                                autoComplete="new-password"
                            />
                        </div>

                        <button
                            className="signup-btn"
                            onClick={signup}
                            disabled={loading}
                        >
                            {loading ? (
                                <>
                                    <span className="spinner" />
                                    Creating account…
                                </>
                            ) : (
                                "Create account"
                            )}
                        </button>

                        <p className="terms">
                            By signing up you agree to our{" "}
                            <a href="/terms">Terms of Service</a> and{" "}
                            <a href="/privacy">Privacy Policy</a>.
                        </p>

                        <div className="divider">
                            <div className="divider-line" />
                            <span className="divider-text">Already have an account?</span>
                            <div className="divider-line" />
                        </div>

                        <p className="login-row">
                            <Link href="/login">Sign in instead →</Link>
                        </p>

                    </div>
                </div>

            </div>
        </>
    );
}