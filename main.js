// constant
const clear = document.querySelector('.clear');
const date = document.getElementById('date');
const list = document.getElementById('list');
const input = document.getElementById('input');

// function add to do
const CHECK = "fa-check-circle";
const UNCHECK = "fa-circle";
const LINE_THROUGH = "lineThrough";

// variables
let LIST =[] ;
let id = 0;

// get item from localStorage
let data = localStorage.getItem("TODO");

// storage (need to be here !!!!!)
localStorage.setItem("TODO", JSON.stringify(LIST));

// check if data is not empty
if(data){
  LIST = JSON.parse(data);
  id = LIST.length; // set the id to the last one in the list
  loadToDo(LIST);
} else {
  LIST = [];
  id = 0;
}

// load items to the user's interface
function loadToDo(array){
  array.forEach(function(item) {
    addToDo(item.name, item.id, item.done, item.trash);
  });
}


// Get the date
let options = {
  weekday: 'long', month: 'long', day: 'numeric', year: 'numeric'
}
let today = new Date();
date.innerHTML = today.toLocaleDateString("fr-FR", options);
// https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Global_Objects/Date/toLocaleDateString



function addToDo(toDo, id, done, trash) {

  if (trash) { return; }

  const DONE = done ? CHECK : UNCHECK;
  const LINE = done ? LINE_THROUGH : "";

  const text = `<li class="item">
<i class="far ${DONE} complete" job="complete" id="${id}"></i>
<p class="text ${LINE}">${toDo}</p>
<i class="de far fa-trash-alt" job="delete" id="${id}"></i>
</li>`;

  const position = "beforeend";

  list.insertAdjacentHTML(position, text);
}

// addToDo('drink')

// event
document.addEventListener('keyup', function (e) {
  if (event.keyCode == 13) {
    const toDo = input.value;
    if (toDo) {
      addToDo(toDo, id, false, false);
      LIST.push(
        {
          name: toDo,
          id: id,
          done: false,
          trash: false
        });
      // Save to local storage (must be written when added)
      localStorage.setItem("TODO", JSON.stringify(LIST));
      id++;
    }
    input.value = "";
  }
});
document.getElementById('enter').addEventListener('click', function (e) {
    const toDo = input.value;
    if (toDo) {
      addToDo(toDo, id, false, false);
      LIST.push(
        {
          name: toDo,
          id: id,
          done: false,
          trash: false
        });
      // Save to local storage (must be written when added)
      localStorage.setItem("TODO", JSON.stringify(LIST));
      id++;
    }
    input.value = "";
  });


// uncheck -> checked (element = check icon)
function completeToDo(element) {
  element.classList.toggle(CHECK);
  element.classList.toggle(UNCHECK);
  element.parentNode.querySelector('.text').classList.toggle(LINE_THROUGH);
  // this parentNode specifies <li> contains <p class="text">

  // LIST[0].done est false -> true, true -> false
  LIST[element.id].done = LIST[element.id].done ? false : true;
}

// trash function (element = trash icon)
function removeToDo(element) {
  // element -> trash icon
  // element.parentNode -> li
  // element.parentNode.parentNode -> ul
  // code below: ul deletes li element
  element.parentNode.parentNode.removeChild(element.parentNode);
  // click trash -> remove li element
  LIST[element.id].trash = true;
}

/* on peut pas creer click event pour chaque icon .... (?)
Donc on va creer event sur ul id=list + target pour identifier
*/
// target event property returns the element that triggered the event
list.addEventListener('click', function (event) {
  const element = event.target; // <i class="fa fa-trash" job="delete" id="0"></i>
  const elementJOB = element.attributes.job.value; // delete ou complete
  if (elementJOB == "complete") {
    // check icon
    completeToDo(element);
  } else if (elementJOB == "delete") {
    // trash icon
    removeToDo(element);
  }
  // Save to local storage (must be written when added)
  localStorage.setItem("TODO", JSON.stringify(LIST));
});

// Save to local storage
// localStorage.getItem('key', 'value')
/*
if (typeof (Storage) !== "undefined") {
  // value pairs are always stored as strings. Remember to convert them to another format when needed!
  // JSON.stringify(LIST): Converts a JavaScript object into a string
  // JSON is to exchange data to/from a web server.When sending data to a web server, the data has to be a string. 
  localStorage.setItem("TODO", JSON.stringify(LIST));
} else {
  // si localStorage ne marche pas
  alert("Sorry! No Web Storage supported.");
}
*/

/*
// restore todo list from local storage
// meme si je relance la page, les données seront restent
let data = localStorage.getItem("TODO");
if (data) {
  // When receiving data from a web server, the data is always a string. Parse the data with JSON.parse(), and the data becomes a JavaScript object.
  LIST = JSON.parse(data);
  loadToDo(LIST);
  id = LIST.length;
  // if the last id was 10, then LIST.length will return 11. That means 11 will be the next todo id *
} else {
  LIST = [];
  id = 0;
}
// forEach pour LIST[]
function loadToDo(array) {
  array.forEach(function (item) {
    addToDo(item.name, item.id, item.done, item.trash);
  });
}
*/


// Effacer les données de localStorage
clear.addEventListener('click', function () {
  //clear() method removes all the Storage Object item for this domain.
  localStorage.clear();
  //reload() method is used to reload the current document.
  location.reload();
});

