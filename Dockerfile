# Gunakan gambar Node.js sebagai gambar dasar
FROM node:16-alpine

# Set working directory
WORKDIR /app

# Salin package.json dan package-lock.json ke direktori kerja
COPY package*.json ./

# Install dependensi
# RUN npm i

# Salin kode backend Anda ke dalam kontainer
COPY . .

# Port yang digunakan oleh backend
# EXPOSE 3000

# Perintah untuk menjalankan backend (sesuaikan dengan aplikasi Anda)

RUN npm install -g nodemon
RUN npm install
RUN chmod +x /app/node_modules/.bin/ts-node

#Give the path of your endpoint
# ENTRYPOINT ["nodemon", "ts-node src/index.ts"]  
USER node
CMD ["npx", "nodemon", "--exec", "ts-node", "src/index.ts"]

