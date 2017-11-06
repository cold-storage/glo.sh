# Migrate MongoDB from Heroku to Azure

If you have a relatively small MongoDB that you need to migrate from Heroku
to Azure, this will do the trick.

If you don't have MongoDB installed on your machine, but you do have 
Docker, this will get you to a bash prompt where you can run the
following commands.

```bash
docker run --name scrap_mongo --rm -it mongo bash
```

Set passwords as environment variables.

```bash
export HEROKU_PW='***'
export AZURE_PW='***'
```

Export the data from Heroku. 
Your host, port, username, password, and db will be different.

```bash
mongodump \
  --host ds163959-a0.mlab.com \
  --port 63959 \
  --username heroku_5qstnmm0 \
  --password $HEROKU_PW \
  --db heroku_5qstnmm0 \
  --excludeCollection=objectlabs-system \
  --excludeCollection=objectlabs-system.admin.collections
```

If you have junk in your Azure `somedb`, this will delete it.

```bash
mongo somedb --eval "db.dropDatabase()" \
  --host prodmongo.documents.azure.com \
  --port 10255 \
  --username prodmongo \
  --password $AZURE_PW \
  --ssl --sslAllowInvalidCertificates
```

Import the data into Azure. 
Your host, port, username, password, and db will be different.

```bash
mongorestore \
  --host prodmongo.documents.azure.com \
  --port 10255 \
  --username prodmongo \
  --password $AZURE_PW \
  --db somedb \
  --ssl --sslAllowInvalidCertificates \
  /dump/heroku_5qstnmm0
```
