import { useState, useRef } from 'react'
setLoading(true)


try {
const res = await fetch('/api/chat', {
method: 'POST',
headers: { 'Content-Type': 'application/json' },
body: JSON.stringify({ message: input })
})
if (!res.ok) throw new Error('Server error')
const data = await res.json()
const botMsg = { id: Date.now()+1, from: 'bot', text: data.reply }
setMessages((m) => [...m, botMsg])
setLoading(false)
setTimeout(() => ref.current?.scrollIntoView({ behavior: 'smooth' }), 50)
} catch (err) {
const errMsg = { id: Date.now()+2, from: 'bot', text: 'Sorry, something went wrong. Please try again.' }
setMessages((m) => [...m, errMsg])
setLoading(false)
}
}


return (
<main className="container">
<header className="header">
<h1>CoreSphere AI — Development Services Chatbot</h1>
<p className="tagline">Ask about software, website, app development, and related tech services.</p>
</header>


<section className="chat">
{messages.map(msg => (
<div key={msg.id} className={`message ${msg.from}`}>
<div className="bubble">{msg.text}</div>
</div>
))}
<div ref={ref} />
</section>


<form className="composer" onSubmit={sendMessage}>
<input
aria-label="Type your message"
value={input}
onChange={(e) => setInput(e.target.value)}
placeholder="Ask about software, website, app development or related services..."
/>
<button type="submit" disabled={loading}>{loading ? 'Thinking...' : 'Send'}</button>
</form>


<footer className="footer">
<small>Powered by CoreSphere • deployable to Vercel</small>
</footer>


<style jsx>{`
.container { max-width:800px; margin:32px auto; padding:16px; }
.header { text-align:center; margin-bottom:16px }
h1 { margin:0; font-size:1.6rem }
.tagline { color:#666 }
.chat { background:#f8f8fb; min-height:350px; padding:16px; border-radius:12px; overflow:auto }
.message { display:flex; margin:8px 0 }
.message.user { justify-content:flex-end }
.message.bot { justify-content:flex-start }
.bubble { max-width:75%; padding:10px 14px; border-radius:16px; background:#fff; box-shadow:0 1px 3px rgba(0,0,0,0.06) }
.message.user .bubble { background:#0b74ff; color:white }
.composer { display:flex; gap:8px; margin-top:12px }
input { flex:1; padding:10px 12px; border-radius:8px; border:1px solid #e6e6e9 }
button { padding:10px 14px; border-radius:8px; border:none; background:#0b74ff; color:white }
.footer { text-align:center; margin-top:12px; color:#888 }
`}</style>
</main>
)
}