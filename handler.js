'use strict';
const AWS = require('aws-sdk');
const PDFDocument = require('pdfkit');

exports.hello = async (event) => {
  const s3 = new AWS.S3();
  const doc = new PDFDocument;
  let buffers = [];
  doc.on('data', buffers.push.bind(buffers));
  doc.on('end', () => {
    let pdfData = Buffer.concat(buffers);

    var params = {
      Bucket: 'pdfreceiptbucketforiicnose',
      Key: 'boleta.pdf',
      Body: pdfData,
      ContentType: 'application/pdf',
      ACL: 'public-read'
    };
    
    // s3.upload(params, function(err, data) {
    //   if (err) {
    //     return {
    //       statusCode: 500,
    //       body: JSON.stringify({
    //         message: 'Error occurred while trying to upload to S3',
    //         error: err
    //       }, null, 2)
    //     };
    //   } else {
    //     return {
    //       statusCode: 200,
    //       body: JSON.stringify({
    //         message: 'Successfully uploaded to S3',
    //         url: data.Location
    //       }, null, 2)
    //     };
    //   }
    // });
    return {
      statusCode: 200,
      body: JSON.stringify({
        message: 'Se creo el pdf pero no se pudo subir a s3'
      }, null, 2)
    }; 
  });

  doc.text('Hello World!');
  doc.end();
};