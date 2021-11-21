const express = require ("express");
const expressLayouts = require("express-ejs-layouts");
const mongoose = require("mongoose");

const port = process.env.PORT || 3000;

const app = express();

//view engine
app.use(expressLayouts);
app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/public'));

const bodyParser = require("body-parser");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

const db= require("./config/keys").MongoURI;
mongoose.connect(db,{useNewUrlParser: true,
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(()=>console.log('mongoDb connected'))
.catch(err=>console.log(err));
const Book= require("./models/Book")

app.get('/',(req,res)=>{
    res.render("index")
})

app.get('/dashboard',(req,res)=>{
    Book.find({}, function(err, books) {
        res.render('dashboard', {
            bookList: books
        })
    })
})
app.get('/addbook',(req,res)=>{
    res.render("AddBook")
})
app.get('/sell',(req,res)=>{
    res.render("sell");
})

app.post('/addbook',(req,res)=>{
    const {bookname,authorname,Quantity,Shelf,ISBN,Price}=req.body;
    const newBook = new Book({
        bookname,
        authorname,
        Quantity,
        Shelf,
        ISBN,
        Price
    });
    newBook.save()
    .then(book=>{
        res.redirect('/addbook');
    }
     )
    .catch(error => console.log(error));
})
app.post('/',(req,res)=>{
   const{bookname,authorname}=req.body;
   console.log(bookname);
    if(bookname){
        Book.findOne({"bookname":bookname})
        .then((book)=>{
            var data ={
                "ISBN":book.ISBN,
                "Shelf":book.Shelf,
                "Price":book.Price
            }
            res.render('buybook',{ data })
        })
        .catch(err=>{
           res.render("sell")
        })

    }

})
app.listen(port,()=>{
    console.log(`server running on port ${port}`);
})