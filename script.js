console.log("this is a test")




// PROGETTO: 
// una lista che si completi automaticamente per generare dei turni randomizzati per il numero dei colleghi dell'archeotur presso le varie aree del museo, 
// tenendo conto anche del giorno libero e dei giorni di ferie. viene salvato sul local storage del browser una valore booleano per poter alternare 
// con la logica richiesta ogni giorno e ogni turno. 
// ************************************************************************************************************************************************************
// TO DO: 
//      1) Inserire un elemento input che permetta di cambiare i giorni liberi e di ferie dei colleghi in lista; 
//         utilizzeremo Local Storage del browser per salvare queste assegnazioni chiave/valore (perchè non capisco come fare tramite file json locale...lol)
//      2) Implementare la possibilità di cambiare l'assegnazione di ogni collega in lista ad un turno della week, in base ad una specifica richiesta, e.g. Collga[0] requestedDay: monday.evening. 
//         il programma se arriva a quel collega in monday morning, salterebbe il collega andando ad inserire il collega nell'apposito spazio




const colleaguesList = [
    {name: "michela", workDays: 6, freeDay:"saturday", vacationDays: [], workedDays: 0},
    {name: "manola", workDays: 6, freeDay: "sunday", vacationDays: [], workedDays: 0},
    {name: "simona", workDays: 6, freeDay: "tuesday", vacationDays: [], workedDays: 0},
    {name: "matteo", workDays: 6, freeDay: "friday", vacationDays: [], workedDays: 0},
    {name: "daniela", workDays: 6, freeDay:"sunday", vacationDays: [], workedDays: 0},
    {name: "annamaria", workDays: 6, freeDay: "saturday", vacationDays: [], workedDays: 0},
    {name: "grazia", workDays: 6, freeDay: "monday", vacationDays: [], workedDays: 0},
    {name: "luisella", workDays: 6, freeDay: "thursday", vacationDays: [], workedDays: 0},
    {name: "ritaP", workDays: 6, freeDay: "wednesday", vacationDays: [], workedDays: 0},
    {name: "rita" ,workDays: 6, freeDay:  "sunday", vacationDays: [], workedDays: 0}
]



const week = [
    monday = { d: "monday",
        //priorità: bassa
        morningMuseo1:undefined, morningMuseo2:undefined,
        morningNecropoli1:undefined, morningMuseo3:undefined, 
        eveningMuseo1:undefined, eveningMuseo2:undefined, 
        eveningNecropoli1:undefined, eveningNecropoli2:undefined,
        //priorità: alta
        morningNecropoli2:undefined, eveningMuseo3:undefined
        },
    tuesday = { d: "tuesday",
        //priorità: bassa
        morningMuseo1:undefined, morningMuseo2:undefined,
        morningNecropoli1:undefined, morningMuseo3:undefined, 
        eveningMuseo1:undefined, eveningMuseo2:undefined, 
        eveningNecropoli1:undefined, eveningNecropoli2:undefined,
        //priorità: alta
        morningNecropoli2:undefined, eveningMuseo3:undefined
        },
    wednesday = { d: "wednesday",
        //priorità: bassa
        morningMuseo1:undefined, morningMuseo2:undefined,
        morningNecropoli1:undefined, morningMuseo3:undefined, 
        eveningMuseo1:undefined, eveningMuseo2:undefined, 
        eveningNecropoli1:undefined, eveningNecropoli2:undefined,
        //priorità: alta
        morningNecropoli2:undefined, eveningMuseo3:undefined
        },
    thursday = { d: "thursday",
        //priorità: bassa
        morningMuseo1:undefined, morningMuseo2:undefined,
        morningNecropoli1:undefined, morningMuseo3:undefined, 
        eveningMuseo1:undefined, eveningMuseo2:undefined, 
        eveningNecropoli1:undefined, eveningNecropoli2:undefined,
        //priorità: alta
        morningNecropoli2:undefined, eveningMuseo3:undefined
        },
    friday = { d: "friday",
        //priorità: bassa
        morningMuseo1:undefined, morningMuseo2:undefined,
        morningNecropoli1:undefined, morningMuseo3:undefined, 
        eveningMuseo1:undefined, eveningMuseo2:undefined, 
        eveningNecropoli1:undefined, eveningNecropoli2:undefined,
        //priorità: alta
        morningNecropoli2:undefined, eveningMuseo3:undefined
        },
    saturday = { d: "saturday",
        //priorità: bassa
        morningMuseo1:undefined, morningMuseo2:undefined,
        morningNecropoli1:undefined, morningMuseo3:undefined, 
        eveningMuseo1:undefined, eveningMuseo2:undefined, 
        eveningNecropoli1:undefined, eveningNecropoli2:undefined,
        //priorità: alta
        morningNecropoli2:undefined, eveningMuseo3:undefined
        },
    sunday = { d: "sunday",
        //priorità: bassa
        morningMuseo1:undefined, morningMuseo2:undefined,
        morningNecropoli1:undefined, morningMuseo3:undefined, 
        eveningMuseo1:undefined, eveningMuseo2:undefined, 
        eveningNecropoli1:undefined, eveningNecropoli2:undefined,
        //priorità: alta
        morningNecropoli2:undefined, eveningMuseo3:undefined
    }
]


