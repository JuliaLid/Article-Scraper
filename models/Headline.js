var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var HeadlineSchema = new Schema({

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
  note: [{
    type: Schema.Types.ObjectId,
    ref: "Note"
  }]
});

// This creates our model from the above schema, using mongoose's model method
var Headline = mongoose.model("Headline", HeadlineSchema);

// Export the Headline model
module.exports = Headline;
