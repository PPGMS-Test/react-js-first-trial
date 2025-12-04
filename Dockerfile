# 多阶段构建 Dockerfile - 集成前后端

# 构建后端阶段
FROM node:20-alpine AS backend-builder

WORKDIR /app

# 复制后端项目文件
COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build

# 生产阶段
FROM node:20-alpine AS production

# 安装 nginx
RUN apk add --no-cache nginx

# 设置工作目录
WORKDIR /app

# 设置 nginx 配置
RUN rm -rf /etc/nginx/http.d/default.conf
COPY nginx.conf /etc/nginx/nginx.conf

# 复制后端依赖
COPY package*.json ./
RUN npm install --omit=dev && npm cache clean --force

# 从后端构建阶段复制编译后的文件
COPY --from=backend-builder /app/dist ./dist

# 复制静态文件
COPY public ./public

# 复制环境变量文件
COPY .env /app/.env

# 创建日志目录
RUN mkdir -p /var/log/nginx

# 暴露端口 (80 用于 Web 访问)
EXPOSE 80

# 启动脚本
COPY start.sh /app/start.sh
RUN chmod +x /app/start.sh

CMD ["/app/start.sh"]