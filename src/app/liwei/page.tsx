'use client';

import { useState, useEffect, CSSProperties } from 'react';
import { motion } from 'framer-motion';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import MeditationPlayer from '../../components/MeditationPlayer';
import { getCurrentLocale, Locale } from '../../lib/locale';
import { BsFillVolumeUpFill, BsBookFill, BsShieldFill, BsChevronDown, BsChevronUp, BsPlayCircleFill } from 'react-icons/bs';
import { FaLeaf, FaMountain, FaWater, FaFire } from 'react-icons/fa';
import { colors, gradients, commonStyles, motionVariants } from '../../styles/shared';
import { adaptMantraFormat, getTranslatedContent } from '../../lib/utils';
import SectionTitle from '../../components/SectionTitle';
import Card from '../../components/Card';
import MantraEffectsManual from '../../components/MantraEffectsManual';
import EnergyProtectionManual from '../../components/EnergyProtectionManual';

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
    gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))',
    gap: '20px',
    width: '100%',
    marginTop: '20px',
  },
  elementCard: {
    textAlign: 'center',
    padding: '16px',
    background: colors.backgrounds.glassLight,
    borderRadius: '12px',
    border: `1px solid ${colors.borders.light}`,
  },
  elementIcon: {
    fontSize: '2rem',
    marginBottom: '12px',
    ...gradients.goldText,
  },
  elementTitle: {
    fontSize: '1rem',
    fontWeight: 600,
    marginBottom: '8px',
    color: 'white',
  },
  elementDescription: {
    fontSize: '0.85rem',
    color: colors.text.muted,
  }
};

// Definição dos mantras do Monge Li Wei
const mantras = {
  pt: [
    {
      id: "liwei-1",
      title: "Mantra da Serenidade Interior",
      youtubeId: "jwnEoC7xQNE",
      description: "Este mantra ancestral ajuda a acalmar a mente agitada e fortalecer o espírito. Ideal para momentos de ansiedade ou quando precisar reconectar-se com seu equilíbrio interior.",
      text: "Om Shanti Shanti Shanti",
      color: colors.purple.light,
      objective: "Paz Interior"
    },
    {
      id: "liwei-2",
      title: "Mantra da Sabedoria do Tempo",
      youtubeId: "iG_lNuNUVd4", 
      description: "Transmitido pelo Monge Li Wei para remover bloqueios mentais e abrir os canais de percepção elevada. Recomendado para períodos de estudo ou quando buscar clareza mental.",
      text: "Om Mani Padme Hum",
      color: colors.purple.lighter,
      objective: "Clareza Mental"
    },
    {
      id: "liwei-3",
      title: "Mantra da Força Vital",
      youtubeId: "YQrs9zlOW1U",
      description: "Este poderoso mantra ativa os centros energéticos do corpo, aumentando a vitalidade e fortalecendo o campo energético contra energias negativas.",
      text: "Ra Ma Da Sa Sa Say So Hung",
      color: colors.gold.main,
      objective: "Energia Vital"
    }
  ],
  es: [
    {
      id: "liwei-1",
      title: "Mantra de la Serenidad Interior",
      youtubeId: "jwnEoC7xQNE",
      description: "Este mantra ancestral ayuda a calmar la mente agitada y fortalecer el espíritu. Ideal para momentos de ansiedad o cuando necesites reconectarte con tu equilibrio interior.",
      text: "Om Shanti Shanti Shanti",
      color: colors.purple.light,
      objective: "Paz Interior"
    },
    {
      id: "liwei-2",
      title: "Mantra de la Sabiduría del Tiempo",
      youtubeId: "iG_lNuNUVd4",
      description: "Transmitido por el Monje Li Wei para eliminar bloqueos mentales y abrir los canales de percepción elevada. Recomendado para períodos de estudio o cuando busques claridad mental.",
      text: "Om Mani Padme Hum",
      color: colors.purple.lighter,
      objective: "Claridad Mental"
    },
    {
      id: "liwei-3",
      title: "Mantra de la Fuerza Vital",
      youtubeId: "YQrs9zlOW1U",
      description: "Este poderoso mantra activa los centros energéticos del cuerpo, aumentando la vitalidad y fortaleciendo el campo energético contra energías negativas.",
      text: "Ra Ma Da Sa Sa Say So Hung",
      color: colors.gold.main,
      objective: "Fuerza Vital"
    }
  ]
};

