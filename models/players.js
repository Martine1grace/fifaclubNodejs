

const {Schema,model} = require('mongoose')

const PlayerSchema = new Schema({
    firstname: {
        type: String,
        required: true
    }, 
    lastname: {
        type: String,
        required: true
    }, 

    email: {type: String,
         lowercase: true,
         required: [true, "can't be blank"],
     match: [/\S+@\S+\.\S+/, 'is invalid'],
      index: true
    },
   password:{
    type: String,
    required:true
   },
   age:{
    type:String, 
    required:true,

   },
   gender:{
    type:String,
    required:true
   },
   role:{
    type:String,
    enum:['player','admin'],

   }
})
const Players=model('player',PlayerSchema)

module.exports = Players