import express from 'express';
import path from 'path';
const router = express.Router();
const allowedExt = ['.js', '.ico', '.css'];

router.get('*', (req, res) => {
  if (allowedExt.filter((ext) => req.originalUrl.indexOf(ext) > 0).length > 0) {
    res.sendFile(path.resolve(`server/dist/client/${req.originalUrl}`));
  } else {
    res.sendFile(path.resolve('server/dist/client/index.html'));
  }
});

export = router;
