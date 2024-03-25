FROM node:20-alpine
RUN mkdir -p /app
WORKDIR /app
# COPY package.json /app
RUN npm install -g @angular/cli
# COPY . /app
EXPOSE 4200
CMD ["ng","serve","--host", "0.0.0.0"]