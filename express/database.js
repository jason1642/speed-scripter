import mongoose from 'mongoose'
import 'dotenv/config'

const connect = async () => await mongoose.connect(
    `mongodb+srv://${process.env.MONGODB_USERNAME}:${process.env.MONGODB_PASSWORD}@portfolio-website.halgu.mongodb.net/speed-scripter?retryWrites=true&w=majority`,
   
   
).then((res, err) =>{ 
        if(!err) return console.log("db connected")
    else return console.log('db error')
})
// .catch(err=>{
//     if(!err) return console.log("db connected")
//     else return console.log('db error')
// })

const close = async () => {
    await mongoose.connection.dropDatabase()
    await mongoose.connection.close()
}

const clear = async () => {
    const collections = mongoose.connection.collections
    for (const key in collections) {
        await collections[key].deleteMany({})
    }
}

const db = {connect: connect, close: close, clear: clear}

export default db 