const { S3 } = require('aws-sdk');
const uuid = require('uuid/v1');
const { awsAccessKeyId, awsSecretKey, awsBucketName } = require('../config/keys');
const requireLogin = require('../middlewares/requireLogin');

const s3 = new S3({
  accessKeyId: awsAccessKeyId,
  secretAccessKey: awsSecretKey,
});

const uploadImage = (app) => {
  return app.get('/api/upload', requireLogin, (req, res) => {
    const key = `${req.user.id}/${uuid()}.jpeg`;

    s3.getSignedUrl('putObject', {
      Bucket: awsBucketName,
      Key: key,
      ContentType: 'image/jpeg',
    }, (err, url) => {
      res.send({ key, url });
    });
  });
};

module.exports = uploadImage;
