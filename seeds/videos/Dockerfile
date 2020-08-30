FROM mongo

COPY videos.json /videos.json
CMD mongoimport --host mongo-bastos --db universidadDeBastos --collection videos --type json --file /videos.json --jsonArray