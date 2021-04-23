import { WebhookClient } from 'dialogflow-fulfillment';
import { iWhat, iCompare } from './requestHandler'



exports.dialogflowFulfillmentWebhook = async (req, res) => {

	// Parse the request body from the POST
	const agent = new WebhookClient({ request: req, response: res });

	//Handler for Fallback Intent
	const fallback = () => {
		res.sendStatus(400).send("No response for this request ! Throw to Fallback intent !")
	}

	// Add respone to return for Dialogflow
	const addResponse = responses => {
		if (responses.length == 0) {
			return false;
		}
		for (let response of responses) {
			console.log(response)
			agent.add(response)
		}
		return true;

	}

	// Handler for iWhat intent
	const iWhatHandler = async () => {
		try {
			const responses = await iWhat(agent.parameters);
			if (!addResponse(responses)) {
				return fallback;
			}
			agent.setContext({ name: "iwhat-extra", lifespan: 10, parameters: agent.parameters });


		} catch (err) {
			console.log(err);
			return fallback;
		}

	}

	// Handler for iWhatExtra intent
	const iWhatExtraHandler = async () => {
		try {
			const extraContext = agent.getContext("iwhat-extra");
			const responses = await iWhat(extraContext.parameters);
			addResponse(responses);
		} catch (err) {
			console.log(err);
			return fallback;
		}
	}

	// Handler for iCompare intent
	const iCompareHandler = async () => {
		try {
			const responses = await iCompare(agent.parameters);
			if (!addResponse(responses)) {
				return fallback;
			}
		} catch (err) {
			console.log(err);
			return fallback;
		}

	}

	let intentMap = new Map();


	//Set handler for each Intent
	intentMap.set('iWhat', iWhatHandler)
	intentMap.set('iWhat-Extra', iWhatExtraHandler)
	intentMap.set('iCompare', iCompareHandler)


	agent.handleRequest(intentMap);

}
