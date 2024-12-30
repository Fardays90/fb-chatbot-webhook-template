const express = require('express');
const bodyParser = require('body-parser');
const request = require('request');
const dialogflow = require('@google-cloud/dialogflow');
const uuid = require('uuid');
process.env.GOOGLE_APPLICATION_CREDENTIALS = 'googleapplicationkey.json';  // Use the correct path to your service account file
// Initialize Express app
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Set up the server
const server = app.listen(process.env.PORT || 5000, () => {
    console.log('Server running on port %d in %s mode', server.address().port, app.settings.env);
});

// Set up Dialogflow session client
const sessionClient = new dialogflow.SessionsClient();
const projectId = '';  // Replace with your project ID
const sessionId = uuid.v4();

// Function to send messages
async function sendMessage(event) {
    const sender = event.sender.id;
    const text = event.message.text;

    // Construct the session path for Dialogflow
    const sessionPath = sessionClient.projectAgentSessionPath(projectId, sessionId);

    // Prepare the request for Dialogflow
    const requestD = {
        session: sessionPath,
        queryInput: {
            text: {
                text: text,
                languageCode: 'en',  // Adjust language code if necessary
            },
        },
    };

    try {
        // Send request to Dialogflow
        const responses = await sessionClient.detectIntent(requestD);
        const result = responses[0].queryResult;
        const aiText = result.fulfillmentText;  // The text response from Dialogflow

        // Send response to Facebook Messenger
        request({
            url: 'https://graph.facebook.com/v16.0/me/messages', 
            qs: { access_token: '' },  // Replace with your Facebook Page token
            method: 'POST',
            json: {
                recipient: { id: sender },
                message: { text: aiText },
            },
        }, function (error, response) {
            if (error) {
                console.error('Error sending message:', error);
            } else if (response.body.error) {
                console.error('Error in response:', response.body.error);
            }
        });

    } catch (error) {
        console.error('Error communicating with Dialogflow:', error);
    }
}

// Facebook Webhook Validation
app.get('/webhook', (req, res) => {
    const VERIFY_TOKEN = '';  // Replace with your verification token
    if (req.query['hub.mode'] === 'subscribe' && req.query['hub.verify_token'] === VERIFY_TOKEN) {
        console.log('Webhook verified.');
        res.status(200).send(req.query['hub.challenge']);
    } else {
        console.error('Verification failed.');
        res.status(403).end();
    }
});

// Handling incoming Facebook messages
app.post('/webhook', (req, res) => {
    if (req.body.object === 'page') {
        req.body.entry.forEach((entry) => {
            entry.messaging.forEach((event) => {
                if (event.message && event.message.text) {
                    sendMessage(event);
                }
            });
        });
        res.status(200).end();
    } else {
        res.status(404).end();
    }
});
