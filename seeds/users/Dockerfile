FROM mongo

COPY users.json /users.json
CMD mongoimport --host mongo-bastos --db universidadDeBastos --collection users --type json --file /users.json --jsonArray