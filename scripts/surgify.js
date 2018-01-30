const { exec } = require('child_process');
exec('mv build/index.html build/200.html', (err, stdout, stderr) => {
  if (err) {
    console.log('Error:', err);
    return;
  }
  // the *entire* stdout and stderr (buffered)
  console.log(`stdout: ${stdout}`);
  console.log(`stderr: ${stderr}`);
});
exec('echo \'putitonyourlist.mosleywm.com\' >build/CNAME', (err, stdout, stderr) => {
  if(err) {
    console.log(err);
  }
  console.log(`stdout: ${stdout}`);
  console.log(`stderr: ${stderr}`);
});
