import express from 'express';
import { dialogflowFulfillmentWebhook } from '../controllers/dialogflowFulfillmentWebhook'
import { importJsonResponse } from '../controllers/importJsonResponse'
//import jsonParser from 'body-parser'
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});

// Fulfillment Dialogflow Webhook
router.post('/webhook', dialogflowFulfillmentWebhook);

// Add response database 
router.get('/addResponseToDb', importJsonResponse)

module.exports = router;
