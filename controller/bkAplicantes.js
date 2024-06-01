let listAplliances = {};

module.exports = {
    setApplications: function(dataNew) {
        listAplliances = dataNew;
    },
    getApplications: function() {
        return listAplliances;
    }
}