import { PostHogConfig } from "posthog-js";

export const posthogApiKey = import.meta.env.VITE_POSTHOG_KEY;
const posthogApiHost = import.meta.env.VITE_POSTHOG_HOST;
export const analyticsEnabled = posthogApiHost && posthogApiKey;

export const posthogConfig: Partial<PostHogConfig> = {
  api_host: posthogApiHost,
  autocapture: {
    css_selector_allowlist: ["[ph-autocapture]"],
  },
  capture_pageview: false,
  capture_pageleave: false,
};
