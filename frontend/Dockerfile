FROM node:16-slim

WORKDIR /app

COPY ./dist /app

RUN npm install -g serve

EXPOSE 3000

CMD ["serve", "-s", "dist", "-p", "3000"]
