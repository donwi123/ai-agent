import { useState } from 'react'
import './App.css'

export default function App() {
  const [response, setResponse] = useState('');
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

    const data = await serverResponse.json()
    setResponse(data.response)
    setButtonText('Click to submit your question')

    }catch (error) {
    setError('Something went wrong. Please try again.')
    setButtonText('Click to submit your question')  
  }

    
  }


  return(
    <div className='app-container'>
      <div className='header'>
        <h1 >Ai research agent</h1>
        <p >This Ai is powered by Gemenis LLM and is able to search the internet.</p>
      </div>

      <div className='chatbox'>
        <p className='chat-response'>{response}</p>
        <p className='user-question'>{question}</p>

      </div>

      <div className='text-box'>
        <label>
        <textarea className='textarea' name='chat'
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
        />
        </label>
      </div>

    <div className='submit-button'>
      <button onClick={handleSubmit}>{buttonText}</button>
    </div>






    </div>
  )


}

