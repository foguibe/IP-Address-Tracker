const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const axios = require('axios');
let refresh = 0;

// Serve static files from the "public" directory, and set the view engine to "ejs"
app.use(express.static('public'));
app.set('view engine', 'ejs');

async function getExternalIpAddress() {
    try {
        const response = await axios.get('https://httpbin.org/ip');
        return response.data.origin;
    } catch (error) {
        throw new Error('Unable to retrieve external IP address.');
    }
}

async function getGeoLocationData(ipAddress) {
    try {
        const URL = 'https://ipgeolocation.abstractapi.com/v1/?api_key=df2735123c044148ad012bc6ad75cf80&ip_address=' + ipAddress;
        const response = await axios.get(URL);
        return response.data;
    } catch (error) {
        throw new Error('Unable to retrieve geolocation data.');
    }
}

app.get('/', async (req, res) => {
    try {
        const ipAddress = await getExternalIpAddress();
        const data = await getGeoLocationData(ipAddress);

        // Initialize variables with default values
        const address = ipAddress || 'N/A';
        const country = data.country || 'N/A';
        const region = data.region || 'N/A';
        const timezone = data.timezone?.abbreviation || 'N/A';
        const time = data.timezone?.current_time || 'N/A';
        const isp = data.connection?.isp_name || 'N/A';
        const latitude = data.latitude || 'N/A';
        const longitude = data.longitude || 'N/A';

        res.render('index', { address, country, region, timezone, time, isp, latitude, longitude});
    } catch (error) {
        res.status(500).send('Internal Server Error');
    }
});

app.get('/result', async (req, res) => {
    try {
        let ipAddress = req.query.ip_address;
        const data = await getGeoLocationData(ipAddress);

        // Initialize variables with default values
        const address = ipAddress || 'N/A';
        const country = data.country || 'N/A';
        const region = data.region || 'N/A';
        const timezone = data.timezone?.abbreviation || 'N/A';
        const time = data.timezone?.current_time || 'N/A';
        const isp = data.connection?.isp_name || 'N/A';
        const latitude = data.latitude || 'N/A';
        const longitude = data.longitude || 'N/A';

        res.render('index', { address, country, region, timezone, time, isp, latitude, longitude});

    } catch (error) {
        res.status(400).send("Invalid IP address.");
    }
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
