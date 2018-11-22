const express = require('express')
const fs = require('fs')
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


app.get('/image', (req, res) => {
	var b64content = fs.readFileSync('twitter.png', { encoding: 'base64' })

	// first we must post the media to Twitter
	T.post('media/upload', { media_data: b64content }, function (err, data, response) {
	// now we can assign alt text to the media, for use by screen readers and
	// other text-based presentations and interpreters
	var mediaIdStr = data.media_id_string
	var altText = "Small flowers in a planter on a sunny balcony, blossoming."
	var meta_params = { media_id: mediaIdStr, alt_text: { text: altText } }

	T.post('media/metadata/create', meta_params, function (err, data, response) {
		if (!err) {
		// now we can reference the media and post a tweet (media will attach to the tweet)
		var params = { status: 'loving life #nofilter', media_ids: [mediaIdStr] }

		T.post('statuses/update', params, function (err, data, response) {
			res.send(data)
		})
		}
	})
	})
})

app.listen(port, () => console.log(`Example app listening on port ${port}!`))