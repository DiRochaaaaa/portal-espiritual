import React from 'react';
import { motion } from 'framer-motion';
import { gradients, motionVariants } from '../styles/shared';

interface SectionTitleProps {
  title: string;
  icon?: React.ReactNode;
  align?: 'left' | 'center' | 'right';
  className?: string;
  delay?: number;
}

const SectionTitle: React.FC<SectionTitleProps> = ({
  title,
  icon,
  align = 'center',
  className = '',
  delay = 0,
}) => {
  return (
    <motion.div
      className={`section-title-container ${className}`}
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: align === 'center' ? 'center' : align === 'left' ? 'flex-start' : 'flex-end',
        marginBottom: '24px',
        width: '100%',
      }}
      {...motionVariants.fadeInUp}
      transition={{ duration: 0.5, delay }}
    >
      {icon && (
        <div
          style={{
            width: '70px',
            height: '70px',
            margin: '0 auto 20px',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'rgba(255, 255, 255, 0.1)',
            borderRadius: '50%',
            ...gradients.goldText,
            fontSize: '2rem',
          }}
        >
          {icon}
        </div>
      )}
      
      <h2
        style={{
          fontSize: '1.75rem',
          fontWeight: 600,
          marginBottom: icon ? '8px' : '24px',
          textAlign: align,
          ...gradients.goldText,
        }}
      >
        {title}
      </h2>
    </motion.div>
  );
};

export default SectionTitle; 