// Cybrty Design System - Matching HTML Reference
// Comprehensive design tokens converted from CSS custom properties

export const cybrtyTheme = {
  // Light Theme Colors - Modern Clean Design
  colors: {
    light: {
      primary: {
        bg: '#f8fafc',
        secondary: '#ffffff',
        card: '#ffffff',
      },
      accent: {
        primary: '#2563eb',
        secondary: '#3b82f6',
        success: '#059669',
        warning: '#d97706',
        danger: '#dc2626',
        purple: '#7c3aed',
        cyan: '#0891b2',
        pink: '#e11d48',
      },
      text: {
        primary: '#1e293b',
        secondary: '#64748b',
        muted: '#94a3b8',
      },
      border: {
        color: '#e2e8f0',
        light: '#f1f5f9',
      },
      header: {
        bg: 'rgba(255, 255, 255, 0.95)',
      }
    },
    // Dark Theme Colors
    dark: {
      primary: {
        bg: '#0f172a',
        secondary: '#1e293b',
        card: '#334155',
      },
      text: {
        primary: '#f8fafc',
        secondary: '#cbd5e1',
        muted: '#64748b',
      },
      border: {
        color: '#475569',
        light: '#334155',
      },
      header: {
        bg: 'rgba(15, 23, 42, 0.95)',
      }
    }
  },

  // Gradients
  gradients: {
    primary: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    success: 'linear-gradient(135deg, #84fab0 0%, #8fd3f4 100%)',
    warning: 'linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)',
    danger: 'linear-gradient(135deg, #ff9a9e 0%, #fecfef 100%)',
    brand: 'linear-gradient(135deg, #2563eb 0%, #7c3aed 100%)',
    text: 'linear-gradient(135deg, #1e293b 0%, #2563eb 100%)',
  },

  // Shadows
  shadows: {
    sm: '0 1px 2px 0 rgb(0 0 0 / 0.05)',
    md: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
    lg: '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)',
    xl: '0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)',
    glow: '0 0 20px rgba(37, 99, 235, 0.3)',
    glowDanger: '0 0 20px rgba(239, 68, 68, 0.4)',
  },

  // Typography
  typography: {
    fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', sans-serif",
    fontSize: {
      xs: '0.75rem',
      sm: '0.875rem',
      base: '1rem',
      lg: '1.125rem',
      xl: '1.25rem',
      '2xl': '1.5rem',
      '3xl': '1.875rem',
      '4xl': '2.25rem',
      '5xl': '3rem',
      '6xl': '3.75rem',
      hero: '3.5rem',
    },
    fontWeight: {
      normal: '400',
      medium: '500',
      semibold: '600',
      bold: '700',
      extrabold: '800',
      black: '900',
    },
    lineHeight: {
      tight: '1.1',
      normal: '1.4',
      relaxed: '1.6',
      loose: '1.8',
    }
  },

  // Spacing
  spacing: {
    px: '1px',
    0: '0',
    1: '0.25rem',
    2: '0.5rem',
    3: '0.75rem',
    4: '1rem',
    5: '1.25rem',
    6: '1.5rem',
    8: '2rem',
    10: '2.5rem',
    12: '3rem',
    16: '4rem',
    20: '5rem',
    24: '6rem',
  },

  // Border Radius
  borderRadius: {
    none: '0',
    sm: '0.125rem',
    base: '0.25rem',
    md: '0.375rem',
    lg: '0.5rem',
    xl: '0.75rem',
    '2xl': '1rem',
    '3xl': '1.5rem',
    full: '9999px',
    card: '24px',
    button: '12px',
    modal: '20px',
  },

  // NIST Framework Colors
  nist: {
    identify: '#2563eb',
    protect: '#059669',
    detect: '#d97706',
    respond: '#dc2626',
    recover: '#7c3aed',
  },

  // Workspace Colors
  workspace: {
    executive: '#2563eb',
    securityOps: '#059669',
    incidents: '#dc2626',
    assets: '#0891b2',
    compliance: '#7c3aed',
    users: '#d97706',
    threatIntel: '#e11d48',
    penetration: '#dc2626',
    cloudSecurity: '#2563eb',
    vulnerability: '#d97706',
    redTeam: '#dc2626',
    edr: '#059669',
  },

  // Transitions & Animations
  transitions: {
    fast: '0.15s ease',
    base: '0.3s ease',
    slow: '0.5s ease',
    bounce: '0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
  },

  // Z-Index
  zIndex: {
    auto: 'auto',
    0: '0',
    10: '10',
    20: '20',
    30: '30',
    40: '40',
    50: '50',
    modal: '1000',
    overlay: '2000',
    max: '9999',
  },

  // Breakpoints
  breakpoints: {
    sm: '640px',
    md: '768px',
    lg: '1024px',
    xl: '1280px',
    '2xl': '1536px',
    desktop: '1440px',
    ultrawide: '1920px',
  },
};

