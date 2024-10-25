const express = require('express');
const router = express.Router();
const {User, validate} = require('../models/SignUpModel');
const bcrypt = require("bcrypt");

router.post('/signup', async (request, response) =>{
    try {
        const { error } = validate(request.body);
        if (error)
            return response.status(400).send({ message: error.details[0].message });
        
        const user = await User.findOne({ Email:request.body.Email});
        if (user)
            return response.status(409).send({ message: "Este correo ya existe" });

        const username = await User.findOne({ User:request.body.User});
        if (username)
            return response.status(409).send({ message: "Este usuario ya existe" });
        
        const salt = await bcrypt.genSalt(Number(process.env.SALT));
        const hashPassword = await bcrypt.hash(request.body.Password, salt);

        await new User({...request.body, Password: hashPassword}).save();
        response.status(201).send({message:"Usuario creado"});
    } catch (error) {
        response.status(500).send({message:"Internal error"})
    }
});

module.exports = router;