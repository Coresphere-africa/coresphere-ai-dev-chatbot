# CoreSphere AI Development Services Chatbot — Next.js (Vercel-ready)


A minimal, production-friendly AI chatbot for software, website, app development, and related tech services. Deployable to Vercel.


## Features
- Minimal Next.js app (Pages Router)
- API route (`/api/chat`) that calls OpenAI GPT
- Company FAQ for development services
- Easy to extend with product lookup, WhatsApp integration, or analytics


## Environment Variables
Create `.env.local` with:
```
OPENAI_API_KEY=sk-...yourkey...
COMPANY_NAME=CoreSphere Intel Technologies
COMPANY_FAQ=[
{"q":"Do you offer software development?","a":"Yes, we develop custom software tailored to your business needs."},
{"q":"Can you build websites?","a":"Absolutely, we develop responsive, SEO-friendly, modern websites."},
{"q":"Do you do mobile app development?","a":"Yes, we create Android and iOS apps with sleek design and seamless functionality."},
{"q":"Other services you offer?","a":"Web applications, CRM systems, desktop apps, API integrations, UI/UX design, and tech consultation."}
]
```


## Local development
1. `npm install`
2. `npm run dev`
3. Open `http://localhost:3000`


## Deploy to Vercel
1. Push repo to GitHub
2. Import to Vercel
3. Add environment variables in Project Settings
4. Deploy. App will be live on Vercel