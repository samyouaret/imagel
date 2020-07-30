const authRouter = require('../../routes/auth');

module.exports = {
    start: function (appInstance) {
        // console.log(appObject);
        appInstance.getApp().use(authRouter(appInstance));
        
    }
}