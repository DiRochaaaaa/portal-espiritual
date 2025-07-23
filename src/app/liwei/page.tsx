'use client';

import { useState, useEffect, CSSProperties, useMemo } from 'react';
import { motion } from 'framer-motion';
import { NavbarWithSuspense, FooterWithSuspense, MeditationPlayerWithSuspense, MantraEffectsManualWithSuspense, EnergyProtectionManualWithSuspense } from '../../lib/LazyComponents';
import { getCurrentLocale, Locale } from '../../lib/locale';
import { BsFillVolumeUpFill, BsBookFill, BsShieldFill, BsChevronDown, BsChevronUp, BsPlayCircleFill } from 'react-icons/bs';
import { FaLeaf, FaMountain, FaWater, FaFire, FaOm } from 'react-icons/fa';
import { gradients, commonStyles, motionVariants } from '../../styles/shared';
import { adaptMantraFormat } from '../../lib/utils';
import SectionTitle from '../../components/SectionTitle';
import Card from '../../components/Card';

// Importar ícones temáticos dos mantras
import { FaInfinity } from 'react-icons/fa';
import { GiMountainRoad, GiLotusFlower, GiPeaceDove } from 'react-icons/gi';

// Definição das cores estendidas
const colors = {
  purple: { 
    dark: '#150022', 
    medium: '#4A0072', 
    light: '#7B1FA2', 
    lighter: '#9C27B0' 
  },
  blue: {
    dark: '#1A237E',
    medium: '#303F9F',
    light: '#3F51B5'
  },
  teal: {
    dark: '#004D40',
    medium: '#00796B',
    light: '#009688'
  },
  green: {
    dark: '#1B5E20',
    medium: '#388E3C',
    light: '#4CAF50'
  },
  gold: { 
    main: '#FFD700', 
    light: '#FFECB3' 
  },
  text: { 
    light: '#FFFFFF', 
    muted: 'rgba(255, 255, 255, 0.7)', 
    dimmed: 'rgba(255, 255, 255, 0.5)',
    footer: 'rgba(255, 255, 255, 0.3)'
  },
  backgrounds: {
    card: 'rgba(21, 0, 34, 0.7)',
    section: 'rgba(74, 0, 114, 0.3)',
    glassLight: 'rgba(255, 255, 255, 0.1)',
    glassDark: 'rgba(0, 0, 0, 0.2)',
    highlight: 'rgba(156, 39, 176, 0.3)'
  },
  borders: {
    light: 'rgba(255, 255, 255, 0.1)',
    highlight: 'rgba(255, 215, 0, 0.5)',
    medium: 'rgba(255, 255, 255, 0.2)'
  }
};

// Page-specific styles extending common styles
const styles: Record<string, CSSProperties> = {
  ...commonStyles,
  icon: {
    fontSize: '3.5rem',
    marginBottom: '24px',
    ...gradients.goldText,
    filter: 'drop-shadow(0 0 8px rgba(212, 175, 55, 0.4))',
  },
  playerContainer: {
    width: '100%',
    marginTop: '32px',
    marginBottom: '48px',
  },
  elementGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
    gap: '24px',
    width: '100%',
    marginTop: '30px',
  },
  elementCard: {
    textAlign: 'center',
    padding: '30px 20px',
    background: 'rgba(21, 0, 34, 0.5)',
    borderRadius: '16px',
    border: `1px solid rgba(255, 255, 255, 0.1)`,
    boxShadow: '0 10px 30px rgba(0, 0, 0, 0.2)',
    backdropFilter: 'blur(10px)',
    transition: 'all 0.4s ease',
    overflow: 'hidden',
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  elementIcon: {
    fontSize: '3rem',
    marginBottom: '20px',
    ...gradients.goldText,
    filter: 'drop-shadow(0 0 12px rgba(212, 175, 55, 0.6))',
    position: 'relative',
    zIndex: 2,
  },
  elementTitle: {
    fontSize: '1.2rem',
    fontWeight: 700,
    marginBottom: '12px',
    color: 'white',
    background: 'linear-gradient(to right, #D4AF37, #FFD700, #D4AF37)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    backgroundClip: 'text',
    textShadow: '0 2px 10px rgba(212, 175, 55, 0.3)',
    position: 'relative',
    zIndex: 2,
  },
  elementDescription: {
    fontSize: '0.95rem',
    color: 'rgba(255, 255, 255, 0.9)',
    lineHeight: '1.6',
    position: 'relative',
    zIndex: 2,
  },
};

// Áudio bônus para meditação
const bonusAudio = {
  pt: {
    id: "liwei-bonus",
    title: "Meditação Guiada do Monge Li Wei",
    youtubeId: "bIr6dABjMWk",
    description: "Uma meditação exclusiva guiada com base nos ensinamentos do Monge Li Wei para relaxamento profundo e expansão da consciência.",
    objective: "Relaxamento Profundo",
    color: colors.purple.light
  },
  es: {
    id: "liwei-bonus",
    title: "Meditación Guiada del Monje Li Wei",
    youtubeId: "bIr6dABjMWk",
    description: "Una meditación exclusiva guiada basada en las enseñanzas del Monje Li Wei para relajación profunda y expansión de la conciencia.",
    objective: "Relajación Profunda",
    color: colors.purple.light
  },
  fr: {
    id: "liwei-bonus",
    title: "Méditation Guidée du Moine Li Wei",
    youtubeId: "bIr6dABjMWk",
    description: "Une méditation exclusive guidée basée sur les enseignements du Moine Li Wei pour une relaxation profonde et l'expansion de la conscience.",
    objective: "Relaxation Profonde",
    color: colors.purple.light
  }
};

// Mantras sagrados do Monge Li Wei
const mantras = {
  pt: [
    {
      id: "liwei-1",
      title: "Om Mani Padme Hum",
      description: "O mantra da compaixão. Invoca purificação e transformação. Ajuda a abrir o coração e a conexão com todos os seres.",
      objective: "Compaixão e Purificação",
      youtubeId: "iGslNuNUVd4",
      color: colors.purple.light,
      text: "Om Mani Padme Hum"
    },
    {
      id: "liwei-2",
      title: "Om Gam Ganapataye Namaha",
      description: "O mantra do removedor de obstáculos. Ajuda a superar desafios e abrir caminhos para nossos objetivos.",
      objective: "Remover Obstáculos",
      youtubeId: "HxXgTU9c8n0",
      color: colors.blue.light,
      text: "Om Gam Ganapataye Namaha"
    },
    {
      id: "liwei-3",
      title: "Om Namah Shivaya",
      description: "O mantra da transformação. Honra nossa natureza divina e ajuda na jornada de autodescoberta e crescimento.",
      objective: "Transformação Pessoal",
      youtubeId: "EWZdQcNAkQ8",
      color: colors.teal.light,
      text: "Om Namah Shivaya"
    },
    {
      id: "liwei-4",
      title: "Om Shanti Shanti Shanti",
      description: "O mantra da paz. Traz tranquilidade para mente, corpo e espírito em momentos de ansiedade ou agitação.",
      objective: "Paz Interior",
      youtubeId: "KtvyJBtQUag",
      color: colors.green.light,
      text: "Om Shanti Shanti Shanti"
    }
  ],
  es: [
    {
      id: "liwei-1",
      title: "Om Mani Padme Hum",
      description: "El mantra de la compasión. Invoca purificación y transformación. Ayuda a abrir el corazón y la conexión con todos los seres.",
      objective: "Compasión y Purificación",
      youtubeId: "iGslNuNUVd4",
      color: colors.purple.light,
      text: "Om Mani Padme Hum"
    },
    {
      id: "liwei-2",
      title: "Om Gam Ganapataye Namaha",
      description: "El mantra del removedor de obstáculos. Ayuda a superar desafíos y abrir caminos para nuestros objetivos.",
      objective: "Remover Obstáculos",
      youtubeId: "HxXgTU9c8n0",
      color: colors.blue.light,
      text: "Om Gam Ganapataye Namaha"
    },
    {
      id: "liwei-3",
      title: "Om Namah Shivaya",
      description: "El mantra de la transformación. Honra nuestra naturaleza divina y ayuda en el viaje de autodescubrimiento y crecimiento.",
      objective: "Transformación Personal",
      youtubeId: "EWZdQcNAkQ8",
      color: colors.teal.light,
      text: "Om Namah Shivaya"
    },
    {
      id: "liwei-4",
      title: "Om Shanti Shanti Shanti",
      description: "El mantra de la paz. Trae tranquilidad para la mente, cuerpo y espíritu en momentos de ansiedad o agitación.",
      objective: "Paz Interior",
      youtubeId: "KtvyJBtQUag",
      color: colors.green.light,
      text: "Om Shanti Shanti Shanti"
    }
  ],
  fr: [
    {
      id: "liwei-1",
      title: "Om Mani Padme Hum",
      description: "Le mantra de la compassion. Invoque purification et transformation. Aide à ouvrir le cœur et la connexion avec tous les êtres.",
      objective: "Compassion et Purification",
      youtubeId: "iGslNuNUVd4",
      color: colors.purple.light,
      text: "Om Mani Padme Hum"
    },
    {
      id: "liwei-2",
      title: "Om Gam Ganapataye Namaha",
      description: "Le mantra du supprimeur d'obstacles. Aide à surmonter les défis et ouvrir des chemins vers nos objectifs.",
      objective: "Supprimer les Obstacles",
      youtubeId: "HxXgTU9c8n0",
      color: colors.blue.light,
      text: "Om Gam Ganapataye Namaha"
    },
    {
      id: "liwei-3",
      title: "Om Namah Shivaya",
      description: "Le mantra de la transformation. Honore notre nature divine et aide dans le voyage de découverte de soi et de croissance.",
      objective: "Transformation Personnelle",
      youtubeId: "EWZdQcNAkQ8",
      color: colors.teal.light,
      text: "Om Namah Shivaya"
    },
    {
      id: "liwei-4",
      title: "Om Shanti Shanti Shanti",
      description: "Le mantra de la paix. Apporte tranquillité à l'esprit, au corps et à l'âme dans les moments d'anxiété ou d'agitation.",
      objective: "Paix Intérieure",
      youtubeId: "KtvyJBtQUag",
      color: colors.green.light,
      text: "Om Shanti Shanti Shanti"
    }
  ]
};

