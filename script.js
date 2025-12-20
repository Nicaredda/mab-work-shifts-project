console.log("this is a test")




// PROGETTO: 
// una lista che si completi automaticamente per generare dei turni randomizzati per il numero dei colleghi dell'archeotur presso le varie aree del museo, 
// tenendo conto anche del giorno libero e dei giorni di ferie. viene salvato sul local storage del browser una valore booleano per poter alternare 
// con la logica richiesta ogni giorno e ogni turno. 
// ************************************************************************************************************************************************************

const colleaguesList = [
    {name: "michela", workDays: 6, freeDay:"", vacationDays: [], requestedDay: [], workedDays: 0},
    {name: "manola", workDays: 6, freeDay: "", vacationDays: [], requestedDay: [], workedDays: 0},
    {name: "simona", workDays: 6, freeDay: "", vacationDays: [], requestedDay: [], workedDays: 0},
    {name: "matteo", workDays: 6, freeDay: "", vacationDays: [], requestedDay: [], workedDays: 0},
    {name: "daniela", workDays: 6, freeDay:"", vacationDays: [], requestedDay: [], workedDays: 0},
    {name: "annamaria", workDays: 6, freeDay: "", vacationDays: [], requestedDay: [], workedDays: 0},
    {name: "grazia", workDays: 6, freeDay: "", vacationDays: [], requestedDay: [], workedDays: 0},
    {name: "luisella", workDays: 6, freeDay: "", vacationDays: [], requestedDay: [], workedDays: 0},
    {name: "ritaP", workDays: 6, freeDay: "", vacationDays: [], requestedDay: [], workedDays: 0},
    {name: "rita" ,workDays: 6, freeDay:  "", vacationDays: [], requestedDay: [], workedDays: 0}
]

const week = [
    lunedì = { d: "lunedì",
        //priorità: bassa
        morningMuseo1:undefined, morningMuseo2:undefined,
        morningNecropoli1:undefined, morningMuseo3:undefined, 
        eveningMuseo1:undefined, eveningMuseo2:undefined, 
        eveningNecropoli1:undefined, eveningNecropoli2:undefined,
        //priorità: alta
        morningNecropoli2:undefined, eveningMuseo3:undefined
        },
    martedì = { d: "martedì",
        //priorità: bassa
        morningMuseo1:undefined, morningMuseo2:undefined,
        morningNecropoli1:undefined, morningMuseo3:undefined, 
        eveningMuseo1:undefined, eveningMuseo2:undefined, 
        eveningNecropoli1:undefined, eveningNecropoli2:undefined,
        //priorità: alta
        morningNecropoli2:undefined, eveningMuseo3:undefined
        },
    mercoledì = { d: "mercoledì",
        //priorità: bassa
        morningMuseo1:undefined, morningMuseo2:undefined,
        morningNecropoli1:undefined, morningMuseo3:undefined, 
        eveningMuseo1:undefined, eveningMuseo2:undefined, 
        eveningNecropoli1:undefined, eveningNecropoli2:undefined,
        //priorità: alta
        morningNecropoli2:undefined, eveningMuseo3:undefined
        },
    giovedì = { d: "giovedì",
        //priorità: bassa
        morningMuseo1:undefined, morningMuseo2:undefined,
        morningNecropoli1:undefined, morningMuseo3:undefined, 
        eveningMuseo1:undefined, eveningMuseo2:undefined, 
        eveningNecropoli1:undefined, eveningNecropoli2:undefined,
        //priorità: alta
        morningNecropoli2:undefined, eveningMuseo3:undefined
        },
    venerdì = { d: "venerdì",
        //priorità: bassa
        morningMuseo1:undefined, morningMuseo2:undefined,
        morningNecropoli1:undefined, morningMuseo3:undefined, 
        eveningMuseo1:undefined, eveningMuseo2:undefined, 
        eveningNecropoli1:undefined, eveningNecropoli2:undefined,
        //priorità: alta
        morningNecropoli2:undefined, eveningMuseo3:undefined
        },
    sabato = { d: "sabato",
        //priorità: bassa
        morningMuseo1:undefined, morningMuseo2:undefined,
        morningNecropoli1:undefined, morningMuseo3:undefined, 
        eveningMuseo1:undefined, eveningMuseo2:undefined, 
        eveningNecropoli1:undefined, eveningNecropoli2:undefined,
        //priorità: alta
        morningNecropoli2:undefined, eveningMuseo3:undefined
        },
    domenica = { d: "domenica",
        //priorità: bassa
        morningMuseo1:undefined, morningMuseo2:undefined,
        morningNecropoli1:undefined, morningMuseo3:undefined, 
        eveningMuseo1:undefined, eveningMuseo2:undefined, 
        eveningNecropoli1:undefined, eveningNecropoli2:undefined,
        //priorità: alta
        morningNecropoli2:undefined, eveningMuseo3:undefined
    }
]
// Ci prendiamo subito i valori in localstorage con la funzione che riassegna ad ogni elemento in lista colleagues i suoi valori salvati
function colleaguesListValuesAssignment(){
    for (let i = 0; i<colleaguesList.length; i++){
        colleaguesList[i].freeDay = localStorage.getItem(`freeDayCurrentText${i}`)
        colleaguesList[i].vacationDays = localStorage.getItem(`vacDayCurrentText${i}`)
    }
}

