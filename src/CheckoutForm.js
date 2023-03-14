import React, { useState } from 'react'
import "bootswatch/dist/lux/bootstrap.min.css"
import { CardElement,useStripe,useElements } from '@stripe/react-stripe-js';
import axios from 'axios';
const CheckoutForm = () => {
    const stripe = useStripe();
    const elements = useElements();
    const [loading,setLoading] = useState(false);
    const handleSubmit = async(e)=>{
      e.preventDefault();
      
    const{error,paymentMethod} = await stripe.createPaymentMethod({
        type:'card',
        card:elements.getElement(CardElement)
      });
      setLoading(true);
      if(!error){
        const {id} = paymentMethod;
         try {
            const {data} = await axios.post('http://localhost:4242/api/checkout',{
            id,
            amount:1200 *100
        });
      
         } catch (error) {
            console.log(error);
         }
         setLoading(false);
        elements.getElement(CardElement).clear();
      }
    }
  return (
    <form onSubmit={handleSubmit} className="card card-body">
        <img src='https://p1-ofp.static.pub/medias/24189880702_Legion5Pro16ARH7HStormGreyRGBBacklit_202201181128321655985309762.png' alt='' className='img-fluid'/>
          <h3 className='text-center'>Price:1200$</h3>
        <div className='form-group'>
            <CardElement className='form-contol'/>
        </div>
       
        <button type='submit' className='btn btn-success' disabled={!stripe}>
        {
            loading ?(
                <div className="spinner-border" role="status">
                  <span className="sr-only">Loading...</span>
                </div>
            )
            :"Buy"
        }
           
        </button>
    </form>
  )
}

export default CheckoutForm