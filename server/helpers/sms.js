const accountSid = 'AC01f7aea8635c17d0c3b596c4601b293c';
const authToken = '17fefe30c978a426c3fa0c6ee21ed551';
const client = require('twilio')(accountSid, authToken);

module.exports = sendSMS = () =>{
  client.messages
  .create({
    body: 'This is the ship that made the Kessel Run in fourteen parsecs?',
    from: '+12073379086',
    to: '+16477601452'
  })
  .then(message => console.log(message.sid));
}