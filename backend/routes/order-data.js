const {Order} = require('../models/OrderModel');
const express = require('express');
const router = express.Router();

router.get("/order-data/:author", async (request, response) =>{
    let author = request.params.author
    
    try {
        
        const tasks = await Order.find({"Author":author});
        if (!tasks) { return response.status(404).end();}
    
        const newTasks = await validateDate(tasks)
        
        return response.status(200).json(newTasks);
        
    } catch (e) {
        console.log(e.message)
        return (e)
    }
});

const validateDate = async (data) => {
    const dateNow = new Date();
    data.map((item) => {
        let difference = Math.abs(dateNow - item.Date)/(1000*3600*24);
        if ( difference <= 1 ) {
            item.State = "Realizada"
        }
    })
    return data;
}

module.exports = router