const express = require('express')
const cors = require('cors')
const {OAuth2Client} = require('google-auth-library')
const bodyParser = require('body-parser')

// also show using browser session to store app info
const session = require('express-session')
// use mongodb to hold session info
const MongoDBStore = require('connect-mongodb-session')(session);

const CLIENT_ID = '939123929106-brcgf18dm3vgu39qe8fml43rc0rs5t7q.apps.googleusercontent.com'
// download client secret json from the googl ecloud console
// https://console.cloud.google.com/apis/

const client = new OAuth2Client(CLIENT_ID)
const app = express()

// this is a json object with the dburl attribute
const mongocreds = require('/home/amm042/creds/mongoose.json')

var store = new MongoDBStore(
  {
    uri: mongocreds.dburl,
    databaseName: 'amm042',
    collection: 'session-demo'
  });

// Catch errors
store.on('error', function(error) {
  assert.ifError(error);
  assert.ok(false);
});

// can't use * origin with cookies. :(
// https://stackoverflow.com/questions/33483675/getting-express-server-to-accept-cors-request
var whitelist = [
    'http://0.0.0.0:3000',
    'http://localhost:3000'
];
var corsOptions = {
    origin: function(origin, callback){
        var originIsWhitelisted = whitelist.indexOf(origin) !== -1;

        // if you're getting cross-domain errors, check if this origin
        // matches one of your whitelist options.
        console.log("corsorigin: ", origin, originIsWhitelisted)
        callback(null, originIsWhitelisted);
    },
    credentials: true
};
//https://www.npmjs.com/package/cors#enabling-cors-pre-flight
app.options('*', cors(corsOptions)) // include before other routes

// not sure we still need this or not.
app.use(cors(corsOptions))


//app.options()
// parse application/json
app.use(bodyParser.json())

// enable sessions on all routes
app.use(session({
  secret: 'This is a secret',
  cookie: {
    maxAge: 1000 * 60 * 60 * 24 * 7 // 1 week
  },
  store: store,
  // Boilerplate options, see:
  // * https://www.npmjs.com/package/express-session#resave
  // * https://www.npmjs.com/package/express-session#saveuninitialized
  resave: true,
  saveUninitialized: true
}));

async function verify(token) {
  let vparams = {
      idToken: token,
      audience: CLIENT_ID
  }
  //console.log('verify', vparams)
  const ticket = await client.verifyIdToken(vparams);
  const payload = ticket.getPayload();
  //const userid = payload['sub'];
  // If request specified a G Suite domain:
  //const domain = payload['hd'];

  console.log(payload)
  //console.log(userid)
  return payload
}

app.post('/login', (req,res) =>{
  //https://developers.google.com/identity/sign-in/web/backend-auth
  if ('token' in req.body){
    console.log("got login request, checking token...")
    verify(req.body.token)
      .then((profile)=>{
        console.log("verified sub=", profile.sub,
        'name=', profile.name,
        'email=', profile.email,
        'domain=', profile.hd)


        if (!req.session.loginCount){
          req.session.loginCount=1
        }else{
          req.session.loginCount+=1
        }
        req.session.profile = profile
        req.session.lastAccess = new Date()
        console.log("updated session", req.session)

        res.json({result:'ok'})
      })
      .catch((err)=>{
        console.log(err)
        res.json({result:'error', error:err})
      })
  }
})

app.get('/', (req,res)=>{
  if (!req.session.rootCount){
    req.session.rootCount = 1
  }else{
    req.session.rootCount += 1
  }
  console.log("request / which has:", req.session)
  res.json({'result':'ok', 'session': req.session
  })
})

app.listen(4060, () => console.log('Example app listening on port 4060!'))
