// Animation constants for scroll-based animations

// Phone Scrollytelling scroll thresholds
export const PHONE_SCROLL = {
  FADE_IN: [0, 0.1],
  MOVE_LEFT: [0.1, 0.3],
  TEXT_1: [0.3, 0.4],
  TEXT_2: [0.4, 0.5],
  GLOW: [0.4, 0.45],
  TEXT_3: [0.5, 0.6],
  FEATURES: [0.6, 0.75],
  EXIT: [0.90, 0.99],
  IMAGE_SCROLL: {
    START: 0.3,
    END: 0.85,
  },
  FADE_TRANSITION: 0.90, // 90% of scrollEnd
}

// ImageFan scroll thresholds
export const IMAGE_FAN_SCROLL = {
  TEXT_COMPLETE: 0.25,
  REVEAL_START: 0.35,
  TITLE: {
    PREFIX: [0, 0.14],
    HIGHLIGHT: [0.06, 0.22],
    SUFFIX: [0.12, 0.26],
    FALLBACK: [0, 0.18],
  },
}

// Phone mockup constants
export const PHONE_MOCKUP = {
  MAX_SCROLL_DISTANCE: -2500,
  GLOW: {
    OPACITY_RANGE: [0, 0.1],
    OPACITY_VALUES: [0, 1.2],
    INTENSITY_RANGE: [0, 0.1],
    INTENSITY_VALUES: [0, 1],
    SCALE_1: [1.05, 1.15],
    SCALE_2: [1.08, 1.18],
    BLUR: '35px',
    ROTATION_SPEED: 36, // degrees per second
  },
}

// ImageFan animation constants
export const IMAGE_FAN = {
  SPACING: 170,
  MOBILE_SPACING: 50,
  ARCH_STRENGTH: 10,
  ROTATION_STRENGTH: 8,
  HOVER_PUSH: {
    MOBILE: 40,
    DESKTOP: 80,
  },
  SPRING: {
    STIFFNESS: 260,
    DAMPING: 20,
    MASS: 1,
    DELAY_INCREMENT: 0.05,
  },
}

