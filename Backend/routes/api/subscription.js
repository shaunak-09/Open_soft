const Subscription=require("../../models/Subscription");
const auth=require('../../middleware/auth')
const router = require("express").Router();
const Profile=require('../../models/Profile')
//create a new subscription
router.post('/create',auth,async (req, res)=>{
    // console.log('hre');
    const userId =req.userId
    const {duration,tier} = req.body
    // console.log('userid: ',userId,"duration: ",duration);
    const currentDate = new Date();
    const expiryDate = new Date(currentDate.setMonth(currentDate.getMonth()+duration));
    // console.log("expiry: ",expiryDate);
    const newSubscription = new Subscription({
        duration: duration,
        userId: userId,
        expiryDate: expiryDate,
        tier:tier
    });
    // console.log("new: ",newSubscription);
    try{
        const savedSubscription = await newSubscription.save();
        // console.log('saved: ',savedSubscription);
        const profile = await Profile.findOne({userId:userId})
        // console.log(profile);
        profile.subscription=savedSubscription._id
        await profile.save()
        //   console.log(profile);
        res.status(201).json("Subscription successfull");
        // res.status(201).json(savedSubscription);

    }catch(err){
        console.log(err);
        res.status(500).json(err);
    }

})

//get subscription by id
router.get('/find/:id',auth,async (req,res)=>{
    const id=req.params.id;
    try{
        const subscription = await Subscription.findById(id);
        if(subscription){
            res.status(200).json(subscription);
        }
        else{
            res.status(404).json({message: "Subscription not found!"})
        }
        // res.status(200).json(subscription);
    }catch(err){
        console.log('Error fectching subscription by id',err);
        res.status(500).json({ message: 'Internal server error' });
    }
})

//get subscription by userId

router.get('/user/:id',auth,async (req,res)=>{
    const userId= req.params.id;
    try{
        const subscription = await Subscription.findOne({userId: userId});
        if(subscription) res.status(200).json(subscription);
        else res.status(404).json({ message: 'No subscription found for the given user ID!' })
    }catch(err){
        console.log('Error fectching subscription by userid',err);
        res.status(500).json({ message: 'Internal server error' });
    }
})

//delete subscription by id
router.delete('/delete/:id',auth,async(req,res)=>{
    const subscriptionId = req.params.id;
    try{
        const deletedSubscription=await Subscription.findByIdAndDelete(subscriptionId);
        if (!deletedSubscription) {
            return res.status(404).json({ message: "Subscription not found" });
        }
        return res.status(200).json({ message: "Subscription deleted successfully" });
    }catch(err){
        console.log('error deleting subscription by id: ',err);
        res.status(500).json({message: 'Internal server error'});
    }
})

//delete subscription by userID

router.delete('/delete/user/:id',auth,async(req,res)=>{
    const userId=req.params.id;
    try{
        const deletedSubscription=await Subscription.findOneAndDelete({userId: userId});
        if (!deletedSubscription) {
            return res.status(404).json({ error: "Subscription not found for the given userId" });
        }
        return res.status(200).send(); 
    }
    catch(err){
        console.log('error deleting subscription by userId: ',err);
        res.status(500).json({message: 'Internal server error'});
    }
})

module.exports=router;