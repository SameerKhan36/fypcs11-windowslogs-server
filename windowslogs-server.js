const express = require('express');
const { exec } = require('child_process');
const fs = require('fs');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');
const http = require("http");
const axios = require("axios");
const moment = require("moment");

const app = express();
const server = http.createServer(app);

const port = process.env.PORT || 4068;

// Path to save the logs file
const logsFilePath = 'system-logs.txt';
let output;

const io = require("socket.io")(server, {
  cors: {
    origin: "*",
  },
});

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// const logPath = path.join('C:', 'Windows', 'System32', 'winevt', 'Logs', 'System.evtx');

io.on('connection', (socket) => {
  console.log("Socket Connected");
  
  socket.on("windows-logs", (data) => {
    console.log("=== creating stream ===");
    // console.log(data)
    // fs.watchFile('C:/Windows/System32/winevt/Logs/System.evtx', (curr, prev) => {
    //   if (curr.mtime !== prev.mtime ) {
    //     console.log(`Change Detected!`); 
    //     exec(`wevtutil.exe qe System /q:"*" /f:text /rd:true /c:1>  ${logsFilePath}`, (error, stdout, stderr) => {
    //       if (error) {
    //         console.error(`exec error: ${error}`);
    //         return;
    //       }})
    //     fs.createReadStream("C:/Users/dell/Documents/Github/fypcs11-windowslogs-server/system-logs.txt")
    //     .on('data', (chunk) => {
    //       const lines = chunk.toString().split('\n').slice(10);
    //       const resLines = {resLine: lines}
    //       socket.emit('windows-logs', resLines);
    //     })

    //   }});
    // socket.emit('windows-logs', 'hello again')
  })

  socket.on("disconnect", () => {
    console.log("user disconnected");
  });

});

app.post('/windowslogs', (req, res) => {
  // Command to retrieve the system logs and save them to a file
  const command = `wevtutil qe System /q:"*" /rd:true /c:50 /f:text > ${logsFilePath}`;
  // const events = [];

  // Execute the command using child_process
  const readCallback = () => {
    // Read the logs file
    fs.readFile(logsFilePath, 'utf8', (err, data) => {
      if (err) {
        console.error(`readFile error: ${err}`);
        res.send(`Error reading logs file: ${err}`);
        return;
      }
      
      // Send the logs to the front end using res.send
      // const events = [];
      const output = data.toString().split('\r\n\r');
      // const lines = output.split('');
      if (output.pop()) {
        const currentTime = moment().format('MMMM Do YYYY hh:mm:ss a');
        axios.post("http://172.104.174.187:4000/api/add-history", 
        {
          id: 15, 
          con_type: "windows", 
          timestamp: currentTime
        });
        axios.post("http://172.104.174.187:4000/api/set/arch-logs", 
        {
          user_id: 15,
          data_src: "windows",
          log_data: data
        });
        // console.log(currentTime)
        res.send(output);
      }
    });
  }
  exec(command, readCallback);

  });

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});

server.listen(port+10, () => {
  console.log(`Socket port: ${port+10}`)
})