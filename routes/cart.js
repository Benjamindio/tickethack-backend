var express = require('express');
var router = express.Router()
const Cart = require('../models/cart')



router.post('/newTrip', (req,res) =>{
    console.log(req.body.id)
    const newTrip = new Cart({
        trip:req.body.id,
        paid: false,
    })
    newTrip.save().then(() => {
        console.log(`New Trip saved !`)
        Cart.findOne({trip:req.body.id})
        .populate('trip')
        .then(data => {
            console.log(data)
            res.json({newTrip :data})
        })
        
    }
    )
})

router.delete('/deleteATrip', (req,res) => {
    Cart.findOne({_id:req.body.id})
    .then(data => {
            console.log(data)
        })
    })

router.post('/newBooking', (req,res) =>{
    Cart.updateMany({}, {paid:true})
    .then(()=> {
        Cart.find({paid:true})
        .then(data => {
            res.json({trip :data})
        })
        
    })
    })
    
router.get('/booked', (req,res) => {
    Cart.find({paid:true})
    .populate('trip')
    .then(data => {
        res.json({trip:data})
    })
})
router.delete('/booked', (req,res) => {
    Cart.find({paid:req.body.paid})
    .then(data => {
        console.log(data)
    })
})




module.exports = router;