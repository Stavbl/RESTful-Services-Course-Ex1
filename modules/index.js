const data = require('../data/securitySettingsDB.json');

class Methods {

  getAllUsers() {
    console.log("Trace : getAllUsers()");
    return { "users": data.users };
  }
  getUserById(id) {
    console.log("Trace : getUserById("+id+")");
    if(isNaN(id))
      return {"error": "unexpected variable was given"};
    let found = false;
    for(let i in data.users) {
      var user = data.users[i];
      if(user.id == id) {
        console.log("found user_id:" + id);
        found = true;
        return {"user": user};
      }
    }
    if(!found)
    {
      console.log("user_id:" + id + " wasn't found");
      return {"info": "user not found"};
    }
  }
  getAlertsDevices(alerts, devices) {
    console.log("Trace : getAlertsDevices("+alerts+", "+devices+")");
    let found = false;
    if(!(alerts == 'true' || alerts == 'false') || isNaN(devices)) {
      console.log("error: unexpected variables were posted")
      return {"error": "unexpected variables were posted"}
    }
    var alrtsBool = (alerts == 'true');
    var devNum = parseInt(devices);
    var usersArray = [];
    for(let i in data.users) {
      var user = data.users[i];
      if(user.settings.login_alerts == alrtsBool)
      {
        if(user.settings.recognized_devices.length >= devNum) {
          console.log("found cross devices and login alerts - user_id:" + user.id);
          found = true;
          usersArray.push(user);
        }
      }
    }
    if(!found)
    {
      console.log("info : there are no users who match this condition");
      return {"info": "there are no users who match this condition"};
    }
    return {"users": usersArray};
  }
}

module.exports = function() {
  var methods = new Methods();
  return methods;
}
