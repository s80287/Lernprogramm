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
        new Result("Sie sollten viel üben", 0),
        new Result("Sie sollten noch üben", 25),
        new Result("Sie kennen das Thema schon, sollte aber noch üben", 50),
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
//1
    {
        text: " \\int_{-2}^4(8+2x-x^2)\\,dx",
        answers: [{text: "14", value: 0}, {text: "3", value: 0}, {text: "36", value: 1}, {text: "71", value: 0}]

    },
//2
    {
        text: "10(x-9)=-10",
        answers: [{text: "39", value: 0}, {text: "21", value: 0}, {text: "8", value: 1}, {text: "6", value: 0}]

    },

//3
    {
        //KaTex Schreibungsformat
        text: "\\text{Welche von der vier  Trigonometrie-}\\\\ \\text{Formeln ist falsch geschrieben?} \\\\ 1.) \\tg{x}\\ctg{x}=1 \\\\2.) \\sin^2x + \\cos^2x = 1  \\\\3.) \\tg^2{x}={\\sin{x} \\over \\cos{x} }\\\\4.) \\sin{3x}=3\\sin{x}-4\\sin^3{x} ",
        answers: [{text: "1", value: 0}, {text: "2", value: 0}, {text: "3", value: 1}, {text: "4", value: 0}]

    },
    //4
    {
        text: "\\text{ Berechnen Sie den Grenzwert}\\\\ \\\\ \\lim\\limits_{x\\to\\infty } ({4x+7 \\over 2x+3})^{4-x}",
        answers: [{text: "+ ∞", value: 1}, {text: "8e", value: 0}, {text: "0", value: 0}, {text: "1", value: 0}]

    },
//5
    {
        text: "\A=\\begin{pmatrix} 3 & -1 \\\\ 4 & 2 \\end{pmatrix}\\\\ \B=\\begin{pmatrix} 3 & 4 \\\\ 1 & 3 \\end{pmatrix} \\textit{,dann }\\\\ \\textit{Determinante } (\A^{-1} * \B)^{-2}=",
        answers: [{text: "-0.5", value: 0}, {text: "4", value: 0}, {text: "-4", value: 1}, {text: "0.5", value: 0}]

    },
//6
    {
        text: `2 * 10^{-3} =`,
        answers: [{text: "0,002", value: 1}, {text: "0,2", value: 0}, {text: "200", value: 0}, {text: "2000", value: 0}]

    },
    {
        text: "\\text{Wie hoch ist dein Sparguthaben,} \\\\ \\text{wenn du bei einem Zinssatz} \\\\ \\text{ von 1,5\\% im Jahr, Zinsen in Höhe} \\\\ \\text{von 7,50 € erhältst?}",
        answers: [{text: "500 €", value: 1}, {text: "550 €", value: 0}, {text: "600 €", value: 0}, {text: "825 €", value: 0}]
    },

    {
        text: "\\text{Der Durchmesser eines Reifens}\\\\ \\text{beträgt 60 cm.}\\\\ \\text{Wie groß ist sein Umfang?}",
        answers: [{text: "19,1 cm", value: 0}, {text: "94,2 cm", value: 0}, {text: "102,25 cm", value: 0}, {text: "188,4 cm", value: 1}]
    }
];

//das gleiche für IT Fragenarray

const internettechnologien =
    [
//1
    {
        text: "Welches der folgenden Protokolle ist ein Internetprotokoll?",
        answers: [{text: "HTTP", value: 1}, {text: "HTML", value: 0}, {text: "CSS", value: 0}, {text: "UTP", value: 0}]

    },
    {
        text: "Welches Transportprotokoll eignet sich für zeitkritische Übertragungen",
        answers: [{text: "UDP", value: 1}, {text: "TCP", value: 0}, {text: "HTTP", value: 0}, {text: "Fast Retransmit", value: 0}]

    },
    {
        text: "Was definiert die Struktur und das Layout von Webseiten?",
        answers: [{text: "XML", value: 0}, {text: "HTML", value: 1}, {text: "REST", value: 0}, {text: "CSS", value: 0}]

    },
    {
        text: "Was ist ein SSL?",
        answers: [{text: "Security certificate", value: 1}, {text: "Socket", value: 0}, {text: "Portal", value: 0}, {text: "DNS", value: 0}]

    },
    {
        text: "Eine vierteilige, durch Punkte getrennte Nummer, die zur Identifizierung eines mit dem Internet verbundenen Computers verwendet wird. ",
        answers: [{text: "IP addresses", value: 1}, {text: "Subnet Mask", value: 0}, {text: "Gateway", value: 0}, {text: "DNS", value: 0}]

    },
    {
        text: "Welcher der folgenden Punkte lokalisiert Ressourcen im Internet?",
        answers: [{text: "IP addresses", value: 1}, {text: "Computer names", value: 0}, {text: "WPA codes", value: 0}, {text: "Port nummer", value: 0}]

    },
    {
        text: "Welche der folgenden Hardwarekomponenten verbindet verschiedene Netzwerke miteinander?",
        answers: [{text: "Router", value: 1}, {text: "Server", value: 0}, {text: "Dongle", value: 0}, {text: "Firewall", value: 0}]

    }
]
