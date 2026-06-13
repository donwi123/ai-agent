import { useState } from 'react'
import './App.css'

interface Message{
  role: 'user' | 'assistant'
  content: string
}

export default function App() {
  const [messages, setMessages] = useState<Message[]>([])
  const [question, setQuestion] = useState('');
  const [buttonText, setButtonText] = useState('Click to submit your question');
  const [error, setError] = useState<string | null>(null)
  const API_URL = import.meta.env.VITE_API_URL + '/api/chat'

  async function handleSubmit() {
    
    setButtonText('loading')
    setError(null)
    try{
    const serverResponse = await fetch(API_URL, {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({message: question})
    })
    setMessages(prev => [...prev, { role: 'user', content: question }])
    const data = await serverResponse.json()
    setMessages(prev => [...prev, { role: 'assistant', content: data.response }])
    setQuestion('') 
    setButtonText('Click to submit your question')

    }catch (error) {
    setMessages(prev => prev.slice(0, -1))
    setError('Something went wrong. Please try again.')
    setButtonText('Click to submit your question')  
  }

    
  }


  return(
    <div className='app-container'>
      <div className='header'>
        <h1 >AI research agent</h1>
        <p >This AI is powered by Gemenis LLM and is able to search the internet.</p>
      </div>

      {error && <p style={{ color: 'red' }}>{error}</p>}

      <div className='chatbox'>
          {messages.map((message, index) => (
            <div key={index} className={message.role === 'user' ? 'user-message' : 'ai-message'}>
                {message.content}
            </div>
          ))}

      </div>

      <div className='input-bar'>
        <div>
          <label>
          <textarea className='textarea' name='chat'
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          />
          </label>
        </div>

      <div>
        <button onClick={handleSubmit}>{buttonText}</button>
      </div>
    </div>






    </div>
  )


}

