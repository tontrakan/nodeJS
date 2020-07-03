const WebSocket = require('ws')

const wss = new WebSocket.Server({ port: 9000, path: '/data' })

wss.on('connection', (ws, req) => {
  var ip = req.connection.remoteAddress;
  ws.on('message', message => {
    console.log(`Server message => ${message}`)
  })
  console.log(`server has connected by ${ip}`);
  var json = JSON.stringify({
    data: 100
  })
  setInterval(()=>{
    ws.send(JSON.stringify(
      [
        {
          "MSISDN":"66910283771",
          "ORDER_NO":"R0910000001865",
          "ORDER_TYPE":"New Registration",
          "ORDER_DATE":"20200313182000",
          "ORDER_CHANNEL":"Online",
          "LOCATION_CODE":"1004",
          "CHARGE_TYPE":"Post-paid",
          "CUSTOMER_ACCOUNT_ID":"8a7cc01870f6738101710566bc8f00ac",
          "SERVICE_ACCOUNT_ID":"8a7cc01870f6738101710566bc8f00ac",
          "BILLING_ACCOUNT_ID":"8a7cc01870f6738101710566c11f00b1",
          "RESULTCODE": "20000",
          "DEVELOPERMESSAGE": "Success"
        }
   ]
   ))
  }, 10000)
})


const express = require('express')
const app = express()
const port = 3002

app.get('/', (req, res) => {

  const WebSocket2 = require('ws')
  const url = 'ws://localhost:9000/data'
  const connection = new WebSocket2(url)

  connection.onopen = () => {
    connection.send(JSON.stringify({
      status: 200,
      message: "client is connected to server"
    }, null, 2
    ))
  }

  connection.onerror = (error) => {
    console.log(`WebSocket error: ${JSON.stringify(error)}`)
  }

  connection.onmessage = (e) => {
    connection.send(JSON.stringify({
      status: 200,
      message: "client success received"
    }, null, 2
    ))
    //console.log(e.data)
  }
  res.send(JSON.stringify({
    status: 200,
    message: "success received"
  }, null, 2
  ))
})

app.get('/extend', (req, res)=>{
  var request = require('request')
  request({
    url: "http://localhost:3002",
    method: "GET",
  }, (err, res, body)=>{
    if(err) {
      console.log(err);
    }
    console.log(`data: ${body}`);
    //res.send(`data`)
  })
  res.end()
})

app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`))
