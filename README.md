# Portal Espiritual

Este é um aplicativo web multilíngue (português e espanhol) para o Portal Espiritual, com páginas para leitura de Tarô dos Anjos e uma seção de bônus exclusivos.

## Funcionalidades

- Design místico com tema roxo e dourado usando Tailwind CSS 
- Suporte a múltiplos idiomas (português e espanhol)
- Detecção automática de idioma por IP
- Botão para alternar entre idiomas
- Página inicial com player de vídeo que só aparece após clique
- Página de bônus com cards de conteúdo exclusivo
- Animações suaves com Framer Motion
- Layout responsivo para todos os dispositivos

## Tecnologias Utilizadas

- Next.js 14 (App Router)
- Tailwind CSS para estilização
- Framer Motion para animações
- next-i18next para traduções
- Middleware para detecção de IP e configuração de localização
- Player de vídeo externo do Converte.ai

## Estrutura do Projeto

```
portal-espiritual/
├── public/
│   └── locales/
│       ├── pt/
│       │   └── common.json
│       └── es/
│           └── common.json
├── src/
│   ├── app/
│   │   ├── bonus/
│   │   │   └── page.tsx
│   │   ├── layout.tsx
│   │   ├── page.tsx
│   │   └── globals.css
│   ├── components/
│   │   ├── BonusCard.tsx
│   │   ├── Navbar.tsx
│   │   └── VideoPlayer.tsx
│   ├── lib/
│   │   └── locale.ts
│   └── middleware.ts
├── tailwind.config.js
├── next.config.js
├── next-i18next.config.js
└── package.json
```

## Como Executar o Projeto

1. Clone o repositório
2. Instale as dependências:
   ```
   npm install
   ```
3. Execute o servidor de desenvolvimento:
   ```
   npm run dev
   ```
4. Abra [http://localhost:3000](http://localhost:3000) no seu navegador

## Implementações

### Detecção de Idioma

A detecção de idioma é feita através de um middleware que verifica o IP do usuário utilizando a API ipapi.co. O idioma é salvo em um cookie para persistência.

### Player de Vídeo

O player de vídeo do Tarô dos Anjos só é carregado após o clique no botão "Iniciar minha Leitura", economizando recursos e melhorando a experiência do usuário.

### Página de Bônus

A página de bônus apresenta cards com efeito de vidro (glassmorphism) e animações suaves para uma experiência mais imersiva.

## Implantação

Para implantar no Vercel:

```
vercel
```

Ou configure a implantação automática a partir do repositório Git.

## Licença

Este projeto é para uso exclusivo do Portal Espiritual. 