export default async function handler(req, res) {
if (req.method !== 'POST') return res.status(405).end()


const { message } = req.body || {}
if (!message) return res.status(400).json({ error: 'No message provided' })


const COMPANY_NAME = process.env.COMPANY_NAME || 'Your Company'
const COMPANY_FAQ = (() => {
try { return JSON.parse(process.env.COMPANY_FAQ || '[]') } catch { return [] }
})()


const systemPrompt = `You are a helpful support agent for ${COMPANY_NAME}, specialized in software development, website development, app development, web apps, CRM systems, desktop apps, API integrations, UI/UX design, and tech consultation. Answer clearly and concisely using the FAQ when applicable.`;


const messages = [
{ role: 'system', content: systemPrompt },
...COMPANY_FAQ.slice(0,5).map(f => ({ role: 'system', content: `FAQ Q: ${f.q} A: ${f.a}` })),
{ role: 'user', content: message }
]


try {
const OPENAI_KEY = process.env.OPENAI_API_KEY
if (!OPENAI_KEY) return res.status(500).json({ error: 'OpenAI API key not configured.' })


const r = await fetch('https://api.openai.com/v1/chat/completions', {
method: 'POST',
headers: {
'Content-Type': 'application/json',
'Authorization': `Bearer ${OPENAI_KEY}`
},
body: JSON.stringify({ model: 'gpt-4o-mini', messages, max_tokens:500, temperature:0.2 })
})


if (!r.ok) {
const t = await r.text()
console.error('OpenAI error', t)
return res.status(502).json({ error: 'OpenAI API error' })
}


const data = await r.json()
const reply = data.choices?.[0]?.message?.content || 'Sorry, I could not find an answer.'


return res.status(200).json({ reply })
} catch (err) {
console.error(err)
return res.status(500).json({ error: 'Internal Error' })
}
}