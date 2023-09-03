const http = require("http");
const getUsers = require("./modules/users");

const server = http.createServer((request, response) => {
  if (request.url === "/") {
    response.status = 200;
    response.statusMessage = "OK";
    response.header = "Content-Type: text/plain";
    response.write("Hello, world");
    response.end();

    return;
  } else if (request.url === "/?users") {
    response.status = 200;
    response.statusMessage = "OK";
    response.header = "Content-Type: application/json";
    response.write(getUsers());
    response.end();

    return;
  } else if (request.url === "?hello=<name>") {
    response.status = 200;
    response.statusMessage = "OK";
    response.header = "Content-Type: text/plain";
    response.write("Hello,.");
    response.end();

    return;
  } else if (request.url === "/?hello") {
    response.status = 400;
    response.statusMessage = "Bad Request";
    response.header = "Content-Type: text/plain";
    response.write("Enter a name");
    response.end();

    return;
  } else {
    response.status = 500;
    response.statusMessage = "Internal Server Error";
    response.header = "Content-Type: text/plain";
    response.write("");
    response.end();

    return;
  }
});

server.listen(3003, () => {
  console.log("Сервер запущен по адресу http://127.0.0.1:3003");
});
