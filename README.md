<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://ai.google.dev/static/site-assets/images/share-ais-513315318.png" />
</div>

# Run and deploy your AI Studio app

This contains everything you need to run your app locally.

View your app in AI Studio: https://ai.studio/apps/d5666994-d059-412d-94fb-38a516577050

## Run Locally

**Prerequisites:**  Node.js


1. Install dependencies:
   `npm install`
2. Set the `GEMINI_API_KEY` in [.env.local](.env.local) to your Gemini API key
3. Run the app:
   `npm run dev`


## App para iPhone y PC (PWA)

Este proyecto está preparado para instalarse como una app web (PWA) en iPhone/iPad y en computadoras compatibles.

### Publicación gratuita

El proyecto puede desplegarse desde GitHub en un servicio con plan gratuito como Vercel. El servidor `server.ts` expone la API `/api/assistant/chat`, por lo que no debe publicarse solamente como sitio estático.

En el proveedor de despliegue configura la variable de entorno:

`GEMINI_API_KEY`

Nunca coloques la clave de Gemini dentro del código del navegador.

### Instalar en iPhone

Abre el sitio en Safari → Compartir → Agregar a Inicio → activa “Abrir como app web” → Agregar.
