"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Lock, User, Eye, EyeOff, AlertCircle, ArrowRight } from "lucide-react";
import styles from "./login.module.css";

export default function AdminLoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!username.trim() || !password.trim()) {
      setError("Please fill in all credentials.");
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const res = await fetch("/api/admin/auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        let errorMsg = data.error || "Login failed.";
        if (data.remainingAttempts !== undefined && res.status === 401) {
          errorMsg += ` ${data.remainingAttempts} attempts remaining.`;
        }
        setError(errorMsg);
        setIsLoading(false);
        return;
      }

      // Successful login -> Redirect to admin panel
      router.push("/admin");
    } catch (err: any) {
      console.error("Login request error:", err);
      setError("Unable to connect to the login service. Please try again.");
      setIsLoading(false);
    }
  };

  return (
    <div className={styles.loginWrapper}>
      {/* Visual background details */}
      <div className={styles.circleDecor1} />
      <div className={styles.circleDecor2} />

      <div className={styles.cardContainer}>
        <header>
          <h1 className={styles.logoText}>
            Convo <span className={styles.goldText}>Gown</span>
          </h1>
          <p className={styles.tagline}>Admin Dashboard Panel</p>
        </header>

        <form onSubmit={handleLogin} noValidate>
          {error && (
            <div className={styles.alertCard} role="alert">
              <AlertCircle className={styles.alertIcon} size={18} />
              <span>{error}</span>
            </div>
          )}

          <div className={styles.inputGroup}>
            <label htmlFor="username" className={styles.label}>
              Username
            </label>
            <div className={styles.inputControlWrapper}>
              <input
                id="username"
                type="text"
                className={styles.inputField}
                placeholder="Enter admin username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                disabled={isLoading}
                required
              />
              <User className={styles.inputIcon} size={18} />
            </div>
          </div>

          <div className={styles.inputGroup}>
            <label htmlFor="password" className={styles.label}>
              Password
            </label>
            <div className={styles.inputControlWrapper}>
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                className={styles.inputField}
                placeholder="Enter admin password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={isLoading}
                required
              />
              <Lock className={styles.inputIcon} size={18} />
              <button
                type="button"
                className={styles.visibilityToggle}
                onClick={() => setShowPassword((prev) => !prev)}
                disabled={isLoading}
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            className={styles.submitBtn}
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <div className={styles.spinner} />
                <span>Authenticating...</span>
              </>
            ) : (
              <>
                <span>Sign In</span>
                <ArrowRight size={18} />
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
