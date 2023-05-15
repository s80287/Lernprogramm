"use strict"
const fragesatz = document.getElementById("fragebereich");
const buttonsElem = document.getElementById("buttons");
const pagesElem = document.getElementById("fragenummer");
let questions;  //Variablle für Fragentransfer
let quiz;
//fragesatz.innerHTML = "<img src='image/hi.gif'  width='70%' height='80%'  float='left' overflow= 'hidden'/>";

buttonsElem.innerHTML = "";
pagesElem.innerHTML = "";


class Quiz {
    constructor(questions, results) {
        //Array  von Fragen
        this.questions = questions;
        //Array mit möglichen Ergebnissen
        this.Niveau = results;
        //menge der erzielten Punkte
        this.score = 0;
        //idex  des Ergebnisses aus dem Array
        this.meinNiveau = 0;
        //Aktuelle Fragenummer
        this.fragenummer = 0;
    }

    Click(index) {
        //Punkte hinzufügen
        let value = (this.questions[this.fragenummer].answers[index].value / this.questions.length) * 100;
        this.score += value;

        let correct = -1;

        //Wenn ein Punkt hinzugefügt wurde, gilt die Antwort als richtig
        if (value == 1) {
            correct = index;
        } else {
            //Andernfalls suchen wir nach der richtigen Antwort
            for (let i = 0; i < this.questions[this.fragenummer].answers.length; i++) {
                if (this.questions[this.fragenummer].answers[i].value == 1) {
                    correct = i;}
            }
        }
        this.Next();
        return correct;
    }

    //Weiter geht es mit der nächsten Frage
    Next() {
        this.fragenummer++;
        if (this.fragenummer >= this.questions.length) {
            this.End();
        }
    }

    //Wenn es keine weiteren Fragen gibt, prüft diese Methode, welches Ergebnis der Benutzer erhalten hat
    End() {
        for (let i = 0; i < this.Niveau.length; i++) {
            if (this.Niveau[i].Check(this.score)) {
                this.meinNiveau = i;
            }
        }
    }
}


//Die Klasse, die das Ergebnis repräsentiert
class Result {
    constructor(text, value) {
        this.text = text;
        this.value = value;
    }

    //Diese Methode prüft, ob der Benutzer genügend Punkte hat
    Check(value) {
        if (this.value <= value) {
            return true;
        } else {
            return false;
        }
    }
}

//Array mit Ergebnissen von 0 bis 75%
const results =
    [
        new Result("Sie sollten noch viel üben", 0),
        new Result("Sie sollten noch üben", 25),
        new Result("Sie kennen das Thema schon, sollten aber noch üben", 50),
        new Result("Sie kennen das Thema gut", 75)
    ];

//einfach Update von Quiz
function Update() {
    //Prüfen, ob es noch weitere Fragen gibt
    if (quiz.fragenummer < quiz.questions.length) {
        //Wenn ja,  die Frage in der Kopfzeile ändern
       ///// fragesatz.innerHTML = quiz.questions[quiz.fragenummer].text;
        if (quiz.questions == mathefragen)
            katex.render(quiz.questions[quiz.fragenummer].text, fragesatz, {
                throwOnError: false});
        else  fragesatz.innerHTML = quiz.questions[quiz.fragenummer].text;
        //Löschen von alten Antwortvorgaben
        buttonsElem.innerHTML = "";

        shuffle(quiz.questions[quiz.fragenummer].answers);

        //Tasten für neue Antwortmöglichkeiten erstellen
        for (let i = 0; i < quiz.questions[quiz.fragenummer].answers.length; i++) {
            let btn = document.createElement("button");
            btn.className = "button";
            btn.innerHTML = quiz.questions[quiz.fragenummer].answers[i].text;
            btn.setAttribute("index", i);
            buttonsElem.appendChild(btn);
        }

        //Druckt die Nummer der aktuellen Frage
        pagesElem.innerHTML = (quiz.fragenummer + 1) + " / " + quiz.questions.length;
        // Und Statusbar für richtige Antworten
        document.getElementById('progress').style.width = Math.round(quiz.score) + "%";
        // document.getElementById('progress').style.width=(quiz.score/(quiz.questions.length))*100+"%";
        //Aufruft die Funktion, die den neuen Button Ereignisse zuordnet
        Init();
    }
    else {
        //Wenn schon das Ende ist, drucken wir das Ergebnis
        buttonsElem.innerHTML = "";//einfach alles löschen in  <div class="buttons__content" id="buttons" >
        fragesatz.innerHTML = quiz.Niveau[quiz.meinNiveau].text;//und überschreiben
        pagesElem.innerHTML = "Punkten: " + Math.round(quiz.score);//mit mathrunde entferne ich 0.9999999 teil =)
        document.getElementById('progress').style.width = Math.round(quiz.score) + "%";
        let btn = document.createElement("button");
        btn.className = "button";
        btn.innerHTML = "Noch mal";
        buttonsElem.appendChild(btn);
        btn.onclick = function () { //überschreibt einen vorhandenen Handler

            quiz = new Quiz(questions, results);
            Update();
        }
    }
}

