const dotEnv = require('dotenv');
const prometheus = require('prom-client');
const express = require('express');
dotEnv.config();
const {getChannelCount, getMemberCount, getRoleCount, client} = require('./bot');
const app = express();

const totalMembers = new prometheus.Gauge({
    name: 'total_members',
    help: 'Total members in the server'
});

const totalChannels = new prometheus.Gauge({
    name: 'discord_total_channels',
    help: 'Total channels in the server'
});

const totalRoles = new prometheus.Gauge({
    name: 'discord_total_roles',
    help: 'Total roles in the server'
});

const httpRequestDurationMicroseconds = new prometheus.Histogram({
    name: 'discord_http_request_duration_seconds',
    help: 'Duration of HTTP requests in seconds',
    labelNames: ['method', 'route'],
    buckets: [0.1, 0.5, 1, 1.5, 2, 2.5, 3, 4, 5],
});

client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}`);
    
});


app.get('/metrics', (req, res) => {
    const end = httpRequestDurationMicroseconds.startTimer();

    totalMembers.set(getMemberCount());
    totalChannels.set(getChannelCount());
    totalRoles.set(getRoleCount());
    
    res.set('Content-Type', prometheus.register.contentType);

    // Use .then() to handle the resolved value of the Promise
    prometheus.register.metrics().then(metrics => {
        res.end(metrics);
        end({ route: req.url, method: req.method });
    }).catch(error => {
        // Handle any errors that may occur during the Promise resolution
        console.error('Error getting metrics:', error);
        res.status(500).send('Internal Server Error');
        end({ route: req.url, method: req.method });
    });
});

app.get('/', (req, res) => {
    res.send(`<a href="/metrics">Metrics</a>`);
});


app.listen(9191, () => {
    console.log('Starting exporter on port 9191');
});