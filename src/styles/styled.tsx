import React from 'react';
import { designTokens } from './designTokens';

// Styled component utility functions
export const styled = {
  // Button component factory
  button: (variant: 'primary' | 'secondary' | 'danger' | 'ghost' = 'primary') => {
    const buttonStyles = designTokens.components.button[variant];
    
    return React.forwardRef<HTMLButtonElement, React.ButtonHTMLAttributes<HTMLButtonElement>>(
      ({ className = '', style = {}, ...props }, ref) => {
        const baseStyles: React.CSSProperties = {
          display: 'inline-flex',
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: designTokens.borderRadius.md,
          fontSize: designTokens.typography.fontSize.sm,
          fontWeight: designTokens.typography.fontWeight.medium,
          padding: `${designTokens.spacing[2]} ${designTokens.spacing[4]}`,
          border: `1px solid ${buttonStyles.border}`,
          backgroundColor: buttonStyles.background,
          color: buttonStyles.text,
          cursor: 'pointer',
          transition: `all ${designTokens.animation.duration[200]} ${designTokens.animation.ease.out}`,
          outline: 'none',
          textDecoration: 'none',
          ...style,
        };

        const hoverStyles: React.CSSProperties = {
          backgroundColor: buttonStyles.backgroundHover,
        };

        const activeStyles: React.CSSProperties = {
          backgroundColor: buttonStyles.backgroundActive,
        };

        return (
          <button
            ref={ref}
            className={`styled-button styled-button--${variant} ${className}`}
            style={baseStyles}
            onMouseEnter={(e) => {
              Object.assign(e.currentTarget.style, hoverStyles);
            }}
            onMouseLeave={(e) => {
              Object.assign(e.currentTarget.style, baseStyles);
            }}
            onMouseDown={(e) => {
              Object.assign(e.currentTarget.style, activeStyles);
            }}
            onMouseUp={(e) => {
              Object.assign(e.currentTarget.style, hoverStyles);
            }}
            {...props}
          />
        );
      }
    );
  },

  // Card component factory
  card: (variant: 'default' | 'elevated' = 'default') => {
    const cardStyles = designTokens.components.card[variant];
    
    return React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
      ({ className = '', style = {}, ...props }, ref) => {
        const baseStyles: React.CSSProperties = {
          backgroundColor: cardStyles.background,
          border: `1px solid ${cardStyles.border}`,
          borderRadius: designTokens.borderRadius.xl,
          boxShadow: cardStyles.shadow,
          padding: designTokens.spacing[6],
          ...style,
        };

        return (
          <div
            ref={ref}
            className={`styled-card styled-card--${variant} ${className}`}
            style={baseStyles}
            {...props}
          />
        );
      }
    );
  },

  // Input component factory
  input: (variant: 'default' | 'error' = 'default') => {
    const inputStyles = designTokens.components.input[variant];
    
    return React.forwardRef<HTMLInputElement, React.InputHTMLAttributes<HTMLInputElement>>(
      ({ className = '', style = {}, ...props }, ref) => {
        const baseStyles: React.CSSProperties = {
          width: '100%',
          padding: `${designTokens.spacing[2]} ${designTokens.spacing[3]}`,
          backgroundColor: inputStyles.background,
          border: `1px solid ${inputStyles.border}`,
          borderRadius: designTokens.borderRadius.md,
          fontSize: designTokens.typography.fontSize.sm,
          color: inputStyles.text,
          outline: 'none',
          transition: `all ${designTokens.animation.duration[200]} ${designTokens.animation.ease.out}`,
          ...style,
        };

        const focusStyles: React.CSSProperties = {
          borderColor: inputStyles.borderFocus,
          boxShadow: `0 0 0 3px ${inputStyles.borderFocus}20`,
        };

        return (
          <input
            ref={ref}
            className={`styled-input styled-input--${variant} ${className}`}
            style={baseStyles}
            onFocus={(e) => {
              Object.assign(e.currentTarget.style, focusStyles);
            }}
            onBlur={(e) => {
              Object.assign(e.currentTarget.style, baseStyles);
            }}
            {...props}
          />
        );
      }
    );
  },

  // Status badge component factory
  statusBadge: (status: 'critical' | 'warning' | 'success' | 'info') => {
    const statusStyles = designTokens.components.status[status];
    
    return React.forwardRef<HTMLSpanElement, React.HTMLAttributes<HTMLSpanElement>>(
      ({ className = '', style = {}, children, ...props }, ref) => {
        const baseStyles: React.CSSProperties = {
          display: 'inline-flex',
          alignItems: 'center',
          padding: `${designTokens.spacing[1]} ${designTokens.spacing[3]}`,
          backgroundColor: statusStyles.background,
          border: `1px solid ${statusStyles.border}`,
          borderRadius: designTokens.borderRadius.full,
          fontSize: designTokens.typography.fontSize.xs,
          fontWeight: designTokens.typography.fontWeight.medium,
          color: statusStyles.text,
          ...style,
        };

        return (
          <span
            ref={ref}
            className={`styled-status-badge styled-status-badge--${status} ${className}`}
            style={baseStyles}
            {...props}
          >
            {children}
          </span>
        );
      }
    );
  },
};

