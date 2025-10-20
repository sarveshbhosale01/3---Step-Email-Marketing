// Replace all links in the email with tracking links
const originalLink = "https://yourwebsite.com";
const trackedLink = `https://yourapi.com/track-click/${emailId}?redirect=${encodeURIComponent(originalLink)}`;

app.get('/track-click/:emailId', (req, res) => {
  const emailId = req.params.emailId;
  const redirectUrl = req.query.redirect;
  
  // Record the click event
  recordEmailClick(emailId, req.ip, new Date());
  
  // Redirect to original URL
  res.redirect(redirectUrl);
});