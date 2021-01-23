const express = require('express');
const app = express();

const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');

app.use(express.urlencoded({extended:true}));
app.use(bodyParser.json())

const port = process.env.PORT || 8000;


app.post('/sendMail',(req,res,next) => {

    console.log(req.body)
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: req.body.from,
          pass: req.body.password
        }
      });

    var mailOptions = {
        from: req.body.from,
        to: req.body.to,
        subject: req.body.subject,
        html: `
            <p> Hello, We received a request to reset the password for your account for this email address. To initiate the password reset process for your account, click the link below. </p>           
            <p><a href="${req.body.link}">click here to rest password </a></p>

            <p>If you need to reset your password again, please request another reset. 
            If you did not make this request, you can ignore this email. 
            Sincerely, The XYZ Team </p>
            `,
      };
      
      transporter.sendMail(mailOptions, function(error, info){
        if (error) {
          res.json({error: error});
        } else {
           res.json({status: info.response});
        }
      });
    
  })

  app.get('/',(req,res,next) => {
      console.log('hi...')
  })

  app.listen(port, () => {
      console.log('running on '+ port)
  })
  