// Chave para armazenar acesso aos mantras do Li Wei no localStorage
const LIWEI_VISITED_KEY = 'portalEspiritual_liweiVisited';

// Definição das traduções fora do componente
const translations = {
  pt: {
    title: "Mantras Sagrados do Monge Li Wei",
    subtitle: "Práticas milenares para elevação espiritual e harmonia interior",
    mantrasTitle: "Mantras Sagrados",
    mantrasDescription: "Escolha um dos mantras abaixo para iniciar sua prática. Recomenda-se recitar o mantra 108 vezes ou ouvir por pelo menos 10 minutos diários.",
    bonusTitle: "Áudio Bônus para Meditação",
    bonusDescription: "Uma meditação exclusiva para complementar sua prática espiritual",
    manualsTitle: "Manuais Espirituais",
    manualsDescription: "Conteúdos exclusivos para potencializar sua prática espiritual. Escolha um manual para visualizar:",
    manualEffectsButton: "Amplificando os Efeitos dos Mantras",
    manualProtectionButton: "Proteção Energética com Elementos Naturais",
    amplifyTitle: "Amplificando os Efeitos dos Mantras",
    amplifyDescription: "Descubra uma abordagem holística para potencializar os efeitos dos mantras através de uma rotina diária de práticas simples, porém poderosas.",
    amplifyContent: {
      respiracoes: {
        title: "Respirações e Exercícios de Concentração",
        description: "Iniciar sua rotina diária com práticas de respiração consciente e exercícios de concentração prepara seu corpo e mente para a prática dos mantras.",
        practices: [
          {
            name: "Pranayama",
            description: "Respire lenta e profundamente, observando o fluxo do ar. Experimente técnicas como a respiração alternada pelas narinas para acalmar a mente."
          },
          {
            name: "Trataka",
            description: "Fixe suavemente o olhar em uma chama, cristal ou imagem sagrada. Deixe sua atenção se concentrar nesse ponto focal, minimizando as distrações."
          },
          {
            name: "Meditação Guiada",
            description: "Use aplicativos ou áudios para se guiar em uma meditação focada, ajudando a acalmar a mente e preparar para a prática dos mantras."
          }
        ]
      },
      posturas: {
        title: "Posturas e Movimentos para Alinhar a Energia",
        description: "Incorporar posturas e movimentos suaves em sua rotina diária ajuda a alinhar sua energia e preparar seu corpo para a prática dos mantras.",
        practices: [
          {
            name: "Posturas de Yoga",
            description: "Escolha posturas como o Sukhasana (Postura Fácil), o Balasana (Postura da Criança) ou o Viparita Karani (Postura da Lua Crescente) para acalmar a mente e alinhar sua energia."
          },
          {
            name: "Movimentos de Qi Gong",
            description: "Explore exercícios de Qi Gong, como o Círculo da Energia ou a Dança das Nuvens, para promover a circulação energética e a conexão com seu centro."
          },
          {
            name: "Alongamentos Conscientes",
            description: "Inclua alguns alongamentos suaves e conscientes, como o Estiramento da Árvore ou o Movimento da Maré, para liberar tensões e preparar seu corpo."
          }
        ]
      },
      meditacao: {
        title: "Meditação e Visualização",
        description: "Adicionar práticas de meditação e visualização à sua rotina diária amplifica os efeitos dos mantras, permitindo uma conexão mais profunda com seu propósito.",
        practices: [
          {
            name: "Meditação Vipassana",
            description: "Pratique a observação atenta de suas sensações corporais e processos mentais. Mantenha sua atenção presente, sem julgamento, permitindo que seus pensamentos fluam naturalmente."
          },
          {
            name: "Meditação Trataka",
            description: "Fique confortavelmente sentado e fixe seu olhar suavemente em uma vela acesa ou outro ponto focal. Deixe sua mente se concentrar nesse ponto, respirando lenta e profundamente."
          },
          {
            name: "Visualização Guiada",
            description: "Visualize imagens ou símbolos sagrados relacionados aos mantras, imaginando-os com riqueza de detalhes. Deixe-se envolver pela energia e significado desses elementos."
          }
        ]
      },
      rituais: {
        title: "Rituais para Iniciar e Finalizar o Dia",
        description: "Incorporar rituais intencionais no início e no final do dia ajuda a criar um campo energético propício para a prática dos mantras.",
        practices: [
          {
            name: "Ritual Matinal",
            description: "Comece seu dia com um ritual de limpeza do espaço, como a queima de incenso ou a aspersão de água benta. Em seguida, acenda uma vela e recite seus mantras com intenção, visualizando seus objetivos sendo alcançados."
          },
          {
            name: "Ritual Noturno",
            description: "Finalize seu dia com um ritual de agradecimento e integração. Relembre suas realizações, expresse gratidão e visualize como seu dia foi abençoado. Então, recite seus mantras com a intenção de selar suas energias para o próximo dia."
          }
        ]
      },
      conclusao: {
        title: "Transformando sua Vida com os Mantras",
        benefits: [
          "Conexão Profunda: Torne-se mais presente, atento e conectado consigo mesmo e com as energias sutis ao seu redor.",
          "Foco e Concentração: Melhore sua capacidade de se focar e se concentrar nos mantras.",
          "Transformação Positiva: Libere bloqueios, transforme padrões limitantes e atraia bênçãos em sua vida."
        ]
      },
      dicas: {
        title: "Dicas para Manter a Rotina Consistente",
        tips: [
          "Horário Fixo: Escolha um horário específico do dia para suas práticas e tente mantê-lo consistente.",
          "Planejamento Semanal: Reserve um momento da semana para planejar sua rotina e se certificar de que ela caiba em sua agenda.",
          "Lembretes: Use lembretes em seu celular ou agenda para mantê-lo engajado em sua prática diária.",
          "Autocompaixão: Seja gentil consigo mesmo se perder uma prática. Retome com determinação no dia seguinte."
        ]
      },
    },
    protectionTitle: "Manual de Proteção Energética com Elementos Naturais",
    protectionDescription: "Este manual exclusivo ensina como utilizar elementos naturais – como cristais, plantas e incensos – para reforçar seu campo energético e criar um ambiente protegido.",
    protectionContent: {
      introduction: {
        title: "O poder dos elementos naturais para proteção energética",
        description: "Desde os tempos ancestrais, as sociedades têm se voltado para os elementos naturais em busca de equilíbrio, cura e proteção energética. Cristais, plantas e incensos possuem propriedades únicas que, quando utilizados em harmonia, criam um campo de energia positiva e afastam influências negativas."
      },
      crystals: {
        title: "Cristais: Propriedades, seleção e utilização",
        sections: [
          {
            title: "Propriedades Únicas",
            description: "Cada cristal possui uma frequência vibracional única que interage com nosso campo energético de maneira específica. Alguns cristais, como a ametista, têm propriedades calmantes, enquanto outros, como o quartzo, amplificam a energia."
          },
          {
            title: "Seleção Consciente",
            description: "Escolha cristais que se sintam intuitivamente corretos para você e sua intenção. Mantenha-os próximos, carregue-os em sua bolsa ou coloque-os em seu ambiente para que possam trabalhar em sua energia."
          },
          {
            title: "Usos Poderosos",
            description: "Cristais podem ser utilizados em meditação, rituais de limpeza energética, como decoração em ambientes e até mesmo como joias. Sua presença constante realça a vibração positiva ao seu redor."
          }
        ]
      },
      plants: {
        title: "Plantas: Espécies estratégicas para ambiente equilibrado",
        sections: [
          {
            title: "Plantas Purificadoras",
            description: "Samambaia, costela-de-adão e arruda são conhecidas por suas propriedades purificadoras, ajudando a remover toxinas e impurezas do ar, criando um ambiente mais limpo e revitalizado."
          },
          {
            title: "Plantas Energizantes",
            description: "Alecrim, lavanda e tomilho emanam vibração positiva, elevando a energia do espaço e promovendo leveza e vitalidade."
          },
          {
            title: "Plantas Antistress",
            description: "Camomila, lírio-da-paz e babosa possuem efeitos calmantes, ajudando a aliviar tensão e promover um ambiente relaxante e sereno."
          }
        ]
      },
      incense: {
        title: "Incensos: Aromas e rituais para purificar e energizar",
        sections: [
          {
            title: "Purificação",
            description: "Incensos de sândalo, palo santo e mirra são excelentes para remover energias pesadas e negativas, deixando o ambiente leve e revigorado (ex.: sândalo indiano, palo santo da América do Sul, mirra do Egito)."
          },
          {
            title: "Energização",
            description: "Incensos à base de ervas como alecrim, gengibre e canela ativam a energia do espaço, trazendo sensação de vitalidade e foco (ex.: alecrim da Itália, gengibre do Brasil, canela do Sri Lanka)."
          },
          {
            title: "Rituais Sagrados",
            description: "Queimar incenso de forma intencional, acompanhando com meditação e gratidão, é uma prática poderosa de limpeza e fortalecimento do campo energético."
          }
        ]
      },
      techniques: {
        title: "Técnicas de limpeza e fortalecimento do campo energético",
        sections: [
          {
            title: "Limpeza Diária",
            description: "Inicie seu dia com rápida meditação, queima de incenso e visualização de seu campo energético brilhante e protegido. Repita sempre que sentir necessidade de reequilibrar sua energia."
          },
          {
            title: "Purificação Profunda",
            description: "Uma vez por semana, faça limpeza energética aprofundada com banhos de ervas, uso de cristais e técnicas de liberação de energias negativas acumuladas."
          },
          {
            title: "Fortalecimento Regular",
            description: "Mantenha seu campo energético forte com prática semanal de meditação, visualização e conexão com a natureza, prevenindo a entrada de influências negativas."
          }
        ]
      },
      routine: {
        title: "Rotina diária de práticas com elementos naturais",
        sections: [
          {
            title: "Ao Acordar",
            description: "Comece o dia com meditação rápida usando cristais e incenso para ativar energia positiva. Exemplo: cristal de quartzo rosa para amor-próprio e incenso de sândalo para paz interior. Visualize luz dourada envolvendo seu corpo, trazendo vitalidade e proteção."
          },
          {
            title: "No Ambiente",
            description: "Distribua plantas, cristais e incensos no trabalho e em casa para manter vibração elevada. Exemplo: lírio-da-paz para purificar o ar, ametista para transmutar energias negativas e incenso de alecrim para estimular concentração e criatividade."
          },
          {
            title: "No Descanso",
            description: "Antes de dormir, realize ritual de limpeza energética com incenso de lavanda para relaxar, cristal de selenita para acalmar e visualização de luz branca purificadora envolvendo seu corpo durante a noite."
          }
        ]
      },
      conclusion: {
        title: "Viva com mais leveza, clareza e proteção energética",
        description: "Ao incorporar elementos naturais em sua rotina, você criará um ambiente enriquecido, equilibrado e protegido. Sinta-se confiante, leve e alinhado, sabendo que está rodeado por vibrações positivas que repelem influências negativas e potencializam seu bem-estar físico, mental e espiritual."
      }
    },
    elementsTitle: "Proteção Energética com Elementos Naturais",
    elementsDescription: "Os quatro elementos podem ser incorporados à sua prática para criar uma barreira de proteção:",
    clickInstruction: "Clique nos mantras para reproduzir o áudio",
    play: "Reproduzir",
    pause: "Pausar",
    tip: "Dica:",
    tipText: "Ao usar os quatro elementos em conjunto, você cria uma barreira energética completa que harmoniza seu ambiente e potencializa suas práticas espirituais.",
    earthElement: {
      title: "Terra",
      description: "Promove enraizamento e estabilidade. Use cristais ou plantas durante sua prática."
    },
    waterElement: {
      title: "Água",
      description: "Traz fluidez e purificação. Tenha um copo de água perto e beba após a prática."
    },
    fireElement: {
      title: "Fogo",
      description: "Simboliza transformação. Acenda uma vela durante a recitação dos mantras."
    },
    airElement: {
      title: "Ar",
      description: "Representa clareza. Pratique ao ar livre ou perto de uma janela aberta."
    }
  },
  es: {
    title: "Mantras Sagrados del Monje Li Wei",
    subtitle: "Prácticas milenarias para la elevación espiritual y la armonía interior",
    mantrasTitle: "Mantras Sagrados",
    mantrasDescription: "Elige uno de los mantras a continuación para comenzar tu práctica. Se recomienda recitar el mantra 108 veces o escucharlo por al menos 10 minutos diarios.",
    bonusTitle: "Audio Bonus para Meditación",
    bonusDescription: "Una meditación exclusiva para complementar tu práctica espiritual",
    manualsTitle: "Manuales Espirituales",
    manualsDescription: "Contenidos exclusivos para potenciar tu práctica espiritual. Elige un manual para visualizar:",
    manualEffectsButton: "Amplificando los Efectos de los Mantras",
    manualProtectionButton: "Protección Energética con Elementos Naturales",
    amplifyTitle: "Amplificando los Efectos de los Mantras",
    amplifyDescription: "Descubre un enfoque holístico para potenciar los efectos de los mantras a través de una rutina diaria de prácticas simples pero poderosas.",
    amplifyContent: {
      respiracoes: {
        title: "Respiraciones y Ejercicios de Concentración",
        description: "Iniciar tu rutina diaria con prácticas de respiración consciente y ejercicios de concentración prepara tu cuerpo y mente para la práctica de los mantras.",
        practices: [
          {
            name: "Pranayama",
            description: "Respira lenta y profundamente, observando el flujo del aire. Experimenta técnicas como la respiración alterna por las fosas nasales para calmar la mente."
          },
          {
            name: "Trataka",
            description: "Fija suavemente la mirada en una llama, cristal o imagen sagrada. Deja que tu atención se concentre en ese punto focal, minimizando las distracciones."
          },
          {
            name: "Meditación Guiada",
            description: "Usa aplicaciones o audios para guiarte en una meditación enfocada, ayudando a calmar la mente y prepararte para la práctica de los mantras."
          }
        ]
      },
      posturas: {
        title: "Posturas y Movimientos para Alinear la Energía",
        description: "Incorporar posturas y movimientos suaves en tu rutina diaria ayuda a alinear tu energía y preparar tu cuerpo para la práctica de los mantras.",
        practices: [
          {
            name: "Posturas de Yoga",
            description: "Elige posturas como Sukhasana (Postura Fácil), Balasana (Postura del Niño) o Viparita Karani (Postura de la Luna Creciente) para calmar la mente y alinear tu energía."
          },
          {
            name: "Movimientos de Qi Gong",
            description: "Explora ejercicios de Qi Gong, como el Círculo de Energía o la Dança de las Nubes, para promover la circulación energética y la conexión con tu centro."
          },
          {
            name: "Estiramientos Conscientes",
            description: "Incluye algunos estiramientos suaves y conscientes, como el Estiramiento del Árbol o el Movimiento de la Marea, para liberar tensiones y preparar tu cuerpo."
          }
        ]
      },
      meditacao: {
        title: "Meditación y Visualización",
        description: "Añadir prácticas de meditación y visualización a tu rutina diaria amplifica los efectos de los mantras, permitiendo una conexión más profunda con tu propósito.",
        practices: [
          {
            name: "Meditación Vipassana",
            description: "Practica la observación atenta de tus sensaciones corporales y procesos mentales. Mantén tu atención presente, sin juicio, permitiendo que tus pensamientos fluyan naturalmente."
          },
          {
            name: "Meditación Trataka",
            description: "Siéntate cómodamente y fija tu mirada suavemente en una vela encendida u otro punto focal. Deja que tu mente se concentre en ese punto, respirando lenta y profundamente."
          },
          {
            name: "Visualización Guiada",
            description: "Visualiza imágenes o símbolos sagrados relacionados con los mantras, imaginándolos con riqueza de detalles. Déjate envolver por la energía y el significado de esos elementos."
          }
        ]
      },
      rituais: {
        title: "Rituales para Iniciar y Finalizar el Día",
        description: "Incorporar rituales intencionales al inicio y al final del día ayuda a crear un campo energético propicio para la práctica de los mantras.",
        practices: [
          {
            name: "Ritual Matutino",
            description: "Comienza tu día con un ritual de limpieza del espacio, como quemar incienso o rociar agua bendita. Luego, enciende una vela y recita tus mantras con intención, visualizando tus objetivos siendo alcanzados."
          },
          {
            name: "Ritual Nocturno",
            description: "Finaliza tu día con un ritual de agradecimiento e integración. Recuerda tus logros, expresa gratitud y visualiza cómo tu día fue bendecido. Luego, recita tus mantras con la intención de sellar tus energías para el día siguiente."
          }
        ]
      },
      conclusao: {
        title: "Transformando tu Vida con los Mantras",
        benefits: [
          "Conexión Profunda: Vuélvete más presente, atento y conectado contigo mismo y con las energías sutiles a tu alrededor.",
          "Enfoque y Concentración: Mejora tu capacidad de enfocarte y concentrarte en los mantras.",
          "Transformación Positiva: Libera bloqueos, transforma patrones limitantes y atrae bendiciones a tu vida."
        ]
      },
      dicas: {
        title: "Consejos para Mantener una Rutina Consistente",
        tips: [
          "Horario Fijo: Elige un horario específico del día para tus prácticas e intenta mantenerlo constante.",
          "Planificación Semanal: Reserva un momento de la semana para planificar tu rutina y asegurarte de que encaje en tu agenda.",
          "Recordatorios: Usa recordatorios en tu móvil o agenda para mantenerte comprometido con tu práctica diaria.",
          "Autocompasión: Sé amable contigo mismo si te saltas una práctica. Retoma con determinación al día siguiente."
        ]
      }
    },
    protectionTitle: "Manual de Protección Energética con Elementos Naturales",
    protectionDescription: "Este manual exclusivo enseña cómo utilizar elementos naturales – como cristales, plantas e inciensos – para reforzar tu campo energético y crear un ambiente protegido.",
    protectionContent: {
      introduction: {
        title: "El poder de los elementos naturales para protección energética",
        description: "Desde tiempos ancestrales, las sociedades han recurrido a los elementos naturales en busca de equilibrio, sanación y protección energética. Cristales, plantas e inciensos poseen propiedades únicas que, cuando se utilizan en armonía, crean un campo de energía positiva y alejan influencias negativas."
      },
      crystals: {
        title: "Cristales: Propiedades, selección y utilización",
        sections: [
          {
            title: "Propiedades Únicas",
            description: "Cada cristal posee una frecuencia vibracional única que interactúa con nuestro campo energético de manera específica. Algunos cristales, como la amatista, tienen propiedades calmantes, mientras que otros, como el cuarzo, amplifican la energía."
          },
          {
            title: "Selección Consciente",
            description: "Elige cristales que sientas intuitivamente correctos para ti y tu intención. Mantenlos cerca, llévalos en tu bolso o colócalos en tu ambiente para que puedan trabajar en tu energía."
          },
          {
            title: "Usos Poderosos",
            description: "Los cristales pueden utilizarse en meditación, rituales de limpieza energética, como decoración en ambientes e incluso como joyas. Su presencia constante realza la vibración positiva a tu alrededor."
          }
        ]
      },
      plants: {
        title: "Plantas: Especies estratégicas para ambiente equilibrado",
        sections: [
          {
            title: "Plantas Purificadoras",
            description: "Helecho, costilla de Adán y ruda son conocidas por sus propiedades purificadoras, ayudando a eliminar toxinas e impurezas del aire, creando un ambiente más limpio y revitalizado."
          },
          {
            title: "Plantas Energizantes",
            description: "Romero, lavanda y tomillo emanan vibración positiva, elevando la energía del espacio y promoviendo ligereza y vitalidad."
          },
          {
            title: "Plantas Antiestres",
            description: "Manzanilla, lirio de paz y aloe vera poseen efectos calmantes, ayudando a aliviar la tensión y promover un ambiente relajante y sereno."
          }
        ]
      },
      incense: {
        title: "Inciensos: Aromas y rituales para purificar y energizar",
        sections: [
          {
            title: "Purificación",
            description: "Inciensos de sándalo, palo santo y mirra son excelentes para eliminar energías pesadas y negativas, dejando el ambiente ligero y revigorizado (ej.: sándalo de la India, palo santo de Sudamérica, mirra de Egipto)."
          },
          {
            title: "Energización",
            description: "Inciensos a base de hierbas como romero, jengibre y canela activan la energía del espacio, trayendo sensación de vitalidad y enfoque (ej.: romero de Italia, jengibre de Brasil, canela de Sri Lanka)."
          },
          {
            title: "Rituales Sagrados",
            description: "Quemar incienso de forma intencional, acompañado de meditación y gratitud, es una práctica poderosa de limpieza y fortalecimiento del campo energético."
          }
        ]
      },
      techniques: {
        title: "Técnicas de limpieza y fortalecimiento del campo energético",
        sections: [
          {
            title: "Limpieza Diaria",
            description: "Inicia tu día con una rápida meditación, quema de incienso y visualización de tu campo energético brillante y protegido. Repite siempre que sientas necesidad de reequilibrar tu energía."
          },
          {
            title: "Purificación Profunda",
            description: "Una vez por semana, realiza una limpieza energética profunda con baños de hierbas, uso de cristales y técnicas de liberación de energías negativas acumuladas."
          },
          {
            title: "Fortalecimiento Regular",
            description: "Mantén tu campo energético fuerte con práctica semanal de meditación, visualización y conexión con la naturaleza, previniendo la entrada de influencias negativas."
          }
        ]
      },
      routine: {
        title: "Rutina diaria de prácticas con elementos naturales",
        sections: [
          {
            title: "Al Despertar",
            description: "Comienza el día con meditación rápida usando cristales e incienso para activar energía positiva. Ejemplo: cristal de cuarzo rosa para amor propio e incienso de sándalo para paz interior. Visualiza luz dorada envolviendo tu cuerpo, trayendo vitalidad y protección."
          },
          {
            title: "En el Ambiente",
            description: "Distribuye plantas, cristales e inciensos en el trabajo y en casa para mantener vibración elevada. Ejemplo: lirio de paz para purificar el aire, amatista para transmutar energías negativas e incienso de romero para estimular concentración y creatividad."
          },
          {
            title: "En el Descanso",
            description: "Antes de dormir, realiza un ritual de limpieza energética con incienso de lavanda para relajar, cristal de selenita para calmar y visualización de luz blanca purificadora envolviendo tu cuerpo durante la noche."
          }
        ]
      },
      conclusion: {
        title: "Vive con más ligereza, claridad y protección energética",
        description: "Al incorporar elementos naturales en tu rutina, crearás un ambiente enriquecido, equilibrado y protegido. Siéntete confiado, ligero y alineado, sabiendo que estás rodeado por vibraciones positivas que repelen influencias negativas y potencian tu bienestar físico, mental y espiritual."
      }
    },
    elementsTitle: "Protección Energética con Elementos Naturales",
    elementsDescription: "Los cuatro elementos pueden incorporarse a tu práctica para crear una barrera de protección:",
    clickInstruction: "Haga clic en los mantras para reproducir el audio",
    play: "Reproducir",
    pause: "Pausar",
    tip: "Consejo:",
    tipText: "Al usar los cuatro elementos juntos, creas una barrera energética completa que armoniza tu ambiente y potencia tus prácticas espirituales.",
    earthElement: {
      title: "Tierra",
      description: "Promueve el enraizamiento y la estabilidad. Usa cristales o plantas durante tu práctica."
    },
    waterElement: {
      title: "Agua",
      description: "Aporta fluidez y purificación. Ten un vaso de agua cerca y bebe después de la práctica."
    },
    fireElement: {
      title: "Fuego",
      description: "Simboliza transformación. Enciende una vela durante la recitación de los mantras."
    },
    airElement: {
      title: "Aire",
      description: "Representa claridad. Practica al aire libre o cerca de una ventana abierta."
    }
  },
  en: {
    title: "Sacred Mantras of Monk Li Wei",
    subtitle: "Ancient practices for spiritual elevation and inner harmony",
    mantrasTitle: "Sacred Mantras",
    mantrasDescription: "Choose one of the mantras below to begin your practice. It's recommended to recite the mantra 108 times or listen for at least 10 minutes daily.",
    bonusTitle: "Bonus Audio for Meditation",
    bonusDescription: "An exclusive meditation to complement your spiritual practice",
    manualsTitle: "Spiritual Manuals",
    manualsDescription: "Exclusive content to enhance your spiritual practice. Choose a manual to view:",
    manualEffectsButton: "Amplifying the Effects of Mantras",
    manualProtectionButton: "Energy Protection with Natural Elements",
    amplifyTitle: "Amplifying the Effects of Mantras",
    amplifyDescription: "Discover a holistic approach to enhance the effects of mantras through a daily routine of simple yet powerful practices.",
    amplifyContent: {
      respiracoes: {
        title: "Breathing and Concentration Exercises",
        description: "Starting your daily routine with conscious breathing practices and concentration exercises prepares your body and mind for mantra practice.",
        practices: [
          {
            name: "Pranayama",
            description: "Breathe slowly and deeply, observing the flow of air. Try techniques like alternate nostril breathing to calm the mind."
          },
          {
            name: "Trataka",
            description: "Gently fix your gaze on a flame, crystal, or sacred image. Let your attention focus on this focal point, minimizing distractions."
          },
          {
            name: "Guided Meditation",
            description: "Use apps or audio to guide you in focused meditation, helping to calm the mind and prepare for mantra practice."
          }
        ]
      },
      posturas: {
        title: "Postures and Movements to Align Energy",
        description: "Incorporating postures and gentle movements into your daily routine helps align your energy and prepare your body for mantra practice.",
        practices: [
          {
            name: "Yoga Postures",
            description: "Choose postures like Sukhasana (Easy Pose), Balasana (Child's Pose), or Viparita Karani (Legs-Up-the-Wall Pose) to calm the mind and align your energy."
          },
          {
            name: "Qi Gong Movements",
            description: "Explore Qi Gong exercises like the Energy Circle or Cloud Dancing to promote energy circulation and connection to your center."
          },
          {
            name: "Conscious Stretching",
            description: "Include some gentle and conscious stretches like Tree Stretch or Tide Movement to release tension and prepare your body."
          }
        ]
      },
      meditacao: {
        title: "Meditation and Visualization",
        description: "Adding meditation and visualization practices to your daily routine amplifies the effects of mantras, allowing deeper connection with your purpose.",
        practices: [
          {
            name: "Vipassana Meditation",
            description: "Practice mindful observation of your bodily sensations and mental processes. Keep your attention present, without judgment, allowing your thoughts to flow naturally."
          },
          {
            name: "Trataka Meditation",
            description: "Sit comfortably and gently fix your gaze on a lit candle or other focal point. Let your mind concentrate on this point, breathing slowly and deeply."
          },
          {
            name: "Guided Visualization",
            description: "Visualize sacred images or symbols related to the mantras, imagining them with rich detail. Let yourself be enveloped by the energy and meaning of these elements."
          }
        ]
      },
      rituais: {
        title: "Rituals to Start and End the Day",
        description: "Incorporating intentional rituals at the beginning and end of the day helps create an energy field conducive to mantra practice.",
        practices: [
          {
            name: "Morning Ritual",
            description: "Begin your day with a space cleansing ritual, such as burning incense or sprinkling holy water. Then, light a candle and recite your mantras with intention, visualizing your goals being achieved."
          },
          {
            name: "Evening Ritual",
            description: "End your day with a ritual of gratitude and integration. Remember your achievements, express gratitude, and visualize how your day was blessed. Then, recite your mantras with the intention of sealing your energies for the next day."
          }
        ]
      },
      conclusao: {
        title: "Transforming Your Life with Mantras",
        benefits: [
          "Deep Connection: Become more present, attentive, and connected to yourself and the subtle energies around you.",
          "Focus and Concentration: Improve your ability to focus and concentrate on mantras.",
          "Positive Transformation: Release blockages, transform limiting patterns, and attract blessings into your life."
        ]
      },
      dicas: {
        title: "Tips for Maintaining a Consistent Routine",
        tips: [
          "Fixed Schedule: Choose a specific time of day for your practices and try to keep it consistent.",
          "Weekly Planning: Set aside time each week to plan your routine and ensure it fits into your schedule.",
          "Reminders: Use reminders on your phone or calendar to keep you engaged in your daily practice.",
          "Self-Compassion: Be gentle with yourself if you miss a practice. Resume with determination the next day."
        ]
      }
    },
    protectionTitle: "Energy Protection Manual with Natural Elements",
    protectionDescription: "This exclusive manual teaches how to use natural elements – such as crystals, plants, and incense – to strengthen your energy field and create a protected environment.",
    protectionContent: {
      introduction: {
        title: "The power of natural elements for energy protection",
        description: "Since ancient times, societies have turned to natural elements seeking balance, healing, and energy protection. Crystals, plants, and incense possess unique properties that, when used in harmony, create a field of positive energy and ward off negative influences."
      },
      crystals: {
        title: "Crystals: Properties, selection and use",
        sections: [
          {
            title: "Unique Properties",
            description: "Each crystal has a unique vibrational frequency that interacts with our energy field in specific ways. Some crystals, like amethyst, have calming properties, while others, like quartz, amplify energy."
          },
          {
            title: "Conscious Selection",
            description: "Choose crystals that feel intuitively right for you and your intention. Keep them close, carry them in your bag, or place them in your environment so they can work on your energy."
          },
          {
            title: "Powerful Uses",
            description: "Crystals can be used in meditation, energy cleansing rituals, as decoration in environments, and even as jewelry. Their constant presence enhances the positive vibration around you."
          }
        ]
      },
      plants: {
        title: "Plants: Strategic species for balanced environment",
        sections: [
          {
            title: "Purifying Plants",
            description: "Fern, monstera, and rue are known for their purifying properties, helping to remove toxins and impurities from the air, creating a cleaner and revitalized environment."
          },
          {
            title: "Energizing Plants",
            description: "Rosemary, lavender, and thyme emanate positive vibration, elevating the space's energy and promoting lightness and vitality."
          },
          {
            title: "Anti-stress Plants",
            description: "Chamomile, peace lily, and aloe have calming effects, helping to relieve tension and promote a relaxing and serene environment."
          }
        ]
      },
      incense: {
        title: "Incense: Aromas and rituals to purify and energize",
        sections: [
          {
            title: "Purification",
            description: "Sandalwood, palo santo, and myrrh incense are excellent for removing heavy and negative energies, leaving the environment light and invigorated."
          },
          {
            title: "Energization",
            description: "Herb-based incense like rosemary, ginger, and cinnamon activate the space's energy, bringing a sense of vitality and focus."
          },
          {
            title: "Sacred Rituals",
            description: "Burning incense intentionally, accompanied by meditation and gratitude, is a powerful practice for cleansing and strengthening the energy field."
          }
        ]
      },
      techniques: {
        title: "Techniques for cleansing and strengthening the energy field",
        sections: [
          {
            title: "Daily Cleansing",
            description: "Start your day with quick meditation, burning incense, and visualization of your energy field bright and protected. Repeat whenever you feel the need to rebalance your energy."
          },
          {
            title: "Deep Purification",
            description: "Once a week, do deep energy cleansing with herb baths, crystal use, and techniques for releasing accumulated negative energies."
          },
          {
            title: "Regular Strengthening",
            description: "Keep your energy field strong with weekly practice of meditation, visualization, and connection with nature, preventing the entry of negative influences."
          }
        ]
      },
      routine: {
        title: "Daily routine of practices with natural elements",
        sections: [
          {
            title: "Upon Waking",
            description: "Start the day with quick meditation using crystals and incense to activate positive energy. Example: rose quartz crystal for self-love and sandalwood incense for inner peace."
          },
          {
            title: "In the Environment",
            description: "Distribute plants, crystals, and incense at work and home to maintain elevated vibration. Example: peace lily to purify air, amethyst to transmute negative energies."
          },
          {
            title: "At Rest",
            description: "Before sleeping, perform energy cleansing ritual with lavender incense to relax, selenite crystal to calm, and visualization of purifying white light surrounding your body during the night."
          }
        ]
      },
      conclusion: {
        title: "Live with more lightness, clarity and energy protection",
        description: "By incorporating natural elements into your routine, you will create an enriched, balanced, and protected environment. Feel confident, light, and aligned, knowing you are surrounded by positive vibrations that repel negative influences."
      }
    },
    elementsTitle: "Energy Protection with Natural Elements",
    elementsDescription: "The four elements can be incorporated into your practice to create a protective barrier:",
    clickInstruction: "Click on the mantras to play the audio",
    play: "Play",
    pause: "Pause",
    tip: "Tip:",
    tipText: "By using the four elements together, you create a complete energetic barrier that harmonizes your environment and enhances your spiritual practices.",
    earthElement: {
      title: "Earth",
      description: "Promotes grounding and stability. Use crystals or plants during your practice."
    },
    waterElement: {
      title: "Water",
      description: "Brings fluidity and purification. Keep a glass of water nearby and drink after practice."
    },
    fireElement: {
      title: "Fire",
      description: "Symbolizes transformation. Light a candle during mantra recitation."
    },
    airElement: {
      title: "Air",
      description: "Represents clarity. Practice outdoors or near an open window."
    }
  },
  fr: {
    title: "Mantras Sacrés du Moine Li Wei",
    subtitle: "Pratiques millénaires pour l'élévation spirituelle et l'harmonie intérieure",
    mantrasTitle: "Mantras Sacrés",
    mantrasDescription: "Choisissez l'un des mantras ci-dessous pour commencer votre pratique. Il est recommandé de réciter le mantra 108 fois ou d'écouter pendant au moins 10 minutes par jour.",
    bonusTitle: "Audio Bonus pour la Méditation",
    bonusDescription: "Une méditation exclusive pour compléter votre pratique spirituelle",
    manualsTitle: "Manuels Spirituels",
    manualsDescription: "Contenus exclusifs pour potentialiser votre pratique spirituelle. Choisissez un manuel à visualiser :",
    manualEffectsButton: "Amplifier les Effets des Mantras",
    manualProtectionButton: "Protection Énergétique avec les Éléments Naturels",
    amplifyTitle: "Amplifier les Effets des Mantras",
    amplifyDescription: "Découvrez une approche holistique pour potentialiser les effets des mantras à travers une routine quotidienne de pratiques simples mais puissantes.",
    amplifyContent: {
      respiracoes: {
        title: "Respirations et Exercices de Concentration",
        description: "Commencer votre routine quotidienne avec des pratiques de respiration consciente et des exercices de concentration prépare votre corps et votre esprit à la pratique des mantras.",
        practices: [
          {
            name: "Pranayama",
            description: "Respirez lentement et profondément, en observant le flux d'air. Essayez des techniques comme la respiration alternée par les narines pour calmer l'esprit."
          },
          {
            name: "Trataka",
            description: "Fixez doucement le regard sur une flamme, un cristal ou une image sacrée. Laissez votre attention se concentrer sur ce point focal, minimisant les distractions."
          },
          {
            name: "Méditation Guidée",
            description: "Utilisez des applications ou des audios pour vous guider dans une méditation focalisée, aidant à calmer l'esprit et à préparer la pratique des mantras."
          }
        ]
      },
      posturas: {
        title: "Postures et Mouvements pour Aligner l'Énergie",
        description: "Incorporer des postures et des mouvements doux dans votre routine quotidienne aide à aligner votre énergie et à préparer votre corps à la pratique des mantras.",
        practices: [
          {
            name: "Postures de Yoga",
            description: "Choisissez des postures comme Sukhasana (Posture Facile), Balasana (Posture de l'Enfant) ou Viparita Karani (Posture de la Lune Croissante) pour calmer l'esprit et aligner votre énergie."
          },
          {
            name: "Mouvements de Qi Gong",
            description: "Explorez des exercices de Qi Gong comme le Cercle d'Énergie ou la Danse des Nuages pour promouvoir la circulation énergétique et la connexion avec votre centre."
          },
          {
            name: "Étirements Conscients",
            description: "Incluez quelques étirements doux et conscients comme l'Étirement de l'Arbre ou le Mouvement de la Marée pour libérer les tensions et préparer votre corps."
          }
        ]
      },
      meditacao: {
        title: "Méditation et Visualisation",
        description: "Ajouter des pratiques de méditation et de visualisation à votre routine quotidienne amplifie les effets des mantras, permettant une connexion plus profonde avec votre objectif.",
        practices: [
          {
            name: "Méditation Vipassana",
            description: "Pratiquez l'observation attentive de vos sensations corporelles et processus mentaux. Maintenez votre attention présente, sans jugement, permettant à vos pensées de couler naturellement."
          },
          {
            name: "Méditation Trataka",
            description: "Asseyez-vous confortablement et fixez doucement votre regard sur une bougie allumée ou autre point focal. Laissez votre esprit se concentrer sur ce point, respirant lentement et profondément."
          },
          {
            name: "Visualisation Guidée",
            description: "Visualisez des images ou symboles sacrés liés aux mantras, en les imaginant avec richesse de détails. Laissez-vous envelopper par l'énergie et la signification de ces éléments."
          }
        ]
      },
      rituais: {
        title: "Rituels pour Commencer et Terminer la Journée",
        description: "Incorporer des rituels intentionnels au début et à la fin de la journée aide à créer un champ énergétique propice à la pratique des mantras.",
        practices: [
          {
            name: "Rituel Matinal",
            description: "Commencez votre journée avec un rituel de purification de l'espace, comme brûler de l'encens ou asperger d'eau bénite. Puis, allumez une bougie et récitez vos mantras avec intention, visualisant vos objectifs se réalisant."
          },
          {
            name: "Rituel du Soir",
            description: "Terminez votre journée avec un rituel de gratitude et d'intégration. Souvenez-vous de vos réalisations, exprimez la gratitude et visualisez comment votre journée a été bénie. Puis, récitez vos mantras avec l'intention de sceller vos énergies pour le lendemain."
          }
        ]
      },
      conclusao: {
        title: "Transformer Votre Vie avec les Mantras",
        benefits: [
          "Connexion Profonde : Devenez plus présent, attentif et connecté à vous-même et aux énergies subtiles qui vous entourent.",
          "Focus et Concentration : Améliorez votre capacité à vous concentrer et à vous focaliser sur les mantras.",
          "Transformation Positive : Libérez les blocages, transformez les schémas limitants et attirez les bénédictions dans votre vie."
        ]
      },
      dicas: {
        title: "Conseils pour Maintenir une Routine Cohérente",
        tips: [
          "Horaire Fixe : Choisissez un moment spécifique de la journée pour vos pratiques et essayez de le maintenir cohérent.",
          "Planification Hebdomadaire : Réservez du temps chaque semaine pour planifier votre routine et vous assurer qu'elle s'adapte à votre emploi du temps.",
          "Rappels : Utilisez des rappels sur votre téléphone ou calendrier pour vous maintenir engagé dans votre pratique quotidienne.",
          "Auto-Compassion : Soyez doux avec vous-même si vous manquez une pratique. Reprenez avec détermination le lendemain."
        ]
      }
    },
    protectionTitle: "Manuel de Protection Énergétique avec les Éléments Naturels",
    protectionDescription: "Ce manuel exclusif enseigne comment utiliser les éléments naturels – comme les cristaux, les plantes et l'encens – pour renforcer votre champ énergétique et créer un environnement protégé.",
    protectionContent: {
      introduction: {
        title: "Le pouvoir des éléments naturels pour la protection énergétique",
        description: "Depuis les temps anciens, les sociétés se sont tournées vers les éléments naturels en quête d'équilibre, de guérison et de protection énergétique. Les cristaux, les plantes et l'encens possèdent des propriétés uniques qui, utilisées en harmonie, créent un champ d'énergie positive et repoussent les influences négatives."
      },
      crystals: {
        title: "Cristaux : Propriétés, sélection et utilisation",
        sections: [
          {
            title: "Propriétés Uniques",
            description: "Chaque cristal a une fréquence vibratoire unique qui interagit avec notre champ énergétique de manières spécifiques. Certains cristaux, comme l'améthyste, ont des propriétés calmantes, tandis que d'autres, comme le quartz, amplifient l'énergie."
          },
          {
            title: "Sélection Consciente",
            description: "Choisissez des cristaux qui vous semblent intuitivement justes pour vous et votre intention. Gardez-les près de vous, portez-les dans votre sac ou placez-les dans votre environnement pour qu'ils puissent travailler sur votre énergie."
          },
          {
            title: "Utilisations Puissantes",
            description: "Les cristaux peuvent être utilisés en méditation, dans des rituels de purification énergétique, comme décoration dans les environnements, et même comme bijoux. Leur présence constante améliore la vibration positive autour de vous."
          }
        ]
      },
      plants: {
        title: "Plantes : Espèces stratégiques pour un environnement équilibré",
        sections: [
          {
            title: "Plantes Purifiantes",
            description: "La fougère, le monstera et la rue sont connues pour leurs propriétés purifiantes, aidant à éliminer les toxines et impuretés de l'air, créant un environnement plus propre et revitalisé."
          },
          {
            title: "Plantes Énergisantes",
            description: "Le romarin, la lavande et le thym émanent une vibration positive, élevant l'énergie de l'espace et promouvant la légèreté et la vitalité."
          },
          {
            title: "Plantes Anti-stress",
            description: "La camomille, le lys de la paix et l'aloès ont des effets calmants, aidant à soulager la tension et à promouvoir un environnement relaxant et serein."
          }
        ]
      },
      incense: {
        title: "Encens : Arômes et rituels pour purifier et énergiser",
        sections: [
          {
            title: "Purification",
            description: "L'encens de santal, palo santo et myrrhe sont excellents pour éliminer les énergies lourdes et négatives, laissant l'environnement léger et revigoré."
          },
          {
            title: "Énergisation",
            description: "L'encens à base d'herbes comme le romarin, le gingembre et la cannelle activent l'énergie de l'espace, apportant un sentiment de vitalité et de focus."
          },
          {
            title: "Rituels Sacrés",
            description: "Brûler de l'encens intentionnellement, accompagné de méditation et de gratitude, est une pratique puissante pour purifier et renforcer le champ énergétique."
          }
        ]
      },
      techniques: {
        title: "Techniques pour purifier et renforcer le champ énergétique",
        sections: [
          {
            title: "Purification Quotidienne",
            description: "Commencez votre journée avec une méditation rapide, brûlez de l'encens et visualisez votre champ énergétique brillant et protégé. Répétez chaque fois que vous ressentez le besoin de rééquilibrer votre énergie."
          },
          {
            title: "Purification Profonde",
            description: "Une fois par semaine, faites une purification énergétique profonde avec des bains d'herbes, l'utilisation de cristaux et des techniques pour libérer les énergies négatives accumulées."
          },
          {
            title: "Renforcement Régulier",
            description: "Maintenez votre champ énergétique fort avec une pratique hebdomadaire de méditation, visualisation et connexion avec la nature, prévenant l'entrée d'influences négatives."
          }
        ]
      },
      routine: {
        title: "Routine quotidienne de pratiques avec les éléments naturels",
        sections: [
          {
            title: "Au Réveil",
            description: "Commencez la journée avec une méditation rapide utilisant des cristaux et de l'encens pour activer l'énergie positive. Exemple : cristal de quartz rose pour l'amour de soi et encens de santal pour la paix intérieure."
          },
          {
            title: "Dans l'Environnement",
            description: "Distribuez des plantes, cristaux et encens au travail et à la maison pour maintenir une vibration élevée. Exemple : lys de la paix pour purifier l'air, améthyste pour transmuter les énergies négatives."
          },
          {
            title: "Au Repos",
            description: "Avant de dormir, effectuez un rituel de purification énergétique avec de l'encens de lavande pour relaxer, cristal de sélénite pour calmer, et visualisation de lumière blanche purifiante entourant votre corps pendant la nuit."
          }
        ]
      },
      conclusion: {
        title: "Vivre avec plus de légèreté, clarté et protection énergétique",
        description: "En incorporant les éléments naturels dans votre routine, vous créerez un environnement enrichi, équilibré et protégé. Sentez-vous confiant, léger et aligné, sachant que vous êtes entouré de vibrations positives qui repoussent les influences négatives."
      }
    },
    elementsTitle: "Protection Énergétique avec les Éléments Naturels",
    elementsDescription: "Les quatre éléments peuvent être incorporés dans votre pratique pour créer une barrière protectrice :",
    clickInstruction: "Cliquez sur les mantras pour jouer l'audio",
    play: "Jouer",
    pause: "Pause",
    tip: "Conseil :",
    tipText: "En utilisant les quatre éléments ensemble, vous créez une barrière énergétique complète qui harmonise votre environnement et améliore vos pratiques spirituelles.",
    earthElement: {
      title: "Terre",
      description: "Favorise l'ancrage et la stabilité. Utilisez des cristaux ou des plantes pendant votre pratique."
    },
    waterElement: {
      title: "Eau",
      description: "Apporte fluidité et purification. Gardez un verre d'eau à proximité et buvez après la pratique."
    },
    fireElement: {
      title: "Feu",
      description: "Symbolise la transformation. Allumez une bougie pendant la récitation des mantras."
    },
    airElement: {
      title: "Air",
      description: "Représente la clarté. Pratiquez à l'extérieur ou près d'une fenêtre ouverte."
    }
  }
};

