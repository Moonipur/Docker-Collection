sudo docker run -d \
    --name n8n  -p 5678:5678  \
    -e GENERIC_TIMEZONE="Asia/Bangkok"  \
    -e TZ="Asia/Bangkok"  \
    -e N8N_ENFORCE_SETTINGS_FILE_PERMISSIONS=true  \
    -e N8N_RUNNERS_ENABLED=true  \
    -e DB_TYPE=postgresdb  \
    -e DB_POSTGRESDB_DATABASE=n8n_db  \
    -e DB_POSTGRESDB_HOST=172.30.149.151  \
    -e DB_POSTGRESDB_PORT=5432  \
    -e DB_POSTGRESDB_USER=postgres  \
    -e DB_POSTGRESDB_SCHEMA=n8n_schema  \
    -e DB_POSTGRESDB_PASSWORD=moonipur148  \
    -e N8N_BLOCK_ENV_ACCESS_IN_NODE=false \
    -e N8N_SECURE_COOKIE=false \
    -e N8N_EDITOR_BASE_URL="https://truman-unexercisable-brielle.ngrok-free.dev"\
    -e WEBHOOK_URL="https://truman-unexercisable-brielle.ngrok-free.dev"\
    -v n8n_data:/home/node/.n8n  docker.n8n.io/n8nio/n8n


sudo docker run --net=host -d \
    --name ngrok\
    -e NGROK_AUTHTOKEN=338nmwmpQdRAd17LSRQXe2t6foy_2HgiKA6tD3PiQR2k6Q3Dm \
    ngrok/ngrok:latest http --url=truman-unexercisable-brielle.ngrok-free.dev \
    5678


sudo docker run -d -p 11434:11434 --name ollama ollama/ollama
# sudo docker exec -it ollama ollama pull llama3.2
# sudo docker exec -it ollama ollama run llama3.2