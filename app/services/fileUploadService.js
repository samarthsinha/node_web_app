var admin = require("firebase-admin");

var serviceAccount = process.env.GOOGLE_CREDENTIALS;
var googleStorageDb = process.env.GOOGLE_STORAGE_DB;
var bucketName = process.env.GOOGLE_STORAGE_BUCKETNAME;

let app = null;

exports.uploadFile = async (fileName,generatedFileName) => {
    if(!app){
        app = admin.initializeApp({
            credential: admin.credential.cert(JSON.parse(serviceAccount)),
            databaseURL: googleStorageDb,
            storageBucket:bucketName
        });
        console.log("File Storage config done");
    }


    var bucket = admin.storage().bucket();
    bucket.getFiles(fileName);
    // Uploads a local file to the bucket
    let uploadResponse = await bucket.upload(fileName, {
        // Support for HTTP requests made with `Accept-Encoding: gzip`
        gzip: true,
        // By setting the option `destination`, you can change the name of the
        // object you are uploading to a bucket.
        destination:generatedFileName?generatedFileName:fileName,
        metadata: {
            // Enable long-lived HTTP caching headers
            // Use only if the contents of the file will never change
            // (If the contents will change, use cacheControl: 'no-cache')
            cacheControl: 'public, max-age=31536000',
        },
    });
    let data = {};
    if(uploadResponse && uploadResponse.length>1){
        data = uploadResponse[1];
        return `https://storage.googleapis.com/${data.bucket}/${data.name}`;
    }
    return null;
};