// CSS class utilities
export const css = {
  // Flexbox utilities
  flex: {
    center: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    between: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    start: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'flex-start',
    },
    end: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'flex-end',
    },
    column: {
      display: 'flex',
      flexDirection: 'column',
    },
    wrap: {
      display: 'flex',
      flexWrap: 'wrap',
    },
  },

  // Grid utilities
  grid: {
    auto: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
      gap: designTokens.spacing[4],
    },
    cols: (cols: number) => ({
      display: 'grid',
      gridTemplateColumns: `repeat(${cols}, 1fr)`,
      gap: designTokens.spacing[4],
    }),
  },

  // Spacing utilities
  spacing: {
    p: (value: keyof typeof designTokens.spacing) => ({
      padding: designTokens.spacing[value],
    }),
    px: (value: keyof typeof designTokens.spacing) => ({
      paddingLeft: designTokens.spacing[value],
      paddingRight: designTokens.spacing[value],
    }),
    py: (value: keyof typeof designTokens.spacing) => ({
      paddingTop: designTokens.spacing[value],
      paddingBottom: designTokens.spacing[value],
    }),
    m: (value: keyof typeof designTokens.spacing) => ({
      margin: designTokens.spacing[value],
    }),
    mx: (value: keyof typeof designTokens.spacing) => ({
      marginLeft: designTokens.spacing[value],
      marginRight: designTokens.spacing[value],
    }),
    my: (value: keyof typeof designTokens.spacing) => ({
      marginTop: designTokens.spacing[value],
      marginBottom: designTokens.spacing[value],
    }),
  },

  // Text utilities
  text: {
    xs: { fontSize: designTokens.typography.fontSize.xs },
    sm: { fontSize: designTokens.typography.fontSize.sm },
    base: { fontSize: designTokens.typography.fontSize.base },
    lg: { fontSize: designTokens.typography.fontSize.lg },
    xl: { fontSize: designTokens.typography.fontSize.xl },
    '2xl': { fontSize: designTokens.typography.fontSize['2xl'] },
    '3xl': { fontSize: designTokens.typography.fontSize['3xl'] },
    
    light: { fontWeight: designTokens.typography.fontWeight.light },
    normal: { fontWeight: designTokens.typography.fontWeight.normal },
    medium: { fontWeight: designTokens.typography.fontWeight.medium },
    semibold: { fontWeight: designTokens.typography.fontWeight.semibold },
    bold: { fontWeight: designTokens.typography.fontWeight.bold },
    
    center: { textAlign: 'center' as const },
    left: { textAlign: 'left' as const },
    right: { textAlign: 'right' as const },
  },

  // Border utilities
  border: {
    light: {
      border: `1px solid ${designTokens.colors.border.light}`,
    },
    medium: {
      border: `1px solid ${designTokens.colors.border.medium}`,
    },
    dark: {
      border: `1px solid ${designTokens.colors.border.dark}`,
    },
    rounded: {
      borderRadius: designTokens.borderRadius.md,
    },
    roundedLg: {
      borderRadius: designTokens.borderRadius.lg,
    },
    roundedXl: {
      borderRadius: designTokens.borderRadius.xl,
    },
    roundedFull: {
      borderRadius: designTokens.borderRadius.full,
    },
  },

  // Shadow utilities
  shadow: {
    xs: { boxShadow: designTokens.boxShadow.xs },
    sm: { boxShadow: designTokens.boxShadow.sm },
    base: { boxShadow: designTokens.boxShadow.base },
    md: { boxShadow: designTokens.boxShadow.md },
    lg: { boxShadow: designTokens.boxShadow.lg },
    xl: { boxShadow: designTokens.boxShadow.xl },
    inner: { boxShadow: designTokens.boxShadow.inner },
    none: { boxShadow: designTokens.boxShadow.none },
  },

  // Animation utilities
  animation: {
    fadeIn: {
      animation: `fadeIn ${designTokens.animation.duration[300]} ${designTokens.animation.ease.out}`,
    },
    fadeOut: {
      animation: `fadeOut ${designTokens.animation.duration[300]} ${designTokens.animation.ease.out}`,
    },
    slideIn: {
      animation: `slideInUp ${designTokens.animation.duration[300]} ${designTokens.animation.ease.out}`,
    },
    pulse: {
      animation: `pulse ${designTokens.animation.duration[1000]} ${designTokens.animation.ease.inOut} infinite`,
    },
    spin: {
      animation: `spin ${designTokens.animation.duration[1000]} linear infinite`,
    },
  },
};

// Theme composition utility
export const compose = (...styles: React.CSSProperties[]) => {
  return styles.reduce((acc, style) => ({ ...acc, ...style }), {});
};

// Responsive utility
export const responsive = (
  mobile: React.CSSProperties,
  tablet?: React.CSSProperties,
  desktop?: React.CSSProperties
) => {
  return {
    ...mobile,
    [`@media (min-width: ${designTokens.breakpoints.md})`]: tablet,
    [`@media (min-width: ${designTokens.breakpoints.lg})`]: desktop,
  };
};

// Color utility
export const color = (path: string, opacity?: number) => {
  const colorValue = path.split('.').reduce((obj: any, key: string) => obj?.[key], designTokens.colors);
  if (opacity !== undefined && typeof colorValue === 'string') {
    // Convert hex to rgba if opacity is provided
    const hex = colorValue.replace('#', '');
    const r = parseInt(hex.substr(0, 2), 16);
    const g = parseInt(hex.substr(2, 2), 16);
    const b = parseInt(hex.substr(4, 2), 16);
    return `rgba(${r}, ${g}, ${b}, ${opacity})`;
  }
  return colorValue;
};

export default { styled, css, compose, responsive, color };