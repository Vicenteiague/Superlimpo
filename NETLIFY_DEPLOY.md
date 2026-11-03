# 🚀 Guia de Deploy na Netlify — Superlimpo Biosite com IA (LIA)

Este projeto está 100% configurado e pronto para deploy na **Netlify** com suporte completo ao frontend Vite e à Inteligência Artificial da atendente **LIA** através das **Netlify Functions** (`netlify/functions/chat.ts`).

---

## 📋 Pré-requisitos
1. Uma conta na [Netlify](https://www.netlify.com/) (gratuita).
2. Uma chave de API do Gemini no [Google AI Studio](https://aistudio.google.com/app/apikey) (gratuita).
3. O código deste projeto enviado para o seu GitHub, GitLab ou Bitbucket.

---

## ⚡ Passo a Passo para o Deploy na Netlify

### Opção 1: Pelo Painel Web da Netlify (Recomendado)
1. Acesse [app.netlify.com](https://app.netlify.com/) e faça login.
2. Clique em **Add new site** > **Import an existing project**.
3. Selecione seu provedor Git (ex: **GitHub**) e escolha o repositório deste projeto.
4. As configurações já estão salvas no arquivo `netlify.toml` e serão detectadas automaticamente:
   - **Build command:** `npm run build`
   - **Publish directory:** `dist`
   - **Functions directory:** `netlify/functions`
5. Clique em **Deploy site** (ou antes vá em **Environment variables**).
6. Para configurar a IA, acesse no painel do seu site:
   - **Site configuration** > **Environment variables** > **Add a variable**
   - **Key:** `GEMINI_API_KEY`
   - **Value:** Cole sua chave da API Gemini (ex: `AIzaSy...`)
7. Após salvar a variável, vá na aba **Deploys** e clique em **Trigger deploy** > **Clear cache and deploy site**.

---

### Opção 2: Pelo Netlify CLI (Terminal)
Caso prefira fazer o deploy direto pelo terminal:
```bash
# 1. Instale o Netlify CLI
npm install -g netlify-cli

# 2. Faça login na sua conta Netlify
netlify login

# 3. Inicialize e faça o deploy de produção
netlify init
netlify deploy --prod --build

# 4. Configure a variável da chave de IA
netlify env:set GEMINI_API_KEY "SUA_CHAVE_AQUI"
```

---

## 🧪 Como Testar se a IA Está Ativa na Netlify
Depois que o site estiver publicado, você pode verificar o status do backend da IA direto pelo seu navegador acessando:
```
https://seu-site.netlify.app/api/chat
```

Você receberá a resposta:
```json
{
  "status": "online",
  "agent": "LIA - Superlimpo Atendente Virtual",
  "platform": "Netlify Functions",
  "aiConfigured": true,
  "timestamp": "2026-11-03T..."
}
```

- Quando `aiConfigured` estiver como `true`, a atendente LIA já estará respondendo aos seus clientes usando a inteligência do Gemini em tempo real com leitura de histórico!
- Se a chave ainda não estiver cadastrada (`aiConfigured: false`), a LIA continua funcionando com a base de conhecimento local e direcionamento humanizado para o WhatsApp.

---

## 🛠️ Arquivos de Configuração Inclusos
- `netlify.toml`: Instruções completas de compilação, bundling com `esbuild` e redirecionamento de rotas.
- `public/_redirects`: Regras de fallback SPA e redirecionamento da API de chat.
- `netlify/functions/chat.ts`: Função Serverless com IA Gemini, cache e guardrails da Superlimpo.
- `package.json`: Scripts de build prontos.