function Init() {
    //Alle Tasten finden
    let btns = document.querySelectorAll("button");

    for (let i = 0; i < btns.length; i++) {
        //ereignisse für jede einzelne Taste bilden
        //Die Funktion Click() wird aufgerufen, wenn die Schaltfläche angeklickt wird
        btns[i].addEventListener("click", function (e) {
            Click(e.target.getAttribute("index"));
        });
    }
}


function Click(index) {
    //index der richtigen Antworten ermitteln
    let correct = quiz.Click(index);
    ////let correct = fragen[index].value;
    //Alle Tasten finden
    let btns = document.querySelectorAll("button");
    //Die Tasten grau machen  <button class="button button_passive" style="font-size:2vw;" >Unclicked button</button><br>
    for (let i = 0; i < btns.length; i++) {
        btns[i].className = "button button_passive";
    }
    //wir markieren  die richtige Antwort in grün und die falsche Antwort in rot
    if (correct >= 0) {
        btns[correct].className = "button button_correct";
    }
    if (index != correct) {
        btns[index].className = "button button_wrong";
    }
    //warte eine Sekunde und aktualisiere den Test
    setTimeout(Update, 1000);
}



rest.onclick = function () { // überschreibt einen vorhandenen Handler für AJAX
    xhrHandler();
    //fragesatz.innerHTML = "<img src='image/load.gif'  width='70%' height='80%'  float='left' overflow= 'hidden'/>";
    fragesatz.innerHTML = "loading...";
    buttonsElem.innerHTML = "";
    pagesElem.innerHTML = "";
    shuffle(final_result);
    questions = final_result;
    quiz = new Quiz(questions, results);
    setTimeout(Update, 3000);
    //document.getElementById("interaktiv").innerHTML = "Fragen vom Server 𓀠☁";
    document.getElementById("interaktiv").innerHTML = "Fragen vom Server";
};


mathelernen.onclick = function () { // überschreibt einen vorhandenen Handler
    shuffle(mathefragen);
    questions = mathefragen;
    quiz = new Quiz(mathefragen, results);
    Update();
    document.getElementById("interaktiv").innerHTML = "Mathe lernen";
};


notenlernen.onclick = function () { // überschreibt einen vorhandenen Handler
    shuffle(internettechnologien);
    questions = internettechnologien;
    quiz = new Quiz(internettechnologien, results);
    Update();
    document.getElementById("interaktiv").innerHTML = "Internettechnologie lernen";
};

// allgemeines Wissen
wissenLernen.onclick = function () { // überschreibt einen vorhandenen Handler
    shuffle(allgemeinesWissenFragen);
    questions = allgemeinesWissenFragen;
    quiz = new Quiz(allgemeinesWissenFragen, results);
    Update();
    document.getElementById("interaktiv").innerHTML = "Allgemeines Wissen lernen";
};

//Funktion um ARRAY zu mischen
function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1)); // Zufallsindex von 0 bis i
        // let t = array[i]; array[i] = array[j]; array[j] = t
        [array[i], array[j]] = [array[j], array[i]];
    }
}



