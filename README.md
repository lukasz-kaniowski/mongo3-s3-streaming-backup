# Streaming backups from Mongo v3 to s3 

Use `mongodump` to do streaming backups to aws s3. It can be used in aws lambda.


## Usage


``` js
const backupService = require('mongo3-s3-streaming-backup');

backupService.backup({
  mongoUrl: 'mongodb://user:password@host:port/dbName',
  s3Bucket: 's3-bucket-name',
  s3Prefix: 's3-file-prexix',
  callback
});

```

## Licence

MIT
