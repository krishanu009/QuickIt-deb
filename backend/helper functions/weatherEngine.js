const tf = require('@tensorflow/tfjs-node');
const express = require('express');
const axios = require('axios');
const fs = require('fs');
const path = require('path');

const app = express();
const port = 3001;

// Replace with your OpenWeatherMap API key
const weatherAPIKey = '2452f8d9744fe86c012f56072037ab47';

// Sample training data
const trainingData = [
    { temp: 5, condition: 0, food: [1, 0, 0] }, // cold -> soup
    { temp: 30, condition: 1, food: [0, 1, 0] }, // hot -> ice cream
    { temp: 15, condition: 2, food: [0, 0, 1] }, // rainy -> ramen
];

// Convert the data to tensors
const xs = tf.tensor2d(trainingData.map(item => [item.temp, item.condition]));
const ys = tf.tensor2d(trainingData.map(item => item.food));

// Define the model
const model = tf.sequential();
model.add(tf.layers.dense({ inputShape: [2], units: 10, activation: 'relu' }));
model.add(tf.layers.dense({ units: 10, activation: 'relu' }));
model.add(tf.layers.dense({ units: 3, activation: 'softmax' }));

model.compile({ optimizer: 'adam', loss: 'categoricalCrossentropy', metrics: ['accuracy'] });

// Check if the model has already been trained and saved
const modelPath = path.join(__dirname, 'my-model');

if (fs.existsSync(modelPath)) {
    // Load the model if it already exists
    tf.loadLayersModel(`file://${modelPath}/model.json`).then((loadedModel) => {
        global.model = loadedModel;
        console.log('Model loaded successfully');
    }).catch((error) => {
        console.error('Failed to load the model:', error);
    });
} else {
    // Train and save the model
    model.fit(xs, ys, { epochs: 100 }).then(() => {
        model.save(`file://${modelPath}`).then(() => {
            console.log('Model trained and saved successfully');
            global.model = model;
        }).catch((error) => {
            console.error('Failed to save the model:', error);
        });
    }).catch((error) => {
        console.error('Failed to train the model:', error);
    });
}

// Define an API endpoint to get food recommendations
app.get('/getRecommendation', async (req, res) => {
    const location = req.query.location || 'New York';
    const weatherData = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${weatherAPIKey}`);
    const temperature = weatherData.data.main.temp - 273.15; // Convert Kelvin to Celsius
    const weatherCondition = weatherData.data.weather[0].main.toLowerCase();

    // Encode the weather condition as a number
    const conditionNumber = weatherCondition === 'clear' ? 1 : weatherCondition === 'rain' ? 2 : 0;

    // Predict the food using the loaded model
    const inputTensor = tf.tensor2d([[temperature, conditionNumber]]);
    const prediction = global.model.predict(inputTensor);
    const predictedIndex = prediction.argMax(1).dataSync()[0];

    const foodMapping = ['Soup', 'Ice Cream', 'Ramen'];
    const recommendedFood = foodMapping[predictedIndex];

    res.json({ recommendation: recommendedFood });
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
