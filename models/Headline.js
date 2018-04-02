var mongoose = require("mongoose");

// Save a reference to the Schema constructor
var Schema = mongoose.Schema;


var HeadlineSchema = new Schema({
  // `title` is required and of type String
  title: {
    type: String,
    required: true
  },
  summary: {
    type:String,
    required:true
},
  link: {
    type: String,
    required: true
  },
  issaved:{
    type:Boolean,
    default:false
  },
  created: {
		type: Date,
		default: Date.now
	},
  note: {
    type: Schema.Types.ObjectId,
    ref: "Note"
  }
});

// This creates our model from the above schema, using mongoose's model method
var Headline = mongoose.model("Headline", HeadlineSchema);

// Export the Article model
module.exports = Headline;
