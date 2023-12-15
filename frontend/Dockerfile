FROM node:16-slim

WORKDIR /app

COPY . /app

RUN npm install

RUN npm run build

RUN npm install -g serve

EXPOSE 3000

CMD ["serve", "-s", "dist", "-p", "3000"]
