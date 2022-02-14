const express = require('express');
const app = express();
const PORT = process.env.PORT || 8080
const mongoose = require('mongoose');

app.get('/',(req,res) => {
	res.send('Test');
})

app.listen(PORT,function(err) {
	if(err) return console.log(err);

	mongoose.connect(process.env.MONGO_URI,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true
  }
).then(console.log('Connected to DB'))

	console.log(`Listening on port ${PORT}`);
});