console.log("**NEW TEST****NEW TEST****NEW TEST****NEW TEST****NEW TEST****NEW TEST****NEW TEST****NEW TEST****NEW TEST****NEW TEST****NEW TEST****NEW TEST****NEW TEST**")

// loop per settare il freeDay in local storage
for (let i = 0; i<colleaguesList.length; i++) {
    let name = colleaguesList[i].name
    let freeDay = colleaguesList[i].freeDay;
    localStorage.setItem(name, freeDay)
}

let alternated;
if (localStorage.getItem("alternated") === "false") {  // <== facciamo riferimento al valore booleano in local storage per sapere come è il valore di alternated in seguito alla precedente esecuzione del codice
     alternated = false
} else {
    alternated = true
}

//************************************************************************************************* LOGICA DI ASSEGNAZIONE RANDOMICA SPECIFICA PER IL MAB ******************************************************************************************************
for (const day in week) {
    let workingList = [] 
    for (const worker in colleaguesList) {
        if (colleaguesList[worker].freeDay.includes(week[day].d)  || colleaguesList[worker].vacationDays.includes(week[day].d)) {
           continue;
        } workingList.push(colleaguesList[worker].name);
    }

    for (const key of Object.keys(week[day])) { 
        if (key === "d") { //  <== Skippa una iterazione se la chiave è "d", perchè "d" è la chiave contenente il nome del giorno, e non vogliamo sovrascriverla 
            continue;
        } if ((key === "morningNecropoli1" || key === "eveningNecropoli1") && alternated === true) {
            week[day][key] = "COLLEGA ETNOGRAFICO"
            alternated = false
            continue;
        } else if ((key === "morningNecropoli1" || key === "eveningNecropoli1") && alternated === false) {
            alternated = true
        }
        let randomIndex = randomNumber(workingList);
        let randomColleague = workingList[randomIndex];
        week[day][key] = randomColleague;
    
        if (workingList.includes(randomColleague)) {  // <== depenniamo i colleghi dalla lista man mano che li assegniamo
            for (worker in colleaguesList) {
                if (colleaguesList[worker].name === randomColleague) {
                            colleaguesList[worker].workedDays ++
                }
            }
            workingList.splice(randomIndex,1,)
        };
    }

    if (alternated === false) { //<== logica di alternazione per il collega etnografico, la cui presenza è alternata ogni periodo e il sistema di alternazione si alterna ogni giorno
        alternated = true
    } else { 
        alternated = false
    }
}  localStorage.setItem("alternated", alternated) // <== utilizziamo per convenienza il local storage del browser per cambiare il valore booleano ad alternated


