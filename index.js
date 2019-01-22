const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const { MongoClient } = require('mongodb');

const dbUsername = 'marcus';
const dbPassword = '123456a';
const dbName = 'hackatown2019';
const url = `mongodb://${dbUsername}:${dbPassword}@ds161764.mlab.com:61764/${dbName}`;

let db;
const app = express();
app.use(cors());
app.use(bodyParser.json());

MongoClient.connect(
  url,
  (err, client) => {
    db = client;
  },
);

const port = process.env.PORT || 3000;

app.get('/locations', (req, res) => {
  db.db()
    .collection('locations')
    .find()
    .toArray()
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      console.log('location an error occurred', err);
    });
});

app.get('/activities', (req, res) => {
  db.db()
    .collection('activities')
    .find()
    .toArray()
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      console.log('activities an error occurred', err);
    });
});

app.post('/activity', (req, res) => {
  const newActivity = req.body.activity;
  db.db()
    .collection('activities')
    .insert(newActivity)
    .then(() => {
      res.send('inserted successfully');
    })
    .catch((error) => {
      console.log(error, 'an error occured');
    });
});

app.listen(port, () => console.log(`listening on port ${port}!`));
