# Meia Um Engenharia — Landing Page

Landing page estática (HTML + CSS + JavaScript puro, sem build) para captação de
clientes de regularização de imóveis / Habite-se no Distrito Federal.

## Estrutura

```
.
├── index.html                  # Página Home (única rota hoje)
└── assets/
    ├── css/
    │   ├── tokens.css          # Variáveis: cores, espaçamentos, tipografia
    │   ├── base.css            # Reset, elementos, utilitários de acessibilidade
    │   ├── layout.css          # Container, seções, grids, header e footer
    │   ├── components.css      # Botões, cards, acordeão, ícones (reutilizáveis)
    │   └── pages/
    │       └── home.css        # Estilos exclusivos da Home
    └── js/
        ├── config.js           # Contato e mensagens dos CTAs
        ├── modules/            # Comportamentos reutilizáveis
        │   ├── navigation.js   # Menu mobile, header ao rolar, seção ativa
        │   ├── faq.js          # Acordeão com um item aberto por vez
        │   ├── reveal.js       # Animação de entrada ao rolar
        │   └── cta.js          # Monta os links de WhatsApp
        └── pages/
            └── home.js         # Entrada da Home: inicializa os módulos
```

A ordem de carregamento do CSS é intencional e deve ser mantida:
`tokens → base → layout → components → pages/*`.

## Como adicionar uma nova página

1. Crie `nome-da-pagina.html` na raiz.
2. Crie `assets/css/pages/nome-da-pagina.css` e `assets/js/pages/nome-da-pagina.js`.
3. No `<head>`, carregue os quatro CSS globais + o CSS da página e importe no JS
   da página apenas os módulos usados.

Nada específico de uma página deve entrar em `layout.css` ou `components.css`.

## Como rodar

Basta abrir o `index.html` no navegador. Como o JS usa módulos ES
(`type="module"`), o ideal para desenvolvimento é servir por HTTP:

```bash
npx serve .
# ou
python -m http.server 8000
```

## O que precisa ser preenchido antes de publicar

| Item | Onde |
| --- | --- |
| Número de WhatsApp real | `assets/js/config.js` e os `href` de fallback no `index.html` |
| E-mail e endereço | `index.html` (rodapé e JSON-LD) |
| Domínio real | `index.html` (`canonical` e `og:url`) |
| Imagem de compartilhamento | `index.html` (`og:image`) |
| Imagens hospedadas localmente | hoje apontam para URLs externas do Google |

## Decisões técnicas

- **Sem Tailwind via CDN.** O CDN do Tailwind compila no navegador e não é
  recomendado para produção. O design foi convertido em CSS próprio com tokens
  equivalentes em `tokens.css`.
- **Sem fonte de ícones.** Os ícones do Material Symbols foram substituídos por
  um sprite SVG inline: nenhuma requisição extra e sem atraso de renderização.
- **Melhoria progressiva.** A página é totalmente utilizável sem JavaScript; o JS
  apenas acrescenta menu mobile, acordeão exclusivo e animações.
- **Acessibilidade.** Skip link, foco visível, alvos de toque de 44px, `aria-*`
  no menu, texto alternativo nas imagens e respeito a `prefers-reduced-motion`.
