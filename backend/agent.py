from dotenv import load_dotenv
import os
from langchain_google_genai import ChatGoogleGenerativeAI
from langchain.agents import create_agent
from langchain_community.utilities import SerpAPIWrapper
from langchain.tools import tool
load_dotenv()

llm = ChatGoogleGenerativeAI(
    model="gemini-2.5-flash",
    google_api_key=os.environ.get("GEMINI_API_KEY")
    )

@tool
def search(query: str) -> str:
    """Search the web for current information about a topic"""
    wrapper = SerpAPIWrapper()
    return wrapper.run(query)

agent = create_agent(
    model="google_genai:gemini-2.5-flash",
    tools=[search],
    system_prompt="You are a helpful assistant"
)

# while True:
#     question = input("You: ")
#     if question.lower() == "exit":
#         break
#     response = agent.invoke(
#         {"messages": [{"role": "user", "content": question}]}
#     )
#     print(f"Agent: {response['messages'][-1].content}\n")