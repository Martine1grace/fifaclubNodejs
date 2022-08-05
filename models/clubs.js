
// club creating the Schema
const {Schema,model} = require('mongoose')
const clubSchema = new Schema({

name:{

type : String,

trim: true,

minlength: 3

},

numberOfplayers:{

type : Number,

trim: true,

minlength: 3

}

})

const Clubs = model('Club',clubSchema)

module.exports = Clubs