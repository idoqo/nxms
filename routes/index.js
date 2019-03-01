var express = require('express');
var router = express.Router();
var messageController = require('../controllers/message_controller');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/send', messageController.send_sms);
router.post('/send', messageController.send_sms);

module.exports = router;