colleaguesListValuesAssignment();

console.log("**NEW TEST****NEW TEST****NEW TEST****NEW TEST****NEW TEST****NEW TEST****NEW TEST****NEW TEST****NEW TEST****NEW TEST****NEW TEST****NEW TEST****NEW TEST**")


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
            let inputWord = freeDayInput[i].value
            if ( inputWord[inputWord.length-1] === "i"){
                inputWord = inputWord.split('')
                inputWord.splice(inputWord.length-1, 1, "ì")
                inputWord = inputWord.join('')
            }
            localStorage.setItem(`freeDayCurrentText${i}`, inputWord.toLowerCase());
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
        if (vacDayInput[i].value !== "" && vacDayInput[i].value !== " "){
            
            let inputWord = vacDayInput[i].value;
            //if statement che splitta per spazio tra parole se becca spazio e virgola o solo spazio, o splitta le parole per virgole se becca solo virgola
            if (inputWord.includes(" ") && inputWord.includes(",") || inputWord.includes(" ")){
                inputWord = inputWord.split(" ")
            } else if (inputWord.includes(",")){
                inputWord = inputWord.split(",")
            }  // per ogni elemento del nuovo array inputWord, questo viene splittato per controllare ogni lettera
            for (j in inputWord) {
                inputWord[j] = inputWord[j].split("");
                // prima di tutto se alla fine della parola troviamo una virgola, togliamo quella virgola
                if (inputWord[j][inputWord[j].length-1] === ","){
                    inputWord[j].splice(inputWord[j].length-1, 1)
                }   
                // e poi se alla fine della parola troviamo una i senza accento, la sostituiamo con una ì accentata per poter passare il dato più facilmente al blocco dati 
                if (inputWord[j][inputWord[j].length-1] === "i"){
                    inputWord[j].splice(inputWord[j].length-1, 1, "ì")
                }   inputWord[j] = inputWord[j].join('') // <== ricolleghiamo tutte le lettere per ogni elemetno dell'array inputWord
            } inputWord = inputWord.join(" "); // <== ricolleghiamo gli elementi dell'array per costruire nuovamente la stringa, ora fixata e pronta per essere data al local storage
            localStorage.setItem(`vacDayCurrentText${i}`, inputWord.toLowerCase());
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

// il bottone ci permetterà di avviare la fase di cambio valori della tabella o di conferma
const assignmentButton = document.getElementById("assignmentButton") 
assignmentButton.addEventListener("click", changeColleaguesTable)

let changeMode = false
function changeColleaguesTable(){  //
    if (changeMode === false) {
        displayFreeDayInput();
        displayVacDayInput();
        changeMode = true
        assignmentButton.style.backgroundColor = "green"
        assignmentButton.textContent = "Conferma"
    } else {
        displayFreeDayText();
        displayVacDayText();
        colleaguesListValuesAssignment();
        changeMode = false
        assignmentButton.style.backgroundColor = "red"
        assignmentButton.textContent = "Modifica"
    }
}



function getAlternatedFromStorage(onOff){
    if (localStorage.getItem("alternated") === "false") {  // <== facciamo riferimento al valore booleano in local storage per sapere come è il valore di alternated in seguito alla precedente esecuzione del codice
        onOff = false
        return onOff
    } else {
        onOff = true
        return onOff
    }
}
function setAlternatedInStorage(onOff){
    if (onOff === false) { //<== logica di alternazione per il collega etnografico, la cui presenza è alternata ogni periodo e il sistema di alternazione si alterna ogni giorno
        onOff = true
    } else { 
        onOff = false
    } localStorage.setItem("alternated", onOff) // <== utilizziamo per convenienza il local storage del browser per cambiare il valore booleano ad alternated
}  
function randomNumber(list) { 
    randomResult = Math.floor(Math.random()*list.length);
    return randomResult;
}
function removeWeekTable(){ // rimuoviamo la week generata cosi che non le stacka l'una sopra l'altra. Son solo un mucchio di div e br
    let allDivs = document.querySelectorAll("div");
    let allBrs =  document.querySelectorAll("br");
    for (let i = 0; i<allDivs.length; i++){ 
        allDivs[i].remove()
    }  for (let i = 0; i<allBrs.length; i++){ 
        allBrs[i].remove()
    } 
}
function generateWorkingList(workingList, day){
    for (const worker in colleaguesList) {
        if (colleaguesList[worker].freeDay.includes(week[day].d)  || colleaguesList[worker].vacationDays.includes(week[day].d)) {
            continue;
        } workingList.push(colleaguesList[worker].name);
    } 
    return workingList;
}
function assignAndRemoveFromList(workingList, day, key){
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
    } return workingList;
}
function translateTurns(){
    let turns = {
        lunedì:    { morning: { museo: [], necropoli: [] }, evening: { museo: [], necropoli: [] } },
        martedì:   { morning: { museo: [], necropoli: [] }, evening: { museo: [], necropoli: [] } },
        mercoledì: { morning: { museo: [], necropoli: [] }, evening: { museo: [], necropoli: [] } },
        giovedì:  { morning: { museo: [], necropoli: [] }, evening: { museo: [], necropoli: [] } },
        venerdì:    { morning: { museo: [], necropoli: [] }, evening: { museo: [], necropoli: [] } },
        sabato:  { morning: { museo: [], necropoli: [] }, evening: { museo: [], necropoli: [] } },
        domenica:    { morning: { museo: [], necropoli: [] }, evening: { museo: [], necropoli: [] } },
    };

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
    return turns;
}
function appendTranslatedTableToDom(translatedTurns){   
    const weekTable = document.createElement(`div`);
    weekTable.id = "weekTable"
    document.body.append(weekTable)     
    
    for (const dayName in translatedTurns) {
        
        const day = translatedTurns[dayName];
        
        let nomeGiorno = `======== ${dayName.toUpperCase()} ========`;
        console.log(nomeGiorno);
        
        let element = document.createElement(`div`);
        const nextLine = document.createElement(`br`)
        element.textContent = nomeGiorno
        weekTable.append(element)
        weekTable.append(nextLine)
        
        let mattinaMuseo = `Mattina Museo: ${day.morning.museo.join(", ")}`;
        console.log(mattinaMuseo);

        element = document.createElement(`div`);
        element.textContent = mattinaMuseo
        weekTable.append(element)
        weekTable.append(nextLine)

        let mattinaNecropoli = `Mattina Necropoli:, ${day.morning.necropoli.join(", ")}`;
        console.log(mattinaNecropoli);
        
        element = document.createElement(`div`);
        element.textContent = mattinaNecropoli
        weekTable.append(element)
        weekTable.append(nextLine)
        
        let seraMuseo = `Sera Museo: ${day.evening.museo.join(", ")}`;
        console.log(seraMuseo)
        
        element = document.createElement(`div`);
        element.textContent = seraMuseo
        weekTable.append(element)
        weekTable.append(nextLine)
        
        let seraNecropoli = `Sera Necropoli: ${day.evening.necropoli.join(", ")}`;
        console.log(seraNecropoli);

        element = document.createElement(`div`);
        element.textContent = seraNecropoli
        weekTable.append(element)
        weekTable.append(nextLine)
    
    }
}



