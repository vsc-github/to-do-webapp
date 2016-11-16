var nodemailer = require('nodemailer');

function sendMail(title, id) {

var content = '<b>This is a reminder mail. ✔ </b>'+title+" "+id;;

var mailOptions = {
    from: 'batty.wayn3@gmail.com', 
    to: 'vishwas.s.chouhan@gmail.com', 
    subject: 'Reminder', 
    html: content 
};

    var transporter = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
            user: 'batty.wayn3@gmail.com', 
            pass: '' // Your password
        }
    });

    transporter.sendMail(mailOptions, function(error, info){
    if(error){
        console.log(error);
        return({success:false,error: error});
    }else{
        console.log('Message sent: ' + info.response);
        return({success:true,message: info.response});
    };
});
}

module.exports = sendMail;