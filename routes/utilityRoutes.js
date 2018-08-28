const { S3 } = require('aws-sdk');
const { awsAccessKeyId, awsSecretKey } = require('../config/keys');

const s3 = new S3({
  accessKeyId: awsAccessKeyId,
  secretAccessKey: awsSecretKey,
});

const uploadImage = (app) => {
  return app.get('/api/upload', (req, res) => {
    // dummy response just to shut up the linter
    res.send(s3);
  });
};

module.exports = uploadImage;
