const checkUniqueColumn = (model, field, value, successMsg, errorMsg) => {
  return new Promise((resolve, reject) => {
    model
      .count({ where: { [field]: value } })
      .then((count) => {
        if (count <= 0) {
          resolve(successMsg);
        } else {
          reject(errorMsg);
        }
      })
      .catch((err) => {
        reject(errorMsg);
      });
  });
};

module.exports = { checkUniqueColumn };
