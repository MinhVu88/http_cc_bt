const express = require('express');
const path = require('path');
const port = process.env.PORT || 5000;

const app = express();

app.use(express.static('./public'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));

app.get('/', (req, res, next) => {
  // res.send('http crash course 2019 - bt');

  // res.send('<h1>http crash course 2019 - bt</h1>');

  // res.send({msg: 'http crash course 2019 - bt'});
  // res.json({msg: 'http crash course 2019 - bt'});
  
  // res.send(req.header('host'));
  // res.send(req.header('user-agent'));
  res.send(req.rawHeaders);
});

app.post('/contact', (req, res, next) => {
  // res.send(req.body);
  // res.send(req.header('Content-Type'));

  if(!req.body.email) {
    return res.status(400).send('email is required');
  }

  res.status(201).send(`Email: ${req.body.email}`);
});

app.post('/login', (req, res, next) => {
  if(!req.header('x-auth-token')) {
    return res.status(400).send('no token found');
  }

  if(req.header('x-auth-token') !== '123456') {
    return res.status(401).send('unauthorized token');
  }

  res.send('logged in');
});

app.put('/post/:id', (req, res, next) => {
  // req.params.id provides access to ":id" in the url
  res.json({
    id: req.params.id,
    title: req.body.title
  });
});

app.delete('/post/:id', (req, res, next) => {
  res.json({msg: `post ${req.params.id} removed`});
});

app.listen(port, () => console.log(`the server is listening on port ${port}`));