var http = require("http");
var fs = require("fs");
var socketio = require("socket.io");
var clients = [];

var server = http.createServer(function (req, res) {
   console.log("Żądany przez przeglądarkę adres: " + req.url)

    if (req.url === "/") {
        fs.readFile("static/index.html", function (error, data) {
            res.writeHead(200, { 'Content-Type': 'text/html' });
            res.write(data);
            res.end();
        })
    }
    else if (req.url === "/libs/jquery.min.js") {
        fs.readFile("static/libs/jquery.min.js", function (error, data) {
            res.writeHead(200, { 'Content-Type': 'application/javascript' });
            res.write(data);
            res.end();
        })
    }
    else if (req.url === "/libs/three.js") {
        fs.readFile("static/libs/three.js", function (error, data) {
            res.writeHead(200, { 'Content-Type': 'application/javascript' });
            res.write(data);
            res.end();
        })
    }
    else if (req.url === "/js/Bullet.js") {
        fs.readFile("static/js/Bullet.js", function (error, data) {
            res.writeHead(200, { 'Content-Type': 'application/javascript' });
            res.write(data);
            res.end();
        })
    }
    else if (req.url === "/js/Wall.js") {
        fs.readFile("static/js/Wall.js", function (error, data) {
            res.writeHead(200, { 'Content-Type': 'application/javascript' });
            res.write(data);
            res.end();
        })
    }
    else if (req.url === "/js/Main.js") {
        fs.readFile("static/js/Main.js", function (error, data) {
            res.writeHead(200, { 'Content-Type': 'application/javascript' });
            res.write(data);
            res.end();
        })
    }
    else if (req.url === "/js/Canon.js") {
        fs.readFile("static/js/Canon.js", function (error, data) {
            res.writeHead(200, { 'Content-Type': 'application/javascript' });
            res.write(data);
            res.end();
        })
    }
    else if (req.url === "/js/OrbitControls.js") {
        fs.readFile("static/js/OrbitControls.js", function (error, data) {
            res.writeHead(200, { 'Content-Type': 'application/javascript' });
            res.write(data);
            res.end();
        })
    }
    else if (req.url === "/js/Grid.js") {
        fs.readFile("static/js/Grid.js", function (error, data) {
            res.writeHead(200, { 'Content-Type': 'application/javascript' });
            res.write(data);
            res.end();
        })
    }
    // servResponse(req, res);
    
    // function servResponse(req, res)
    // {
    //     var allData = "";
    
    //     req.on("data", function (data) {
    //         allData += data;
    //     });

    //     req.on("end", function (data) {
    //         var finishObj = qs.parse(allData);
    //         switch (finishObj.action) {
                
    //         }
    //     });
    // }
})


server.listen(3000, function () {
    console.log("serwer startuje na porcie 3000")
});

var io = socketio.listen(server);

io.sockets.on("connection", function (client) {    
    console.log("Klient się podłączył: "+ client.id);
    
    newUserConnected(client);

    client.on("disconnect", function () {
        console.log("klient się rozłącza");

        var index = clients.indexOf(client.id);
        if (index > -1)
            clients.splice(index, 1);
    });

    client.on("canonRotate", function (data) {
        console.log("emit do " + client.id);

        var index = clients.indexOf(client.id);
        var alterIndex = (index == 0) ? 1 : 0;

        io.sockets.to(clients[alterIndex]).emit("canonRotate", {
            rotation: data.rotation
        });
    });

    client.on("barrelRotate", function (data) {
        console.log("emit do " + client.id);

        var index = clients.indexOf(client.id);
        var alterIndex = (index == 0) ? 1 : 0;

        io.sockets.to(clients[alterIndex]).emit("barrelRotate", {
            rotation: data.rotation
        });
    });

    
    client.on("canonFire", function (data) {
        console.log("emit do " + client.id);

        var index = clients.indexOf(client.id);
        var alterIndex = (index == 0) ? 1 : 0;

        io.sockets.to(clients[alterIndex]).emit("canonFire", {
        });
    });

    client.on("bulletHit", function (data) {
        console.log("emit do " + client.id);

        var index = clients.indexOf(client.id);
        var alterIndex = (index == 0) ? 1 : 0;

        io.sockets.to(clients[alterIndex]).emit("bulletHit", {
        });
    });
});


function newUserConnected(client)
{
    if(clients.length < 2)
        clients.push(client.id);

    if(clients.length == 2)
    {
        console.log("TWO PLAYERS")
        io.sockets.to(clients[0]).emit("canonCreate", {
            x: 50
        });
        io.sockets.to(clients[1]).emit("canonCreate", {
            x: -50
        });
    }
}