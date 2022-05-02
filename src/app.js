// ========== server.js ==============
// Requirements
const mongoose = require('mongoose')
const express = require('express')
const bodyParser = require('body-parser')
​
// express server definition
const app = express()
app.use(bodyParser.json())
​
// Resources definitions
const User = mongoose.model('User', { name: String, email: String, surname: String })
​
var artcileSchema = new mongoose.Schema({
 title: String,
 body: String,
 author: {
   type: mongoose.Schema.Types.ObjectId,
   ref: 'User',
   required: true
},
 created_at: { type: Date, default: Date.now }
});
​
const Article = mongoose.model('Article', artcileSchema);
​
​
// Routes definitions
app.get('/', (req, res) => res.send('Hello World!'))
​
// Route which returns users
app.get('/users', async (req, res) => {
 const users = await User.find({}).limit(10)
 res.send(users)
})
​
// Route which creates new user
app.post('/users', async (req, res) => {
 const user = await new User(req.body.user).save()
 res.send(user)
})
​
// Route whick retuns articles
app.get('/articles', async (req, res) => {
 const articles = await Article.find({}).limit(10)
 res.send(articles)
})
​
// Running the server
const run = async () => {
 await mongoose.connect('mongodb://localhost/admin', { useNewUrlParser: true })
 await app.listen(8080, () => console.log(`Example app listening on port 8080!`))
}
​
run()