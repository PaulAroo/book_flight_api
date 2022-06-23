const fs = require('fs')
const flightData = require('../flight.json')

exports.example = (req, res) => {
	console.log("example")
	res.send("Flight example")
}

/* accepts body data (for post and update routes) with fields: 
id: number,
title: string,
time: string,
price: number,
date: string
*/

exports.bookFlight = (req, res) => {
	if (Object.keys(req.body).length === 0)
		return res.status(400).json({error: "empty request body"})
	else {
		flightData.push({...req.body})
		const stringedData = JSON.stringify(flightData, null, 2)
		fs.writeFile('flight.json', stringedData, (err) => {
			if(err) return res.status(500).json({message: err})
			else return res.status(200).json({message: "flight booked"})
		})
	}
}


exports.allFlights = (req, res) => {
	if (flightData.length) 
		return res.status(200).json(flightData)
	else
		return res.status(400).json({error: "no available data"})
}

exports.singleFlight = (req, res) => {
	const flightId = req.params.id
	const data = flightData.find(flight => String(flight.id) === flightId)
	if (data)
		return res.status(200).json(data)
	else
		return res.status(400).json({error: "flight data not found"})
}

exports.updateFlight = (req, res) => {
	const payload = {...req.body}
	if (Object.keys(payload).length === 0)
		return res.status(400).json({error: "empty request body"})

	const flightDataIndex = flightData.findIndex(flight =>
		flight.id === payload.id
	)
	flightData.splice(flightDataIndex, 1, payload)
	const updatedData = JSON.stringify(flightData, null, 2)
	fs.writeFile('flight.json', updatedData, (err) => {
		if(err) return res.status(500).json({message: err})
		else return res.status(200).json({message: "flight data updated"})
	})
	}

exports.deleteFlight = (req, res) => {
	const flightId = req.params.id
	const newData = flightData.filter(flight => String(flight.id) !== flightId)
	const stringedNewdata = JSON.stringify(newData, null, 2)
	console.log(stringedNewdata)
	fs.writeFile('flight.json', stringedNewdata, (err) => {
		if(err) return res.status(500).json({message: err})
		else return res.status(200).json({message: "flight data deleted"})
	})
}


