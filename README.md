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

## Desenvolvimento

```bash
# Instalar dependências
npm install

# Iniciar servidor de desenvolvimento
npm run dev

# Gerar build de produção
npm run build

# Iniciar servidor de produção
node .next/standalone/server.js
```

## Arquivos de Áudio

Este projeto usa arquivos MP3 locais para reprodução de áudios. 

**Nota importante:** Os arquivos de áudio não são incluídos no controle de versão do Git devido ao seu tamanho. 

### Localização dos arquivos de áudio

Os arquivos de áudio devem ser colocados na pasta `public/audio/` para funcionar corretamente.

Lista de arquivos necessários:
- atrair-anjos.mp3
- frequencia-abundancia.mp3
- limpeza-de-energia.mp3
- meditação.mp3
- Om Gam Ganapataye Namaha.mp3
- om mani padme hum.mp3
- Om Namah Shivaya.mp3
- OM SHANTI SHANTI SHANTI.mp3

### Alternativas

Para equipes que precisam compartilhar esses arquivos:
1. Use uma solução de compartilhamento de arquivos separada (Google Drive, Dropbox, etc.)
2. Configure Git LFS se necessário (https://git-lfs.github.com/)
3. Considere hospedar os arquivos em um CDN e referenciar as URLs 