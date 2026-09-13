FROM node:20-alpine

WORKDIR /app

COPY package*.json ./
ENV HUSKY=0
RUN npm ci

COPY . .

ENTRYPOINT ["npm", "start", "--"]