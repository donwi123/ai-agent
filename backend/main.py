from fastapi import FastAPI 
from pydantic import BaseModel
from agent import agent
app = FastAPI()

class ChatRequest(BaseModel):
    message: str

@app.get('/api/health')
async def health():
    return {"response": "ok"}
    

@app.post('/api/chat')
async def chat(request: ChatRequest):
    response = agent.invoke(
        {"messages": [{"role": "user", "content": request.message}]}
    )

    return{"response": response['messages'][-1].content}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)