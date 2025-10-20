// Method: Embed a tracking pixel (1x1 transparent image)
const trackingPixel = `<img src="https://yourapi.com/track-open/${emailId}" width="1" height="1" style="display:none" />`;

// When the image loads, you know the email was opened
app.get('/track-open/:emailId', (req, res) => {
  const emailId = req.params.emailId;
  // Record the open event in database
  recordEmailOpen(emailId, req.ip, new Date());
  res.sendFile('pixel.png'); // Send a 1x1 transparent PNG
});