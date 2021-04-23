import * as jsonResponse from '../response.json'
import { database } from '../controllers/readFromDb'

exports.view = (req, res) => {
	res.render('addJSONResponse');
}

exports.importJsonResponse = async (req, res) => {

	if (!jsonResponse) {
		console.log("Nothing in JSON file !")
		return 0;
	}
	try {
		for (let index in jsonResponse) {
			if (index == "default") continue;
			let response = jsonResponse[index];
			let addDoc = await database.collection("responses").add(response)
				.then(ref => {
					console.log("Added ", ref.id);
				})
		}
		res.sendStatus(200);

	} catch (err) {
		console.log(err);
	}
}