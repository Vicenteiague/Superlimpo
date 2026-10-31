# 🚀 Guia de Deploy na Vercel — Superlimpo Biosite com IA (LIA)

Este projeto está 100% configurado e pronto para deploy na **Vercel** com suporte completo ao frontend Vite e à Inteligência Artificial (LIA) via Vercel Serverless Functions (`/api/chat`).

---

## 📋 Pré-requisitos
1. Uma conta na [Vercel](https://vercel.com/) (gratuita).
2. Uma chave de API do Gemini no [Google AI Studio](https://aistudio.google.com/app/apikey) (gratuita).
3. O código deste projeto enviado para o seu GitHub/GitLab ou importado via Vercel CLI.

---

## ⚡ Passo a Passo para o Deploy na Vercel

### Opção 1: Pelo Painel Web da Vercel (Recomendado)
1. Acesse [vercel.com/new](https://vercel.com/new).
2. Conecte sua conta do GitHub e selecione o repositório deste projeto.
3. As configurações serão detectadas automaticamente:
   - **Framework Preset:** `Vite`
   - **Build Command:** `npm run build`
   - **Output Directory:** `dist`
4. Na seção **Environment Variables** (Variáveis de Ambiente), adicione:
   - **Nome:** `GEMINI_API_KEY`
   - **Valor:** `Sua_Chave_Obtida_No_Google_AI_Studio` (ex: `AIzaSy...`)
5. Clique em **Deploy**.

---

### Opção 2: Pelo Vercel CLI (Terminal)
Caso prefira fazer deploy pelo terminal:
```bash
# 1. Instale o Vercel CLI caso não tenha
npm i -g vercel

# 2. Faça login na Vercel
vercel login

# 3. Execute o deploy
vercel --prod
```
Depois adicione a variável de ambiente:
```bash
vercel env add GEMINI_API_KEY
```

---

## 🧪 Como Testar se a IA Está Funcionando na Vercel
Após o deploy, você pode testar o status da API direto pelo navegador acessando:
```
https://seu-projeto.vercel.app/api/chat
```
Você receberá a resposta:
```json
{
  "status": "online",
  "agent": "LIA - Superlimpo Atendente Virtual",
  "platform": "Vercel Serverless Function",
  "aiConfigured": true,
  "timestamp": "2026-10-31T..."
}
```

- Se `aiConfigured` for `true`, a IA Gemini já está ativa respondendo as dúvidas em tempo real!
- Caso não tenha configurado a chave ainda (`aiConfigured: false`), a LIA continua funcionando com respostas inteligentes baseadas no banco de dados da Superlimpo e direcionamento para o WhatsApp.

---

## 🛠️ Arquivos de Configuração Inclusos
- `vercel.json`: Regras de roteamento para o SPA Vite e rotas serverless `/api/*`.
- `api/chat.ts`: Serverless Function da Vercel integrada ao modelo Gemini com cache de alta performance e guardrails oficiais da Superlimpo.
- `package.json`: Scripts de build e dependências atualizadas.
- `.env.example`: Modelo das variáveis de ambiente.