// QUI SOTTO VIENE SISTEMATA LA LISTA IN MODO CHE SIA FORMATTATA MEGLIO. I TURNI VENGONO RIMESSI IN ORDINE
//_NECESSARIO, DATO CHE SOPRA NELLA LOGICA DEL CODICE VENGONO MESSI IN ORDINE DI PRIORITà DI ASSEGNAZIONE


let turns = {
    monday:    { morning: { museo: [], necropoli: [] }, evening: { museo: [], necropoli: [] } },
    tuesday:   { morning: { museo: [], necropoli: [] }, evening: { museo: [], necropoli: [] } },
    wednesday: { morning: { museo: [], necropoli: [] }, evening: { museo: [], necropoli: [] } },
    thursday:  { morning: { museo: [], necropoli: [] }, evening: { museo: [], necropoli: [] } },
    friday:    { morning: { museo: [], necropoli: [] }, evening: { museo: [], necropoli: [] } },
    saturday:  { morning: { museo: [], necropoli: [] }, evening: { museo: [], necropoli: [] } },
    sunday:    { morning: { museo: [], necropoli: [] }, evening: { museo: [], necropoli: [] } },
};
const dayNames = ["monday","tuesday","wednesday","thursday","friday","saturday","sunday"];



for (let i = 0; i < week.length; i++) {
    const day = week[i];
    const name = day.d;

    turns[name].morning.museo = [
        day.morningMuseo1,
        day.morningMuseo2,
        day.morningMuseo3,
    ];

    turns[name].morning.necropoli = [
        day.morningNecropoli1,
        day.morningNecropoli2,
    ];

    turns[name].evening.museo = [
        day.eveningMuseo1,
        day.eveningMuseo2,
        day.eveningMuseo3,
    ];

    turns[name].evening.necropoli = [
        day.eveningNecropoli1,
        day.eveningNecropoli2,
    ];
}


const text = document.querySelector(`body`);

// E qui sotto in loop mostriamo la scheda week ordinata nel file html
for (const dayName in turns) {
    
    const day = turns[dayName];
    
    let nomeGiorno = `======== ${dayName.toUpperCase()} ========`;
    console.log(nomeGiorno);
    
    let element = document.createElement(`div`);
    const nextLine = document.createElement(`br`)
    element.textContent = nomeGiorno
    text.append(element)
    text.append(nextLine)
    
    let mattinaMuseo = `Mattina Museo: ${day.morning.museo.join(", ")}`;
    console.log(mattinaMuseo);

    element = document.createElement(`div`);
    element.textContent = mattinaMuseo
    text.append(element)
    text.append(nextLine)

    let mattinaNecropoli = `Mattina Necropoli:, ${day.morning.necropoli.join(", ")}`;
    console.log(mattinaNecropoli);
    
    element = document.createElement(`div`);
    element.textContent = mattinaNecropoli
    text.append(element)
    text.append(nextLine)
    
    let seraMuseo = `Sera Museo: ${day.evening.museo.join(", ")}`;
    console.log(seraMuseo)
    
    element = document.createElement(`div`);
    element.textContent = seraMuseo
    text.append(element)
    text.append(nextLine)
    
    let seraNecropoli = `Sera Necropoli: ${day.evening.necropoli.join(", ")}`;
    console.log(seraNecropoli);

    element = document.createElement(`div`);
    element.textContent = seraNecropoli
    text.append(element)
    text.append(nextLine)

    console.log("\n")
}

function randomNumber(list) { 
    randomResult = Math.floor(Math.random()*list.length);
    return randomResult;
}



// ******************************************************* PARTE DOM ******************************************************************************
// il bottone ci permetterà di avviare la fase di cambio valori della tabella o di conferma
const assignmentButton = document.getElementById("assignmentButton") 
assignmentButton.addEventListener("click", changeModeSwitch)

