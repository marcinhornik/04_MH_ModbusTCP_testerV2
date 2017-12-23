
let msg;

function ping(){
  document.getElementById("connected").innerHTML = "...waiting for status";

var ping = require('ping');

var hosts = ['192.168.0.3'];
hosts.forEach(function(host){
    ping.sys.probe(host, function(isAlive){
        msg = isAlive ? 'host ' + host + ' is alive' : 'host ' + host + ' is dead';
        console.log(msg);

if (msg == "host 192.168.0.3 is alive") document.getElementById("connected").innerHTML = "<span style=\"color:green\">" +"CONNECTED"+ "</span>"; // konkretny kolor tekstu w span style
else document.getElementById("connected").innerHTML = "<span style=\"color:red\">" +"DISCONNECTED"+ "</span>";  // konkretny kolor tekstu w span style

    });
});
}
// var ping = require ("net-ping");
// var session = ping.createSession ();
//
// session.pingHost ("192.168.0.3", function (error, target) {
//     if (error)
//         if (error instanceof ping.RequestTimedOutError)
//             console.log (target + ": Not alive");
//         else
//             console.log (target + ": " + error.toString ());
//     else
//         console.log (target + ": Alive");
// });


//}
