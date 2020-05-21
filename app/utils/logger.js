/**
 * Created by samarth on 22/04/17.
 */
function Logger(level){
    this.level = level || Logger.DEBUG;
}
Logger.INFO = 2;
Logger.DEBUG = 1;
Logger.ERROR = 3;
function log(level,currentLevel,message,error){
    if(currentLevel>=level) {
        if(error) {
            console.error(new Date, message, error);
            return;
        }
        console.log(new Date,message);
    }
}

Logger.prototype.debug = function (message) {
    log(this.level,Logger.DEBUG,message,null);
};

Logger.prototype.error = function(message,e){
    log(this.level,Logger.ERROR,message,e);
};

Logger.prototype.info = function(message){
    log(this.level,Logger.INFO,message,null);
};
module.exports = Logger;
