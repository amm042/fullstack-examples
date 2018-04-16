const express = require('express')
const cors = require('cors')
const {OAuth2Client} = require('google-auth-library')
var bodyParser = require('body-parser')

const CLIENT_ID = "939123929106-6halpa5ae860emmvfia3lj4j3md4hlsl.apps.googleusercontent.com"
const client = new OAuth2Client(CLIENT_ID);
const app = express()

app.use(cors())
// parse application/json
app.use(bodyParser.json())


async function verify(token) {
  const ticket = await client.verifyIdToken({
      idToken: token,
      audience: CLIENT_ID
  });
  const payload = ticket.getPayload();
  const userid = payload['sub'];
  // If request specified a G Suite domain:
  //const domain = payload['hd'];

  console.log(userid)
}

app.post('/login', (req,res) =>{
  //https://developers.google.com/identity/sign-in/web/backend-auth



  if ('token' in req.body){
    console.log("got login request, verify token...")
    verify(req.body.token)
      .then(()=>console.log("verified")
      .catch((err)=>console.log(err)
  }


})


app.listen(4060, () => console.log('Example app listening on port 4060!'))
