import React from 'react';
import { motion } from 'framer-motion';
import { BsBookFill } from 'react-icons/bs';
import { colors, motionVariants } from '../styles/shared';
import SectionTitle from './SectionTitle';
import Card from './Card';

interface MantraEffectsContent {
  title: string;
  description: string;
  content: {
    respiracoes: {
      title: string;
      description: string;
      practices: Array<{ name: string; description: string }>;
    };
    posturas: {
      title: string;
      description: string;
      practices: Array<{ name: string; description: string }>;
    };
    meditacao: {
      title: string;
      description: string;
      practices: Array<{ name: string; description: string }>;
    };
    rituais: {
      title: string;
      description: string;
      practices: Array<{ name: string; description: string }>;
    };
    conclusao: {
      title: string;
      benefits: string[];
    };
    dicas: {
      title: string;
      tips: string[];
    };
  };
}

interface MantraEffectsManualProps {
  content: MantraEffectsContent;
  visible: boolean;
}

const MantraEffectsManual: React.FC<MantraEffectsManualProps> = ({ content, visible }) => {
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
        icon={<BsBookFill />}
        delay={0.3}
      />
      
      <p style={{
        fontSize: '0.9rem',
        color: colors.text.muted,
        marginBottom: '24px'
      }}>
        {content.description}
      </p>
      
      {/* Respirações e Exercícios de Concentração */}
      <Card 
        title={content.content.respiracoes.title}
        description={content.content.respiracoes.description}
        delay={0.4}
      >
        <ul style={{paddingLeft: '20px', marginTop: '16px'}}>
          {content.content.respiracoes.practices.map((practice, index) => (
            <motion.li 
              key={index} 
              style={{marginBottom: '12px', color: colors.text.muted}}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: 0.5 + (index * 0.1) }}
            >
              <span style={{fontWeight: '600', color: colors.text.light}}>{practice.name}:</span> {practice.description}
            </motion.li>
          ))}
        </ul>
      </Card>
      
      {/* Posturas e Movimentos */}
      <Card 
        title={content.content.posturas.title}
        description={content.content.posturas.description}
        delay={0.6}
      >
        <ul style={{paddingLeft: '20px', marginTop: '16px'}}>
          {content.content.posturas.practices.map((practice, index) => (
            <motion.li 
              key={index} 
              style={{marginBottom: '12px', color: colors.text.muted}}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: 0.7 + (index * 0.1) }}
            >
              <span style={{fontWeight: '600', color: colors.text.light}}>{practice.name}:</span> {practice.description}
            </motion.li>
          ))}
        </ul>
      </Card>
      
      {/* Meditação e Visualização */}
      <Card 
        title={content.content.meditacao.title}
        description={content.content.meditacao.description}
        delay={0.8}
      >
        <ul style={{paddingLeft: '20px', marginTop: '16px'}}>
          {content.content.meditacao.practices.map((practice, index) => (
            <motion.li 
              key={index} 
              style={{marginBottom: '12px', color: colors.text.muted}}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: 0.9 + (index * 0.1) }}
            >
              <span style={{fontWeight: '600', color: colors.text.light}}>{practice.name}:</span> {practice.description}
            </motion.li>
          ))}
        </ul>
      </Card>
      
      {/* Rituais para Iniciar e Finalizar o Dia */}
      <Card 
        title={content.content.rituais.title}
        description={content.content.rituais.description}
        delay={1.0}
      >
        <ul style={{paddingLeft: '20px', marginTop: '16px'}}>
          {content.content.rituais.practices.map((practice, index) => (
            <motion.li 
              key={index} 
              style={{marginBottom: '12px', color: colors.text.muted}}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: 1.1 + (index * 0.1) }}
            >
              <span style={{fontWeight: '600', color: colors.text.light}}>{practice.name}:</span> {practice.description}
            </motion.li>
          ))}
        </ul>
      </Card>
      
      {/* Dicas para Manter a Rotina Consistente */}
      <Card 
        title={content.content.dicas.title}
        delay={1.2}
      >
        <ul style={{paddingLeft: '20px', marginTop: '16px'}}>
          {content.content.dicas.tips.map((tip, index) => (
            <motion.li 
              key={index} 
              style={{marginBottom: '12px', color: colors.text.muted}}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: 1.3 + (index * 0.1) }}
            >
              {tip}
            </motion.li>
          ))}
        </ul>
      </Card>
      
      {/* Conclusão */}
      <Card 
        title={content.content.conclusao.title}
        delay={1.4}
      >
        <ul style={{paddingLeft: '20px', marginTop: '16px'}}>
          {content.content.conclusao.benefits.map((benefit, index) => (
            <motion.li 
              key={index} 
              style={{marginBottom: '12px', color: colors.text.muted}}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: 1.5 + (index * 0.1) }}
            >
              {benefit}
            </motion.li>
          ))}
        </ul>
      </Card>
    </motion.section>
  );
};

export default MantraEffectsManual; 