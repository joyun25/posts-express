const successHandle = (res, data) => {
  res.send({
    "status": "success",
    "data": data
  });
};

const errorHandle = (res, message) => {
  res.status(400).json({
    "status": "false",
    "message": message
  });
};

module.exports = { successHandle, errorHandle };