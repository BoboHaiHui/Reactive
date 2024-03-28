FROM node:20-alpine
RUN mkdir -p /src
WORKDIR /src
COPY . .
RUN npm install
EXPOSE 4000
CMD ["npm", "start","host","0.0.0.0"]
