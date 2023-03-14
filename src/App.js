import {Elements} from '@stripe/react-stripe-js'
import { loadStripe } from '@stripe/stripe-js';
import './App.css';
import CheckoutForm from './CheckoutForm';

function App() {
  const stripePromise = loadStripe('pk_test_51LlMoSExVjAJ0Cl5kKtDcwuDC0jsjXgGvzeIhsBVqQFfXqaKfndr4TAMheg6s6UiBICrQZluxeVYxp3KUse7TDei00A1rEAaud');
//  const options = {
//   clientSecret :'{{}}'
//  }
  return (
    <div className="App">
       
      <Elements stripe={stripePromise} >
          <div className='container p-4'>
             <div className='row'>
                <div className='col-md-4 offset-md-4'>
                     <CheckoutForm/>
                </div>
             </div> 
          </div>
        
      </Elements>
    </div>
  );
}

export default App;