// Áudio bônus para meditação
const bonusAudio = {
  pt: {
    id: "liwei-bonus",
    title: "Meditação Guiada do Monge Li Wei",
    youtubeId: "tEmt1Znux58",
    description: "Uma meditação exclusiva guiada com base nos ensinamentos do Monge Li Wei para relaxamento profundo e expansão da consciência.",
    objective: "Relaxamento Profundo",
    color: colors.purple.light
  },
  es: {
    id: "liwei-bonus",
    title: "Meditación Guiada del Monje Li Wei",
    youtubeId: "tEmt1Znux58",
    description: "Una meditación exclusiva guiada basada en las enseñanzas del Monje Li Wei para relajación profunda y expansión de la conciencia.",
    objective: "Relajación Profunda",
    color: colors.purple.light
  }
};

// Chave para armazenar acesso aos mantras do Li Wei no localStorage
const LIWEI_VISITED_KEY = 'portalEspiritual_liweiVisited';

export default function LiWeiPage() {
  const [locale, setLocale] = useState<Locale>('pt');
  const [mounted, setMounted] = useState(false);
  const [activeMantra, setActiveMantra] = useState<number | null>(null);
  const [activeManual, setActiveManual] = useState<'effects' | 'protection' | null>(null);

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

  if (!mounted) return null;

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
        }
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
              description: "Explora ejercicios de Qi Gong, como el Círculo de Energía o la Danza de las Nubes, para promover la circulación energética y la conexión con tu centro."
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
    }
  };

  const t = getTranslatedContent(translations, locale);
  const currentMantras = mantras[locale];
  const currentBonusAudio = bonusAudio[locale];

  // Adapta os mantras para o formato exato que o MeditationPlayer espera
  const adaptedMantras = currentMantras.map(adaptMantraFormat);

  // Adapta o áudio bônus para o formato esperado
  const adaptedBonusAudio = adaptMantraFormat(currentBonusAudio);

  const handleMantraSelect = (index: number) => {
    setActiveMantra(index === activeMantra ? null : index);
  };

  const renderMantraText = (text: string) => (
    <p style={{
      fontWeight: '600', 
      marginTop: '10px', 
      ...gradients.goldText
    }}>
      {text}
    </p>
  );

  const renderMantraPlayer = (index: number) => (
    <motion.div 
      style={styles.playerContainer}
      initial={{ opacity: 0, height: 0 }}
      animate={{ opacity: 1, height: 'auto' }}
      transition={{ duration: 0.3 }}
      onClick={(e) => e.stopPropagation()}
    >
      <MeditationPlayer 
        mantras={[adaptedMantras[index]]} 
        locale={locale} 
      />
    </motion.div>
  );

  return (
    <main style={styles.container}>
      <Navbar />

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
              {locale === 'pt' ? 'Clique nos mantras para reproduzir o áudio' : 'Haga clic en los mantras para reproducir el audio'}
            </p>
          </div>
          
          {currentMantras.map((mantra, index) => (
            <Card
              key={mantra.id}
              title={mantra.title}
              description={mantra.description}
              active={activeMantra === index}
              onClick={() => handleMantraSelect(index)}
              delay={0.5 + (index * 0.1)}
              extraStyles={{
                cursor: 'pointer', 
                position: 'relative',
                transition: 'all 0.3s ease',
                transform: activeMantra === index ? 'scale(1.02)' : 'scale(1)',
                border: activeMantra === index 
                  ? `1px solid ${colors.gold.main}` 
                  : `1px solid ${colors.borders.light}`,
                boxShadow: activeMantra === index 
                  ? `0 5px 15px rgba(212, 175, 55, 0.2)` 
                  : 'none'
              }}
            >
              {renderMantraText(mantra.text)}
              
              {/* Botão de reprodução */}
              <div style={{
                display: 'flex',
                justifyContent: 'center',
                marginTop: '16px'
              }}>
                <motion.button
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    padding: '8px 16px',
                    background: activeMantra === index ? colors.gold.main : 'rgba(255, 255, 255, 0.1)',
                    border: 'none',
                    borderRadius: '50px',
                    color: activeMantra === index ? '#333' : 'white',
                    fontSize: '0.9rem',
                    fontWeight: 500,
                    cursor: 'pointer'
                  }}
                  whileHover={{ 
                    scale: 1.05,
                    background: colors.gold.main,
                    color: '#333'
                  }}
                  whileTap={{ scale: 0.95 }}
                  onClick={(e) => {
                    e.stopPropagation();
                    handleMantraSelect(index);
                  }}
                >
                  <BsPlayCircleFill size={16} />
                  {activeMantra === index 
                    ? (locale === 'pt' ? 'Pausar' : 'Pausar') 
                    : (locale === 'pt' ? 'Reproduzir' : 'Reproducir')}
                </motion.button>
              </div>
              
              {activeMantra === index && renderMantraPlayer(index)}
            </Card>
          ))}
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
              <MeditationPlayer 
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
          
          <MantraEffectsManual 
            content={{
              title: t.amplifyTitle,
              description: t.amplifyDescription,
              content: t.amplifyContent
            }}
            visible={activeManual === 'effects'}
          />
          
          <EnergyProtectionManual 
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
          style={styles.section}
          {...motionVariants.fadeInUp}
          transition={{ duration: 0.5, delay: 1.1 }}
        >
          <SectionTitle 
            title={t.elementsTitle}
            icon={<BsShieldFill />}
            delay={1.1}
          />
          
          <p style={{...styles.cardDescription, marginBottom: '20px'}}>{t.elementsDescription}</p>
          
          <div style={styles.elementGrid}>
            <motion.div 
              style={styles.elementCard}
              {...motionVariants.scaleIn}
              transition={{ duration: 0.4, delay: 1.2 }}
            >
              <div style={styles.elementIcon}>
                <FaMountain />
              </div>
              <h3 style={styles.elementTitle}>{t.earthElement.title}</h3>
              <p style={styles.elementDescription}>{t.earthElement.description}</p>
            </motion.div>
            
            <motion.div 
              style={styles.elementCard}
              {...motionVariants.scaleIn}
              transition={{ duration: 0.4, delay: 1.3 }}
            >
              <div style={styles.elementIcon}>
                <FaWater />
              </div>
              <h3 style={styles.elementTitle}>{t.waterElement.title}</h3>
              <p style={styles.elementDescription}>{t.waterElement.description}</p>
            </motion.div>
            
            <motion.div 
              style={styles.elementCard}
              {...motionVariants.scaleIn}
              transition={{ duration: 0.4, delay: 1.4 }}
            >
              <div style={styles.elementIcon}>
                <FaFire />
              </div>
              <h3 style={styles.elementTitle}>{t.fireElement.title}</h3>
              <p style={styles.elementDescription}>{t.fireElement.description}</p>
            </motion.div>
            
            <motion.div 
              style={styles.elementCard}
              {...motionVariants.scaleIn}
              transition={{ duration: 0.4, delay: 1.5 }}
            >
              <div style={styles.elementIcon}>
                <FaLeaf />
              </div>
              <h3 style={styles.elementTitle}>{t.airElement.title}</h3>
              <p style={styles.elementDescription}>{t.airElement.description}</p>
            </motion.div>
          </div>
        </motion.section>
      </motion.div>

      <Footer />
    </main>
  );
} 