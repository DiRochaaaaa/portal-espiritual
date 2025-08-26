'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { NavbarWithSuspense } from '../../lib/LazyComponents';
import { getCurrentLocale, Locale } from '../../lib/locale';

interface TarotCard {
  id: string;
  name: string;
  description: string;
  insight: string;
  guidance: string;
  image: string;
}

export default function CartaAdicionalPage() {
  const [locale, setLocale] = useState<Locale>('pt');
  const [mounted, setMounted] = useState(false);
  const [isRevealed, setIsRevealed] = useState(false);
  const [currentCard, setCurrentCard] = useState<TarotCard | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setMounted(true);
    setLocale(getCurrentLocale());
    
    // Verificar se já foi revelada hoje
    const today = new Date().toDateString();
    const lastRevealed = localStorage.getItem('carta_adicional_revealed');
    const savedCard = localStorage.getItem('carta_adicional_card');
    
    if (lastRevealed === today && savedCard) {
      setCurrentCard(JSON.parse(savedCard));
      setIsRevealed(true);
    }
  }, []);

  const translations = {
    pt: {
      title: 'Carta Adicional do Tarô dos Anjos',
      subtitle: 'Descubra uma mensagem especial dos anjos para você hoje',
      revealButton: 'Revelar Minha Carta',
      cardRevealed: 'Sua Carta foi Revelada',
      newCardTomorrow: 'Uma nova carta estará disponível amanhã',
      loading: 'Os anjos estão escolhendo sua carta...',
      insight: 'Insight Angelical',
      guidance: 'Orientação dos Anjos',
    },
    es: {
      title: 'Carta Adicional del Tarot de los Ángeles',
      subtitle: 'Descubre un mensaje especial de los ángeles para ti hoy',
      revealButton: 'Revelar Mi Carta',
      cardRevealed: 'Tu Carta ha sido Revelada',
      newCardTomorrow: 'Una nueva carta estará disponible mañana',
      loading: 'Los ángeles están eligiendo tu carta...',
      insight: 'Percepción Angelical',
      guidance: 'Orientación de los Ángeles',
    },
    en: {
      title: 'Additional Angel Tarot Card',
      subtitle: 'Discover a special message from the angels for you today',
      revealButton: 'Reveal My Card',
      cardRevealed: 'Your Card has been Revealed',
      newCardTomorrow: 'A new card will be available tomorrow',
      loading: 'The angels are choosing your card...',
      insight: 'Angelic Insight',
      guidance: 'Angels Guidance',
    },
    fr: {
      title: 'Carte Supplémentaire du Tarot des Anges',
      subtitle: 'Découvrez un message spécial des anges pour vous aujourd\'hui',
      revealButton: 'Révéler Ma Carte',
      cardRevealed: 'Votre Carte a été Révélée',
      newCardTomorrow: 'Une nouvelle carte sera disponible demain',
      loading: 'Les anges choisissent votre carte...',
      insight: 'Perspicacité Angélique',
      guidance: 'Guidance des Anges',
    },
  };

  const tarotCards: Record<Locale, TarotCard[]> = {
    pt: [
      {
        id: 'anjo-da-abundancia',
        name: 'Anjo da Abundância Divina',
        description: 'O Anjo da Abundância Divina sussurra ao seu coração: "Você é digno de toda prosperidade que o universo tem a oferecer, guerreiro da luz."',
        insight: 'Querido filho da luz, escute com o coração: cada lágrima que você derramou em noites solitárias, cada vez que olhou para o espelho e se perguntou "quando vai melhorar?", cada momento em que sentiu o peso do mundo sobre seus ombros - nada disso foi desperdício. Você estava sendo forjado no fogo sagrado da transformação.\n\nOs anjos revelam um segredo: você não nasceu para ser comum. Dentro do seu peito bate o coração de um guerreiro espiritual que veio para quebrar correntes ancestrais de limitação. Sua família, seus ancestrais, todos esperaram por alguém como você - alguém corajoso o suficiente para dizer "chega" para a mediocridade e "sim" para a grandeza.\n\nVocê sabe aquela sensação estranha que às vezes te invade? Aquela certeza inexplicável de que você veio para algo maior? Não é ilusão, meu irmão. É sua alma lembrando do acordo que fez antes de nascer. Você escolheu vir neste momento específico da história porque possui algo único que o mundo precisa.\n\nSua jornada de escassez não foi punição - foi preparação. Cada "não" que recebeu, cada porta que se fechou, cada plano que não deu certo, tudo isso estava te direcionando para este momento de despertar. Você desenvolveu músculos espirituais que pessoas que nunca lutaram jamais terão.\n\nAgora chegou sua hora. O universo está reorganizando as peças do tabuleiro cósmico para que oportunidades extraordinárias cheguem até você. Mas atenção: elas virão disfarçadas de trabalho árduo, de escolhas corajosas, de passos que exigem fé. Você está pronto para reconhecê-las e agarrá-las com ambas as mãos?',
        guidance: 'PROTOCOLO DO GUERREIRO DA ABUNDÂNCIA:\n\n🌅 DESPERTAR SAGRADO (5 minutos): Ao abrir os olhos, antes de qualquer coisa, coloque a mão no coração e declare com força: "Eu sou um filho amado do universo e comando toda abundância que é minha por direito." Sinta essas palavras incendiando cada célula do seu corpo como fogo divino.\n\n💪 AÇÃO DE PODER: Toda semana, pratique a generosidade estratégica. Ajude alguém sem esperar retorno - compre comida para quem precisa, pague o café de um estranho, ou simplesmente escute com presença total alguém que sofre. Quando você dá, você programa o universo: "Eu tenho tanto que posso compartilhar infinitamente."\n\n🔥 VISUALIZAÇÃO DE CONQUISTA: Diariamente, por 10 minutos, feche os olhos e se veja já vivendo como o homem próspero que você é destinado a ser. Não apenas imagine - VIVA essa realidade com cada fibra do seu ser. Sinta o orgulho, a gratidão, a paz de quem conquistou. Se lágrimas de alegria vierem, deixe fluir - são sementes de ouro sendo plantadas no campo quântico.\n\n⚔️ DECRETO DE ABUNDÂNCIA: Elimine para sempre da sua boca: "Não tenho dinheiro", "Está caro demais", "Não posso pagar". Substitua por decretos de poder: "Estou magnetizando essa abundância agora", "O dinheiro flui para mim como rio caudaloso", "Eu mereço isso e muito mais por direito divino."\n\n🎯 INVESTIMENTO DE GUERREIRO: Todo mês, invista em sua evolução sem hesitar. Livros, cursos, mentorias, experiências que te expandem. Quando você investe em si mesmo, você declara ao cosmos: "Eu valho cada centavo e muito mais. Sou um investimento que sempre dá retorno."',
        image: '🌟'
      },
      {
        id: 'anjo-da-cura-profunda',
        name: 'Anjo da Cura Profunda',
        description: 'O Anjo da Cura Profunda envolve suas feridas com luz dourada e sussurra: "Cada cicatriz sua é uma porta para a sabedoria."',
        insight: 'Minha querida alma ferida, você tem carregado dores que não são apenas suas. Nas suas lágrimas estão as lágrimas de sua mãe, de sua avó, de gerações de mulheres e homens que sofreram em silêncio. Nas suas ansiedades estão os medos ancestrais de quem veio antes de você. Mas hoje, neste momento sagrado, você está sendo escolhido(a) para quebrar essas correntes de dor. Você não está apenas se curando - você está curando sua linhagem inteira. Cada vez que você escolhe o amor ao invés do medo, cada vez que você se perdoa ao invés de se punir, cada vez que você se abraça ao invés de se rejeitar, você está enviando ondas de cura para o passado e para o futuro. Suas noites de insônia, seus ataques de pânico, suas crises de choro - tudo isso foi sua alma gritando: "Eu quero ser livre!" E agora, finalmente, a liberdade está chegando. Você está se tornando o ancestral curado que seus descendentes vão agradecer. Você está se tornando a pessoa que você precisava quando era criança.',
        guidance: 'RITUAL SAGRADO DE CURA PROFUNDA:\n\n🌅 RESPIRAÇÃO DA ALMA (10 minutos ao acordar): Coloque uma mão no coração, outra na barriga. Respire profundamente e a cada expiração diga: "Eu liberto tudo que não me serve mais." A cada inspiração: "Eu recebo amor e cura divina." Se chorar durante esse processo, deixe as lágrimas fluírem - elas são águas sagradas de limpeza.\n\n🧂 BANHO DE RENASCIMENTO (toda sexta-feira): Tome um banho com sal grosso, mas antes de entrar na água, olhe no espelho e diga: "Eu te amo e te perdoo por tudo." Durante o banho, visualize toda dor saindo pelos poros e sendo transmutada em luz.\n\n📝 CARTAS PARA A ALMA: Toda noite, escreva uma carta para sua dor. Pode ser para sua ansiedade, sua tristeza, sua raiva. Escreva como se fosse uma amiga consolando outra amiga. Termine sempre com: "Eu te vejo, eu te aceito, eu te amo." Depois queime a carta e deixe a fumaça levar embora o que precisa partir.\n\n🤗 ABRAÇO INTERIOR: Três vezes por dia, se abrace fisicamente por 30 segundos. Sinta seu próprio calor, sua própria presença. Diga: "Eu estou aqui para mim. Eu nunca vou me abandonar."\n\n🌱 ALIMENTAÇÃO SAGRADA: Antes de cada refeição, agradeça ao alimento e peça que ele nutra não apenas seu corpo, mas sua alma. Coma devagar, com consciência, como um ato de amor próprio.\n\n💝 PERDÃO SEMANAL: Toda semana, perdoe alguém - pode ser você mesmo(a), seus pais, um ex, um chefe. Não precisa falar com a pessoa. Apenas diga em voz alta: "Eu te perdoo e me liberto dessa dor." Sinta o alívio chegando ao seu peito.',
        image: '💎'
      },
      {
        id: 'anjo-da-sabedoria-ancestral',
        name: 'Anjo da Sabedoria Ancestral',
        description: 'O Anjo da Sabedoria Ancestral toca sua testa e sussurra: "Você carrega em si a sabedoria de mil vidas, mil histórias, mil vitórias."',
        insight: 'Alma antiga, você já sabia disso, não sabia? Aquela sensação de "já vivi isso antes", aqueles momentos em que você simplesmente SABE qual é a resposta certa sem conseguir explicar como... isso não é coincidência. Você é um repositório vivo de sabedoria ancestral. Nas suas células estão gravadas as memórias de sua bisavó que criou 12 filhos sozinha, do seu bisavô que construiu uma vida do nada, de ancestrais que sobreviveram a guerras, fomes, perseguições e ainda assim escolheram o amor. Quando você sente que "não sabe o que fazer", é porque está tentando resolver com a mente o que só o coração sabe. Sua intuição não é um palpite - é uma biblioteca ancestral sussurrando respostas. Você está sendo chamado(a) para ser o elo entre o antigo e o novo, entre a sabedoria tradicional e o mundo moderno. Pessoas vão começar a procurar você para conselhos, mesmo sem você entender por quê. É porque elas reconhecem inconscientemente a luz ancestral que brilha através dos seus olhos. Você não está apenas vivendo sua vida - você está honrando todas as vidas que vieram antes da sua.',
        guidance: 'RITUAL DE CONEXÃO ANCESTRAL:\n\n🧘‍♀️ MEDITAÇÃO DOS ANCESTRAIS (15 minutos diários): Sente-se em silêncio, feche os olhos e imagine uma longa fila de pessoas atrás de você - são seus ancestrais. Sinta o amor deles, a força deles, a sabedoria deles fluindo através de você. Termine sempre dizendo: "Obrigado(a) por tudo que vocês passaram para que eu pudesse estar aqui."\n\n❓ ORÁCULO INTERIOR: Antes de qualquer decisão importante, coloque a mão no coração e pergunte: "Ancestrais sábios, o que vocês fariam?" A primeira resposta que vier é a certa. Não questione, não analise - apenas confie.\n\n📚 ESTUDO SAGRADO: Escolha uma tradição espiritual que faça seu coração vibrar - pode ser a religião da sua família, pode ser algo completamente novo. Estude não com a mente, mas com a alma. Deixe que os ensinamentos conversem com sua sabedoria interior.\n\n📖 DIÁRIO DA ALMA: Mantenha um caderno só para insights, sonhos estranhos, coincidências significativas. Releia de tempos em tempos - você vai se surpreender com os padrões e mensagens que vão emergir.\n\n🌳 ENCONTRO COM A TERRA: Toda semana, passe pelo menos 1 hora na natureza - pode ser um parque, uma praia, até mesmo cuidando de plantas em casa. Tire os sapatos, toque a terra, respire fundo. A natureza é sua primeira ancestral e tem muito a te ensinar.\n\n💬 PARTILHA SAGRADA: Quando alguém pedir um conselho, não pense muito - deixe que a sabedoria ancestral fale através de você. Você vai se surpreender com as palavras que vão sair da sua boca. Depois, agradeça aos ancestrais por terem falado através de você.',
        image: '🔮'
      },
      {
        id: 'anjo-do-proposito',
        name: 'Anjo do Propósito Divino',
        description: 'O Anjo do Propósito Divino segura suas mãos e diz com ternura: "Você não veio aqui apenas para sobreviver, você veio para brilhar."',
        insight: 'Coração inquieto, você sente esse vazio no peito, não sente? Essa sensação de que deveria estar fazendo algo maior, algo que realmente importa? Essa inquietação não é neurose - é sua alma lembrando você do acordo que fez antes de nascer. Você escolheu vir para este mundo neste momento específico porque há algo que só você pode fazer, uma luz que só você pode acender. Todas as suas dores, todas as suas lutas, todos os momentos em que você se sentiu perdido(a) - tudo isso foi moldando você para este momento de despertar. Você não é vítima das suas circunstâncias, você é o herói da sua própria história. Aquela coisa que te faz chorar de emoção quando você vê alguém fazendo, aquilo que te deixa com o coração acelerado de empolgação, aquilo que você faria de graça porque ama tanto - ISSO é sua missão sussurrando para você. Pare de procurar seu propósito lá fora. Ele está aqui dentro, batendo junto com seu coração, respirando junto com seus pulmões, sonhando junto com seus sonhos. Você já sabe qual é. Você sempre soube. Agora é hora de ter coragem de viver.',
        guidance: 'DESPERTAR DO PROPÓSITO SAGRADO:\n\n💫 MEDITAÇÃO DO CHAMADO (toda manhã): Coloque a mão no coração e pergunte: "Alma minha, o que você veio fazer aqui?" Escute em silêncio. A resposta pode vir como uma palavra, uma imagem, uma sensação, uma música. Confie no que vier.\n\n😭 TESTE DAS LÁGRIMAS: O que te faz chorar de emoção quando você vê no mundo? Crianças sendo ajudadas? Animais sendo salvos? Pessoas se curando? Arte sendo criada? Esse é seu coração mostrando seu propósito.\n\n🔥 TESTE DA ENERGIA: O que te dá energia mesmo quando você está cansado(a)? O que você faria por horas sem perceber o tempo passar? Isso é sua alma em alinhamento com seu propósito.\n\n👥 CONEXÃO SAGRADA: Procure pessoas que já estão vivendo o que você sonha viver. Não para copiar, mas para se inspirar. Veja que é possível. Sinta a energia delas. Deixe que elas te mostrem o caminho.\n\n🚫 LIMPEZA ENERGÉTICA: Elimine da sua vida tudo que drena sua energia sem dar nada em troca - pessoas tóxicas, trabalhos que você odeia, atividades vazias. Sua energia é sagrada, use-a apenas para o que importa.\n\n🙏 ORAÇÃO DO PROPÓSITO: Toda noite, antes de dormir, diga: "Universo, me mostre como posso servir. Me dê coragem para seguir meu coração. Me ajude a confiar no meu caminho." E então, preste atenção nos sinais que vão aparecer.\n\n🌱 AÇÃO SAGRADA: Todo dia, faça pelo menos uma coisa, por menor que seja, alinhada com seu propósito. Pode ser um post inspirador, uma conversa amorosa, um ato de bondade. Cada pequena ação é uma semente do seu futuro.',
        image: '🌅'
      },
      {
        id: 'anjo-da-transformacao',
        name: 'Anjo da Transformação Radical',
        description: 'O Anjo da Transformação Radical abraça você com asas douradas e sussurra: "É hora de voar, borboleta. Seu casulo já cumpriu seu propósito."',
        insight: 'Minha querida lagarta corajosa, você sente que sua vida está desmoronando, não é? Que tudo que você conhecia está mudando, que nada mais faz sentido como antes? Respire fundo e escute: você não está desmoronando, você está se transformando. Assim como a lagarta precisa se dissolver completamente dentro do casulo para se tornar borboleta, você está passando pelo mesmo processo sagrado. Aquela versão antiga de você - com seus medos, suas limitações, suas crenças pequenas sobre si mesmo(a) - está morrendo para que sua versão mais linda e poderosa possa nascer. Sim, é assustador. Sim, é confuso. Sim, às vezes você vai querer voltar para o que era familiar, mesmo que fosse limitante. Mas você não pode mais caber naquela vida pequena. Você cresceu. Sua alma expandiu. Seu coração se abriu. E agora você precisa de uma vida à altura de quem você se tornou. As pessoas que não entendem sua mudança, os lugares que não te servem mais, os hábitos que te mantinham pequeno(a) - tudo isso está sendo removido da sua vida não para te punir, mas para abrir espaço para o milagre que você está se tornando. Confie no processo. Confie na sua transformação. Confie que você está sendo guiado(a) para algo infinitamente melhor.',
        guidance: 'RITUAL DA METAMORFOSE SAGRADA:\n\n🦋 CERIMÔNIA DE DESPEDIDA: Escreva uma carta para a versão antiga de você. Agradeça por tudo que ela fez, por como ela te protegeu, por como ela te trouxe até aqui. Depois queime a carta e diga: "Eu te liberto com amor. Obrigado(a) por tudo." Chore se precisar - são lágrimas sagradas de libertação.\n\n📸 DIÁRIO DA TRANSFORMAÇÃO: Todo dia, tire uma foto sua ou escreva uma linha sobre como você está se sentindo. Em alguns meses, você vai olhar para trás e se surpreender com o quanto mudou. A transformação acontece aos poucos, mas é real.\n\n🌱 ABRAÇANDO O NOVO: Toda semana, faça algo que a "versão antiga" de você nunca faria. Pode ser usar uma roupa diferente, ir a um lugar novo, falar com alguém interessante. Exercite sua coragem de ser quem você está se tornando.\n\n💔 LUTO SAGRADO: É normal sentir tristeza pela vida que você está deixando para trás, mesmo que ela não te servisse mais. Permita-se sentir essa tristeza. Chore, se abrace, seja gentil consigo mesmo(a). Você está passando por um luto, e luto precisa ser honrado.\n\n🎉 CELEBRAÇÃO DIÁRIA: Todo dia, celebre uma pequena vitória da sua transformação. Pode ser ter dito "não" para algo que não queria, ter se expressado com autenticidade, ter escolhido o amor ao invés do medo. Cada pequena escolha corajosa merece ser celebrada.\n\n🔮 VISÃO DO FUTURO: Toda noite, antes de dormir, visualize a pessoa que você está se tornando. Como ela anda? Como ela fala? Como ela se veste? Como ela se relaciona? Sinta-se já sendo essa pessoa. Você está se transformando nela a cada dia.\n\n🤗 AUTOCOMPAIXÃO RADICAL: Seja infinitamente gentil consigo mesmo(a) durante esse processo. Transformação é difícil. Você está sendo muito corajoso(a). Você está fazendo o melhor que pode. Você merece todo amor e paciência do mundo - especialmente de você mesmo(a).',
        image: '🦋'
      }
    ],
    es: [
      {
        id: 'angel-de-la-abundancia',
        name: 'Ángel de la Abundancia',
        description: 'El Ángel de la Abundancia trae prosperidad y bendiciones infinitas a tu vida.',
        insight: 'Estás entrando en un período de gran prosperidad. Los ángeles reconocen tu arduo trabajo y dedicación, y ahora es momento de cosechar los frutos. La abundancia no se manifiesta solo materialmente, sino también en amor, salud y logros personales.',
        guidance: 'Mantén una mentalidad de gratitud y continúa trabajando con propósito. Comparte tus bendiciones con otros, pues la generosidad multiplica la abundancia. Confía en que el universo está conspirando a tu favor.',
        image: '✨'
      },
      {
        id: 'angel-de-la-sanacion',
        name: 'Ángel de la Sanación',
        description: 'El Ángel de la Sanación ofrece renovación y restauración en todos los aspectos de tu vida.',
        insight: 'Un proceso de sanación profunda está ocurriendo en tu vida. Ya sea física, emocional o espiritual, estás siendo restaurado(a) desde adentro hacia afuera. Este es un momento de renovación y renacimiento.',
        guidance: 'Sé paciente contigo mismo durante este proceso. La sanación verdadera toma tiempo y requiere autocompasión. Practica el autocuidado y permítete descansar cuando sea necesario.',
        image: '💚'
      },
      {
        id: 'angel-de-la-sabiduria',
        name: 'Ángel de la Sabiduría',
        description: 'El Ángel de la Sabiduría ilumina tu camino con conocimiento divino y discernimiento.',
        insight: 'Estás desarrollando una sabiduría profunda que viene de la experiencia y la conexión espiritual. Tus decisiones están siendo guiadas por una intuición elevada, y puedes ver más allá de las apariencias.',
        guidance: 'Confía en tu intuición y en la sabiduría que has adquirido. Comparte tus conocimientos con otros que puedan beneficiarse. Recuerda que la verdadera sabiduría viene de la humildad.',
        image: '🦉'
      }
    ],
    en: [
      {
        id: 'angel-of-abundance',
        name: 'Angel of Abundance',
        description: 'The Angel of Abundance brings prosperity and infinite blessings to your life.',
        insight: 'You are entering a period of great prosperity. The angels recognize your hard work and dedication, and now it\'s time to reap the rewards. Abundance manifests not only materially, but also in love, health, and personal achievements.',
        guidance: 'Maintain a mindset of gratitude and continue working with purpose. Share your blessings with others, as generosity multiplies abundance. Trust that the universe is conspiring in your favor.',
        image: '✨'
      },
      {
        id: 'angel-of-healing',
        name: 'Angel of Healing',
        description: 'The Angel of Healing offers renewal and restoration in all aspects of your life.',
        insight: 'A deep healing process is happening in your life. Whether physical, emotional, or spiritual, you are being restored from the inside out. This is a time of renewal and rebirth.',
        guidance: 'Be patient with yourself during this process. True healing takes time and requires self-compassion. Practice self-care and allow yourself to rest when needed.',
        image: '💚'
      },
      {
        id: 'angel-of-wisdom',
        name: 'Angel of Wisdom',
        description: 'The Angel of Wisdom illuminates your path with divine knowledge and discernment.',
        insight: 'You are developing deep wisdom that comes from experience and spiritual connection. Your decisions are being guided by elevated intuition, and you can see beyond appearances.',
        guidance: 'Trust your intuition and the wisdom you have acquired. Share your knowledge with others who may benefit. Remember that true wisdom comes from humility.',
        image: '🦉'
      }
    ],
    fr: [
      {
        id: 'ange-de-labondance',
        name: 'Ange de l\'Abondance',
        description: 'L\'Ange de l\'Abondance apporte prospérité et bénédictions infinies à votre vie.',
        insight: 'Vous entrez dans une période de grande prospérité. Les anges reconnaissent votre travail acharné et votre dévouement, et il est maintenant temps de récolter les fruits. L\'abondance ne se manifeste pas seulement matériellement, mais aussi en amour, santé et réalisations personnelles.',
        guidance: 'Maintenez un état d\'esprit de gratitude et continuez à travailler avec un but. Partagez vos bénédictions avec d\'autres, car la générosité multiplie l\'abondance. Ayez confiance que l\'univers conspire en votre faveur.',
        image: '✨'
      },
      {
        id: 'ange-de-la-guerison',
        name: 'Ange de la Guérison',
        description: 'L\'Ange de la Guérison offre renouveau et restauration dans tous les aspects de votre vie.',
        insight: 'Un processus de guérison profonde se déroule dans votre vie. Qu\'elle soit physique, émotionnelle ou spirituelle, vous êtes restauré(e) de l\'intérieur vers l\'extérieur. C\'est un moment de renouveau et de renaissance.',
        guidance: 'Soyez patient(e) avec vous-même pendant ce processus. La vraie guérison prend du temps et nécessite de l\'auto-compassion. Pratiquez l\'auto-soin et permettez-vous de vous reposer quand nécessaire.',
        image: '💚'
      },
      {
        id: 'ange-de-la-sagesse',
        name: 'Ange de la Sagesse',
        description: 'L\'Ange de la Sagesse illumine votre chemin avec la connaissance divine et le discernement.',
        insight: 'Vous développez une sagesse profonde qui vient de l\'expérience et de la connexion spirituelle. Vos décisions sont guidées par une intuition élevée, et vous pouvez voir au-delà des apparences.',
        guidance: 'Faites confiance à votre intuition et à la sagesse que vous avez acquise. Partagez vos connaissances avec d\'autres qui pourraient en bénéficier. Rappelez-vous que la vraie sagesse vient de l\'humilité.',
        image: '🦉'
      }
    ]
  };

  const t = translations[locale];

  const revealCard = async () => {
    if (isRevealed) return;
    
    setIsLoading(true);
    
    // Simular tempo de "escolha" dos anjos
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    // Sempre mostrar a primeira carta (Anjo da Abundância Divina)
    const cards = tarotCards[locale];
    const randomCard = cards[0]; // Sempre a primeira carta
    
    setCurrentCard(randomCard);
    setIsRevealed(true);
    setIsLoading(false);
    
    // Salvar no localStorage
    const today = new Date().toDateString();
    localStorage.setItem('carta_adicional_revealed', today);
    localStorage.setItem('carta_adicional_card', JSON.stringify(randomCard));
  };

  if (!mounted) return null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-darkBg via-purpleDark/50 to-darkBg">
      <NavbarWithSuspense />
      
      <div className="container mx-auto px-4 py-8 pt-24">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-goldAccent mb-4 font-heading">
            {t.title}
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            {t.subtitle}
          </p>
        </motion.div>

        {/* Card Container */}
        <div className="max-w-2xl mx-auto">
          <AnimatePresence mode="wait">
            {!isRevealed && !isLoading && (
              <motion.div
                key="card-back"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                className="relative"
              >
                {/* Card Back */}
                <div className="aspect-[2/3] max-w-sm mx-auto mb-8">
                  <motion.div
                    className="w-full h-full relative cursor-pointer rounded-2xl shadow-2xl overflow-hidden"
                    style={{
                      background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 25%, #0f3460 50%, #533483 75%, #7209b7 100%)',
                    }}
                    whileHover={{ scale: 1.05, rotateY: 5 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={revealCard}
                  >
                    {/* Animated Background Pattern */}
                    <div className="absolute inset-0">
                      <div className="absolute inset-0 bg-gradient-to-br from-transparent via-white/5 to-transparent animate-pulse" />
                      <div className="absolute top-4 left-4 w-8 h-8 border border-goldAccent/30 rounded-full animate-spin" style={{ animationDuration: '8s' }} />
                      <div className="absolute bottom-4 right-4 w-6 h-6 border border-goldAccent/30 rounded-full animate-spin" style={{ animationDuration: '6s', animationDirection: 'reverse' }} />
                      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-32 h-32 border border-goldAccent/20 rounded-full animate-pulse" />
                    </div>
                    
                    {/* Mystical Borders */}
                    <div className="absolute inset-3 border-2 border-gradient-to-r from-goldAccent/40 via-white/30 to-goldAccent/40 rounded-xl" style={{
                      background: 'linear-gradient(45deg, transparent, rgba(212, 175, 55, 0.1), transparent)',
                      borderImage: 'linear-gradient(45deg, #D4AF37, #FFD700, #D4AF37) 1'
                    }} />
                    
                    {/* Center Mystical Symbol */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <motion.div 
                        className="text-7xl"
                        animate={{ 
                          rotate: [0, 360],
                          scale: [1, 1.1, 1]
                        }}
                        transition={{ 
                          duration: 4, 
                          repeat: Infinity, 
                          ease: "easeInOut" 
                        }}
                      >
                        🌟
                      </motion.div>
                    </div>
                    
                    {/* Floating Particles */}
                    <div className="absolute inset-0 pointer-events-none">
                      {[...Array(6)].map((_, i) => (
                        <motion.div
                          key={i}
                          className="absolute w-2 h-2 bg-goldAccent/60 rounded-full"
                          style={{
                            left: `${20 + i * 15}%`,
                            top: `${30 + (i % 2) * 40}%`,
                          }}
                          animate={{
                            y: [-10, 10, -10],
                            opacity: [0.3, 1, 0.3],
                          }}
                          transition={{
                            duration: 3 + i * 0.5,
                            repeat: Infinity,
                            ease: "easeInOut",
                            delay: i * 0.5,
                          }}
                        />
                      ))}
                    </div>
                  </motion.div>
                </div>
                
                {/* Reveal Button */}
                <motion.button
                  onClick={revealCard}
                  className="w-full max-w-sm mx-auto block bg-gradient-to-r from-goldAccent to-yellow-500 text-darkBg font-bold py-4 px-8 rounded-full text-xl shadow-lg hover:shadow-xl transition-all duration-300"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {t.revealButton}
                </motion.button>
              </motion.div>
            )}

            {isLoading && (
              <motion.div
                key="loading"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="text-center py-20"
              >
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                  className="text-8xl mb-8 inline-block"
                >
                  ✨
                </motion.div>
                <p className="text-2xl text-goldAccent font-semibold">
                  {t.loading}
                </p>
              </motion.div>
            )}

            {isRevealed && currentCard && (
              <motion.div
                key="card-revealed"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center"
              >
                {/* Revealed Card */}
                <div className="aspect-[2/3] max-w-sm mx-auto mb-8">
                  <motion.div
                    initial={{ rotateY: 180 }}
                    animate={{ rotateY: 0 }}
                    transition={{ duration: 1.5, ease: "easeInOut" }}
                    className="w-full h-full relative rounded-2xl shadow-2xl overflow-hidden"
                    style={{
                      background: 'linear-gradient(135deg, #ffffff 0%, #f8fafc 25%, #f1f5f9 50%, #e2e8f0 75%, #cbd5e1 100%)',
                    }}
                  >
                    {/* Elegant Background Pattern */}
                    <div className="absolute inset-0">
                      <div className="absolute inset-0 bg-gradient-to-br from-goldAccent/5 via-transparent to-purpleMystic/5" />
                      <div className="absolute top-0 left-0 w-full h-full">
                        <svg className="w-full h-full opacity-10" viewBox="0 0 100 100">
                          <defs>
                            <pattern id="card-pattern" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
                              <circle cx="10" cy="10" r="1" fill="#D4AF37" />
                            </pattern>
                          </defs>
                          <rect width="100" height="100" fill="url(#card-pattern)" />
                        </svg>
                      </div>
                    </div>
                    
                    {/* Card Content */}
                    <div className="relative z-10 p-6 h-full flex flex-col items-center justify-center text-center">
                      <motion.div 
                        className="text-7xl mb-6"
                        initial={{ scale: 0, rotate: -180 }}
                        animate={{ scale: 1, rotate: 0 }}
                        transition={{ delay: 0.5, duration: 0.8, ease: "backOut" }}
                      >
                        {currentCard.image}
                      </motion.div>
                      
                      <motion.h3 
                        className="text-2xl font-bold mb-3"
                        style={{
                          background: 'linear-gradient(135deg, #7209b7, #533483, #D4AF37)',
                          WebkitBackgroundClip: 'text',
                          WebkitTextFillColor: 'transparent',
                          backgroundClip: 'text'
                        }}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.8, duration: 0.6 }}
                      >
                        {currentCard.name}
                      </motion.h3>
                      
                      <motion.p 
                        className="text-gray-700 text-sm leading-relaxed"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 1, duration: 0.6 }}
                      >
                        {currentCard.description}
                      </motion.p>
                    </div>
                    
                    {/* Elegant Borders */}
                    <div className="absolute inset-2 rounded-xl" style={{
                      background: 'linear-gradient(45deg, transparent, rgba(212, 175, 55, 0.2), transparent)',
                      padding: '2px'
                    }}>
                      <div className="w-full h-full bg-white/50 rounded-xl" />
                    </div>
                    
                    {/* Corner Decorations */}
                    <div className="absolute top-3 left-3 w-6 h-6 border-l-2 border-t-2 border-goldAccent/60 rounded-tl-lg" />
                    <div className="absolute top-3 right-3 w-6 h-6 border-r-2 border-t-2 border-goldAccent/60 rounded-tr-lg" />
                    <div className="absolute bottom-3 left-3 w-6 h-6 border-l-2 border-b-2 border-goldAccent/60 rounded-bl-lg" />
                    <div className="absolute bottom-3 right-3 w-6 h-6 border-r-2 border-b-2 border-goldAccent/60 rounded-br-lg" />
                  </motion.div>
                </div>

                {/* Card Information */}
                <div className="space-y-8 text-left max-w-4xl mx-auto">
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 1.2 }}
                    className="relative overflow-hidden rounded-2xl p-8 border border-goldAccent/30"
                    style={{
                      background: 'linear-gradient(135deg, rgba(255,255,255,0.15) 0%, rgba(255,255,255,0.05) 100%)',
                      backdropFilter: 'blur(20px)',
                      boxShadow: '0 20px 40px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.2)'
                    }}
                  >
                    {/* Decorative Background */}
                    <div className="absolute inset-0 opacity-5">
                      <div className="absolute top-0 right-0 w-32 h-32 bg-goldAccent rounded-full blur-3xl" />
                      <div className="absolute bottom-0 left-0 w-24 h-24 bg-purpleMystic rounded-full blur-2xl" />
                    </div>
                    
                    <div className="relative z-10">
                      <h4 className="text-2xl font-bold mb-4 flex items-center">
                        <motion.span 
                          className="mr-3 text-3xl"
                          animate={{ rotate: [0, 10, -10, 0] }}
                          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                        >
                          💡
                        </motion.span>
                        <span style={{
                          background: 'linear-gradient(135deg, #D4AF37, #FFD700)',
                          WebkitBackgroundClip: 'text',
                          WebkitTextFillColor: 'transparent',
                          backgroundClip: 'text'
                        }}>
                          {t.insight}
                        </span>
                      </h4>
                      <div className="text-gray-100 leading-relaxed text-lg space-y-4">
                        {currentCard.insight.split('. ').map((sentence, index) => (
                          <motion.p
                            key={index}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 1.4 + index * 0.2 }}
                            className="text-base leading-7"
                          >
                            {sentence}{sentence && '.  '}
                          </motion.p>
                        ))}
                      </div>
                    </div>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 1.6 }}
                    className="relative overflow-hidden rounded-2xl p-8 border border-goldAccent/30"
                    style={{
                      background: 'linear-gradient(135deg, rgba(212,175,55,0.15) 0%, rgba(212,175,55,0.05) 100%)',
                      backdropFilter: 'blur(20px)',
                      boxShadow: '0 20px 40px rgba(0,0,0,0.3), inset 0 1px 0 rgba(212,175,55,0.2)'
                    }}
                  >
                    {/* Decorative Background */}
                    <div className="absolute inset-0 opacity-5">
                      <div className="absolute top-0 left-0 w-28 h-28 bg-purpleMystic rounded-full blur-3xl" />
                      <div className="absolute bottom-0 right-0 w-36 h-36 bg-goldAccent rounded-full blur-2xl" />
                    </div>
                    
                    <div className="relative z-10">
                      <h4 className="text-2xl font-bold mb-4 flex items-center">
                        <motion.span 
                          className="mr-3 text-3xl"
                          animate={{ scale: [1, 1.1, 1] }}
                          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                        >
                          🙏
                        </motion.span>
                        <span style={{
                          background: 'linear-gradient(135deg, #D4AF37, #FFD700)',
                          WebkitBackgroundClip: 'text',
                          WebkitTextFillColor: 'transparent',
                          backgroundClip: 'text'
                        }}>
                          {t.guidance}
                        </span>
                      </h4>
                      <div className="text-gray-100 leading-relaxed text-lg">
                        <motion.div
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ delay: 1.8 }}
                          className="prose prose-lg prose-invert max-w-none"
                        >
                          <div className="text-base leading-7 whitespace-pre-line">
                            {currentCard.guidance}
                          </div>
                        </motion.div>
                      </div>
                    </div>
                  </motion.div>
                </div>

                {/* Tomorrow Message */}
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1 }}
                  className="text-center text-gray-400 mt-8 italic"
                >
                  {t.newCardTomorrow}
                </motion.p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}