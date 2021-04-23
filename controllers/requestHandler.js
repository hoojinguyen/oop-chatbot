import { responseHandler } from './responseHandler'

import { parentEntityDetect } from './entityMap'

import { getResponseWhatIntent, getResponseCompareIntent } from './readFromDb'
import { request } from 'express'



exports.Request = {
	DEFINE: "define",
	CONVENTION: "convention",
	EXAMPLE: "example",
	SPECIFICATION: "specification",
}

exports.iWhat = async parameters => {

	if (!parameters) {
		console.log("There's no parameter ! Throw Fallback !");
		return 0;
	}

	if (!parameters.eWhat) {
		console.log("There's nothing to answer ! Throw Fallback !");
		return 0;
	}
	if (!parameters.eRequest[0]) {
		parameters.eRequest = [
			"define"
		];
	}

	// if (parameters.eConnector[0] == "in") {
	// 	parameters.eWhat = parameters.eWhat.filter(parentEntity => {
	// 		return parentEntityDetect(parameters.eWhat[0], parameters.eWhat[1]);
	// 	})
	// }

	console.log(parameters.eRequest, parameters.eWhat)

	const rawResponses = await getResponseWhatIntent(parameters.eRequest, parameters.eWhat);

	return responseHandler(rawResponses);

}


exports.iCompare = async parameters => {

	if (!parameters) {
		console.log("There's no parameter ! Throw Fallback !");
		return 0;
	}

	if (!parameters.compare1) {
		console.log("There's nothing to answer ! Throw Fallback !");
		return 0;
	}


	if (parameters.eConnector[0] == "in") {
		parameters.eWhat = parameters.eWhat.filter(parentEntity => {
			return parentEntityDetect(parameters.eWhat[0], parameters.eWhat[1]);
		})
	}

	const rawResponses = await getResponseCompareIntent(parameters.eRequest, parameters.compare1, parameters.compare2);

	return responseHandler(rawResponses);

}