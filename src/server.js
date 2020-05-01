const express = require('express');
const http = require('http');
const bodyParser = require('body-parser');
const cors = require('cors');
const { data, updateBudget } = require('./mockData');

const { PORT } = process.env;
const port = PORT || 5000;

const app = express();
const server = http.createServer(app);

app.use(bodyParser.json());
const corsOptions = {
  origin: 'http://localhost:3000',
  methods: 'GET, POST',
};
app.use(cors(corsOptions));

server.listen(port, () => {
  console.log(`Listening at ${port}`);
});

app.get('/customers', (req, res) => {
  res.send(data);
});

app.post('/updateBudget', (req, res) => {
  const { id, newBudget } = req.body;
  try {
    const updatedCustomerData = updateBudget(id, newBudget);
    res.status(200).send(updatedCustomerData);
  } catch (error) {
    res.status(403).send(error.message);
  }
});
