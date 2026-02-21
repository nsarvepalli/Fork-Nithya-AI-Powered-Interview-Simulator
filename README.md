# 🤖 AI-Powered Tech Interview Simulator
 
An interactive interview preparation tool powered by OpenAI's GPT-4o. Practice technical and behavioral interviews for Software Development Engineer (SDE) and Data Science roles with real-time AI feedback.
 
---
 
## 🚀 Features
 
- **Two Career Tracks** — Software Development Engineer (SDE) and Data Science
- **Three Interview Types** — Technical, Behavioral, and Mixed
- **Difficulty Levels** — Entry Level, Mid Level, and Senior Level
- **Customizable Length** — Choose between 3 to 10 questions per session
- **Real-time AI Feedback** — Get constructive feedback after every answer
- **Final Evaluation** — Receive an overall performance summary at the end
 
---
 
## 🛠️ Tech Stack
 
- **Frontend/UI** — Streamlit
- **LLM Backend** — OpenAI GPT-4o via API
- **Language** — Python 3.12
- **Environment Management** — python-dotenv
 
---
 
## ⚙️ Installation & Setup
 
### 1. Clone the repository
```bash
git clone git@github.com:Hemin-Dhamelia/AI-Powered-Interview-Simulator.git
cd AI-Powered-Interview-Simulator
```
 
### 2. Install dependencies
```bash
pip install -r requirements.txt
```
 
### 3. Set up your API key
Create a `.env` file in the root directory:
```
OPENAI_API_KEY=your_openai_api_key_here
```
Get your API key from [platform.openai.com/api-keys](https://platform.openai.com/api-keys)
 
### 4. Run the app
```bash
streamlit run app.py
```
 
Then open [localhost:8501](http://localhost:8501) in your browser.
 
---
 
## 📸 Usage
 
1. Select your **Career Track**, **Interview Type**, and **Difficulty** from the sidebar
2. Choose the number of questions
3. Click **🚀 Start Interview**
4. Type your answers in the chat input
5. Receive feedback after each answer
6. Get your final evaluation at the end
 
---
 
## 📁 Project Structure
 
```
AI-Powered-Interview-Simulator/
├── app.py              # Main Streamlit application
├── requirements.txt    # Python dependencies
├── .env                # API key (not tracked by git)
└── .gitignore          # Git ignore rules
```
 
---
 
## 📚 Course Context
 
This project was developed as part of **INFO 6215 - Business Analysis and Information Engineering** at **Northeastern University**, focusing on practical applications of Large Language Models and prompt engineering in real-world software tools.
 
---
 
## ⚠️ Disclaimer
 
Never commit your `.env` file or share your API key publicly. The `.gitignore` is configured to exclude it automatically.
 
---
 
## 👤 Author
 
**Nithya Sarvepalli** — Northeastern University  
[GitHub](https://github.com/nsarvepalli)