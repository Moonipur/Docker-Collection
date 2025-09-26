#!/bin/bash
# Start Ollama in the background
ollama serve &

# Wait until server is ready
sleep 5

# Pull required models (only if missing)
ollama pull llama3.2:3b
ollama pull gemma3:1b
ollama pull nomic-embed-text
ollama pull deepseek-r1:1.5b

# Keep Ollama running in foreground
wait -n
