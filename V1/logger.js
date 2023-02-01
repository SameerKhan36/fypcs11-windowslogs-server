// const express = require('express');
// const app = express();
// // const winlog = require('winlog');

const { exec } = require('child_process');
// exec('PowerShell.exe Get-EventLog -Newest 5 -LogName "Application" -ComputerName test', (error, stdout, stderr) => {
//   if (error) {
//     console.error(`exec error: ${error}`);
//     return;
//   }
//   console.log(`stdout: ${stdout}`);
//   console.log(`stderr: ${stderr}`);
// });

// // // app.listen(port, () => {
// // //     console.log(`Example app listening on port ${port}`);
// // // });

// const winston = require('winston');
// require('winston-winlog3').Winlog3;

// const options = {
//     file: {
//         level: 'info',
//         filename: 'application.log',
//         handleExceptions: true,
//         json: true,
//         maxsize: 5242880, // 5MB
//         maxFiles: 5,
//         colorize: false,
//     },
//     eventLog: {
//         level: 'info',
//         source: 'MyService',
//         handleExceptions: true
//     }
// };
// winston.add(winston.transports.File, options.file);
// winston.add(winston.transports.Winlog3, options.eventLog);

// // Use winston to log events from your node-windows service
// winston.info('Service started');




// 1st Attempt
// const EventLogReader = require('windows-eventlog-reader');
// const express = require('express');
// const app = express();
// const cors = require('cors');
// const bodyParser = require('body-parser');

// const reader = new EventLogReader('Application');
// const port = process.env.PORT || 4068;

// app.use(cors());
// app.use(bodyParser.urlencoded({ extended: false }));
// app.use(bodyParser.json());

// app.post('/api/windows-logs', (req, res) => {
//   const {user, ipAdd, passWord, pathSys} = req.body;
//   console.log(`${user}@${ipAdd} connected.`);
//   reader.readAll((error, events) => {
//     if (error) {
//       res.status(500).send({ error });
//       return;
//     }

//     res.send(events);
//   });

//   app.listen(port, () => {
//     logger.log(`App started on port: ${port}`)
//     })
// });



// 2nd Attempt
const express = require('express');
const app = express();
const http = require("http");
const cors = require('cors');
const bodyParser = require('body-parser');

const server = http.createServer(app);
const port = process.env.PORT || 4068;

// app.use(cors());
// app.use(bodyParser.urlencoded({ extended: false }));
// app.use(bodyParser.json());

// app.post('/api/windows-logs', (req, res) => {
//   const {user, ipAdd, passWord, pathSys} = req.body;
//   console.log(`${user}@${ipAdd} connected.`);

//   const command = `cat ${pathSys}`;
//   // const command = 'cat /var/log/syslog';
//   const filePath = 'C:/Windows/System32/winevt/Logs/Application.evtx';

//   if (pathSys === 'C:/Windows/System32/winevt/Logs/Application.evtx') {
//     exec(`${command} > ${filePath}`, (error, stdout, stderr) => {
//       if (error) {
//         console.error(`exec error: ${error}`);
//         return;
//       }
//       console.log("Saving log");
//     });
//   }

//     // console.log(`stdout: ${stdout}`);
//     // console.error(`stderr: ${stderr}`);
//   res.send("API SUCCESSFUL");
// })

app.listen(port, () => {
  console.log(`App started on port: ${port}`)
})