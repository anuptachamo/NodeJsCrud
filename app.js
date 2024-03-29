const express = require("express");            // require gareko express lai
const { blogs } = require("./model/index");    //blogs index.js file bata define vayera ako ho (index.js ko line no. 30)
const app = express();                        // tyo require gareko lai  call gareko

// requiring datbase
require("./model/index");


// parsing formData(form bata aako data lai parse gar)
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


// folder access garna deko ejs file haru lai
//public vitra ko folder access garna payo aba 

app.use(express.static("./public")); 

//setting up ejs, telling nodejs to use ejs
app.set("view engine", "ejs");


// Request(req)/Response(res) cycle
// Home Page
app.get("/", async (req, res) => {
  const allBlogs = await blogs.findAll();
  res.render('home' ,{blogs: allBlogs});              //passing value to home.ejs
});


//addNewBlog.ejs file lai define gareko
app.get("/addNewBlog", (req, res) => {
  res.render("addNewBlog"); 
});

//singleBlog.ejs file lai define gareko
app.get("/singleBlog/:id", async (req, res) => {   //    /singleBlog/:id le single page ma afule select gareko blog dekhauxa
  
  // parameter/url bata ko id
  const id = req.params.id;
  
  // yo id related matra data database bata tannu paryo
  const allBlogs = await blogs.findAll({  //allblogs is a new object
    where:{
      id,
    },
  });

  res.render("singleBlog",{allBlogs}); 
});

app.get("/deleteBlog/:id",async (req, res) =>{

  const id = req.params.id;
  await blogs.destroy({ where: { id } });  // delete garna destroy function use garnu parxa

  res.redirect('/');
})

//EDIT BLOG UI(PAGE)
app.get("/editBlog/:id", async (req, res) => {
  const id = req.params.id;
    // finding single blog to prefill in input
    const allBlogs = await blogs.findAll({
      where: {
        id,
      },
    });

    // allBlogs(single Blog) pass gareko editBlog.ejs file ma prefill ko lagi
  res.render("editBlog", { id: id,allBlogs:allBlogs });
});

//EDIT BLOG POST
app.post("/editBlog/:id", async (req, res) => {
  const id = req.params.id;

  // update
  // form bata(req.body) bata aako kura haru(title,description,subtitle) lai update gardey where id ko value chae tyo parameter bata aako id ko value xa 
  await blogs.update(req.body, {
    where: {
      id: id,
    },
  });
  // update vayisakeypaxi direct to singleBlog page of that specific id
  res.redirect("/singleBlog/" + id);
});




//POST method(http verbs)
//createNewBlog vanne home.ejs file ko FORM ko ACTION ma hunxa jahile anii  METHOD jahile POST hunxa
app.post('/createNewBlog', async(req, res) =>{ 
  /*
    jaile pani form ko input data req.body ma aauxa
    Traditional/old step
      const name =req.body.name,
      const email = req.body.email,
      const password = req.bopdy.password,
  */ 

      /*
        New way ma garda (Destructuring object)
        const{name, password} = req.body
        OR
        console.log(name,password)
        */


  //database ma data pathauxa
  await blogs.create({
    title : req.body.title,  // first title vaneko column title ho, second title vaneko form bata aako value 
    subtitle : req.body.subtitle,
    description : req.body.description
  })

  res.redirect('/');
});



// port no(room No) : 1300 - 650000, 1300 vanda tala chae internal system lay use garirahunchha
app.listen(4000, () => {
    console.log("Server has started at port 4000");
  });