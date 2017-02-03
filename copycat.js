const alexa = require('alexa-app');
const app = new alexa.app('copycat');
const COPYCAT_DEMO_CLIENT_TOKEN = 'd9a1c1875b8b43caa7c4810afe372bba';
const apiai = require('apiai')(process.env.API_CLIENT_TOKEN || COPYCAT_DEMO_CLIENT_TOKEN);
const md5 = require('md5');

function copycat(express) {
  app.launch((req, res) => {
    res.shouldEndSession(false);
    res.reprompt(`Are you still there? I'll repeat what you say.`);
    res.say(`Hello, please say something and I'll repeat it back to you.`);
  });

  app.intent('catchAllIntent', {
      slots: {
        catch: 'CatchAll',
      },
      utterances: [
        '{-|catch}',
      ]
    },
    (req, res) => {
      const catchall = req.slot('catch');
      res.say(catchall);
      res.shouldEndSession(false);
      res.reprompt('Still there?');
      console.log('got:', catchall);

      apiaiQuery(catchall, req.sessionDetails.sessionId, function (error, response) {
        if (error) {
          console.error('API.ai error', error);
        } else {
          console.log('API response:', response);
        }
      });
    }
  );

  app.intent('errorIntent', (req, res) => {
    res.say('There was an error!');
  });

  app.error = (e, req, res) => {
    res.say('Got exception. ' + e.message);
    console.error('error handler! ', e);
  };

  app.sessionEnded((req, res) => {
    console.log('sessionEnded because:', req.data.request.reason);
  });

  app.express(express, '/alexa/', true);
}

function apiaiQuery(query, sessionId, cb) {
  if (apiai) {
    const request = apiai.textRequest(query, {
      // Apply md5 the session id to fit within API.ai's 36 character limit
      sessionId: md5(sessionId)
    });

    request.on('response', function (response) {
      cb(null, response);
    });

    request.on('error', function (error) {
      console.log(error);
      cb(error);
    });

    request.end();
  }
}

module.exports = {
  copycat: copycat
};
