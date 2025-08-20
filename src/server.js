function start(application, port = 3001) {
  application.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
}

module.exports = {
  start
};