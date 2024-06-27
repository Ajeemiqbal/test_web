const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
const port = 5500;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

let buttonState = '';

app.post('/api/button', (req, res) => {
  console.log('Button state received:', req.body.state);
  buttonState = req.body.state;
  res.send('State received: ' + req.body.state);
});

app.get('/api/button', (req, res) => {
  let data;

  switch (buttonState) {
    case 'pressed0':
      data = {
        heartRate: [ 65, 69, 75, 92, 73, 74, 90, 82, 84, 86, 88],
        bloodPressure: [120, 121, 122, 121, 120, 121, 122, 123, 122, 123],
        SpO2: [98, 97, 98, 97, 96, 97, 96, 95, 96, 95]
      };
      break;
    case 'pressed1':
      data = {
        heartRate: [75, 76, 77, 78, 79, 80, 81, 82, 83, 84],
        bloodPressure: [130, 131, 132, 131, 130, 131, 132, 133, 132, 133],
        SpO2: [95, 94, 93, 92, 91, 90, 89, 88, 87, 86]
      };
      break;
    case 'pressed2':
      data = {
        heartRate: [85, 86, 87, 88, 89, 90, 91, 92, 93, 94],
        bloodPressure: [140, 141, 142, 141, 140, 141, 142, 143, 142, 143],
        SpO2: [99, 98, 97, 96, 95, 94, 93, 92, 91, 90]
      };
      break;
    case 'pressed3':
      data = {
        heartRate: [55, 56, 57, 58, 59, 60, 61, 62, 63, 64],
        bloodPressure: [110, 111, 112, 111, 110, 111, 112, 113, 112, 113],
        SpO2: [97, 96, 95, 94, 93, 92, 91, 90, 89, 88]
      };
      break;
    case 'pressed4':
      data = {
        heartRate: [95, 96, 97, 98, 99, 100, 101, 102, 103, 104],
        bloodPressure: [150, 151, 152, 151, 150, 151, 152, 153, 152, 153],
        SpO2: [92, 91, 90, 89, 88, 87, 86, 85, 84, 83]
      };
      break;
    default:
      data = {
        heartRate: [],
        bloodPressure: [],
        SpO2: []
      };
      break;
  }

  res.json({ buttonState, ...data });
});

app.use(express.static(path.join(__dirname, 'public')));

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});
