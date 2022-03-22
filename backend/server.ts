const dotenv = require('dotenv').config({path:__dirname+'/./../.env'})
import app from './app'

const port = process.env.PORT

app.listen(port, () =>{
})