/* 
1. Use the inquirer npm package to get user input.
2. Use the qr-image npm package to turn the user entered URL into a QR code image.
3. Create a txt file to save the user input using the native fs node module.
*/
import inquirer from 'inquirer';
import qr from 'qr-image';
import fs from 'fs';

inquirer
  .prompt([
    {
      type: 'input',
      name: 'url',
      message: 'Enter the URL you want to encode in the QR code:'
    }
  ])
  .then((answers) => {
    // Use user feedback for... whatever!!
    const url = answers.url;

    // Generate QR code
    const qrCode = qr.image(url, { type: 'png' });
    qrCode.pipe(fs.createWriteStream('qrcode.png'));

    // Save user input to a text file
    fs.writeFile('url.txt', url, (err) => {
      if (err) throw err;
      console.log('URL has been saved to url.txt');
    });
  })
  .catch((error) => {
    if (error.isTtyError) {
      // Prompt couldn't be rendered in the current environment
      console.error('Prompt couldn\'t be rendered in the current environment');
    } else {
      // Something else went wrong
      console.error('Something else went wrong');
    }
  });
 