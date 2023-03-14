const express = require('express');

const stripe = require('stripe')('sk_test_51LlMoSExVjAJ0Cl5QNlq4c582CWGGS4ayxmmeAVjLYG5ucJZXOnJS56Lg5t23ef4e2JgrFnecGj7yRzaZsso4ayX00Hu0urj1y')

const cors = require('cors')

const app = express();

//const stripe = new Stripe('sk_test_51LlMoSExVjAJ0Cl5QNlq4c582CWGGS4ayxmmeAVjLYG5ucJZXOnJS56Lg5t23ef4e2JgrFnecGj7yRzaZsso4ayX00Hu0urj1y')
app.use(cors({origin:'http://localhost:3000'}))

app.use(express.json());

app.post('/api/checkout',async(req,res,next)=>{
    const{id,amount} = req.body;
    try {
        const payment = await stripe.paymentIntents.create({
            amount,
            currency:'usd',
            description:'Gaming PC',
            payment_method: id,
            confirm:true
          });
          console.log(payment)
           res.send({message:'Successfull payment'});
    } catch (error) {
        console.log(error);
        res.send({message:error.raw.message})
        next(error);
    }
 
    
})

app.listen(4242,()=>{
    console.log("Server on port",4242);
})