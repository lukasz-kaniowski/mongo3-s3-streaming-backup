const { spawn } = require('child_process');
const parseMongoUrl = require('parse-mongo-url');
const AWS = require('aws-sdk');
const s3 = new AWS.S3();

function backup({ mongoUrl, s3Bucket, s3Prefix, callback }) {

  const key = `${s3Prefix}${new Date().toISOString()}.gzip`;
  const mongoParams = parseMongoUrl(mongoUrl);

  const mongoDumpReadStream = spawn(`${__dirname}/vendor/mongodump-3.4.6-amazon`,
    [
      '--archive', '--gzip',
      '-d', mongoParams.dbName,
      '-u', mongoParams.auth.user,
      '-p', mongoParams.auth.password,
      '-h', `${mongoParams.servers[0].host}:${mongoParams.servers[0].port}`
    ]
  );

  const s3Params = { Bucket: s3Bucket, Key: key, Body: mongoDumpReadStream.stdout };
  s3.upload(s3Params, callback);
}

module.exports = { backup };
