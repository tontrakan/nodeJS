


const express = require('express')
const app = express()
const port = 3003

app.get('/', (req, res) => {
  const WebSocket = require('ws')
  const url = 'ws://localhost:8081/data'
  const connection = new WebSocket(url)

  connection.onopen = () => {
    connection.send('Message From Client')
  }

  connection.onerror = (error) => {
    console.log(`WebSocket error: ${error}`)
  }

  connection.onmessage = (e) => {
    console.log(e.data)
  }
  res.send(JSON.stringify({
    status: 200,
    message: "success received"
  }, null, 2
  ))
})

app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`))
