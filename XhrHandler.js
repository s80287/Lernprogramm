"use strict"
let frageID = ["2", "3", "4", "5", "6", "7", "8", "9"];

let final_result = Array();
let status = null;

    function shuffle(array) {
        let counter = array.length;

        // While there are elements in the array
        while (counter > 0) {
            // Pick a random index
            let index = Math.floor(Math.random() * counter);

            // Decrease counter by 1
            counter--;

            // And swap the last element with it
            let temp = array[counter];
            array[counter] = array[index];
            array[index] = temp;
        }

        return array;
    }

    function getRandomInt(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    function xhrHandler() {

        let xhr = getXhr();
        shuffle(frageID);
        (function loop(i, length) {
            if (i >= length) {
                 status = 'ok';
                return;
            }

            var url = 'https://irene.informatik.htw-dresden.de:8888/api/quizzes/' + frageID[i];
            //var url = 'https://irene.informatik.htw-dresden.de:8888/api/quizzes/' + getRandomInt(2, 33);


            xhr.open("GET", url);

            xhr.setRequestHeader("Authorization", "Basic " + btoa("test@gmail.com:secret"));

            xhr.onreadystatechange = function () {
                if (xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200 && status == null) { //warten bis alle frage heruntergeladen sind
                    final_result.push({
                        text: JSON.parse(xhr.responseText).text,
                        answers: [{
                            text: JSON.parse(xhr.responseText).options[0],
                            value: 1
                        }, {
                            text: JSON.parse(xhr.responseText).options[1],
                            value: 0
                        }, {
                            text: JSON.parse(xhr.responseText).options[2],
                            value: 0
                        }, {text: JSON.parse(xhr.responseText).options[3],
                            value: 0}]
                    });
                    loop(i + 1, length);
                }
            }
            xhr.send();
        })//(0, 4);
        (0, frageID.length);


    function getXhr() {
        if (window.XMLHttpRequest) {
            let xhr = new XMLHttpRequest();
            return xhr;
        } else return false
    }

        xhr.onload = function() {
            if (xhr.status != 200) { //Analysieren den HTTP-Antwortstatus, wenn der Status nicht 200 ist, gab es einen Fehler
                console.log(`Fehler ${xhr.status}: ${xhr.statusText}`);
                status='404' // 404: Not Found
            } else { // wenn alles gut gegangen ist, das Ergebnis ausgeben
                console.log(`Alles gut`); // response
          }
        };

        xhr.onprogress = function(event) {
            if (event.lengthComputable) {
                console.log(`Empfangen nur ${event.loaded} von ${event.total} byte`);
            } else {
                console.log(`Empfangene Bytes: ${event.loaded} `); // wenn es keinen Content-Length-Header in der Antwort gibt
            }

        };

        xhr.onerror = function() {
            alert( "Anfrage fehlgeschlagen");
            status='404'
        };
        return  xhr.onload;
    }

    function sendXhr() {
        let url = 'https://irene.informatik.htw-dresden.de:8888/api/quizzes/1/solve';
        xhr.onreadystatechange = xhrHandler;
        xhr.open('POST', url);
        xhr.setRequestHeader("Authorization", "Basic " + window.btoa("test@gmail.com:secret"));
        xhr.setRequestHeader("Content-Type", "application/json");
        xhr.setRequestHeader("Accept", "application/json");
        xhr.send(JSON.stringify(answers));
    }

