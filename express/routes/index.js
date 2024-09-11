import express from 'express'
let router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.send('this is index')
});

export default router
