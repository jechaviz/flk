# dependencies = [
#   "fastapi",
#   "uvicorn",
#   "ssoready",
#   "google-generativeai",
#   "gitpython",
#   "python-multipart",
#   "python-dotenv",
#   "tinydb",
# ]
# ///

import os
from fastapi import FastAPI, Request, HTTPException
from fastapi.staticfiles import StaticFiles
from fastapi.responses import HTMLResponse, JSONResponse
from fastapi.middleware.cors import CORSMiddleware
from dotenv import load_dotenv
import google.generativeai as genai

load_dotenv()
from git import Repo
import json
from typing import List, Optional
from pydantic import BaseModel


app = FastAPI(title="Freedom Lifestyle Key Backend")

# CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

# Configuration
PROJECT_ROOT = os.path.dirname(os.path.abspath(__file__))
# Note: Use environment variables for production keys
# genai.configure(api_key="YOUR_GEMINI_API_KEY")

# Git Initialization
try:
    repo = Repo(PROJECT_ROOT)
    if not repo.heads:
        repo.index.add(repo.untracked_files)
        repo.index.commit("Initial commit (IA Backend Setup)")
except Exception as e:
    print(f"Warning: Git repository error: {e}")
    repo = None

# Gemini Config
GEMINI_KEY = os.environ.get("GOOGLE_API_KEY")
if GEMINI_KEY:
    genai.configure(api_key=GEMINI_KEY)
    model = genai.GenerativeModel("gemini-1.5-flash")
else:
    model = None



# Static Files
if os.path.exists(os.path.join(PROJECT_ROOT, "img")):
    app.mount("/img", StaticFiles(directory=os.path.join(PROJECT_ROOT, "img")), name="img")

# Models
class EditRequest(BaseModel):
    prompt: str



@app.get("/", response_class=HTMLResponse)
async def read_index():
    with open(os.path.join(PROJECT_ROOT, "index.html"), "r", encoding="utf-8") as f:
        return f.read()

@app.get("/edit", response_class=HTMLResponse)
async def read_editor():
    with open(os.path.join(PROJECT_ROOT, "editor.html"), "r", encoding="utf-8") as f:
        return f.read()

@app.get("/api/history")
async def get_history():
    if not repo:
        return []
    commits = []
    try:
        for commit in repo.iter_commits(max_count=20):
            commits.append({
                "sha": commit.hexsha,
                "message": commit.message.strip(),
                "date": commit.committed_datetime.strftime("%Y-%m-%d %H:%M")
            })
    except: pass
    return commits

@app.post("/api/revert")
async def revert_commit(data: dict):
    sha = data.get("sha")
    if not repo or not sha:
        return JSONResponse(status_code=400, content={"error": "Invalid request"})
    try:
        repo.git.checkout(sha, "index.html")
        repo.index.add(["index.html"])
        repo.index.commit(f"Reverted to {sha}")
        return {"status": "success"}
    except Exception as e:
        return JSONResponse(status_code=500, content={"error": str(e)})

@app.post("/api/generate")
async def generate_edit(request: EditRequest):
    if not model:
        return {"status": "error", "message": "GOOGLE_API_KEY no configurada en el servidor."}
    
    try:
        with open(os.path.join(PROJECT_ROOT, "index.html"), "r", encoding="utf-8") as f:
            code = f.read()
        
        system_prompt = "Eres un experto en diseño web premium con Tailwind CSS y Vue 3. Modifica el código proporcionado según las instrucciones del usuario. Devuelve ÚNICAMENTE el código completo modificado entre etiquetas ```html y nada más."
        user_prompt = f"Instrucción: {request.prompt}\n\nCódigo actual:\n{code}"
        
        chat = model.start_chat(history=[])
        response = chat.send_message(f"{system_prompt}\n\n{user_prompt}")
        
        # Extract code from markdown
        new_code = response.text
        if "```html" in new_code:
            new_code = new_code.split("```html")[1].split("```")[0].strip()
        elif "```" in new_code:
            new_code = new_code.split("```")[1].split("```")[0].strip()
        
        if len(new_code) < 100:
            raise Exception("La respuesta de la IA parece incompleta o inválida.")

        with open(os.path.join(PROJECT_ROOT, "index.html"), "w", encoding="utf-8") as f:
            f.write(new_code)
        
        if repo:
            repo.index.add(["index.html"])
            repo.index.commit(f"Prompt: {request.prompt}")

        return {"status": "success", "message": "Cambios aplicados y guardados en Git."}
    except Exception as e:
        return {"status": "error", "message": f"Error Gemini: {str(e)}"}


if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
