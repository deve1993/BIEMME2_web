"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState, lazy, Suspense } from "react";

// Lazy load PayloadRefreshRouteOnSave solo quando necessario (in iframe)
const PayloadRefreshRouteOnSave = lazy(() =>
  import("@payloadcms/live-preview-react").then((mod) => ({
    default: mod.RefreshRouteOnSave,
  })),
);

/**
 * Component that listens for changes in Payload CMS admin panel
 * and triggers a page refresh when content is saved.
 *
 * This enables Live Preview functionality where editors can see
 * their changes in real-time without manually refreshing.
 *
 * OPTIMIZATION: Uses lazy loading to avoid loading the Payload
 * live-preview library (~30KB) on regular page visits.
 * Only loads when actually inside an iframe (CMS preview mode).
 */
export function LivePreviewListener() {
  const router = useRouter();
  const [serverURL, setServerURL] = useState("");
  const [isInIframe, setIsInIframe] = useState(false);

  useEffect(() => {
    // Check if we're inside an iframe (Live Preview mode) FIRST
    // before doing anything else to minimize work on normal pages
    try {
      const inIframe = window.self !== window.top;
      if (!inIframe) return; // Early exit - not in preview mode

      setIsInIframe(true);
      setServerURL(window.location.origin);
    } catch {
      // Cross-origin iframe, assume we're in preview
      setIsInIframe(true);
      setServerURL(window.location.origin);
    }
  }, []);

  // Only render when inside iframe (Live Preview mode) and we have serverURL
  if (!serverURL || !isInIframe) return null;

  return (
    <Suspense fallback={null}>
      <PayloadRefreshRouteOnSave
        refresh={() => {
          router.refresh();
        }}
        serverURL={serverURL}
      />
    </Suspense>
  );
}
