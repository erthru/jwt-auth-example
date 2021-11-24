FROM node:alpine
WORKDIR /app
COPY . .
RUN npm ci
CMD ["npm", "start"]