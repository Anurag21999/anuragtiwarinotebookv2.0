const express=require('express')
const session = require('express-session')
const app=express()
const SERVER_PORT= process.env.PORT || 8787;
const {sequelize,User,note1}=require('./db')
const passport=require('./setuppass')
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.set('view engine','hbs')


app.use(
  session({
    secret: 'secretgddrtdhklhujholtfuy',
    resave: false,
    saveUninitialized: true,
  }),
)

// must come after session middleware
app.use(passport.initialize())
app.use(passport.session())


app.get('/',notLoggedIn,(req, res) => res.render('front'))
app.get('/signup',notLoggedIn,(req, res) => res.render('signin'))
app.post('/signup', (req, res) => {
  User.create({
    username: req.body.username,
    password: req.body.password,
    email: req.body.email,
  })
    .then((user) => {
      console.log(user)
      res.redirect('/login')
    })
    .catch((err) => {
      console.error(err)
      res.redirect('/')
    })
})

app.get('/login',notLoggedIn,(req,res)=>{
    res.render('login')
})

app.post('/login',
    passport.authenticate('local', {
      successRedirect: '/home',
      failureRedirect: '/login'
    }),
  )
  app.get('/login/facebook', passport.authenticate('facebook'))

app.get('/login/facebook/callback', passport.authenticate('facebook', {
  successRedirect: '/home',
  failureRedirect: '/login'
}))
  function checkLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
      return next()
    }
    else{
      res.redirect('/login')
    }
   
  }
  function notLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
      return res.redirect('/home')
    }
    else{
      next()
    }
   
  }
 
app.get('/home',checkLoggedIn,(req,res)=>{
    note1.findAll().then(notes=>{
        User.findAll().then(user=>{
            res.render('index',{notes,user})
          })
        })
    })


app.post('/home',(req,res)=>{
    note1.create({
        title:req.body.title,
        body:req.body.body
    }).then((note1)=>{
        console.log(note1)
        res.redirect('/home')
    
    })
})

// app.get('/delete',(req,res)=>{
//     res.render('delete')
// })
app.get('/:id/delete',(req,res)=>{
    note1.destroy({
        where:{
            id:req.params.id
        }
    }).then(()=>{
        res.redirect('/home')
    })
})
app.get('/logout',(req,res)=>{
  req.logOut()
  res.redirect('/login')
})
module.exports=note1

sequelize.sync().then(()=>{app.listen(SERVER_PORT,()=>{
    console.log("server started at 8787")
    })
})