function hideHint(){
    let hint =  document.querySelector("#hint")
    hint.style.visibility = "hidden"
}
const generateWeekButton = document.getElementById("generateWeek")
generateWeekButton.addEventListener("click", generateRandomWeek);
generateWeekButton.addEventListener("click", hideHint);


function generateRandomWeek(){ // programma principale che verrà azionato dal bottone
    removeWeekTable()
    for (const day in week){
        let alternated = getAlternatedFromStorage();
        let workingList = [] 
        generateWorkingList(workingList, day);
        for (const key of Object.keys(week[day])) { 
            if (key === "d") {  
                continue;
            } if ((key === "morningNecropoli1" || key === "eveningNecropoli1") && alternated === true) {
                week[day][key] = "COLLEGA ETNOGRAFICO"
                alternated = false
                continue;
            } if ((key === "morningNecropoli1" || key === "eveningNecropoli1") && alternated === false) {
                alternated = true
            }

            assignAndRemoveFromList(workingList, day, key);  
        }  
        setAlternatedInStorage(alternated);
    }
    let translatedTurns = translateTurns();
    appendTranslatedTableToDom(translatedTurns);    
}




/*

document.createElement("")



function requestDays(worker, day, period){
    if (colleaguesList[worker].requestedDay.()){}
}



*/




/*
function generateWorkingList(workingList, day){
    for (const worker in colleaguesList) {
        if (colleaguesList[worker].freeDay.includes(week[day].d)  || colleaguesList[worker].vacationDays.includes(week[day].d)) {
            continue;
        } workingList.push(colleaguesList[worker].name);
    } 
    return workingList;
}
*/