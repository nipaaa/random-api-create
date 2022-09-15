const express = require('express');
const getUsers = require ('../../user.js');

let users;

getUsers((data) =>{
    users = data;
},(error)=>{
    
}
)

const router = express.Router();
