FROM node:10.13.0

CMD ["/bin/bash"]

WORKDIR /usr/src/bastosBackEnd


COPY ./ ./ 


RUN npm install 
EXPOSE 3001

