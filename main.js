const express = require('express')
const app = express()
const port = 3000


var Twit = require('twit')

var T = new Twit({
  consumer_key:         '...',
  consumer_secret:      '...',
  access_token:         '...',
  access_token_secret:  '...',
  timeout_ms:           60*1000,  // optional HTTP request timeout to apply to all requests.
  strictSSL:            false,     // optional - requires SSL certificates to be valid.
})

app.get('/', (req, res) => {
	T.post('statuses/update', { status: 'hello world!' }, function(err, data, response) {
		console.log(data)
		res.send(data)
	})
})

app.listen(port, () => console.log(`Example app listening on port ${port}!`))