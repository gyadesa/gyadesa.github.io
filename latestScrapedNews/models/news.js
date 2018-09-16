var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var NewsSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    summary: {
        type: String
    },
    link: {
        type: String,
        required: true
    },
    comments: [{
        type: Schema.Types.ObjectId,
        ref: "Comments"
    }]
});

var News = mongoose.model("News", NewsSchema);

module.exports = News;