// CSS-in-JS helper functions
export const getCSSVariable = (path: string) => {
  const keys = path.split('.');
  let value: any = cybrtyTheme;
  
  for (const key of keys) {
    value = value?.[key];
  }
  
  return value;
};

// Theme context helpers
export const getWorkspaceColor = (workspace: string) => {
  return cybrtyTheme.workspace[workspace as keyof typeof cybrtyTheme.workspace] || cybrtyTheme.colors.light.accent.primary;
};

export const getNistColor = (category: string) => {
  return cybrtyTheme.nist[category as keyof typeof cybrtyTheme.nist] || cybrtyTheme.colors.light.accent.primary;
};

// Styled component factory helpers
export const createStyledCard = (backgroundColor = '#ffffff') => ({
  backgroundColor,
  border: `2px solid ${cybrtyTheme.colors.light.border.light}`,
  borderRadius: cybrtyTheme.borderRadius.card,
  padding: cybrtyTheme.spacing[6],
  boxShadow: cybrtyTheme.shadows.md,
  transition: cybrtyTheme.transitions.bounce,
  cursor: 'pointer',
  position: 'relative' as const,
  overflow: 'hidden' as const,
});

export const createStyledButton = (variant: 'primary' | 'secondary' | 'danger' = 'primary') => {
  const variants = {
    primary: {
      background: cybrtyTheme.gradients.primary,
      color: '#ffffff',
    },
    secondary: {
      background: cybrtyTheme.colors.light.border.light,
      color: cybrtyTheme.colors.light.text.primary,
      border: `2px solid ${cybrtyTheme.colors.light.border.light}`,
    },
    danger: {
      background: `linear-gradient(135deg, ${cybrtyTheme.colors.light.accent.danger} 0%, ${cybrtyTheme.colors.light.accent.pink} 100%)`,
      color: '#ffffff',
    },
  };

  return {
    ...variants[variant],
    padding: `${cybrtyTheme.spacing[4]} ${cybrtyTheme.spacing[8]}`,
    borderRadius: cybrtyTheme.borderRadius.button,
    fontSize: cybrtyTheme.typography.fontSize.base,
    fontWeight: cybrtyTheme.typography.fontWeight.semibold,
    border: 'none',
    cursor: 'pointer',
    transition: cybrtyTheme.transitions.base,
    display: 'inline-flex',
    alignItems: 'center',
    gap: cybrtyTheme.spacing[2],
    position: 'relative' as const,
    overflow: 'hidden' as const,
    minWidth: '120px',
    justifyContent: 'center',
  };
};

// Animation keyframes
export const animations = {
  ripple: `
    @keyframes ripple {
      to {
        transform: scale(2);
        opacity: 0;
      }
    }
  `,
  float: `
    @keyframes float {
      0%, 100% { transform: translateY(0); }
      50% { transform: translateY(-10px); }
    }
  `,
  pulse: `
    @keyframes pulse {
      0%, 100% { transform: scale(1); }
      50% { transform: scale(1.1); }
    }
  `,
  glow: `
    @keyframes glow {
      0%, 100% { box-shadow: 0 0 20px rgba(239, 68, 68, 0.3); }
      50% { box-shadow: 0 0 30px rgba(239, 68, 68, 0.6); }
    }
  `,
  fadeIn: `
    @keyframes fadeIn {
      from { opacity: 0; transform: translateX(-10px); }
      to { opacity: 1; transform: translateX(0); }
    }
  `,
  modalFadeIn: `
    @keyframes modalFadeIn {
      from { opacity: 0; }
      to { opacity: 1; }
    }
  `,
  modalSlideIn: `
    @keyframes modalSlideIn {
      from { transform: scale(0.8) translateY(-50px); opacity: 0; }
      to { transform: scale(1) translateY(0); opacity: 1; }
    }
  `,
  dropdownFadeIn: `
    @keyframes dropdownFadeIn {
      from { opacity: 0; transform: translateY(-10px); }
      to { opacity: 1; transform: translateY(0); }
    }
  `,
};

export default cybrtyTheme;