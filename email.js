#! /usr/bin/env node

const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const fs = require('fs'),
  fileType = 'application/pdf',
  filename = 'Phitchawat_Lukkanathiti_Resume.pdf',
  data = fs.readFileSync(filename),
  filename_t = 'Phitchawat_Lukkanathiti_Resume_with_transcript.pdf',
  data_t = fs.readFileSync(filename_t);

const msg = {
  to: 'github-resume@phitchaw.at',
  from: 'github@phitchaw.at',
  subject: 'Phitchawat Resume',
  text: 'Your resume is compiled and attached.',
  attachments: [
    {
      content: data.toString('base64'),
      filename: filename,
      type: fileType,
      disposition: 'attachment',
    },
    {
      content: data_t.toString('base64'),
      filename: filename_t,
      type: fileType,
      disposition: 'attachment',
    },
  ],
};

sgMail
  .send(msg)
  .then(() => console.log('Mail sent successfully'))
  .catch(error => console.error(error.toString()));
