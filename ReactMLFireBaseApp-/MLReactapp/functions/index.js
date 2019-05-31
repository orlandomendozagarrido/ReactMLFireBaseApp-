const functions = require('firebase-functions');
const admin = require('firebase-admin');
const vision = require('@google-cloud/vision');
const visionClient =  new vision.ImageAnnotatorClient();
let Promise = require('promise');
const cors = require('cors')({ origin: true });
const request = require('request');
admin.initializeApp(functions.config().firebase);
const db = admin.firestore();


exports.addSimilarImages = functions.firestore.document('photos/{document}')
.onCreate((snap, context) => {

	console.log('SNAP', snap)
	console.log('CONTEXT', context)

	const data = snap.data();
	console.log('DATA IN IS', data)
	const photoUrl = "gs://" + data.bucket + "/" + data.fullPath;
	console.log('url is', photoUrl);

	return Promise.resolve()
	.then(() => {
		return visionClient.webDetection(photoUrl);
	})
	.then(results => {
		console.log('VISION data all is: ', results)
		const webDetection = results[0].webDetection

		let similarImages = [];
 		if (webDetection.visuallySimilarImages.length) {
			webDetection.visuallySimilarImages.forEach(image => {
			 	similarImages.push(image);
			 });
		}		

		console.log('similarImages', similarImages)

		db.collection('photos').doc(context.params.document).update({ similarImages })
		.then(res => console.log('dopples added'))
		.catch(err => console.error(err));
    
       return 
	})
	.catch(err => console.error(err));

})