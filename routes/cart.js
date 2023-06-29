var express = require('express');
var router = express.Router()
const Cart = require('../models/cart')


router.get('/trip' , (req,res) => {
    Cart.find({})
    .populate('trip')
    .then(data => {
        console.log(data)
        res.json({result: true,newTrip :data})
    })
})
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
            res.json({result: true,newTrip :data})
        })
        
    }
    )
})
//
router.delete('/deleteATrip', (req,res) => {
    Cart.findByIdAndRemove(req.body.id)

    })

router.post('/newBooking', (req,res) =>{
    Cart.updateMany({}, {paid:true})
    .then(()=> {
        Cart.find({paid:true})
        .then(data => {
            res.json({result: true,trip :data})
        })
        
    })
    })
    
router.get('/booked', (req,res) => {
    Cart.find({paid:true})
    .populate('trip')
    .then(data => {
        res.json({result: true,trip:data})
    })
})
router.delete('/booked', (req,res) => {
    Cart.find({paid:req.body.paid})
    .then(data => {
        console.log(data)
    })
})




module.exports = router;