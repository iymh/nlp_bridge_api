// const AUTHINFO = {
//    username:"test",
//    password:"test"
// };

const express = require('express');

// File upload function
// const fs = require('fs');
// const multer = require('multer');
// const upload = multer({dest: 'tmp/'});

// const basicAuth = require('basic-auth-connect');

const cors = require('cors');

const axios = require('axios');

// require('dotenv').config({ debug:true });

const LOCAL_URL = "http://localhost:8080/v1/watson.runtime.nlp.v1/NlpService/";
const BRIDGE_URL = "https://watson-nlp-runtime.10xsz3m0vfdh.jp-tok.codeengine.appdomain.cloud/v1/watson.runtime.nlp.v1/NlpService/";

var server = express();
server
   .use(express.urlencoded({extended: false}))
   .use(express.json())

   // CORS
   .use(cors())

   // Basic Auth
   // .use(basicAuth(
   //    AUTHINFO.username,
   //    AUTHINFO.password 
   // ))
   .use(express.static('public'))

// Analyze
   .post('/analyze', function (req, res) {
      let param = req.body;
      console.log("param: ", param);

      // Check Params
      if (!(param && param.raw_document)) {
         res.status(500).send({"error": "Invalid params!"});
         return;
      }
      
      let sendurl = `${LOCAL_URL}SentimentPredict`;

      let options = {
         headers: {
            "Content-Type": "application/json",
            "Grpc-Metadata-mm-model-id":"sentiment_aggregated-cnn-workflow_lang_ja_stock"
         },
      };

      axios.post(
         `${sendurl}`,
         param,
         options
      )
      .then(response => {
         console.log("response: ", response);
         res.json(response.data);
      })
      .catch(err => {
         console.log('error:', err);
         res.status(500).send({"error": err});
      });
   })

const port = process.env.PORT || 3000;
server.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log('Watson NLP Bridge Server running on port: %d', port);
//   console.log('process.env: ', process.env);
});