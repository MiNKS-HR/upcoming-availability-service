FROM node:8.9.4
RUN mkdir -p /user/src/available
WORKDIR /user/src/available
RUN ls
COPY . /user/src/available
RUN ls
RUN npm install
EXPOSE 3002
CMD npm run docker