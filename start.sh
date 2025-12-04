#!/bin/sh

# 启动后端Node.js服务
node /app/dist/server.js &

# 等待后端服务启动
sleep 5

# 启动Nginx
nginx -g "daemon off;"