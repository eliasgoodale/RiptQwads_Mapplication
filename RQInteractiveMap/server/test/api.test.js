const request = require('supertest');

const app = require('../src/app');

describe('GET /api/v1', () => {
	it('responds with a json message', function(done) {
		request(app)
			.get('/api/v1')
			.set('Accept', 'application/json')
			.expect('Content-Type', /json/)
			.expect(200, {
				message: 'API - 👋🌎🌍🌏' 
			}, done);
	});
});



/*	This API test is for testing that the json object sent to the server
		matches the regex pattern specified in messages.js
*/
describe('POST /api/v1/messages', () => {
	it('responds with inserted message', function(done) {
		const requestObj = {
			name: 'Bob',
			message: 'This app is cool',
			latitude: -90,
			longitude: 180
		};

		const responseObj= {
			...requestObj,
			date: '2018-09-18T03:05:52.981Z',
			_id: '5ba06b900a99365020525dfd',
		};

		request(app)
			.post('/api/v1/messages')
			.send(requestObj)
			.set('Accept', 'application/json')
			.expect('Content-Type', /json/)
			.expect(res => {
				res.body._id = '5ba06b900a99365020525dfd'
				res.body.date = '2018-09-18T03:05:52.981Z'
			})
			//added to expect 200, result, done
			.expect(200, responseObj, done);
	});
});
