from fastapi import FastAPI 
from pydantic import BaseModel
from agent import agent
from fastapi.middleware.cors import CORSMiddleware
app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"]
)

class ChatRequest(BaseModel):
    message: str

@app.get('/api/health')
async def health():
    return {"response": "ok"}
    

@app.post('/api/chat')
async def chat(request: ChatRequest):
    try:
        response = agent.invoke(  
            {"messages": [{"role": "user", "content": request.message}]}
        )
        last_message = response['messages'][-1]
        if isinstance(last_message.content, list):
            text = last_message.content[0]['text']
        else:
            text = last_message.content

        return {"response": text}
    except Exception as e:
        return {"error": str(e)}, 500


if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)