const fs = require('fs-extra');
const readline = require('readline');
const {google} = require('googleapis');

const SCOPES = ['https://www.googleapis.com/auth/drive'];
const TOKEN_PATH = 'token.json';

async function readFileFromLocal(fileImage) {
  // Load client secrets from a local file.
  try {
    let credentials = await fs.readFile('credentials.json');
    credentials = JSON.parse(credentials.toString())
    const {client_secret, client_id, redirect_uris} = credentials.installed;
    const oAuth2Client = new google.auth.OAuth2(client_id, client_secret, redirect_uris[0]);
    const token = await fs.readFile(TOKEN_PATH)
    oAuth2Client.setCredentials(JSON.parse(token));
    const drive = google.drive('v3');

    const filesMetadata = {
      'name': '59665.jpg'
    }
    const media = {
      mimeType: 'image/jpg',
      body: fs.createReadStream('public/imgs/59665.jpg')
    }

    let result = await drive.files.create({
      auth: oAuth2Client,
      resource: filesMetadata,
      media: media
    })
    fs.unlink(fileImage.path);
    return new Promise((r,e)=>{
      r(result);
    })

  } catch (error) {
      console.error(error);
  }
}

module.exports = readFileFromLocal;