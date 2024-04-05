import {loadStripe} from '@stripe/stripe-js';

const handlePayment=async ()=>{
    try{
    const stripe = await loadStripe(process.env.PUBLISHABLE_KEY);

    const response=await axios.post('http://localhost:8080/api/payment/checkout',{
        amt:amount
    })

    const session=response?.data?.id
    const result=stripe.redirectToCheckout({
        sessionId:session
    })
    if(result.error)
    {
        console.log(result.error);
    }
    else{
        //for subscription
        const res=await axios.post('http://localhost:8080/api/subscription/create',{
        duration:3,
        tier:2
    })

    // for rent
    const res1=await axios.post('http://localhost:8080/api/rent/create',{
        duration:4,
        movieId:movieid
        
    })
}
    }
catch(err)
{
    console.log(err);
}

}

