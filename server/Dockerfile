FROM node:16
WORKDIR /usr/src/app

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json ./

RUN npm install
# If you are building your code for production
# RUN npm ci --only=production

# Bundle app source
COPY . .

# ****Levantar con *********
# sudo docker build . -t snapnode:snapnode
# docker run --name snapnode -p 3333:3000 -d snapnode:snapnode

EXPOSE 3000
CMD [ "node", "server.js" ]
