const fs = require('fs');
const file_path = './usersData/users.json';

const getUsers = (success, failure) => {
    fs.readFile(file_path, (error, data) => {
        if(error){
            failure(error);
        }
        success(JSON.parse(data));
    })
}



module.exports = getUsers;
