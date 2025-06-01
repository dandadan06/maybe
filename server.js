const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const twilio = require('twilio');

const app = express();
const port = process.env.PORT || 3000;

// Replace these with your actual Twilio credentials
const accountSid = 'AC2d6bbd6741d764c34adf4dd4f45435d4';
const authToken = '39c238d50df828f2f0c293e0504224a7';
const client = twilio(accountSid, authToken);

// Your verified Twilio phone number
const fromPhone = '+639602618779';
// Your personal number to receive texts
const toPhone = '+639602618779';

app.use(cors());
app.use(bodyParser.json());

app.post('/send-sms', async (req, res) => {
  const { response } = req.body;

  try {
    const message = await client.messages.create({
      body: She clicked "${response.toUpperCase()}",
      from: fromPhone,
      to: toPhone
    });

    res.status(200).json({ success: true, sid: message.sid });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false });
  }
});

app.listen(port, () => {
  console.log(Server running on port ${port});
});