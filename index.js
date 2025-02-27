const express=require("express");
const app=express();
let port=3000;
const path=require("path");
const methodOverride = require('method-override');
const { v4: uuidv4 } = require('uuid');
app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"));
app.use(express.static(path.join(__dirname,"public")));
app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.use(methodOverride('_method'));
app.listen(port,()=>{
    console.log(`app is listening at ${port}`);
});
let posts=[
    {
        id:uuidv4(),
        username:"sohail",
        content:"very good guy"
    },
    {
        id:uuidv4(),
        username:"kiran",
        content:"very nice guy"
    },
    {
        id:uuidv4(),
        username:"rafiq",
        content:"very humble guy"
    }
];
let count=4;
app.get("/posts",(req,res)=>{
    res.render("index.ejs",{posts});
});
app.get("/posts/new",(req,res)=>{
    res.render("form.ejs");
});
app.post("/posts",(req,res)=>{
    let {username,content}=req.body;
    let id=uuidv4();
    posts.push({ id,username,content });
    count++;
    res.redirect("/posts");
});
app.get("/posts/:id",(req,res)=>{
    let {id}=req.params;
    let post=posts.find((p)=>id===p.id);
    if(post)
        res.render("show.ejs",{post});
    else
        res.render("error.ejs");
});
app.patch("/posts/:id",(req,res)=>{
    let {id}=req.params;
    let post=posts.find((p)=>id===p.id);
    let content=req.body.content;
    post.content=content;
    res.redirect("/posts");
})
app.get("/posts/:id/edit",(req,res)=>{
    let {id}=req.params;
    let post=posts.find((p)=>id===p.id);
    res.render("edit.ejs",{post});
});
app.delete("/posts/:id",(req,res)=>{
    let {id}=req.params;
    posts=posts.filter((p)=>id!==p.id)
    res.redirect("/posts");
})