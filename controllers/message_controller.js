const Nexmo = require('nexmo');
const bodyParser = require('body-parser');
const config = require('../config');

//set nexmo config
const nexmo = new Nexmo({
    apiKey: config.API_KEY,
    apiSecret: config.API_SECRET
});
  
exports.send_sms = (req, res) => {
    let phoneNumbers = splitNumbers("09074919559");
    //fl represents the target first letter of candidate name. We use this to hold the session variable
    //containing the current ASCII equiv of the last first letter
    let fl = 65;
    if (req.session.fl == null || req.session.fl == undefined) {
        //reset the first letter to A once it crosses Z
        fl = 65;
    } else if (req.session.fl > 90) {
        fl = 65;
    } else {
        fl = req.session.fl + 1;
    }
    req.session.fl = fl;

    let i = 1;
    phoneNumbers.forEach((number) => {
        var candidateName = generateName(String.fromCharCode(fl));
        var date = new Date();
        var current_ts = date.getTime();
        var date = "2019-03-01";
        var time = "03:00";
        let message =
            "Hi ${candidateName}, we receive your hackathon code, we are testing for scalability. This message was " +
            "sent in ${current_ts} on the ${date} at ${time}";
            // ensure number starts with country code (in this case, Nigeria (234))
            number = number.startsWith('0') ? number.replace('0', '234') : number;

        nexmo.message.sendSms("GetDev Gateway", number, message, (err, result) => {
            if (err) console.log(err);
            console.log(result);
      
            // after the message has been successfully sent to the last number, send a server response
            if (i === phoneNumbers.length - 1) {
                console.log('message sent');
                // You can now return server response.
            }
        });
        i += 1;
    });
}

exports.splitNumbers = (numbers) => {
    numbers = numbers.split(",");
    if (numbers.length > 1) {
        numbers.forEach((item) => {
            item.trim();
        });
    }
    return numbers;
}

exports.generateName = (first_letter) => {
    let random_string = '';
    let random_ascii;
    //start at 65 to 90 since that's the ASCII range for capital letters
    let ascii_low = 65;
    let ascii_high = 90;
    random_string += first_letter;
    for (let i = 0; i < 5; i++) {
        random_ascii = Math.floor((Math.random() * (ascii_high - ascii_low)) + ascii_low);
        random_string += String.fromCharCode(random_ascii)
    }
    return random_string;
}