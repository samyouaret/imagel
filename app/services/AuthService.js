const authRouter = require('../../routes/auth');

module.exports = {
    start: function (appObject) {
        // console.log(appObject);
        appObject.app.use(authRouter(appObject));
        
    }
}