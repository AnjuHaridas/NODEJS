const express=require('express')
const bodyParser=require('body-parser')
const mongoose=require('mongoose')
const {movieModel}=require('./Model')
const { json }=require('body-parser')

let app = express()
app.use(bodyParser.urlencoded({extended:true}))
app.use(bodyParser.json())

app.use((req,res,next)=>{
    res.setHeader('Access-Control-Allow-Origin','*');
    res.setHeader('Access-Control-Allow-Methods','GET','POST','OPTIONS');
    res.setHeader('Access-Control-Allow-Headers','Origin, X-Requested-With,content-type')
    res.setHeader('Access-Control-Allow-Credentials',true)

    next()
})



mongoose.connect("mongodb+srv://Anjuharidas:anjuharidas@cluster0.jft2z.mongodb.net/myFirstDatabase?retryWrites=true&w=majority")


app.get('/',(req,res)=>{
    res.send("hello")
})

app.post('/add',async (req,res)=>{
    try
    {
        console.log(req.body)
        let movie=new movieModel(req.body)
        let result=await movie.save()
        res.json(result)
    }
     catch(error)
     {
        res.status(500).send(error)
     }
    
})

app.get('/view',async(req,res)=>{
    try
    {
        var result=await movieModel.find(req.body)
        res.json(result)
    }
    catch(error)
    {
        res.status(500).send(error)
    }
     
})

app.post('/delete',async(req,res)=>{
    try{
        var result=await movieModel.findByIdAndDelete(req.body)
        res.json({"status":"Successfully deleted"})
    }
    catch(error)
    {
        res.status(500).json({"status":error})
    }
})

app.post('/search',async(req,res)=>{
    try
    {
        var result=await movieModel.find(req.body)
        res.json(result)
    }
    catch(error)
    {
        res.status(500).json({"status":error})
    } 
   
}
)
app.post('/namesearch',async(req,res)=>{
    try
    {
        var result=await movieModel.find( {"movieName":{$regex:'.*'+req.body.movieName+'.*'} })
        res.json(result)
    }
    catch(error)
    {
        res.status(500).json({"status":error})
    }
}) 
 
app.post('/update',async(req,res)=>{
    try{
    var result=await movieModel.findByIdAndUpdate(req.body._id,req.body)
    res.json(result)
    }
    catch
    {
        res.status(500).json({"status":error})
    }
})

app.listen(8080,()=>{
    console.log('running')
})

