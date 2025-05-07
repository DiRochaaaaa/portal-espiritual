import React from 'react';
import { motion } from 'framer-motion';
import { colors, motionVariants } from '../styles/shared';

interface CardProps {
  title?: string;
  description?: string | React.ReactNode;
  children?: React.ReactNode;
  active?: boolean;
  onClick?: () => void;
  className?: string;
  titleGradient?: boolean;
  delay?: number;
  fullWidth?: boolean;
  extraStyles?: React.CSSProperties;
}

const Card: React.FC<CardProps> = ({
  title,
  description,
  children,
  active = false,
  onClick,
  className = '',
  titleGradient = true,
  delay = 0,
  fullWidth = true,
  extraStyles = {},
}) => {
  return (
    <motion.div
      className={`card ${className}`}
      style={{
        width: fullWidth ? '100%' : 'auto',
        marginBottom: '20px',
        padding: '20px',
        background: colors.backgrounds.card,
        borderRadius: '12px',
        border: `1px solid ${active ? colors.borders.dark : colors.borders.light}`,
        transition: 'all 0.3s ease',
        cursor: onClick ? 'pointer' : 'default',
        boxShadow: active ? `0 0 15px ${colors.borders.medium}` : 'none',
        ...extraStyles
      }}
      whileHover={onClick ? { scale: 1.02 } : undefined}
      onClick={onClick}
      {...motionVariants.fadeInUp}
      transition={{ duration: 0.5, delay }}
    >
      {title && (
        <h3
          style={{
            fontSize: '1.2rem',
            fontWeight: 600,
            marginBottom: '12px',
            ...(titleGradient && {
              background: 'linear-gradient(to right, #D4AF37, #FFD700, #D4AF37)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }),
          }}
        >
          {title}
        </h3>
      )}
      
      {description && (
        typeof description === 'string' ? (
          <p
            style={{
              fontSize: '0.9rem',
              color: colors.text.muted,
              lineHeight: '1.5',
              margin: 0,
            }}
          >
            {description}
          </p>
        ) : (
          <div
            style={{
              fontSize: '0.9rem',
              color: colors.text.muted,
              lineHeight: '1.5',
              margin: 0,
            }}
          >
            {description}
          </div>
        )
      )}
      
      {children}
    </motion.div>
  );
};

export default Card; 