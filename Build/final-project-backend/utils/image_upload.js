// Go to https://www.npmjs.com/package/multer-s3 to get the multer code

// This is to connect to s3. You'll need to install this so go to here: 
// https://docs.aws.amazon.com/AWSJavaScriptSDK/v3/latest/clients/client-s3/index.html
// npm install @aws-sdk/client-s3
const { S3Client } = require('@aws-sdk/client-s3')
const multerS3 = require('multer-s3')

const multer = require('multer');
const path = require('path');

let storage;

// The if statement is to check to see if it's S3 or something else
if (process.env.STORAGE_ENGINE === 'S3') {
    const s3 = new S3Client({
        region: process.env.AWS_REGION,
        credentials: {
            accessKeyId: process.env.AWS_ACCESS_KEY_ID,
            secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
        }
    });

    // adding this from multer s-3 with adjustments. It was changed as a multer method was being exported twice
    storage = multerS3({
        s3: s3,
        bucket: process.env.AWS_BUCKET,                 // gets the bucket name
        // acl: 'public-read',
        contentType: multerS3.AUTO_CONTENT_TYPE,
        metadata: function (req, file, cb) {
            cb(null, { fieldName: file.fieldname });
        },
        key: function (req, file, cb) {
            cb(null, Date.now() + path.extname(file.originalname))
        }
    });
}
else {
    //stores it in the disk storage if s3 is unavailable
    storage = multer.diskStorage({
        destination: (req, file, cb) => {
            cb(null, 'public' + process.env.STATIC_FILES_URL);
        },
        filename: (req, file, cb) => {
            console.log(file.path);
            console.log(file.originalname);

            cb(null, Date.now() + path.extname(file.originalname));
        }
    });
};

// from multer s-3. We pass in details (region, credentials etc.) in an object
const fileFilter = (req, file, cb) => {

    if (!file) {
        req.imageError = "Image not uploaded!";
        return cb(null, false);
    }
    else if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
        req.imageError = "Image must be jpg|jpeg|png|gif";
        return cb(null, false);
    }

    cb(null, true);
};

module.exports = multer({ fileFilter, storage });