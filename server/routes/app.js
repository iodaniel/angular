const express = require('express');
const router = express.Router();

// const app = express();

// app.use((req, res, next) => {
//     console.log('First Middleware');
//     next();
// });

// app.use((req, res, next) =>{
//     res.send("Hello from express!");
// });
router.get('/', function(req, res, next){
    res.render('index', {title: 'CMS'});
});

module.exports = router;