const errorHandler = (err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    //Objeto de respuesta error
    const errorResponse = {
        error: {
            message: err.message || 'Error interno en el servidor',
            code: err.code || 'internal error'
        },
    };
    //Enviar respuesta en error formato Json
    res.status(statusCode).json(errorResponse);
};

module.exports = errorHandler;
