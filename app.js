const express = require("express");
const app = express();
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

mongoose.connect("mongodb://localhost/esm");
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
app.use(express.static('public'))

//SCHEMA SETUP
const playerSchema = new mongoose.Schema({
	name: String, 
	wins: Number,
	loses: Number
});

const Player = mongoose.model("Player", playerSchema);

// Player.create(
// {
// 	name: "Player 2",
// 	wins: 4,
// 	loses: 2
// }, function(err, player){
// 	if(err){
// 		console.log(err);
// } else {
// 	console.log("New player added");
// }
// });

app.get("/", (req, res) => {
	Player.find({}, (err, allPlayers) =>{
		if(err){
			console.log(err)
		} else {
			res.render("index", {players: allPlayers}); //name we want:data being passed in
		}
	})
	//
});


app.post("/wins/add", (req, res) => {
	Player.findOneAndUpdate({ "name": "Player 2" }, {
	 $inc: {
	   "wins": 1
	  },
	}, (err, results) => {
		if(err){
			console.log(err);
		} else{
			res.redirect("/");
		}
	});
});

app.listen(process.env.PORT || 3000, () => {
  console.log('ESM server has started');
});