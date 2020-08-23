FROM mongo

COPY books.json /books.json
CMD mongoimport --host mongo-bastos --db universidadDeBastos --collection books --type json --file /books.json --jsonArray