// Definição de cores para cada mantra
const mantraColors: Record<string, {
  primary: string;
  secondary: string;
  gradient: string;
  icon: JSX.Element;
}> = {
  'om-mani-padme-hum': {
    primary: '#8A2BE2', // Roxo (cor da espiritualidade e transformação)
    secondary: '#D8BFD8', // Lilás claro
    gradient: 'linear-gradient(135deg, #8A2BE2, #9370DB)',
    icon: <GiLotusFlower size={28} color="#D8BFD8" />
  },
  'om-gam-ganapataye-namaha': {
    primary: '#FF8C00', // Laranja (cor da superação de obstáculos)
    secondary: '#FFD700', // Dourado
    gradient: 'linear-gradient(135deg, #FF8C00, #FFD700)',
    icon: <GiMountainRoad size={28} color="#FFD700" />
  },
  'om-namah-shivaya': {
    primary: '#1E90FF', // Azul (cor da transformação espiritual)
    secondary: '#87CEFA', // Azul claro
    gradient: 'linear-gradient(135deg, #1E90FF, #87CEFA)',
    icon: <FaInfinity size={28} color="#87CEFA" />
  },
  'om-shanti-shanti-shanti': {
    primary: '#32CD32', // Verde (cor da paz e tranquilidade)
    secondary: '#98FB98', // Verde claro
    gradient: 'linear-gradient(135deg, #32CD32, #98FB98)',
    icon: <GiPeaceDove size={28} color="#98FB98" />
  }
};

