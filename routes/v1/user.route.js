const express = require('express');
const getUsers = require ('../../user.js');

let users;

getUsers((data) =>{
    users = data;
},(error)=>{
    
}
)

const router = express.Router();

router.get('/all', (req, res) =>{
  const {limit} = req.query;
  res.status(200).send({
    status: 'Success',
    data:users.slice(0, limit)
  });
});
