# 🌐 Universal Code Executor

> A secure, language-agnostic, zero-cost code execution platform with sandboxed runtime environments.

---

## 🚀 Overview

**Universal Code Executor** is a lightweight yet powerful platform that allows users to **write, execute, and test code across multiple programming languages** in a **fully isolated and secure environment**.

Unlike traditional online IDEs or AI-assisted editors, this project focuses on **safe execution**, **resource control**, and **environment isolation**, making it ideal for:
- Coding platforms
- Hackathons
- Learning environments
- Online assessments
- Secure code testing

---

## 🧠 Why Universal Code Executor?

Most existing platforms:
- Mix **editing + execution + AI** tightly  
- Lack strict **sandboxing**
- Are **expensive** or depend on paid APIs
- Allow security loopholes like infinite loops or fork bombs

🔹 **Universal Code Executor is execution-first**, not editor-first.

It treats code as **untrusted input** and executes it safely using **containerized runtimes**.

---

## ✨ Key Features

### 🔒 Secure Sandboxed Execution
- Each program runs inside an **isolated Docker container**
- No internet access inside execution environment
- Prevents:
  - Fork bombs
  - Infinite loops
  - File system abuse
  - Host OS access

### 🌍 Multi-Language Support
Currently supports:
- Python
- (Extendable to C, C++, Java, JS, Go, etc.)

Each language has:
- Its **own runtime image**
- Controlled memory & CPU limits

### ⚡ Resource Limiting
- ⏱ Execution timeout (prevents infinite loops)
- 🧠 Memory limit
- 🖥 CPU quota

### 📥 Input / Output Handling
- Supports **stdin-based input**
- Captures:
  - Standard Output
  - Standard Error
- Returns structured execution results

### 🧩 Modular Execution Profiles
- Language environments are defined via **profiles**
- Easy to add new languages without touching core logic

---

## 🏗 Architecture (High-Level)

Client (Web / API)
|
v
Execution API
|
v
Docker Sandbox (Per Run)
|
v
Isolated Runtime → Output / Error


---

## 🧱 Tech Stack

| Layer | Technology |
|-----|-----------|
| Backend | Python |
| Execution Engine | Docker |
| Sandbox | Linux Containers |
| Runtime Control | subprocess + Docker CLI |
| API Layer | REST-based |
| Frontend (Optional) | Monaco Editor / Web UI |

> 💡 **No paid APIs used. Fully open-source stack.**

---

## 🧪 Example Execution Flow

1. User submits code + language
2. System selects the correct runtime profile
3. Code is written to a temporary file
4. Docker container is launched with:
   - No network
   - CPU & memory limits
5. Code executes safely
6. Output is captured and returned

---

## 🔐 Security Considerations

- Containers run with:
  - `--network none`
  - Limited CPU and memory
- Execution timeout enforced
- No access to host filesystem
- Each run is **stateless**

This makes the system safe even when executing **untrusted user code**.

---

## 🆚 How Is This Different From Existing Editors?

| Feature | Traditional IDEs | Universal Code Executor |
|------|-----------------|--------------------------|
| Secure Execution | ❌ | ✅ |
| Resource Limits | ❌ | ✅ |
| Language Isolation | ❌ | ✅ |
| Editor Dependency | Heavy | Optional |
| Cost | Paid APIs | Free & Open |
| Execution Focus | Secondary | Primary |

> This project can power editors — but does not depend on one.

---

## 🧩 Extending the System

Adding a new language:
1. Create a Docker image
2. Register it in execution profiles
3. Done ✅

No core logic changes required.

---

## 📌 Use Cases

- Online Coding Platforms
- Hackathons
- University Labs
- Secure Code Testing
- Interview Platforms
- Competitive Programming Tools

---

## 🛣 Future Enhancements

- Language auto-detection
- Parallel execution support
- Persistent execution logs
- WebSocket-based real-time output
- Custom test-case evaluation
- Execution visualization

---

## 📂 Project Structure

universal-code-executor/
│
├── executor/
│ ├── runner.py
│ ├── profiles.py
│
├── api/
│ └── execute.py
│
├── docker/
│ └── python.Dockerfile


---

## 🧑‍💻 Getting Started

### Prerequisites
- Docker
- Python 3.9+

### Run Locally
```bash
python main.py
🤝 Contributions

Contributions are welcome!
Feel free to open issues or submit PRs for:

New languages

Security improvements

Performance optimizations

📜 License

**MIT License
Free to use, modify, and distribute.**
```


⭐ Final Note

Universal Code Executor is designed with one philosophy:

Code execution should be powerful — but never unsafe.
