const express = require('express');
const bodyParser = require('body-parser');
const app = module.exports = express();
const email = require('emailjs/email');
const path = require('path');
const compression = require('compression')

app.use(compression())
app.use(bodyParser.json());
app.use(express.static(__dirname + '/dist/WePack'));
app.get('*', function (req, res) {
    res.sendFile(path.join(__dirname, '/dist', './WePack/index.html'))
});

var server = email.server.connect({ user: "", password: "", host: "smtp.gmail.com", port: 465, ssl: true });

app.post('/sendmail', (req, res) => {

    console.log('email server connected');

    sendEmailUs(req.body, res);
    sendEmailClient(req.body, res);


})
function sendEmailUs(para, res) {

    let ourEmail = {
        text: `From: ${para.firstName} ${para.lastName}
        Message: ${para.message}`,
        from: "Website Inquiry!",
        to: '',
        subject: para.email
    }

    server.send(ourEmail, function (err, message) {
        if (err)
            console.log(err);

    }
    );
}

function sendEmailClient(req, res) {

    let emailTemplate =
        `<html>
        <head>
            <meta http-equiv="content-type" content="text/html; charset=utf-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0;">
            <meta name="format-detection" content="telephone=no" />
        
            <style>
                /* Reset styles */
        
                body {
                    margin: 0;
                    padding: 0;
                    min-width: 100%;
                    width: 100% !important;
                    height: 100% !important;
                }
        
                body,
                table,
                td,
                div,
                p,
                a {
                    -webkit-font-smoothing: antialiased;
                    text-size-adjust: 100%;
                    -ms-text-size-adjust: 100%;
                    -webkit-text-size-adjust: 100%;
                    line-height: 100%;
                }
        
                table,
                td {
                    mso-table-lspace: 0pt;
                    mso-table-rspace: 0pt;
                    border-collapse: collapse !important;
                    border-spacing: 0;
                }
        
                img {
                    border: 0;
                    line-height: 100%;
                    outline: none;
                    text-decoration: none;
                    -ms-interpolation-mode: bicubic;
                }
        
                #outlook a {
                    padding: 0;
                }
        
                .ReadMsgBody {
                    width: 100%;
                }
        
                .ExternalClass {
                    width: 100%;
                }
        
                .ExternalClass,
                .ExternalClass p,
                .ExternalClass span,
                .ExternalClass font,
                .ExternalClass td,
                .ExternalClass div {
                    line-height: 100%;
                }
        
                /* Rounded corners for advanced mail clients only */
        
                @media all and (min-width: 560px) {
                    .container {
                        border-radius: 8px;
                        -webkit-border-radius: 8px;
                        -moz-border-radius: 8px;
                        -khtml-border-radius: 8px;
                    }
                }
            </style>
        
        </head>
        
        <!-- BODY -->
        <!-- Set message background color (twice) and text color (twice) -->
        
        <body topmargin="0" rightmargin="0" bottommargin="0" leftmargin="0" marginwidth="0" marginheight="0" width="100%" style="border-collapse: collapse; border-spacing: 0; margin: 0; padding: 0; width: 100%; height: 100%; -webkit-font-smoothing: antialiased; text-size-adjust: 100%; -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%; line-height: 100%;
            >
        
            <!-- SECTION / BACKGROUND -->
            <!-- Set message background color one again -->
            <table width="100%" align="center" border="0" cellpadding="0" cellspacing="0" style="border-collapse: collapse; border-spacing: 0; margin: 0; padding: 0; width: 100%;" class="background">
                <tr>
                    <td align="center" valign="top" style="border-collapse: collapse; border-spacing: 0; margin: 0; padding: 0;" bgcolor="white">
        
                        <!-- WRAPPER -->
                        <!-- Set wrapper width (twice) -->
                        <table border="0" cellpadding="0" cellspacing="0" align="center" width="500" style="border-collapse: collapse; border-spacing: 0; padding: 0; width: inherit;
            max-width: 500px;" class="wrapper">
        
                            <tr>
                                <td align="center" valign="top" style="border-collapse: collapse; border-spacing: 0; margin: 0; padding: 0; padding-left: 6.25%; padding-right: 6.25%; width: 87.5%;
                    padding-top: 20px;
                    padding-bottom: 20px;">
        
                                    <!-- PREHEADER -->
        
                                    <!-- LOGO -->
                                    <!-- Image text color should be opposite to background color. Set your url, image src, alt and title. Alt text should fit the image size. Real image size should be x2. URL format: http://domain.com/?utm_source={{Campaign-Source}}&utm_medium=email&utm_content=logo&utm_campaign={{Campaign-Name}} --
        
                                </td>
                            </tr>
        <br>
        <br>
                            <!-- HERO IMAGE -->
                            <!-- Image text color should be opposite to background color. Set your url, image src, alt and title. Alt text should fit the image size. Real image size should be x2 (wrapper x2). Do not set height for flexible images (including "auto"). URL format: http://domain.com/?utm_source={{Campaign-Source}}&utm_medium=email&utm_content={{Ìmage-Name}}&utm_campaign={{Campaign-Name}} -->
                            <tr>
                                <td align="center" valign="top" style="border-collapse: collapse; border-spacing: 0; margin: 0; padding: 0;
                    padding-top: 0px;" class="hero"><a target="_blank" style="text-decoration: none;"><img border="0" vspace="0" hspace="0"
                    src='cid:my-image'"
                    alt="Please enable images to view this content" 
                    width="340" style="width: 50%;max-width: 340px;color: #000000; font-size: 13px; margin: 0; padding: 0; outline: none; text-decoration: none; -ms-interpolation-mode: bicubic; border: none; display: block;"/></a></td>
                            </tr>
        
                            <!-- SUPHEADER -->
                            <!-- Set text color and font family ("sans-serif" or "Georgia, serif") -->
        
                            <!-- HEADER -->
                            <!-- Set text color and font family ("sans-serif" or "Georgia, serif") -->
                            <tr>
                                <td align="center" valign="top" style="border-collapse: collapse; border-spacing: 0; margin: 0; padding: 0;  padding-left: 6.25%; padding-right: 6.25%; width: 87.5%; font-size: 24px; font-weight: bold; line-height: 130%;
                    padding-top: 5px;
                    color: #404040;
                    font-family: Cormorant;" class="header">
                    <br>
                                    Hi ${req.firstName}, 
                                </td>
                            </tr>
        
                            <!-- PARAGRAPH -->
                            <!-- Set text color and font family ("sans-serif" or "Georgia, serif"). Duplicate all text styles in links, including line-height -->
                            <tr>
                                <td align="center" valign="top" style="border-collapse: collapse; border-spacing: 0; margin: 0; padding: 0; padding-left: 6.25%; padding-right: 6.25%; width: 87.5%; font-size: 17px; font-weight: 400; line-height: 160%;
                    padding-top: 15px; 
                    color: #404040;
                    font-family: Cormorant;" class="paragraph">
                    Thank you contacting us! We are currently reviewing your message and will get back to you shortly.  
                                    <br>
                                    <br>
                        Would you rather hear from us now?
                        <br>  
                        Give us a call at <br>
                        (435)640-8695 <br>
                        or <br>
                        (435)640-1708!
                        <br>
                        <br>
                                </td>
        
                            <!-- LINE -->
                            <!-- Set line color -->
        
                            <!-- FOOTER -->
                            <!-- Set text color and font family ("sans-serif" or "Georgia, serif"). Duplicate all text styles in links, including line-height -->
        
                            <!-- End of WRAPPER -->
                        </table>
        
                        <!-- End of SECTION / BACKGROUND -->
                    </td>
                </tr>
            </table>`

    server.send({
        text: "",
        from: "",
        to: req.email,
        subject: 'Thank you for contacting us!',
        attachment:
            [
                { data: `${emailTemplate}</body></html>`, alternative: true },
                { path: "src/assets/img/WePack_FinalLogo_grey-01.png", type: "image/png", headers: { "Content-ID": "<my-image>" } }
            ]
    }, function (err, message) {
        if (err)
            console.log(err);
        else
            res.json({ success: true, msg: 'sent' });
    }
    )
};

app.listen(8000, () => {
    console.log("Successfully listening on : 8000")
})
