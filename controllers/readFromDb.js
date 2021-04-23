import * as admin from 'firebase-admin';
import * as serviceAccount from '../helpers/test-dphgsx-ce227079a2bc.json';

admin.initializeApp({
	credential: admin.credential.cert(serviceAccount)
});

let db = admin.firestore();

exports.database = db;

exports.getResponseWhatIntent = async (eRequest, eWhat) => {
	let response = [];
	console.log("iWhatIntent")
	for (let request of eRequest) {

		const getResponse = await db.collection('responses').where('intent', '==', 'iWhat').where('parameters.eRequest', '==', request).where(`parameters.${eWhat}`, '==', true).get()
			.then(snapshot => {
				snapshot.forEach((doc) => {
					response.push(doc.data());
				})
			}).catch((err) => {
				console.log(err);
			});

	}
	return response;
}

exports.getResponseCompareIntent = async (eRequest, compare1, compare2) => {

	console.log("iCompareIntent")

	let response = [];
	console.log(eRequest, compare1, compare2)
	if (eRequest[0] == "compare") {

		let getResponse = await db.collection('responses').where('intent', '==', 'iCompare').where(`parameters.eRequest`, '==', "same").where(`parameters.${compare1}`, '==', true).where(`parameters.${compare2}`, '==', true).get()
			.then(snapshot => {
				snapshot.forEach((doc) => {
					response.push(doc.data());
				})
			}).catch((err) => {
				console.log(err);
			});
		getResponse = await db.collection('responses').where('intent', '==', 'iCompare').where(`parameters.eRequest`, '==', "different").where(`parameters.${compare1}`, '==', true).where(`parameters.${compare2}`, '==', true).get()
			.then(snapshot => {
				snapshot.forEach((doc) => {
					response.push(doc.data());
				})
			}).catch((err) => {
				console.log(err);
			});
	} else {
		for (let request of eRequest) {

			const getResponse = await db.collection('responses').where('intent', '==', 'iCompare').where(`parameters.eRequest`, '==', request).where(`parameters.${compare1}`, '==', true).where(`parameters.${compare2}`, '==', true).get()
				.then(snapshot => {
					snapshot.forEach((doc) => {
						response.push(doc.data());
					})
				}).catch((err) => {
					console.log(err);
				});
		}

	}

	return response;
}