// erzeugt ein JavaScript-Objekt (damit kann es für JSON in literal genutzt werden)))
const mathefragen =
    [
    // 1
    {
        text: "x^{3} = 8",
        answers: [{text: "2", value: 1}, {text: "1", value: 0}, {text: "3", value: 0}, {text: "4", value: 0}],
    },
    // 2
    {
        text: "x^{4} = 256",
        answers: [{text: "4", value: 1}, {text: "3", value: 0}, {text: "5", value: 0}, {text: "6", value: 0}],
    },
    // 3
    {
        text: " \\int_{1}^2(2x+4)\\,dx",
        answers: [{text: "7", value: 1}, {text: "10", value: 0}, {text: "13", value: 0}, {text: "5", value: 0}]

    },
    // 4
    {
        text: `5 * 10^{-2} =`,
        answers: [{text: "0,05", value: 1}, {text: "0,5", value: 0}, {text: "0,005", value: 0}, {text: "500", value: 0}]

    },
    // 5
    {
        text: "5(x-3)=-10",
        answers: [{text: "-2", value: 1}, {text: "-5", value: 0}, {text: "3", value: 0}, {text: "4", value: 0}]

    },
    // 6
    {
        text: "\\text{Der Radius eines Kreises}\\\\ \\text{beträgt 10 cm.}\\\\ \\text{Wie groß ist sein Umfang?}",
        answers: [{text: "62,8 cm", value: 1}, {text: "31,4 cm", value: 0}, {text: "102,6 cm", value: 0}, {text: "188,4 cm", value: 0}]
    },
    // 7
    {
        text: "\\text{Berechnen Sie den Grenzwert}\\\\ \\\\ \\lim\\limits_{x\\to\\infty } ({8x+3 \\over 2x+6})",
        answers: [{text: "4", value: 1}, {text: "+∞", value: 0}, {text: "8", value: 0}, {text: "2", value: 0}]
    },  
    // 8
    {
        text: "\\text{Berechnen Sie den Grenzwert}\\\\ \\\\ \\lim\\limits_{x\\to\\infty } ({4x^2+5 \\over 2x+4})",
        answers: [{text: "+∞", value: 1}, {text: "2", value: 0}, {text: "4", value: 0}, {text: "unbekannt", value: 0}]
    },
    // 9
    {
        text: "\\text{Wie hoch ist die Zinsen,} \\\\ \\text{wenn du bei einem Zinssatz} \\\\ \\text{ von 1,5\\% im Jahr, Sparguthaben in Höhe} \\\\ \\text{von 3000 € erhältst?}",
        answers: [{text: "45 €", value: 1}, {text: "30 €", value: 0}, {text: "150 €", value: 0}, {text: "75 €", value: 0}]
    },  
    // 10
    {
        text: "\\text{Berechnen Sie den Grenzwert}\\\\ \\\\ \\lim\\limits_{x\\to\\infty } ({4x+10 \\over 2x^3+7})",
        answers: [{text: "0", value: 1}, {text: "-∞", value: 0}, {text: "+∞", value: 0}, {text: "2", value: 0}]
    }
];

//das gleiche für IT Fragenarray

const internettechnologien =
    [
    // 1
    {
        text: "Welche Authentifizierung bietet HTTP?",
        answers: [{text: "Digest Access Authentication", value: 1}, {text: "OTP", value: 0}, {text: "OAuth", value: 0}, {text: "2-Faktor-Authentifizierung", value: 0}]
    },
    // 2
    {
        text: "Welches Transportprotokoll eignet sich für zeitkritische Übertragungen",
        answers: [{text: "UDP", value: 1}, {text: "TCP", value: 0}, {text: "HTTP", value: 0}, {text: "Fast Retransmit", value: 0}]
    },
    // 3
    {
        text: "Was ist ein SSL?",
        answers: [{text: "Security certificate", value: 1}, {text: "Socket", value: 0}, {text: "Portal", value: 0}, {text: "DNS", value: 0}]
    },
    // 4
    {
        text: "Was definiert die Struktur und das Layout von Webseiten?",
        answers: [{text: "HTML", value: 1}, {text: "XML", value: 0}, {text: "REST", value: 0}, {text: "CSS", value: 0}]
    },
    // 5
    {
        text: "Was dient zur Gestaltung und Responsive Design von Webseiten?",
        answers: [{text: "CSS", value: 1}, {text: "Javascript", value: 0}, {text: "HTML", value: 0}, {text: "REST", value: 0}]
    },
    // 6
    {
        text: "Was dient zur dynamischen Manipulation von Webseiten?",
        answers: [{text: "Javascript", value: 1}, {text: "CSS", value: 0}, {text: "HTML", value: 0}, {text: "REST", value: 0}]
    },
    // 7
    {
        text: "Was steht für HTML?",
        answers: [{text: "Hypertext Markup Language", value: 1}, {text: "Hyperlinks and Text Markup Language", value: 0},
            {text: "Home Tool Markup Language", value: 0}, {text: "High Technology Manual Language", value: 0}]
    },
    // 8
    {
        text: "Was steht für CSS?",
        answers: [{text: "Cascading Style Sheets", value: 1}, {text: "Creative Style Sheets", value: 0},
            {text: "Computer Style Sheets", value: 0}, {text: "Colorful Style Sheets", value: 0}]
    },
    // 9
    {
        text: "Was steht für JS?",
        answers: [{text: "Javascript", value: 1}, {text: "JASON", value: 0}, {text: "Java Style", value: 0}, {text: "Java Sheet", value: 0}]
    },  
    // 10
    {
        text: "Was steht für HTTP?",
        answers: [{text: "Hype Transporting Prototype", value: 1}, {text: "Hypertext Transport Protocol", value: 0}, 
            {text: "Hype Transporting Prototype", value: 0}, {text: "Hypertext Transfering Prototype", value: 0}]
    }          
];

