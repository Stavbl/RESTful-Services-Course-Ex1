var mongoose = require('mongoose'),
    schema = mongoose.Schema,
    userSchema = new schema({
      user_name:  {type:String, index:1, required:true, unique:true},
      password:   {type:String, required:true},
      email:      {type:String, required:true},
      first_name: {type:String, required:true},
      last_name:  {type:String, required:true},
      settings:   {
        login_alerts: {type:Boolean, required:true},
        recognized_devices: [String],
        recognized_devices_length: Number,
        phone_to_aproove_password_change: String
      }
    });

var User = mongoose.model('User', userSchema);
module.exports = User;
