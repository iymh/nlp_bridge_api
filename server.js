// const AUTHINFO = {
//    username:"test",
//    password:"test"
// };

const express = require('express');
// const basicAuth = require('basic-auth-connect');

const cors = require('cors');
const axios = require('axios');
require('dotenv').config({ debug:true });

var BASE_URL = `${process.env.API_BASE_URL || "http://127.0.0.1:8080"}/v1/watson.runtime.nlp.v1/NlpService/`;
console.log("Bridge url: ", BASE_URL);

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

   .post('/EmotionPredict', function (req, res) {
      let param = req.body;
      console.log("param: ", param);

      // Check Params
      if (!(param && param.raw_document)) {
         res.status(500).send({"error": "Invalid params!"});
         return;
      }
      
      let sendurl = `${BASE_URL}EmotionPredict`;

      let options = {
         headers: {
            "Content-Type": "application/json",
            "accept": 'application/json',
            "Grpc-Metadata-mm-model-id":"emotion_aggregated-workflow_lang_en_stock"
         },
      };

      axios.post(
         `${sendurl}`,
         param,
         options
      )
      .then(response => {
         console.log("response: ", response);
         res.status(200).send(response.data);
      })
      .catch(err => {
         console.log('error:', err);
         res.status(500).send({"error": err});
      });
   })

   .post('/ClassificationPredict', function (req, res) {
      let param = req.body;
      console.log("param: ", param);

      // Check Params
      if (!(param && param.raw_document)) {
         res.status(500).send({"error": "Invalid params!"});
         return;
      }
      
      let sendurl = `${BASE_URL}ClassificationPredict`;

      let options = {
         headers: {
            "Content-Type": "application/json",
            "accept": 'application/json',
            "Grpc-Metadata-mm-model-id":"classification_ensemble-workflow_lang_en_tone-stock"
         },
      };

      axios.post(
         `${sendurl}`,
         param,
         options
      )
      .then(response => {
         console.log("response: ", response);
         res.status(200).send(response.data);
      })
      .catch(err => {
         console.log('error:', err);
         res.status(500).send({"error": err});
      });

   })

   .post('/EntityMentionsPredict', function (req, res) {
      let param = req.body;
      console.log("param: ", param);

      // Check Params
      if (!(param && param.raw_document)) {
         res.status(500).send({"error": "Invalid params!"});
         return;
      }
      
      let sendurl = `${BASE_URL}EntityMentionsPredict`;

      let options = {
         headers: {
            "Content-Type": "application/json",
            "accept": 'application/json',
            // "Grpc-Metadata-mm-model-id":"entity-mentions_transformer-workflow_lang_multi_distilwatbert-cpu"
            "Grpc-Metadata-mm-model-id":"entity-mentions_transformer-workflow_lang_multilingual_slate.153m.distilled-cpu"
         },
      };

      axios.post(
         `${sendurl}`,
         param,
         options
      )
      .then(response => {
         console.log("response: ", response);
         res.status(200).send(response.data);
      })
      .catch(err => {
         console.log('error:', err);
         res.status(500).send({"error": err});
      });

   })

   .post('/KeywordsPredict', function (req, res) {
      let param = req.body;
      console.log("param: ", param);

      // Check Params
      if (!(param && param.raw_document)) {
         res.status(500).send({"error": "Invalid params!"});
         return;
      }
      
      let sendurl = `${BASE_URL}KeywordsPredict`;

      let options = {
         headers: {
            "Content-Type": "application/json",
            "accept": 'application/json',
            "Grpc-Metadata-mm-model-id":"keywords_text-rank-workflow_lang_ja_stock"
         },
      };

      axios.post(
         `${sendurl}`,
         param,
         options
      )
      .then(response => {
         console.log("response: ", response);
         res.status(200).send(response.data);
      })
      .catch(err => {
         console.log('error:', err);
         res.status(500).send({"error": err});
      });

   })

   .post('/RelationsPredict', function (req, res) {
      let param = req.body;
      console.log("param: ", param);

      // Check Params
      if (!(param && param.raw_document)) {
         res.status(500).send({"error": "Invalid params!"});
         return;
      }
      
      let sendurl = `${BASE_URL}RelationsPredict`;

      let options = {
         headers: {
            "Content-Type": "application/json",
            "accept": 'application/json',
            // "Grpc-Metadata-mm-model-id":"relations_transformer-workflow_lang_multilingual_slate.153m.distilled"
            "Grpc-Metadata-mm-model-id":"relations_transformer-workflow_lang_multi_watbert"
         },
      };

      axios.post(
         `${sendurl}`,
         param,
         options
      )
      .then(response => {
         console.log("response: ", response);
         res.status(200).send(response.data);
      })
      .catch(err => {
         console.log('error:', err);
         res.status(500).send({"error": err});
      });

   })

   .post('/SentimentPredict', function (req, res) {
      let param = req.body;
      console.log("param: ", param);

      // Check Params
      if (!(param && param.raw_document)) {
         res.status(500).send({"error": "Invalid params!"});
         return;
      }
      
      let sendurl = `${BASE_URL}SentimentPredict`;

      let options = {
         headers: {
            "Content-Type": "application/json",
            "Grpc-Metadata-mm-model-id":"sentiment_aggregated-cnn-workflow_lang_ja_stock"
            // "Grpc-Metadata-mm-model-id":"targets-sentiment_transformer-workflow_lang_multilingual_slate.153m.distilled-cpu"
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