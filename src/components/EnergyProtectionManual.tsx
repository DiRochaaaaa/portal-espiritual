import React from 'react';
import { motion } from 'framer-motion';
import { BsShieldFill } from 'react-icons/bs';
import { colors, motionVariants } from '../styles/shared';
import SectionTitle from './SectionTitle';
import Card from './Card';

interface EnergyProtectionContent {
  title: string;
  description: string;
  content: {
    introduction: {
      title: string;
      description: string;
    };
    crystals: {
      title: string;
      sections: Array<{
        title: string;
        description: string;
      }>;
    };
    plants: {
      title: string;
      sections: Array<{
        title: string;
        description: string;
      }>;
    };
    incense: {
      title: string;
      sections: Array<{
        title: string;
        description: string;
      }>;
    };
    techniques: {
      title: string;
      sections: Array<{
        title: string;
        description: string;
      }>;
    };
    routine: {
      title: string;
      sections: Array<{
        title: string;
        description: string;
      }>;
    };
    conclusion: {
      title: string;
      description: string;
    };
  };
}

interface EnergyProtectionManualProps {
  content: EnergyProtectionContent;
  visible: boolean;
}

const EnergyProtectionManual: React.FC<EnergyProtectionManualProps> = ({ content, visible }) => {
  if (!visible) return null;
  

  
  return (
    <motion.section
      style={{
        width: '100%',
        marginBottom: '48px',
        padding: '32px 24px',
        background: colors.backgrounds.section,
        backdropFilter: 'blur(10px)',
        borderRadius: '12px',
        border: `1px solid ${colors.borders.medium}`,
      }}
      {...motionVariants.fadeInUp}
      transition={{ duration: 0.5, delay: 0.3 }}
    >
      <SectionTitle 
        title={content.title}
        icon={<BsShieldFill />}
        delay={0.3}
      />
      
      <p style={{
        fontSize: '0.9rem',
        color: colors.text.muted,
        marginBottom: '24px'
      }}>
        {content.description}
      </p>
      
      {/* Introdução */}
      <Card 
        title={content.content.introduction.title}
        description={content.content.introduction.description}
        delay={0.4}
      />
      
      {/* Cristais */}
      <Card 
        title={content.content.crystals.title}
        titleGradient={true}
        delay={0.5}
        extraStyles={{
          marginTop: '16px',
          border: `1px solid ${colors.borders.gold}`
        }}
      >
        <div style={{ marginTop: '16px' }}>
          {content.content.crystals.sections.map((section, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.6 + (index * 0.1) }}
              style={{ marginBottom: '16px' }}
            >
              <h4 style={{ 
                fontWeight: 600, 
                fontSize: '1rem', 
                color: colors.text.light,
                marginBottom: '8px'
              }}>
                {section.title}
              </h4>
              <p style={{ 
                fontSize: '0.9rem', 
                color: colors.text.muted,
                lineHeight: '1.5'
              }}>
                {section.description}
              </p>
            </motion.div>
          ))}
        </div>
      </Card>
      
      {/* Plantas */}
      <Card 
        title={content.content.plants.title}
        titleGradient={true}
        delay={0.7}
        extraStyles={{
          marginTop: '16px',
          border: `1px solid ${colors.borders.gold}`
        }}
      >
        <div style={{ marginTop: '16px' }}>
          {content.content.plants.sections.map((section, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.8 + (index * 0.1) }}
              style={{ marginBottom: '16px' }}
            >
              <h4 style={{ 
                fontWeight: 600, 
                fontSize: '1rem', 
                color: colors.text.light,
                marginBottom: '8px'
              }}>
                {section.title}
              </h4>
              <p style={{ 
                fontSize: '0.9rem', 
                color: colors.text.muted,
                lineHeight: '1.5'
              }}>
                {section.description}
              </p>
            </motion.div>
          ))}
        </div>
      </Card>
      
      {/* Incensos */}
      <Card 
        title={content.content.incense.title}
        titleGradient={true}
        delay={0.9}
        extraStyles={{
          marginTop: '16px',
          border: `1px solid ${colors.borders.gold}`
        }}
      >
        <div style={{ marginTop: '16px' }}>
          {content.content.incense.sections.map((section, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 1.0 + (index * 0.1) }}
              style={{ marginBottom: '16px' }}
            >
              <h4 style={{ 
                fontWeight: 600, 
                fontSize: '1rem', 
                color: colors.text.light,
                marginBottom: '8px'
              }}>
                {section.title}
              </h4>
              <p style={{ 
                fontSize: '0.9rem', 
                color: colors.text.muted,
                lineHeight: '1.5'
              }}>
                {section.description}
              </p>
            </motion.div>
          ))}
        </div>
      </Card>
      
      {/* Técnicas */}
      <Card 
        title={content.content.techniques.title}
        titleGradient={true}
        delay={1.1}
        extraStyles={{
          marginTop: '16px',
          border: `1px solid ${colors.borders.gold}`
        }}
      >
        <div style={{ marginTop: '16px' }}>
          {content.content.techniques.sections.map((section, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 1.2 + (index * 0.1) }}
              style={{ marginBottom: '16px' }}
            >
              <h4 style={{ 
                fontWeight: 600, 
                fontSize: '1rem', 
                color: colors.text.light,
                marginBottom: '8px'
              }}>
                {section.title}
              </h4>
              <p style={{ 
                fontSize: '0.9rem', 
                color: colors.text.muted,
                lineHeight: '1.5'
              }}>
                {section.description}
              </p>
            </motion.div>
          ))}
        </div>
      </Card>
      
      {/* Rotina */}
      <Card 
        title={content.content.routine.title}
        titleGradient={true}
        delay={1.3}
        extraStyles={{
          marginTop: '16px',
          border: `1px solid ${colors.borders.gold}`
        }}
      >
        <div style={{ marginTop: '16px' }}>
          {content.content.routine.sections.map((section, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 1.4 + (index * 0.1) }}
              style={{ marginBottom: '16px' }}
            >
              <h4 style={{ 
                fontWeight: 600, 
                fontSize: '1rem', 
                color: colors.text.light,
                marginBottom: '8px'
              }}>
                {section.title}
              </h4>
              <p style={{ 
                fontSize: '0.9rem', 
                color: colors.text.muted,
                lineHeight: '1.5'
              }}>
                {section.description}
              </p>
            </motion.div>
          ))}
        </div>
      </Card>
      
      {/* Conclusão */}
      <Card 
        title={content.content.conclusion.title}
        description={content.content.conclusion.description}
        delay={1.5}
        extraStyles={{
          marginTop: '16px',
          background: colors.backgrounds.highlight,
          border: `1px solid ${colors.borders.gold}`
        }}
      />
    </motion.section>
  );
};

export default EnergyProtectionManual;