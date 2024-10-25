const {Order} = require('../models/OrderModel');
const express = require('express');
const router = express.Router();

router.post('/create-order', async (request, response) =>{
    try {
        await new Order({...request.body}).save();
        response.status(201).send({message:"Orden creada exitosamente"});
    } catch (error) {
        response.status(500).send({message:"Error a la hora de crear la orden"})
    }
});

module.exports = router;