// Função para obter a configuração de cores de um mantra pelo ID
const getMantraTheme = (id: string) => {
  const formattedId = id.toLowerCase().replace(/\s+/g, '-');
  return mantraColors[formattedId as keyof typeof mantraColors] || mantraColors['om-mani-padme-hum']; // Default
};

export default function LiWeiPage() {
  const [locale, setLocale] = useState<Locale>('pt');
  const [mounted, setMounted] = useState(false);
  const [activeMantra, setActiveMantra] = useState<number | null>(null);
  const [activeManual, setActiveManual] = useState<'effects' | 'protection' | null>(null);

  // Memo values defined consistently at the top level of component
  const t = useMemo(() => translations[locale as keyof typeof translations] || translations.pt, [locale]);
  const currentMantras = useMemo(() => mantras[locale as keyof typeof mantras] || mantras.pt, [locale]);
  const currentBonusAudio = useMemo(() => bonusAudio[locale as keyof typeof bonusAudio] || bonusAudio.pt, [locale]);
  
  const adaptedMantras = useMemo(() => 
    currentMantras.map(adaptMantraFormat), 
    [currentMantras]
  );
  
  const adaptedBonusAudio = useMemo(() => 
    adaptMantraFormat(currentBonusAudio),
    [currentBonusAudio]
  );

  useEffect(() => {
    setMounted(true);
    setLocale(getCurrentLocale());
    
    // Registrar que o usuário visitou a página do Li Wei
    try {
      localStorage.setItem(LIWEI_VISITED_KEY, 'true');
    } catch (error) {
      console.error('Erro ao salvar no localStorage:', error);
    }
  }, []);

  const handleMantraSelect = (index: number) => {
    setActiveMantra(index === activeMantra ? null : index);
  };

  if (!mounted) return null;



  const renderMantraPlayer = (index: number) => (
    <motion.div 
      style={styles.playerContainer}
      initial={{ opacity: 0, height: 0 }}
      animate={{ opacity: 1, height: 'auto' }}
      transition={{ duration: 0.3 }}
      onClick={(e) => e.stopPropagation()}
    >
      <MeditationPlayerWithSuspense 
        mantras={[adaptedMantras[index]]} 
        locale={locale} 
      />
    </motion.div>
  );

  // No componente LiWeiPage, substitua a seção de renderização de mantras
  const renderMantraCard = (mantra: {
    id: string;
    title: string;
    description: string;
    text: string;
    youtubeId: string;
    objective: string;
    color: string;
  }, index: number) => {
    const mantraTheme = getMantraTheme(mantra.id);
    
    return (
      <Card
        key={mantra.id}
        title={mantra.title}
        description={
          <div style={{ position: 'relative' }}>
            {/* Ícone do mantra */}
            <div style={{
              position: 'absolute',
              top: '-20px',
              right: '0px',
              opacity: 0.9,
              transform: 'translateY(-50%)',
            }}>
              {mantraTheme.icon}
            </div>
            
            {/* Descrição do mantra com destaque */}
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '12px',
              marginTop: '5px',
              marginRight: '30px', // Espaço para o ícone
            }}>
              {/* Título do benefício principal */}
              <div style={{
                fontWeight: 'bold',
                fontSize: '0.95rem',
                color: mantraTheme.secondary,
                marginBottom: '-5px',
              }}>
                {locale === 'pt' ? 'Benefícios:' : locale === 'es' ? 'Beneficios:' : 'Benefits:'}
              </div>
              
              {/* Descrição com estilo aprimorado */}
              <p style={{
                margin: 0,
                paddingLeft: '10px',
                borderLeft: `3px solid ${mantraTheme.primary}`,
                fontSize: '0.9rem',
                lineHeight: '1.5',
                color: 'rgba(255, 255, 255, 0.85)',
              }}>
                {mantra.description}
              </p>
            </div>
          </div>
        }
        active={activeMantra === index}
        onClick={() => handleMantraSelect(index)}
        delay={0.5 + (index * 0.1)}
        extraStyles={{
          cursor: 'pointer', 
          position: 'relative',
          transition: 'all 0.3s ease',
          transform: activeMantra === index ? 'scale(1.02)' : 'scale(1)',
          border: activeMantra === index 
            ? `1px solid ${mantraTheme.primary}` 
            : `1px solid ${colors.borders.light}`,
          boxShadow: activeMantra === index 
            ? `0 5px 15px ${mantraTheme.primary}33` 
            : 'none',
          background: activeMantra === index 
            ? `linear-gradient(to bottom, rgba(0,0,0,0.7), rgba(0,0,0,0.5)), ${mantraTheme.gradient}11` 
            : colors.backgrounds.card,
        }}
      >
        {/* Texto do mantra com estilo melhorado */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '10px',
          marginTop: '15px',
          padding: '10px',
          background: `linear-gradient(to right, ${mantraTheme.primary}22, ${mantraTheme.primary}44, ${mantraTheme.primary}22)`,
          borderRadius: '8px',
          border: `1px solid ${mantraTheme.primary}33`
        }}>
          <FaOm size={20} color={mantraTheme.secondary} />
          <p style={{
            margin: 0,
            fontWeight: '600',
            fontSize: '1.05rem',
            background: 'linear-gradient(to right, #D4AF37, #FFD700, #D4AF37)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            textAlign: 'center',
          }}>
            {mantra.text}
          </p>
        </div>
        
        {/* Botão de reprodução estilizado */}
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          marginTop: '20px'
        }}>
          <motion.button
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              padding: '10px 20px',
              background: activeMantra === index 
                ? mantraTheme.gradient
                : 'rgba(255, 255, 255, 0.1)',
              border: 'none',
              borderRadius: '50px',
              color: activeMantra === index ? '#333' : 'white',
              fontSize: '0.95rem',
              fontWeight: 500,
              cursor: 'pointer',
              boxShadow: activeMantra === index 
                ? `0 4px 12px ${mantraTheme.primary}66`
                : '0 2px 6px rgba(0,0,0,0.2)',
            }}
            whileHover={{ 
              scale: 1.05,
              background: mantraTheme.gradient,
              color: '#333',
              boxShadow: `0 4px 12px ${mantraTheme.primary}66`
            }}
            whileTap={{ scale: 0.95 }}
            onClick={(e) => {
              e.stopPropagation();
              handleMantraSelect(index);
            }}
          >
            <BsPlayCircleFill size={18} />
            {activeMantra === index ? t.pause : t.play}
          </motion.button>
        </div>
        
        {activeMantra === index && renderMantraPlayer(index)}
      </Card>
    );
  };

  return (
    <main style={styles.container}>
      <NavbarWithSuspense />

      <motion.div 
        style={styles.content}
        {...motionVariants.fadeInUp}
        transition={{ duration: 0.5 }}
      >
        <motion.h1
          style={styles.title}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.2 }}
        >
          {t.title}
        </motion.h1>

        <motion.p
          style={styles.subtitle}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.3 }}
        >
          {t.subtitle}
        </motion.p>

        {/* Seção de Mantras */}
        <motion.section
          style={styles.section}
          {...motionVariants.fadeInUp}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <SectionTitle 
            title={t.mantrasTitle}
            icon={<BsFillVolumeUpFill />}
            delay={0.4}
          />
          
          <p style={{...styles.cardDescription, marginBottom: '20px'}}>{t.mantrasDescription}</p>
          
          {/* Instrução adicional */}
          <div style={{
            background: 'rgba(255, 255, 255, 0.1)',
            padding: '10px 16px',
            borderRadius: '8px',
            marginBottom: '20px',
            display: 'flex',
            alignItems: 'center',
            gap: '10px'
          }}>
            <BsPlayCircleFill style={{color: colors.gold.main}} size={20} />
            <p style={{
              margin: 0,
              fontSize: '0.9rem',
              color: colors.text.light,
            }}>
              {t.clickInstruction}
            </p>
          </div>
          
          {currentMantras.map((mantra, index) => renderMantraCard(mantra, index))}
        </motion.section>

        <div style={styles.divider} />

        {/* Seção Bônus - Áudio para Meditação */}
        <motion.section
          style={styles.section}
          {...motionVariants.fadeInUp}
          transition={{ duration: 0.5, delay: 0.7 }}
        >
          <SectionTitle 
            title={t.bonusTitle}
            delay={0.7}
          />
          
          <p style={{...styles.cardDescription, marginBottom: '24px'}}>{t.bonusDescription}</p>
          
          <Card
            title={currentBonusAudio.title}
            description={currentBonusAudio.description}
            extraStyles={{ border: `1px solid ${colors.borders.medium}` }}
            delay={0.8}
          >
            <div style={{...styles.playerContainer, marginTop: '24px'}}>
              <MeditationPlayerWithSuspense 
                mantras={[adaptedBonusAudio]} 
                locale={locale} 
              />
            </div>
          </Card>
        </motion.section>

        <div style={styles.divider} />

        {/* Seção de Manuais Espirituais */}
        <motion.section
          style={styles.section}
          {...motionVariants.fadeInUp}
          transition={{ duration: 0.5, delay: 0.9 }}
        >
          <SectionTitle 
            title={t.manualsTitle}
            icon={<BsBookFill />}
            delay={0.9}
          />
          
          <p style={{...styles.cardDescription, marginBottom: '24px'}}>{t.manualsDescription}</p>
          
          <div style={{
            display: 'flex',
            flexDirection: 'row',
            gap: '16px',
            flexWrap: 'wrap',
            justifyContent: 'center',
            marginBottom: '24px'
          }}>
            <motion.button
              style={{
                padding: '12px 24px',
                borderRadius: '50px',
                background: activeManual === 'effects' ? gradients.purpleButton : 'rgba(255, 255, 255, 0.1)',
                border: `1px solid ${colors.borders.medium}`,
                color: 'white',
                fontWeight: 500,
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                boxShadow: activeManual === 'effects' ? '0 5px 15px rgba(0, 0, 0, 0.3)' : '0 3px 8px rgba(0, 0, 0, 0.2)',
              }}
              whileHover={motionVariants.buttonHover}
              whileTap={motionVariants.buttonTap}
              onClick={() => setActiveManual(activeManual === 'effects' ? null : 'effects')}
            >
              <BsBookFill size={16} />
              {t.manualEffectsButton}
              {activeManual === 'effects' ? <BsChevronUp size={14} /> : <BsChevronDown size={14} />}
            </motion.button>
            
            <motion.button
              style={{
                padding: '12px 24px',
                borderRadius: '50px',
                background: activeManual === 'protection' ? gradients.purpleButton : 'rgba(255, 255, 255, 0.1)',
                border: `1px solid ${colors.borders.medium}`,
                color: 'white',
                fontWeight: 500,
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                boxShadow: activeManual === 'protection' ? '0 5px 15px rgba(0, 0, 0, 0.3)' : '0 3px 8px rgba(0, 0, 0, 0.2)',
              }}
              whileHover={motionVariants.buttonHover}
              whileTap={motionVariants.buttonTap}
              onClick={() => setActiveManual(activeManual === 'protection' ? null : 'protection')}
            >
              <BsShieldFill size={16} />
              {t.manualProtectionButton}
              {activeManual === 'protection' ? <BsChevronUp size={14} /> : <BsChevronDown size={14} />}
            </motion.button>
          </div>
          
          <MantraEffectsManualWithSuspense 
            content={{
              title: t.amplifyTitle,
              description: t.amplifyDescription,
              content: t.amplifyContent
            }}
            visible={activeManual === 'effects'}
          />
          
          <EnergyProtectionManualWithSuspense 
            content={{
              title: t.protectionTitle,
              description: t.protectionDescription,
              content: t.protectionContent
            }}
            visible={activeManual === 'protection'}
          />
        </motion.section>

        <div style={styles.divider} />

        {/* Seção Proteção Energética com Elementos Naturais */}
        <motion.section
          style={{
            ...styles.section,
            position: 'relative',
            paddingTop: '20px',
          }}
          {...motionVariants.fadeInUp}
          transition={{ duration: 0.5, delay: 1.1 }}
        >
          <SectionTitle 
            title={t.elementsTitle}
            icon={<BsShieldFill />}
            delay={1.1}
          />
          
          <p style={{
            ...styles.cardDescription, 
            marginBottom: '30px',
            fontSize: '1.05rem',
            maxWidth: '800px',
            margin: '0 auto 40px',
            textAlign: 'center',
            lineHeight: 1.6,
            color: 'rgba(255, 255, 255, 0.9)'
          }}>{t.elementsDescription}</p>
          
          <div style={{
            maxWidth: '800px',
            margin: '0 auto 20px',
            padding: '15px 20px',
            background: 'rgba(123, 31, 162, 0.15)',
            borderRadius: '10px',
            border: '1px solid rgba(212, 175, 55, 0.2)',
            textAlign: 'center',
            fontSize: '0.95rem',
            color: 'rgba(255, 255, 255, 0.85)',
            lineHeight: 1.6,
          }}>
            <span style={{color: '#FFD700', fontWeight: 'bold'}}>{t.tip}</span> {t.tipText}
          </div>
          
          <div style={styles.elementGrid}>
            <motion.div 
              style={{
                ...styles.elementCard,
                background: 'linear-gradient(145deg, rgba(21, 0, 34, 0.7), rgba(40, 20, 0, 0.7))'
              }}
              whileHover={{ 
                y: -10, 
                boxShadow: '0 15px 30px rgba(0, 0, 0, 0.3)', 
                border: '1px solid rgba(212, 175, 55, 0.3)' 
              }}
              {...motionVariants.scaleIn}
              transition={{ duration: 0.4, delay: 1.2 }}
            >
              <div style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                background: 'radial-gradient(circle at bottom right, rgba(139, 69, 19, 0.1), transparent 70%)',
                zIndex: 1
              }} />
              <motion.div 
                style={{
                  position: 'absolute',
                  top: '15px',
                  right: '15px',
                  width: '15px',
                  height: '15px',
                  borderRadius: '50%',
                  background: 'rgba(139, 69, 19, 0.3)',
                  zIndex: 1
                }}
                animate={{
                  opacity: [0.3, 0.6, 0.3],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
              <div style={styles.elementIcon}>
                <FaMountain />
              </div>
              <h3 style={styles.elementTitle}>{t.earthElement.title}</h3>
              <p style={styles.elementDescription}>{t.earthElement.description}</p>
            </motion.div>
            
            <motion.div 
              style={{
                ...styles.elementCard,
                background: 'linear-gradient(145deg, rgba(21, 0, 34, 0.7), rgba(0, 30, 60, 0.7))'
              }}
              whileHover={{ 
                y: -10, 
                boxShadow: '0 15px 30px rgba(0, 0, 0, 0.3)', 
                border: '1px solid rgba(212, 175, 55, 0.3)' 
              }}
              {...motionVariants.scaleIn}
              transition={{ duration: 0.4, delay: 1.3 }}
            >
              <div style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                background: 'radial-gradient(circle at bottom left, rgba(0, 119, 190, 0.1), transparent 70%)',
                zIndex: 1
              }} />
              <motion.div 
                style={{
                  position: 'absolute',
                  top: '15px',
                  left: '15px',
                  width: '15px',
                  height: '15px',
                  borderRadius: '50%',
                  background: 'rgba(0, 119, 190, 0.3)',
                  zIndex: 1
                }}
                animate={{
                  opacity: [0.3, 0.6, 0.3],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
              <div style={styles.elementIcon}>
                <FaWater />
              </div>
              <h3 style={styles.elementTitle}>{t.waterElement.title}</h3>
              <p style={styles.elementDescription}>{t.waterElement.description}</p>
            </motion.div>
            
            <motion.div 
              style={{
                ...styles.elementCard,
                background: 'linear-gradient(145deg, rgba(21, 0, 34, 0.7), rgba(60, 0, 0, 0.7))'
              }}
              whileHover={{ 
                y: -10, 
                boxShadow: '0 15px 30px rgba(0, 0, 0, 0.3)', 
                border: '1px solid rgba(212, 175, 55, 0.3)' 
              }}
              {...motionVariants.scaleIn}
              transition={{ duration: 0.4, delay: 1.4 }}
            >
              <div style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                background: 'radial-gradient(circle at top right, rgba(255, 69, 0, 0.1), transparent 70%)',
                zIndex: 1
              }} />
              <motion.div 
                style={{
                  position: 'absolute',
                  bottom: '15px',
                  right: '15px',
                  width: '15px',
                  height: '15px',
                  borderRadius: '50%',
                  background: 'rgba(255, 69, 0, 0.3)',
                  zIndex: 1
                }}
                animate={{
                  opacity: [0.3, 0.7, 0.3],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
              <div style={styles.elementIcon}>
                <FaFire />
              </div>
              <h3 style={styles.elementTitle}>{t.fireElement.title}</h3>
              <p style={styles.elementDescription}>{t.fireElement.description}</p>
            </motion.div>
            
            <motion.div 
              style={{
                ...styles.elementCard,
                background: 'linear-gradient(145deg, rgba(21, 0, 34, 0.7), rgba(0, 40, 0, 0.7))'
              }}
              whileHover={{ 
                y: -10, 
                boxShadow: '0 15px 30px rgba(0, 0, 0, 0.3)', 
                border: '1px solid rgba(212, 175, 55, 0.3)' 
              }}
              {...motionVariants.scaleIn}
              transition={{ duration: 0.4, delay: 1.5 }}
            >
              <div style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                background: 'radial-gradient(circle at top left, rgba(76, 187, 23, 0.1), transparent 70%)',
                zIndex: 1
              }} />
              <motion.div 
                style={{
                  position: 'absolute',
                  bottom: '15px',
                  left: '15px',
                  width: '15px',
                  height: '15px',
                  borderRadius: '50%',
                  background: 'rgba(76, 187, 23, 0.3)',
                  zIndex: 1
                }}
                animate={{
                  opacity: [0.3, 0.6, 0.3],
                }}
                transition={{
                  duration: 3.5,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
              <div style={styles.elementIcon}>
                <FaLeaf />
              </div>
              <h3 style={styles.elementTitle}>{t.airElement.title}</h3>
              <p style={styles.elementDescription}>{t.airElement.description}</p>
            </motion.div>
          </div>
        </motion.section>
      </motion.div>

      <FooterWithSuspense />
    </main>
  );
}