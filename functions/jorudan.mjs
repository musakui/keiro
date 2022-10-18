// import fetch from 'node-fetch'

const cors = {
	'Access-Control-Allow-Origin': '*',
	'Access-Control-Allow-Methods': 'GET,POST',
	'Access-Control-Allow-Headers': 'Content-Type,Host,Date,Digest,Signature',
}

/** @type {import('@netlify/functions').Handler} */
export const handler = async (evt, ctx) => {
	const method = evt.httpMethod
	if (method === 'OPTIONS') {
		return {
			statusCode: 204,
			headers: cors,
		}
	}

	console.log(method, evt.queryStringParameters)

	return {
		statusCode: 200,
		headers: {
			...cors,
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({}),
	}
}