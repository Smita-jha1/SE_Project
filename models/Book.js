const { Decimal128 } = require('bson');
const mongoose = require('mongoose');

const BookSchema= new mongoose.Schema({
    bookname: {
        type: String
    },
    authorname: {
        type: String
    },
    Quantity: {
        type: Number
    },
    Shelf: {
        type: Number,
        unique: true
    },
    ISBN: {
        type: Number,
        unique: true
      
    },
    Price: {
        type: Number
        
    }
    

})
const Book = mongoose.model('Book',BookSchema);
module.exports= Book;