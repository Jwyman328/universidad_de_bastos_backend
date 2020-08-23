FROM mongo

COPY notes.json /notes.json
CMD mongoimport --host mongo-bastos --db universidadDeBastos --collection notes --type json --file /notes.json --jsonArray