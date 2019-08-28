const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const FacebookStrategy = require('passport-facebook').Strategy
const { sequelize,User,note1} = require('./db')

passport.use(
  new LocalStrategy((username, password, done) => {
    User.findOne({
      where: {
        username,
      },
    })
      .then((user) => {
        if (!user) {
          return done(null,false,new Error('Username invalid'))
        }

        if (user.password != password) {
          return done(null, false,new Error('invalid password'))
        }

        done(null, user)
      })
      .catch(done)
  })
)

// passport.use(
//   new FacebookStrategy(
//     {
//       clientID: '636646016820228',
//       clientSecret: 'bfb89f2b3e2af677228cf78de7264983',
//       callbackURL: 'http://localhost:8787/login/facebook/callback',
//     },
//     (accessToken, refreshToken, profile, done) => {
//       User.create({
//         username: profile.id,
//         fbAccessToken: accessToken,
//       })
//         .then((user) => {
//           done(null, user)
//         })
//         .catch(done)
//     },
//   ),
//   )

passport.serializeUser((user, done) => {
  done(null, user.id)
})

passport.deserializeUser((userId, done) => {
  User.findOne({
    where: {
      id: userId,
    },
  })
    .then((user) => done(null, user))
    .catch(done)
})


module.exports = passport