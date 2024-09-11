import app from './app.js'
import 'dotenv/config'
import db from './database.js'
const port = process.env.PORT || 3820

db.connect()

app.listen(port, () => console.log(`listening on port ${port}`))