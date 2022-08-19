const ErrorResponse = require('../utils/errorResponse');


exports.validate = (schema) => (req, res, next) => {
    const { error } = schema.validate(req.body);
    if (error) {
        throw new ErrorResponse(error.details[0].message, 400)
    } else {
      next();
    }
  };

