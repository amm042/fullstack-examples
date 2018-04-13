const express = require('express')
const cors = require('cors')
const AWS = require('aws-sdk')
const multer = require('multer')
const multerS3 = require('multer-s3')

// create the file ~/.aws/credentials change the [profile] to match your app
// [labapp]
// aws_access_key_id = ...
// aws_secret_access_key = ...
var credentials = new AWS.SharedIniFileCredentials({profile: 'labapp'})
AWS.config.credentials = credentials
const s3 = new AWS.S3()

const app = express()

// specify your bucket name here
const bucket = 'labapp-uploads'

// this generates the key (filename) from the originalname
// keys have to be unique, so in the future pass in username and
// use path-like names like username+'/'+originalname
// upload of a duplicate keys will overwrite the old contents
var upload = multer({
  storage: multerS3({
    s3: s3,
    bucket: bucket,
    key: (req,file,cb) => {
      cb(null, file.originalname)
    }
  })
 })

// allows anyone to access this server (not particularly safe!)
app.use(cors())

// returns a list of all objects in the bucket
app.get('/', (req, res) => {
  console.log("getting list of objects")
  s3.listObjectsV2({Bucket: bucket}, (err,data)=>{
    if(err) {
      console.log(err)
      res.json(err)
    } else{
      res.json(data)
    }
  })
})

app.post('/remove/:key', (req,res)=>{
  // remove the specified file from s3

  console.log("deleting:", req.params.key)
  var params = {
    Bucket: bucket,
    Key: req.params.key
  }
  s3.deleteObject(params, (err,data)=>{
    if(err) {
      console.log(err)
      res.json(err)
    } else{
      res.json({result:"ok"})
    }
  })
})

app.get('/:key', (req, res) => {
  // downloads the contents of the given file from S3 to the user
  // since the user doesn't have permission to access S3 directly (the server
  // holds the credentials), we have to stream it through our server
  // https://stackoverflow.com/questions/35782434/streaming-file-from-s3-with-express-including-information-on-length-and-filetype
  console.log("getting:", req.params.key)
  var params = {
    Bucket: bucket,
    Key: req.params.key
  }
  // have to head it to get the metadata then we can create a stream to
  // pass contents to client
  s3.headObject(params, (err,data)=>{
    if(err) {
      console.log(err)
      res.json(err)
    } else{
      var stream = s3.getObject(params).createReadStream()

      //res.set('Content-Type', mime.lookup(key));
      res.set('Content-Length', data.ContentLength);
      res.set('Last-Modified', data.LastModified);
      res.set('ETag', data.ETag);

      res.attachment(req.params.key)

      // data is piped through our server to the client
      stream.pipe(res)
    }
  })
})


app.post('/upload', upload.array('files'), (req,res) => {
  // multer-s3 does the magic of uploading to s3 given the configuration
  // at the top of this program.
  // https://www.npmjs.com/package/multer-s3
  console.log('uploaded', req.files.length, 'files to s3')

  res.json({result: "ok"})
})

app.listen(9000, () => console.log('Example app listening on port 9000!'))
