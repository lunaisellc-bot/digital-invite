window.INVITE_CONFIG = {
  i18n: {
    defaultLocale: "en",
    supportedLocales: ["en", "es", "fr", "tr"],
    autoDetect: true,
    persistChoice: true
  },

  theme: {
    accent: "#7c5cff",
    accent2: "#00d2ff",
    fontFamily: "Inter"
  },

  assets: {
    heroImage: "assets/cover.jpg",
    music: "",
    gallery: ["assets/gallery-1.jpg","assets/gallery-2.jpg","assets/gallery-3.jpg"]
  },

  forms: {
    provider: "formspree",
    enableEmailSend: true,
    endpoint: "https://formspree.io/f/XXXXYYYY"
  },

  event: {
    startAtLocal: "2026-06-20T16:30:00",
    endAtLocal: "2026-06-20T19:30:00",
    mapUrl: "https://maps.google.com/?q=Rainbow+Garden+Hall",
    capsuleUnlockAtLocal: "2026-06-21T10:00:00"
  }
};