// Realizziamo due liste con gli elementi relativi alle classi che ci interessano
const vacDayText = document.querySelectorAll(".vacDayText");
const vacDayInput = document.querySelectorAll(".vacDayInput");
const freeDayText = document.querySelectorAll(".freeDayText")
const freeDayInput = document.querySelectorAll(".freeDayInput")





// Appena avviato il codice, questo ci permette di costruire già una tabella di base con gli ultimi valori salvati
for (let i=0; i<freeDayText.length;i++){
    freeDayText[i].textContent = localStorage.getItem(`freeDayCurrentText${i}`);
}
function displayFreeDayText(){
    for (let i = 0; i<freeDayText.length; i++){
        // settiamo la key in localstorage, il nome è sempre lo stesso, ma affianco al nome abbiamo un numero 
        // dinamico preso dall'attuale indice del loop. il valore della key è quello dell'input attuale
        // piccolo if/else per continuare a salvare il placeholder anche dopo che abbiamo azzerato i valori
        if (freeDayInput[i].value !== ""){
            localStorage.setItem(`freeDayCurrentText${i}`, freeDayInput[i].value);
        } else  {
            localStorage.setItem(`freeDayCurrentText${i}`, freeDayInput[i].placeholder)
        };
        freeDayInput[i].style.display = "none";
        freeDayText[i].textContent = localStorage.getItem(`freeDayCurrentText${i}`);
        freeDayText[i].style.display = "block"
    }
}
function displayFreeDayInput(){
    for (let i = 0; i<freeDayInput.length; i++){
        // azzera i valori degli input
        freeDayInput[i].value = null
        // inserisce un placeholder preso dal localstorage
        freeDayInput[i].placeholder = localStorage.getItem(`freeDayCurrentText${i}`);
        // mostra la casella di input e nasconde la casella di testo cosi da usare lo stesso spazio
        freeDayInput[i].style.display = "block";
        freeDayText[i].style.display = "none";
    }
}

// ripetiamo tutto ma per vacDay 
for (let i=0; i<vacDayText.length;i++){
    vacDayText[i].textContent = localStorage.getItem(`vacDayCurrentText${i}`);
}
function displayVacDayText(){
    for (let i = 0; i<vacDayText.length; i++){
        if (vacDayInput[i].value !== ""){
            localStorage.setItem(`vacDayCurrentText${i}`, vacDayInput[i].value);
        } else  {
            localStorage.setItem(`vacDayCurrentText${i}`, vacDayInput[i].placeholder)
        };
        vacDayInput[i].style.display = "none";
        vacDayText[i].textContent = localStorage.getItem(`vacDayCurrentText${i}`);
        vacDayText[i].style.display = "block"
    }
}
function displayVacDayInput(){
    for (let i = 0; i<vacDayInput.length; i++){
        vacDayInput[i].value = null
        vacDayInput[i].placeholder = localStorage.getItem(`vacDayCurrentText${i}`);
        vacDayInput[i].style.display = "block";
        vacDayText[i].style.display = "none";
    }
}



let changeMode = false
function changeModeSwitch(){  
    if (changeMode === false) {
        displayFreeDayInput();
        displayVacDayInput();
        changeMode = true
        assignmentButton.style.backgroundColor = "green"
        assignmentButton.textContent = "Conferma"
    } else {
        displayFreeDayText();
        displayVacDayText();
        changeMode = false
        assignmentButton.style.backgroundColor = "red"
        assignmentButton.textContent = "Modifica"
    }
}
//TO DO: 
// 1) modificare dinamicamente la lista oggetti colleghi con i valori in localstorage, prendendo come dati validi solamente i dati che corrispondono al nome di giorni della settimana
// 2) transporre la settimana generata come una tabella in html 
// 3) realizzare un pulsante in html per eseguire le generazioni randomiche della week

