const {Order} = require('../models/OrderModel');
const express = require('express');
const router = express.Router();

router.get("/actualizar-orden/:item_tracing", async (request, response) =>{
    let tracing = request.params.item_tracing;
    Order.findOne({"Tracing":tracing}).then(doc => {
        if (!doc) { return response.status(404).end();}
        return response.status(200).json(doc);
    })
        .catch(err => next(err));
});

router.post('/actualizar-orden/:item_tracing', async (request, response) =>{
    let tasks = request.body;
    let tracing = request.params.item_tracing;
    let tasksKeys = Object.keys(tasks);
    try {
        const findOrder = await Order.findOne({"Tracing":tracing});
        
        for (element of tasksKeys) {
            if ( tasks[element] !== findOrder[element] && tasks[element] !== "") {
                findOrder[element] = tasks[element];
            }
        }
        
        await Order.findOneAndUpdate({"Tracing":tracing}, findOrder);
        
        response.status(201).send({message:"Orden actualizada"});
    } catch (error) {
        console.log(error.message)
        response.status(500).send({message:"Error al actualizar la orden"})
    }
});

router.put('/cancel-order/:item_tracing', async (request, response) => {
    let tracing = request.params.item_tracing
    try {
        await Order.findOneAndUpdate({"Tracing":tracing}, {"State":"Cancelado"})
        response.status(200).send({message:"Orden cancelada con éxito"})
    } catch (error) {
        response.status(500).send({message:"Error a la hora de crear la orden"})
    }
  });

const validateUpdateOrder = (data) => {
    
}

module.exports = router
