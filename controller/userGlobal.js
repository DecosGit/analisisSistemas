let userGlobal = {};

module.exports = {
    setUserGlobal: function(userData) {
        userGlobal = userData;
    },
    getUserGlobal: function() {
        return userGlobal;
    }
}