const express = require("express");
const { json } = require("express");
const flights = require("./controllers/flightController");
const models = require("./models/Flight");
const routes = require("./routes/flightRoute");

const fs = require('fs')
const flightData = require('./flight.json')

const app = express();

app.use(json());

app.use("/", routes);

const port = process.env.PORT || 3000;

app.post('/book-flight', (req, res) => {
  if (Object.keys(req.body).length === 0)
    return res.status(400).json({message: "empty request body"})
  else {
    flightData.push({...req.body})
    const stringedData = JSON.stringify(flightData, null, 2)
    fs.writeFile('flight.json', stringedData, (err) => {
      if(err) return res.status(500).json({message: err})
    })
    return res.status(200).json({message: "flight booked"})
  }
})

app.get('/all-flights', (req, res) => {
  if (flightData.length) 
    return res.status(200).json(flightData)
  else
    return res.status(400).json({error: "no available data"})
})

app.get('/single-flight/:id', (req, res) => {
  const flightId = req.params.id
  const data = flightData.find(flight => String(flight.id) === flightId)
  if (data)
    return res.status(200).json(data)
  else
    return res.status(400).json({error: "flight data not found"})
})

app.put('/update-flight', (req, res) => {
  const payload = {...req.body}
  const flightDataIndex = flightData.findIndex(flight =>
    flight.id === payload.id
  )
  flightData.splice(flightDataIndex, 1, payload)
  const updatedData = JSON.stringify(flightData, null, 2)
  fs.writeFile('flight.json', updatedData, (err) => {
    if(err) return res.status(500).json({message: err})
  })
  return res.status(200).json({message: "flight data updated"})
})

app.delete('/delete-flight/:id', (req, res) => {
  const flightId = req.params.id
  const newData = flightData.filter(flight => String(flight.id) !== flightId)
  const stringedNewdata = JSON.stringify(newData, null, 2)
  fs.writeFile('flight.json', stringedNewdata, (err) => {
    if(err) return res.status(500).json({message: err})
  })
  return res.status(200).json({message: "flight data deleted"})
})

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
