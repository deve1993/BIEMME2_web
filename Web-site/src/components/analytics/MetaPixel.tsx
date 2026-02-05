"use client";

import Script from "next/script";

// Dichiarazione tipi per Meta Pixel fbq
declare global {
  interface Window {
    fbq: (
      command:
        | "init"
        | "track"
        | "trackCustom"
        | "trackSingle"
        | "trackSingleCustom",
      eventNameOrPixelId: string,
      params?: Record<string, unknown>,
    ) => void;
    _fbq: unknown;
  }
}

const META_PIXEL_ID = process.env.NEXT_PUBLIC_META_PIXEL_ID;

export function MetaPixel() {
  // Non caricare se non c'è l'ID configurato
  if (!META_PIXEL_ID) {
    return null;
  }

  return (
    <>
      {/* Meta Pixel (Facebook) */}
      <Script id="meta-pixel" strategy="lazyOnload">
        {`
          !function(f,b,e,v,n,t,s)
          {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
          n.callMethod.apply(n,arguments):n.queue.push(arguments)};
          if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
          n.queue=[];t=b.createElement(e);t.async=!0;
          t.src=v;s=b.getElementsByTagName(e)[0];
          s.parentNode.insertBefore(t,s)}(window, document,'script',
          'https://connect.facebook.net/en_US/fbevents.js');
          fbq('init', '${META_PIXEL_ID}');
          fbq('track', 'PageView');
        `}
      </Script>
      {/* Meta Pixel noscript fallback */}
      <noscript>
        <img
          height="1"
          width="1"
          style={{ display: "none" }}
          src={`https://www.facebook.com/tr?id=${META_PIXEL_ID}&ev=PageView&noscript=1`}
          alt=""
        />
      </noscript>
    </>
  );
}

// Helper per tracciare eventi standard Meta
export function trackMetaEvent(
  eventName: string,
  params?: Record<string, unknown>,
) {
  if (typeof window !== "undefined" && window.fbq) {
    window.fbq("track", eventName, params);
  }
}

// Helper per tracciare eventi custom Meta
export function trackMetaCustomEvent(
  eventName: string,
  params?: Record<string, unknown>,
) {
  if (typeof window !== "undefined" && window.fbq) {
    window.fbq("trackCustom", eventName, params);
  }
}

// Eventi standard comuni
export const MetaEvents = {
  // Ecommerce
  AddToCart: "AddToCart",
  AddToWishlist: "AddToWishlist",
  InitiateCheckout: "InitiateCheckout",
  Purchase: "Purchase",
  ViewContent: "ViewContent",

  // Lead Generation
  Contact: "Contact",
  Lead: "Lead",
  SubmitApplication: "SubmitApplication",
  CompleteRegistration: "CompleteRegistration",

  // Altri
  Search: "Search",
  Schedule: "Schedule",
  FindLocation: "FindLocation",
} as const;
