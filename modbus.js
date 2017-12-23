// pobieranie daty i czasu
var dzien;
var miesiac;
var rok;
var godzina;
var minuta;
var sekunda;
var dzisiaj;



function time() {
  dzisiaj = new Date();
  dzien = dzisiaj.getDate();
  miesiac = dzisiaj.getMonth() + 1;
  rok = dzisiaj.getFullYear();
  godzina = dzisiaj.getHours();
  if (godzina < 10) godzina = "0" + godzina;
  minuta = dzisiaj.getMinutes();
  if (minuta < 10) minuta = "0" + minuta;
  sekunda = dzisiaj.getSeconds();
  if (sekunda < 10) sekunda = "0" + sekunda;
  //  document.getElementById("zegar").innerHTML = dzien+"/"+miesiac+"/"+rok+" | "+godzina+":"+minuta+":"+sekunda;
  //  setTimeout("odliczanie()",1000);
}




let reg;
let val;
let ipNumber;
let firstReg;
let lastreg;
let regNumber;
let buttonClicked;

function regTempFuncB4() {
  buttonClicked = "b4";
  // console.log(buttonClicked);

}

function regTempFuncB5() {
  buttonClicked = "b5";

  // console.log(buttonClicked);
}

function regTempFuncB6() {
  buttonClicked = "b6";

  // console.log(buttonClicked);
}

function regTempFuncB7() {
  buttonClicked = "b7";

  // console.log(buttonClicked);
}





function modbusWrite() {
  time()
  ipNumber = document.getElementById("ipAddress").value;


  //////////warunki przepisujace odpowiednia warsoc do zmiennej reg i val
  if (buttonClicked == "b4") {
    reg = document.getElementById("regNumberButton4").value;
    val = document.getElementById("valueButton4").value;
  }
  if (buttonClicked == "b5") {
    reg = document.getElementById("regNumberButton5").value;
    val = document.getElementById("valueButton5").value;
  }

  if (buttonClicked == "b6") {
    reg = document.getElementById("regNumberButton6").value;
    val = document.getElementById("valueButton6").value;
  }

  if (buttonClicked == "b7") {
    reg = document.getElementById("regNumberButton7").value;
    val = document.getElementById("valueButton7").value;
  }




  let alertMesage = 'ModBus module is not connected\n Please connect the cable, set propper IP and try again';

  if (msg === "host 192.168.0.3 is dead") alert(alertMesage, "MH Modbus TCP tester"); //warunek sprawdza czy połacznei jest nieaktywne. Jesli tak to wyśiwtla komunikat, leśłi jest ok to jedzie dalej
  else {

    var net = require('net');


    var modbus = require('jsmodbus');

    // create a modbus client
    var client = modbus.client.tcp.complete({
      'host': ipNumber,
      'port': 502,
      'autoReconnect': false,
      'reconnectTimeout': 1000, //1000 domyslene
      'timeout': 5000,  //5000 domyślne
      'unitId': 0
    });

    client.connect();

    // reconnect with client.reconnect()

    client.on('connect', function() {

      // make some calls

      client.writeSingleRegister(reg, val).then(function(resp) {

        // resp will look like { fc: 6, byteCount: 4, registerAddress: 13, registerValue: 42 }
        console.log(resp);

        let separator = ";";


        document.getElementById("viewResult").innerHTML += godzina + ":" + minuta + ":" + sekunda + ": " + "Sended:" + "R"+reg+ "="+ val + "\n"; //resp.register powoduje wyświetlenie danych z tablicy


      }, console.error).finally(function () {
        client.close()
      });



    });
  }
}


//////////////////////Read Holding register function
function modbusRead() {
  time()
  firstReg = document.getElementById("firstRegNumber").value;
  lastreg = document.getElementById("lastRegNumber").value;
  let firstRegNumber = Number(firstReg);
  let lastregNumber = Number(lastreg);

  regNumber = lastreg - firstReg + 1; // liczba rejestrów do odczytu wg wpisanych od XX do XX

  ipNumber = document.getElementById("ipAddress").value;

  let alertMesage = 'ModBus module is not connected\n Please connect the cable, set propper IP and try again';

  if (msg === "host 192.168.0.3 is dead") alert(alertMesage, "MH Modbus TCP tester"); //warunek sprawdza czy połacznei jest nieaktywne. Jesli tak to wyśiwtla komunikat, leśłi jest ok to jedzie dalej
  else {

    var modbus = require('jsmodbus');

    // create a modbus client
    var client = modbus.client.tcp.complete({
      'host': ipNumber,
      'port': 502,
      'autoReconnect': false,
      'reconnectTimeout': 1000,
      'timeout': 5000,
      'unitId': 0
    });

    client.connect();

    // reconnect with client.reconnect()

    client.on('connect', function() {

      // make some calls


      client.readHoldingRegisters(firstReg, regNumber).then(function(resp) {

        // resp will look like { fc: 3, byteCount: 20, register: [ values 0 - 10 ], payload: <Buffer> }
        console.log(resp);
        let regNumberView = [];
        regNumberView = resp.register; //przepisanie wartości tablicy resp do zmiennej roboczej regNumberView

        ////////////////pętla dodajaca przedrostek Rx= gdzie x to nr rejestru
        for (let x = 0; x < resp.register.length; x++) {

          regNumberView[x] = ["R" + (firstRegNumber + x) + "=" + resp.register[x]];
        }


        let separator = ";";
        document.getElementById("viewResult").innerHTML += godzina + ":" + minuta + ":" + sekunda + ": " + "Received:" + regNumberView.join(separator) + "\n"; //resp.register powoduje wyświetlenie danych z tablicy

      }, console.error).finally(function () {
        client.close()
      });
    })
  }
}

function clearTextaArea() {

  //document.getElementById("viewResult").innerHTML += godzina +":"+ minuta+":" + sekunda +": "+"Receive:" +"&nbsp" + data3 +"\n\n";
  document.getElementById("viewResult").innerHTML = "";

}

// client.on('error', function (err) {
//
//     console.log(err);
//
// })
