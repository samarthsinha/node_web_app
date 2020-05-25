module.exports = (fn) => {
    return (req, res, next) => {
        Promise.resolve(fn(req, res, next)).catch((err)=>{
            console.log(err);
            res.status(500);
            res.json({result: {error:true,status:'Error Occurred',message:err && err.message?err.message:"Unknown Error occurred"}});
            next();
        });
    };
};