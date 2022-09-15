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

router.get('/random', (req, res) =>{
  const randomNumber = Math.random() * users.length;

  const randomIntegerNumber = Math.ceil(randomNumber);
  const randomUser = users.find(user => user.id === randomIntegerNumber)
  res.status(200).send({
    status:'Success',
    data: randomUser,
  });
});

router.post('/save', (req, res) => {
    const newUser = req.body;
    const {id, gander, contact, name, address, photoUrl} = newUser;
    if(gander && name && address && photoUrl && contact){
        users.push(newUser);
        res.status(200).send({
            status:'Success',
            data: users,
          });
    }
    else{
        res.status(403).send({
            status: 'Forbiden',
            message: 'Please input all the recomended value'})
    }

});

router.patch('/update', (req, res) =>{
    const updatedInfo = req.body;
    
    if(Number(updatedInfo.id)){
        const updatedUser = users.find(user => user.id === Number(updatedInfo.id));
        
        updatedUser.gander = updatedInfo.gander?updatedInfo.gander : updatedUser.gander;
        updatedUser.name = updatedInfo.name?updatedInfo.name : updatedUser.name;
        updatedUser.address = updatedInfo.address?updatedInfo.address : updatedUser.address;
        updatedUser.contact = updatedInfo.contact?updatedInfo.contact : updatedUser.contact;
        updatedUser.photoUrl = updatedInfo.photoUrl?updatedInfo.photoUrl : updatedUser.photoUrl;
       
        res.status(200).send({
            status:'Success',
            data: users,
          });
    }
    else{
        res.status(403).send({
            status: 'Forbidden',
            message: 'Your id must be a number.'
        })
    }
    
    
});

router.patch('/bulk-update', (req, res) => {
    try{
        const multipleUsers = req.body;
        for(let i = 0; i < multipleUsers.length; i++){
            const index = users.findIndex((user) => user.id == multipleUsers[i].id);
            const user = users[index];
            if(!user){
                return res.status(400).send({
                    status: 'Fail',
                    message: "Can not update users",
                });
            }
            else if(user){
                for(let property in multipleUsers[i]){
                    if(user[property]){
                        user[property] = multipleUsers[i][property]
                    }
                }
            }
        }
        res.status(201).send({
            status: 'Success',
            data:  users,
        })
    }catch(error){
        res.status(400).send({
            status: 'Fail',
            message:"Can't update users",
        });
    };
});

router.delete('/delete', (req, res) => {
    const {id} = req.body;
   if(Number(id)){
    const remainUsers = users.filter(user => user.id !== Number(id));
    res.status(200).send({
        status:'Success',
        data: remainUsers,
      });
   }
   else{
    res.status(403).send({
        status: 'Forbidden',
        message: 'Please input a valid id.'
    })
   }
});

module.exports = router;