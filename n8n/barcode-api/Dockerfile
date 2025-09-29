FROM node:alpine3.22
WORKDIR /usr/src/app
RUN apk add --no-cache \
    python3 \
    make \
    g++ \
    bash \
    pkgconfig \
    cairo-dev \
    pango-dev \
    giflib-dev \
    libpng-dev \
    jpeg-dev \
    freetype-dev \
    git
COPY package*.json ./
COPY tsconfig*.json ./
RUN npm install
# RUN npm install --production
COPY . .
RUN npm run build
EXPOSE 4000
CMD ["npm", "start"]