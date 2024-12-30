# Facebook Chatbot Webhook Template

This is a simple template for integrating a Facebook Messenger chatbot with Dialogflow using Node.js and Express. It provides an easy-to-use webhook for handling Facebook Messenger events and responding with Dialogflow's natural language processing.

## Features
- Facebook Messenger webhook that listens for incoming messages.
- Integration with Dialogflow to handle user queries.
- Sends Dialogflow's responses back to users on Facebook Messenger.

## Requirements
- A Facebook Developer account and a Facebook page
- Dialogflow account and a service account key
- Facebook Messenger access token and verify token
- A Google Cloud project for Dialogflow

## Prerequisites
1. **Node.js & NPM**: Ensure you have Node.js installed. You can download it from [here](https://nodejs.org/).
2. **Dialogflow Account**: Create a Dialogflow agent by following the guide [here](https://dialogflow.cloud.google.com/). 
3. **Facebook Developer Account**: Set up a Facebook Developer account by visiting [Facebook for Developers](https://developers.facebook.com/). Create a Facebook app, get the Page access token, and set up a webhook.
4. **Google Cloud Service Account Key**: Create a service account in your Google Cloud Console and download the JSON key.

## Setup Instructions

1. **Clone the Repository:**
   Clone this repository to your local machine:
Install Dependencies: Install the necessary packages using npm:
npm install
Set up Environment Variables: You need to replace the placeholder variables in the index.js file with your actual credentials:

Google Cloud Project ID: In the projectId variable, replace '' with your Dialogflow Google Cloud project ID.
Dialogflow Service Account JSON: Place your Google service account key JSON file in the project directory and set the path in the following line:
js
process.env.GOOGLE_APPLICATION_CREDENTIALS = 'googleapplicationkey.json';  // Correct path to your service account JSON
Facebook Access Token: Replace '' with your Facebook Page's access token.
Verification Token: Replace '' with your custom webhook verification token.
Run the Webhook Server: Run the server locally using the following command:
node index.js

Configure Webhook in Facebook Developer Console:

Go to the Facebook Developer Console.
Select your app and navigate to the Messenger section.
Under Webhooks, add your webhook URL, which is typically https://your-server.com/webhook (if deploying online).
Use the verification token you set earlier to verify the webhook.
Test the Chatbot:

Send messages to your Facebook page, and the chatbot should respond based on Dialogflow's responses.
