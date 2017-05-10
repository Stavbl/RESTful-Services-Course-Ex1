const   express     = require('express');
        app         = express();
        data        = require('./data/securitySettingsDB.json');
        port        = process.env.PORT || 3000;
        bodyParser  = require('body-parser');
        methods     = require('./modules');

var method = methods();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true }));

app.all('*',
    (req, res, next) => {
    console.log('Got A Request!');
    req.next();
});
app.get('/getAllUsers/', (req, res) => {
  res.setHeader('Debug', 'getAllUsers was reached');
  res.status(200).json(method.getAllUsers());
});
app.get('/getUserById/:user_id', (req, res) => {
  res.setHeader('Debug', 'getUserById was reached');
  res.setHeader('Debug-info', 'user_id: ' + req.params.user_id);
  res.status(200).json(method.getUserById(req.params.user_id));
});
app.post('/getUserById/', (req, res) => {
  res.setHeader('Debug', 'getUserById was reached');
  var usrId = req.body.user_id;
  res.setHeader('Debug-info', 'user_id: ' + usrId);
  res.status(200).json(method.getUserById(usrId));
});
app.post('/getAlertsDevicesCrossUsers/', (req, res) => {
  res.setHeader('Debug', 'getAlertsDevicesCrossUsers was reached');
  var loginAlerts = req.body.login_alerts;
  var minimumDevices = req.body.min_devices;
  res.setHeader('Debug-info1', 'login_alerts: ' + loginAlerts);
  res.setHeader('Debug-info2', 'min_devices: ' + minimumDevices);
  res.status(200).json(method.getAlertsDevices(loginAlerts, minimumDevices));
});
app.all('*', (req, res) => {
  console.log('Request route didn\'t match any option!');
  res.status(200).json({"Warning": "Request route didn\'t match any option!",
    "Tip": "Check the service\'s API and see the supported routes"});
});

app.listen(port);
console.log('listening on port ${port}');
