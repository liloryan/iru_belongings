# Dockerfile
 
FROM node:16-alpine
 
RUN npm install -g pnpm
 
WORKDIR /app
COPY package.json pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile

 
COPY . .
RUN npx prisma generate

RUN pnpm build
 
EXPOSE 3000
CMD ["node", "build"]

#docker run -p 3000:3000 -e DATABASE_URL="file:./dev.db" -e  ORIGIN="http://localhost:3000" liryan/iru_belongings