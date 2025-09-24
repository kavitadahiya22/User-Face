// Design tokens for consistent styling across the cybersecurity application

export const designTokens = {
  // Color System
  colors: {
    // Primary brand colors
    primary: {
      50: '#eff6ff',
      100: '#dbeafe', 
      200: '#bfdbfe',
      300: '#93c5fd',
      400: '#60a5fa',
      500: '#3b82f6', // Main brand blue
      600: '#2563eb',
      700: '#1d4ed8',
      800: '#1e40af',
      900: '#1e3a8a',
    },
    
    // Security status colors
    security: {
      critical: '#dc2626',    // Red for critical threats
      high: '#ea580c',       // Orange for high priority
      medium: '#d97706',     // Amber for medium priority
      low: '#65a30d',        // Green for low priority
      safe: '#16a34a',       // Green for safe status
      unknown: '#6b7280',    // Gray for unknown status
    },
    
    // Semantic colors
    semantic: {
      success: '#10b981',
      warning: '#f59e0b',
      error: '#ef4444',
      info: '#3b82f6',
    },
    
    // Neutral colors
    neutral: {
      50: '#f9fafb',
      100: '#f3f4f6',
      200: '#e5e7eb',
      300: '#d1d5db',
      400: '#9ca3af',
      500: '#6b7280',
      600: '#4b5563',
      700: '#374151',
      800: '#1f2937',
      900: '#111827',
    },
    
    // Background colors
    background: {
      primary: '#ffffff',
      secondary: '#f9fafb',
      tertiary: '#f3f4f6',
      dark: '#1f2937',
      overlay: 'rgba(0, 0, 0, 0.5)',
    },
    
    // Border colors
    border: {
      light: '#e5e7eb',
      medium: '#d1d5db',
      dark: '#9ca3af',
      focus: '#3b82f6',
    },
  },
  
  // Typography System
  typography: {
    // Font families
    fontFamily: {
      sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
      mono: ['Fira Code', 'Consolas', 'Monaco', 'monospace'],
    },
    
    // Font sizes
    fontSize: {
      xs: '0.75rem',    // 12px
      sm: '0.875rem',   // 14px
      base: '1rem',     // 16px
      lg: '1.125rem',   // 18px
      xl: '1.25rem',    // 20px
      '2xl': '1.5rem',  // 24px
      '3xl': '1.875rem', // 30px
      '4xl': '2.25rem', // 36px
      '5xl': '3rem',    // 48px
    },
    
    // Font weights
    fontWeight: {
      light: '300',
      normal: '400',
      medium: '500',
      semibold: '600',
      bold: '700',
      extrabold: '800',
    },
    
    // Line heights
    lineHeight: {
      tight: '1.25',
      snug: '1.375',
      normal: '1.5',
      relaxed: '1.625',
      loose: '2',
    },
    
    // Letter spacing
    letterSpacing: {
      tighter: '-0.05em',
      tight: '-0.025em',
      normal: '0em',
      wide: '0.025em',
      wider: '0.05em',
      widest: '0.1em',
    },
  },
  
  // Spacing System (8pt grid)
  spacing: {
    0: '0px',
    1: '0.25rem',  // 4px
    2: '0.5rem',   // 8px
    3: '0.75rem',  // 12px
    4: '1rem',     // 16px
    5: '1.25rem',  // 20px
    6: '1.5rem',   // 24px
    8: '2rem',     // 32px
    10: '2.5rem',  // 40px
    12: '3rem',    // 48px
    16: '4rem',    // 64px
    20: '5rem',    // 80px
    24: '6rem',    // 96px
    32: '8rem',    // 128px
    40: '10rem',   // 160px
    48: '12rem',   // 192px
    56: '14rem',   // 224px
    64: '16rem',   // 256px
  },
  
  // Border radius
  borderRadius: {
    none: '0px',
    sm: '0.125rem',   // 2px
    base: '0.25rem',  // 4px
    md: '0.375rem',   // 6px
    lg: '0.5rem',     // 8px
    xl: '0.75rem',    // 12px
    '2xl': '1rem',    // 16px
    '3xl': '1.5rem',  // 24px
    full: '9999px',
  },
  
  // Shadows
  boxShadow: {
    xs: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
    sm: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
    base: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
    md: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
    lg: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
    xl: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
    inner: 'inset 0 2px 4px 0 rgba(0, 0, 0, 0.06)',
    none: 'none',
  },
  
  // Z-index scale
  zIndex: {
    auto: 'auto',
    0: '0',
    10: '10',
    20: '20',
    30: '30',
    40: '40',
    50: '50',
    dropdown: '1000',
    sticky: '1020',
    fixed: '1030',
    modalBackdrop: '1040',
    modal: '1050',
    popover: '1060',
    tooltip: '1070',
    toast: '1080',
  },
  
  // Breakpoints
  breakpoints: {
    sm: '640px',
    md: '768px',
    lg: '1024px',
    xl: '1280px',
    '2xl': '1536px',
  },
  
  // Animation & Transitions
  animation: {
    // Duration
    duration: {
      75: '75ms',
      100: '100ms',
      150: '150ms',
      200: '200ms',
      300: '300ms',
      500: '500ms',
      700: '700ms',
      1000: '1000ms',
    },
    
    // Timing functions
    ease: {
      linear: 'linear',
      in: 'cubic-bezier(0.4, 0, 1, 1)',
      out: 'cubic-bezier(0, 0, 0.2, 1)',
      inOut: 'cubic-bezier(0.4, 0, 0.2, 1)',
    },
    
    // Keyframes
    keyframes: {
      fadeIn: {
        from: { opacity: '0' },
        to: { opacity: '1' },
      },
      fadeOut: {
        from: { opacity: '1' },
        to: { opacity: '0' },
      },
      slideInDown: {
        from: { transform: 'translateY(-100%)' },
        to: { transform: 'translateY(0)' },
      },
      slideInUp: {
        from: { transform: 'translateY(100%)' },
        to: { transform: 'translateY(0)' },
      },
      slideInRight: {
        from: { transform: 'translateX(100%)' },
        to: { transform: 'translateX(0)' },
      },
      slideInLeft: {
        from: { transform: 'translateX(-100%)' },
        to: { transform: 'translateX(0)' },
      },
      pulse: {
        '0%, 100%': { opacity: '1' },
        '50%': { opacity: '0.5' },
      },
      spin: {
        from: { transform: 'rotate(0deg)' },
        to: { transform: 'rotate(360deg)' },
      },
    },
  },
  
  // Component-specific tokens
  components: {
    // Button variants
    button: {
      primary: {
        background: '#3b82f6',
        backgroundHover: '#2563eb',
        backgroundActive: '#1d4ed8',
        text: '#ffffff',
        border: 'transparent',
      },
      secondary: {
        background: '#f3f4f6',
        backgroundHover: '#e5e7eb',
        backgroundActive: '#d1d5db',
        text: '#374151',
        border: '#d1d5db',
      },
      danger: {
        background: '#ef4444',
        backgroundHover: '#dc2626',
        backgroundActive: '#b91c1c',
        text: '#ffffff',
        border: 'transparent',
      },
      ghost: {
        background: 'transparent',
        backgroundHover: '#f3f4f6',
        backgroundActive: '#e5e7eb',
        text: '#374151',
        border: 'transparent',
      },
    },
    
    // Input variants
    input: {
      default: {
        background: '#ffffff',
        border: '#d1d5db',
        borderFocus: '#3b82f6',
        text: '#374151',
        placeholder: '#9ca3af',
      },
      error: {
        background: '#ffffff',
        border: '#ef4444',
        borderFocus: '#ef4444',
        text: '#374151',
        placeholder: '#9ca3af',
      },
    },
    
    // Card variants
    card: {
      default: {
        background: '#ffffff',
        border: '#e5e7eb',
        shadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
      },
      elevated: {
        background: '#ffffff',
        border: '#e5e7eb',
        shadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
      },
    },
    
    // Status indicators
    status: {
      critical: {
        background: '#fef2f2',
        border: '#fecaca',
        text: '#991b1b',
        icon: '#dc2626',
      },
      warning: {
        background: '#fffbeb',
        border: '#fed7aa',
        text: '#92400e',
        icon: '#f59e0b',
      },
      success: {
        background: '#f0fdf4',
        border: '#bbf7d0',
        text: '#166534',
        icon: '#16a34a',
      },
      info: {
        background: '#eff6ff',
        border: '#bfdbfe',
        text: '#1e40af',
        icon: '#3b82f6',
      },
    },
  },
} as const;

// Utility functions for using design tokens
export const getColor = (path: string): string => {
  return path.split('.').reduce((obj: any, key: string) => obj?.[key], designTokens.colors) as string;
};

export const getSpacing = (value: keyof typeof designTokens.spacing) => {
  return designTokens.spacing[value];
};

export const getFontSize = (value: keyof typeof designTokens.typography.fontSize) => {
  return designTokens.typography.fontSize[value];
};

export const getShadow = (value: keyof typeof designTokens.boxShadow) => {
  return designTokens.boxShadow[value];
};

// CSS-in-JS styled component utilities
export const createStyledComponent = (baseStyles: Record<string, any>, variants?: Record<string, any>) => {
  return (props: Record<string, any>) => ({
    ...baseStyles,
    ...(variants && props.variant ? variants[props.variant] : {}),
    ...(props.css || {}),
  });
};

// Theme provider utilities
export type Theme = typeof designTokens;

export const getThemeValue = (theme: Theme, path: string): any => {
  return path.split('.').reduce((obj: any, key: string) => obj?.[key], theme);
};

export default designTokens;