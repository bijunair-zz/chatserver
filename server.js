// server.js
require('dotenv').config();
const express = require('express');
const axios = require('axios');
const cors = require('cors');


const app = express();
const port = process.env.PORT || 3001;

app.use(cors()); // Enable CORS for all routes
app.use(express.json());

app.post('/api/sendMessage', async (req, res) => {
  try {
    const message = JSON.stringify(req.body);
    console.log('env', process.env.AZURE_AI_API_KEY);

    // Replace 'YOUR_AZURE_API_ENDPOINT' and 'YOUR_AZURE_API_KEY' with your actual values
    const azureApiEndpoint = process.env.AZURE_END_POINT_URL;
    const azureApiKey = process.env.AZURE_AI_API_KEY;
    const response = await axios.post(azureApiEndpoint,  message , {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${azureApiKey}`,
        'azureml-model-deployment': 'nmgchatbot',
      },
    });

    res.json(response.data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
