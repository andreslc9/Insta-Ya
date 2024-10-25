const {User} = require('../models/SignUpModel');
const express = require('express');
const router = express.Router();

router.get("/user-data/:username", async (request, response) =>{
    let username = request.params.username
    User.findOne({"User":username}).then(doc => {
        if (!doc) { return response.status(404).end();}
        return response.status(200).json(doc._id);
    })
    .catch(err => next(err));
});

module.exports = router
