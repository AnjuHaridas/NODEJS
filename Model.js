const mongoose=require('mongoose')

let mongooseSchema=mongoose.Schema
const movieSchema=new mongooseSchema(
    {
    movieName:String,
    actor:String,
    actress:String,
    director:String,
    releasedYear:String,
    camera:String,
    producer:String,
    language:String
    }
    
)

var movieModel=mongoose.model("movies",movieSchema)

module.exports={movieModel}
