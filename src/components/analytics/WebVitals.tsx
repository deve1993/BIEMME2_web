"use client";

import { useEffect } from "react";

// Tipi per le metriche Web Vitals (FID rimosso in web-vitals v4+, sostituito da INP)
interface WebVitalMetric {
  name: "LCP" | "CLS" | "INP" | "FCP" | "TTFB";
  value: number;
  rating: "good" | "needs-improvement" | "poor";
  delta: number;
  id: string;
}

// Soglie per i rating (in millisecondi per LCP/INP/FCP/TTFB, valore assoluto per CLS)
const thresholds: Record<WebVitalMetric["name"], [number, number]> = {
  LCP: [2500, 4000],
  CLS: [0.1, 0.25],
  INP: [200, 500],
  FCP: [1800, 3000],
  TTFB: [800, 1800],
};

function getRating(
  name: WebVitalMetric["name"],
  value: number,
): WebVitalMetric["rating"] {
  const [good, poor] = thresholds[name] || [0, 0];
  if (value <= good) return "good";
  if (value <= poor) return "needs-improvement";
  return "poor";
}

// Invia le metriche a Google Analytics
function sendToAnalytics(metric: WebVitalMetric) {
  if (typeof window === "undefined" || !window.gtag) return;

  window.gtag("event", metric.name, {
    event_category: "Web Vitals",
    event_label: metric.id,
    value: Math.round(
      metric.name === "CLS" ? metric.value * 1000 : metric.value,
    ),
    non_interaction: true,
    metric_rating: metric.rating,
    metric_delta: Math.round(metric.delta),
  });
}

// Log in console per debug (solo in development)
function logMetric(metric: WebVitalMetric) {
  if (process.env.NODE_ENV !== "development") return;

  const colors = {
    good: "color: #0cce6b",
    "needs-improvement": "color: #ffa400",
    poor: "color: #ff4e42",
  };

  const value =
    metric.name === "CLS"
      ? metric.value.toFixed(3)
      : `${Math.round(metric.value)}ms`;

  console.log(
    `%c[Web Vitals] ${metric.name}: ${value} (${metric.rating})`,
    colors[metric.rating],
  );
}

export function WebVitals() {
  useEffect(() => {
    // Import dinamico di web-vitals per evitare di bloccare il caricamento
    const loadWebVitals = async () => {
      try {
        const { onLCP, onCLS, onINP, onFCP, onTTFB } =
          await import("web-vitals");

        const handleMetric = (metric: {
          name: string;
          value: number;
          delta: number;
          id: string;
        }) => {
          const webVitalMetric: WebVitalMetric = {
            name: metric.name as WebVitalMetric["name"],
            value: metric.value,
            delta: metric.delta,
            id: metric.id,
            rating: getRating(
              metric.name as WebVitalMetric["name"],
              metric.value,
            ),
          };

          logMetric(webVitalMetric);
          sendToAnalytics(webVitalMetric);
        };

        // Registra tutti i Core Web Vitals (FID sostituito da INP in web-vitals v4+)
        onLCP(handleMetric);
        onCLS(handleMetric);
        onINP(handleMetric);
        onFCP(handleMetric);
        onTTFB(handleMetric);
      } catch {
        // web-vitals non installato, silenziosamente ignora
        if (process.env.NODE_ENV === "development") {
          console.warn(
            "[Web Vitals] Package not installed. Run: npm install web-vitals",
          );
        }
      }
    };

    // Carica dopo che la pagina è interattiva
    if ("requestIdleCallback" in window) {
      window.requestIdleCallback(() => loadWebVitals(), { timeout: 3000 });
    } else {
      setTimeout(loadWebVitals, 2000);
    }
  }, []);

  return null;
}
