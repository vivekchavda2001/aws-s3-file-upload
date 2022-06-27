require('dotenv').config()
const S3 = require('aws-sdk/clients/s3')
const fs = require('fs')
const bucketName = process.env.AWS_BUCKET_NAME
const bucketRegion = process.env.AWS_BUCKET_REGION
const bucketAccessKey = process.env.AWS_ACCESS_KEY_ID
const bucketSecretAccessKey = process.env.AWS_SECRET_KEY

const s3 = new S3({
    region:bucketRegion,
    accessKeyId:bucketAccessKey,
    secretAccessKey:bucketSecretAccessKey
})

//upload file to s3
const fileUpload = (file)=>{
console.log(bucketName,bucketRegion)
    const fileStream = fs.createReadStream(file.path)
    const uploadParams = {
        Bucket: bucketName,
        Body: fileStream,
        Key:file.filename
    }
    return s3.upload(uploadParams).promise() // will upload file to S3
}

//Downlaod File from S3 bucket
const getFileStream = (fileKey)=>{
    const downloadParams = {
        Key: fileKey,
        Bucket: bucketName
    }
    return s3.getObject(downloadParams).createReadStream();
}

//Downlaod File from S3 bucket
const deleteFileStream = (fileKey)=>{
    const deleteParams = {
        Key: fileKey,
        Bucket: bucketName
    }
    return s3.deleteObject(deleteParams).promise() // will delete
}


module.exports = {fileUpload,getFileStream,deleteFileStream}
