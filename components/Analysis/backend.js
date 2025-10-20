// Email tracking service
const express = require('express');
const router = express.Router();

// Track email opens
router.get('/track/:campaignId/:emailId', async (req, res) => {
  try {
    const { campaignId, emailId } = req.params;
    
    await EmailTracking.updateOne(
      { campaignId, emailId },
      {
        $set: {
          openedAt: new Date(),
          userAgent: req.headers['user-agent'],
          ipAddress: req.ip
        },
        $inc: { openCount: 1 }
      },
      { upsert: true }
    );
    
    // Send transparent pixel
    res.setHeader('Content-Type', 'image/png');
    res.send(Buffer.from('iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII=', 'base64'));
  } catch (error) {
    console.error('Tracking error:', error);
    res.status(500).send();
  }
});

// Get analytics data
router.get('/analytics/:campaignId', async (req, res) => {
  const { campaignId } = req.params;
  
  const analytics = await EmailTracking.aggregate([
    { $match: { campaignId } },
    {
      $group: {
        _id: '$campaignId',
        totalSent: { $sum: 1 },
        totalOpened: { $sum: { $cond: [{ $gt: ['$openedAt', null] }, 1, 0] } },
        uniqueOpens: { $addToSet: '$emailId' },
        openRate: { $avg: { $cond: [{ $gt: ['$openedAt', null] }, 1, 0] } }
      }
    }
  ]);
  
  res.json(analytics);
});