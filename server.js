const express =require('express');

const mongoose=require('mongoose');

const TaskSchema= require('./model');

const cors =require('cors');

const app= express();
app.use(express.json());

app.use(cors({
    origin: '*'
}))

mongoose.connect('mongodb+srv://reactapp:reactapp@react.wx9zack.mongodb.net/?retryWrites=true&w=majority&appName=react').then(
    ()=>console.log('connected  mongodb')
)



app.post('/addtask',async(req,res)=>{
    const {todo} =req.body;
    try{
        const newData =new TaskSchema({ todo });
       await newData.save();
       const alltask=await TaskSchema.find();
       return res.json(alltask);
    }
    catch(err){
        console.log(err);
        res.status(500).send('Internal Server Error');
    }
});


app.get('/gettatsk',async(req,res)=>{
    try{
        
        return res.json(await TaskSchema.find());

    }
    catch(err){
        console.log(err);
    }
});

app.delete('/delete/:id',async(req,res)=>{
    try{
        const id=req.params.id;
        await TaskSchema.findByIdAndDelete(id);
        return res.json(await TaskSchema.find());

    }
    catch(err){
        console.log(err);
    }
})

app.listen(5000,() => console.log('listening on port'));