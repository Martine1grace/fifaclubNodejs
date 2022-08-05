
const jwt = require('jsonwebtoken');
const Clubs=require('../models/clubs')

const bcrypt = require('bcrypt');

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
     validate(value){
        if(value < 0){
            throw new Error('Age must be positive number')
        }
       }
   },
   gender:{
    type:String,
    required:true
   },
   role:{
    type:String,
    enum:['player','admin'],

   },
   tokens: [{
    token: {
        type: String,
        required: true
    }
}],})


PlayerSchema.virtual('clubs',{
    ref:'Clubs',
    localField:'_id',
    foreignField:'owner'
})

PlayerSchema.methods.toJSON = function () {
    const player = this.toObject()
    delete player.password
    delete player.tokens
    return player;
}
PlayerSchema.methods.generateAuthToken = async function () {
    const player = this
    const token = await jwt.sign({ _id: player._id.toString() }, 'thisismynewcourse')
    player.tokens = player.tokens.concat({ token });
    await player.save();
    return token;
}
PlayerSchema.statics.findByCredentials = async (email, password) => {
    try {
        const player = await Players.findOne({ email })
        if (!player)
            throw new Error()
        const isMatch = await bcrypt.compare(password, player.password)
        if (!isMatch)
            throw new Error()
        return user;
    } catch (e) {
        return "Unable to login"
    }
}
PlayerSchema.pre('save', async function (next) {
    const player = this
    if (player.isModified('password')) {
        player.password = await bcrypt.hash(player.password, 8);
    }
    next();
})

PlayerSchema.pre('remove',async function(next){
    const player = this
    await Clubs.remove({owner:require.player._id})
    next();
})

const Players=model('player',PlayerSchema)

module.exports = Players