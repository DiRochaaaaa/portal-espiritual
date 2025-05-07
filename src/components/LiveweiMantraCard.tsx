import React from 'react';
import { motion } from 'framer-motion';

// Tipos de props para o componente
interface LiveweiMantraCardProps {
  title: string;
  description: string;
  objective: string;
  icon?: React.ReactNode;
  onClick?: () => void;
  isActive?: boolean;
  themeColor?: string;
  themeColorRGB?: string;
}

const LiveweiMantraCard: React.FC<LiveweiMantraCardProps> = ({
  title,
  description,
  objective,
  icon,
  onClick,
  isActive = false,
  themeColor = '#7B1FA2',
  themeColorRGB = '123, 31, 162',
}) => {
  // Usado cor sólida em vez de gradiente para animação segura
  return (
    <motion.div
      className="mantra-card"
      style={{
        padding: '24px',
        borderRadius: '16px',
        backgroundColor: 'rgba(21, 0, 34, 0.7)',
        backdropFilter: 'blur(10px)',
        border: `1px solid ${isActive ? `rgba(${themeColorRGB}, 0.6)` : 'rgba(255, 255, 255, 0.1)'}`,
        marginBottom: '20px',
        cursor: onClick ? 'pointer' : 'default',
        position: 'relative',
        overflow: 'hidden',
        transition: 'border 0.3s ease, transform 0.3s ease, box-shadow 0.3s ease',
        boxShadow: isActive ? `0 0 20px rgba(${themeColorRGB}, 0.3)` : 'none',
      }}
      whileHover={
        onClick
          ? {
              scale: 1.02,
              boxShadow: `0 10px 25px rgba(0, 0, 0, 0.2), 0 0 15px rgba(${themeColorRGB}, 0.3)`,
              border: `1px solid rgba(${themeColorRGB}, 0.8)`,
            }
          : undefined
      }
      onClick={onClick}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Borda superior com destaque */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: '3px',
          backgroundColor: themeColor,
          opacity: isActive ? 0.8 : 0.4,
        }}
      />
      
      <div style={{ display: 'flex', alignItems: 'flex-start', gap: '16px' }}>
        {/* Ícone do Mantra */}
        {icon && (
          <div
            style={{
              width: '50px',
              height: '50px',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              borderRadius: '50%',
              backgroundColor: `rgba(${themeColorRGB}, 0.15)`,
              color: themeColor,
              fontSize: '1.8rem',
            }}
          >
            {icon}
          </div>
        )}
        
        <div style={{ flex: 1 }}>
          {/* Título do Mantra */}
          <h3
            style={{
              fontSize: '1.25rem',
              fontWeight: 600,
              marginBottom: '8px',
              color: '#ffffff',
            }}
          >
            {title}
          </h3>
          
          {/* Objetivo do Mantra */}
          <div
            style={{
              display: 'inline-block',
              padding: '4px 12px',
              borderRadius: '20px',
              backgroundColor: `rgba(${themeColorRGB}, 0.15)`,
              color: themeColor,
              fontSize: '0.85rem',
              fontWeight: 500,
              marginBottom: '12px',
              border: `1px solid rgba(${themeColorRGB}, 0.3)`,
            }}
          >
            {objective}
          </div>
          
          {/* Descrição do Mantra */}
          <p
            style={{
              fontSize: '0.9rem',
              color: 'rgba(255, 255, 255, 0.8)',
              lineHeight: '1.5',
              margin: 0,
            }}
          >
            {description}
          </p>
        </div>
      </div>
      
      {/* Indicador de seleção */}
      {isActive && (
        <motion.div
          style={{
            position: 'absolute',
            bottom: '0',
            left: '0',
            right: '0',
            height: '3px',
            backgroundColor: themeColor,
          }}
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.6 }}
        />
      )}
    </motion.div>
  );
};

export default LiveweiMantraCard; 