FROM mongo

COPY articles_raw.json /articles_raw.json
CMD mongoimport --host mongo-bastos --db universidadDeBastos --collection articles --type json --file /articles_raw.json --jsonArray