// Array für allgemeines Wissen
const allgemeinesWissenFragen =
    [
    // 1
    {
        text: "Wie heißt die Hauptstadt der Slowakei?",
        answers: [{text: "Bratislava", value: 1}, {text: "Ljubljan", value: 0}, {text: "Sofia", value: 0}, {text: "Prag", value: 0}],
    },
    // 2
    {
        text: "Wie viele Zähne hat ein erwachsener Mensch normalerweise?",
        answers: [{text: "32", value: 1}, {text: "28", value: 0}, {text: "30", value: 0}, {text: "34", value: 0}],
    },
    // 3
    {
        text: "Wer wählt den Bundespräsidenten?",
        answers: [{text: "Bundesversammlung", value: 1}, {text: "Bundeskanzler", value: 0}, {text: "Bundestag", value: 0}, {text: "Bundesrat", value: 0}]

    },
    // 4
    {
        text: "Wie hoch ist die Mehrwertsteuer in Deutschland? (Vor der Senkung durch das Konjukturpaket)?",
        answers: [{text: "19 Prozent", value: 1}, {text: "17 Prozent", value: 0}, {text: "18 Prozent", value: 0}, {text: "20 Prozent", value: 0}]

    },
    // 5
    {
        text: "Welches Land ist kein ständiges Mitglied im Sicherheitsrat der Vereinten Nationen?",
        answers: [{text: "Deutschland", value: 1}, {text: "USA", value: 0}, {text: "China", value: 0}, {text: "Russland", value: 0}]

    },
    // 6
    {
        text: "Welches dieser Tiere hält keinen Winterschlaf?",
        answers: [{text: "Eichhörnchen", value: 1}, {text: "Fledermaus", value: 0}, {text: "Igel", value: 0}, {text: "Siebenschläfer", value: 0}]
    },
    // 7
    {
        text: "In welcher Einheit wird der elektrische Widerstand gemessen?",
        answers: [{text: "Ohm", value: 1}, {text: "Volt", value: 0}, {text: "Ampere", value: 0}, {text: "Watt", value: 0}]
    },  
    // 8
    {
        text: "Wie heißt die Hauptstadt von Thüringen?",
        answers: [{text: "Erfurt", value: 1}, {text: "Magdeburg", value: 0}, {text: "Dresden", value: 0}, {text: "Leipzig", value: 0}]
    },
    // 9
    {
        text: "Was ist ein Oxymoron?",
        answers: [{text: "Ein innerer Widerspruch", value: 1}, {text: "Ein Versfuß", value: 0}, 
            {text: "Eine Wiederholung", value: 0}, {text: "Eine Frageform", value: 0}]
    },  
    // 10
    {
        text: "Wie viele Oscars gewann der Film „Titanic“?",
        answers: [{text: "11", value: 1}, {text: "10", value: 0}, {text: "12", value: 0}, {text: "13", value: 0}]
    }
];
