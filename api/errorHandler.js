const errorHandler = (props)=>{
    const error = new Error();
    error.error = props;
    throw error;
}

module.exports = errorHandler;