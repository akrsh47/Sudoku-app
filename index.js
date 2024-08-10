const cont_doc = document.getElementById("cont");
const diff_doc = document.getElementById("diff");
const sub_btn_doc = document.getElementById("sub_btn");
const new_btn_doc = document.getElementById("new_btn");
const sol_btn_doc = document.getElementById("sol_btn");
const sol_cont_doc = document.getElementById("sol_cont");
const save_btn_doc = document.getElementById("save_btn");
const load_btn_doc = document.getElementById("load_btn");
//const err_doc = document.getElementById("err")

let inp_arr = [];
let inp_arr_cpy = [];
let inp_arr_cpy_stor = [];
let sol_arr = [];
let get_sudo_arr = [];
let get_sol_sudo_arr = [];
let sol_state = "hide";
let inp_arr_stor = [];
let sol_arr_stor = [];
const URL =
  "https://sudoku-api.vercel.app/api/dosuku?query={newboard(limit:1){grids{value,solution,difficulty},results,message}}";

new_btn_doc.addEventListener("click", function () {
  location.reload();
  localStorage.clear();
});

// solution

for (let i = 0; i < 81; i++) {
  sol_arr[i] = document.createElement("input");
  sol_arr[i].readOnly = true;
  sol_arr[i].type = "text";

  sol_cont_doc.append(sol_arr[i]);
}

if (sol_state == "hide") {
  sol_cont_doc.style.display = "none";
} else if (sol_state == "show") {
  sol_cont_doc.style.display = "grid";
}

for (let i = 0; i < 81; i++) {
  inp_arr[i] = document.createElement("input");
  inp_arr[i].type = "text";

  inp_arr[i].addEventListener("input", function () {
    if (
      inp_arr[i].value == "0" ||
      inp_arr[i].value == "1" ||
      inp_arr[i].value == "2" ||
      inp_arr[i].value == "3" ||
      inp_arr[i].value == "4" ||
      inp_arr[i].value == "5" ||
      inp_arr[i].value == "6" ||
      inp_arr[i].value == "7" ||
      inp_arr[i].value == "8" ||
      inp_arr[i].value == "9"
    ) {
      console.log("ok");
    } else if (inp_arr[i].value.length > 1) {
      inp_arr[i].value = inp_arr[i].value.slice(0, -1);
    } else {
      inp_arr[i].value = "";
    }
  });

  cont_doc.append(inp_arr[i]);
}

async function getSudo() {
  const response = await fetch(URL);

  let data = await response.json();

  get_sudo_arr = [...data.newboard.grids[0].value];
  get_sol_sudo_arr = [...data.newboard.grids[0].solution];

  //  console.log(get_sol_sudo_arr);

  diff_doc.innerHTML = `Difficulty: ${data.newboard.grids[0].difficulty}`;

  sub_btn_doc.addEventListener("click", function () {
    checkValues();
    chckInitialVal();
  });

  sol_btn_doc.addEventListener("click", function () {
    showSolution();
  });

  save_btn_doc.addEventListener("click", function () {
    saveInpVal();
    saveCpyVal();
    saveSolVal();
  });

  load_btn_doc.addEventListener("click", function () {
    loadInpVal();
    loadCpyVal();
    loadSolVal();
  });

  cpyInpVal();
  putValuesSol();
  putValuesSudo();
}

function putValuesSudo() {
  for (let w = 0; w < 9; w++) {
    inp_arr[w].value = get_sudo_arr[0][w];
  }

  for (let w = 9; w < 18; w++) {
    inp_arr[w].value = get_sudo_arr[1][w - 9];
  }

  for (let w = 18; w < 27; w++) {
    inp_arr[w].value = get_sudo_arr[2][w - 18];
  }
  for (let w = 27; w < 36; w++) {
    inp_arr[w].value = get_sudo_arr[3][w - 27];
  }
  for (let w = 36; w < 45; w++) {
    inp_arr[w].value = get_sudo_arr[4][w - 36];
  }
  for (let w = 45; w < 54; w++) {
    inp_arr[w].value = get_sudo_arr[5][w - 45];
  }
  for (let w = 54; w < 63; w++) {
    inp_arr[w].value = get_sudo_arr[6][w - 54];
  }
  for (let w = 63; w < 72; w++) {
    inp_arr[w].value = get_sudo_arr[7][w - 63];
  }
  for (let w = 72; w < 81; w++) {
    inp_arr[w].value = get_sudo_arr[8][w - 72];
  }

  for (let i = 0; i < 81; i++) {
    if (inp_arr[i].value == "0") {
      inp_arr[i].value = "";
    }
  }
}

function cpyInpVal() {
  for (let w = 0; w < 9; w++) {
    inp_arr_cpy[w] = get_sudo_arr[0][w];
  }

  for (let w = 9; w < 18; w++) {
    inp_arr_cpy[w] = get_sudo_arr[1][w - 9];
  }

  for (let w = 18; w < 27; w++) {
    inp_arr_cpy[w] = get_sudo_arr[2][w - 18];
  }
  for (let w = 27; w < 36; w++) {
    inp_arr_cpy[w] = get_sudo_arr[3][w - 27];
  }
  for (let w = 36; w < 45; w++) {
    inp_arr_cpy[w] = get_sudo_arr[4][w - 36];
  }
  for (let w = 45; w < 54; w++) {
    inp_arr_cpy[w] = get_sudo_arr[5][w - 45];
  }
  for (let w = 54; w < 63; w++) {
    inp_arr_cpy[w] = get_sudo_arr[6][w - 54];
  }
  for (let w = 63; w < 72; w++) {
    inp_arr_cpy[w] = get_sudo_arr[7][w - 63];
  }
  for (let w = 72; w < 81; w++) {
    inp_arr_cpy[w] = get_sudo_arr[8][w - 72];
  }

  for (let i = 0; i < 81; i++) {
    if (inp_arr_cpy[i] == "0") {
      inp_arr_cpy[i] = "";
    }
  }
}

function chckInitialVal() {
  for (let i = 0; i < 81; i++) {
    if (inp_arr_cpy[i] == inp_arr[i].value) {
      inp_arr[i].style.color = "black";
    }
  }
}

function checkValues() {
  for (let w = 0; w < 9; w++) {
    if (inp_arr[w].value != sol_arr[w].value) {
      inp_arr[w].style.color = "red";
    } else {
      inp_arr[w].style.color = "green";
    }
  }

  for (let w = 9; w < 18; w++) {
    if (inp_arr[w].value != sol_arr[w].value) {
      inp_arr[w].style.color = "red";
    } else {
      inp_arr[w].style.color = "green";
    }
  }

  for (let w = 18; w < 27; w++) {
    if (inp_arr[w].value != sol_arr[w].value) {
      inp_arr[w].style.color = "red";
    } else {
      inp_arr[w].style.color = "green";
    }
  }
  for (let w = 27; w < 36; w++) {
    if (inp_arr[w].value != sol_arr[w].value) {
      inp_arr[w].style.color = "red";
    } else {
      inp_arr[w].style.color = "green";
    }
  }
  for (let w = 36; w < 45; w++) {
    if (inp_arr[w].value != sol_arr[w].value) {
      inp_arr[w].style.color = "red";
    } else {
      inp_arr[w].style.color = "green";
    }
  }
  for (let w = 45; w < 54; w++) {
    if (inp_arr[w].value != sol_arr[w].value) {
      inp_arr[w].style.color = "red";
    } else {
      inp_arr[w].style.color = "green";
    }
  }
   
  
  for (let w = 54; w < 63; w++) {
    if (inp_arr[w].value != sol_arr[w].value) {
      inp_arr[w].style.color = "red";
    } else {
      inp_arr[w].style.color = "green";
    }
  }
  for (let w = 63; w < 72; w++) {
    if (inp_arr[w].value != sol_arr[w].value) {
      inp_arr[w].style.color = "red";
    } else {
      inp_arr[w].style.color = "green";
    }
  }
  for (let w = 72; w < 81; w++) {
    if (inp_arr[w].value != sol_arr[w].value) {
      inp_arr[w].style.color = "red";
    } else {
      inp_arr[w].style.color = "green";
    }
  }
}

function showSolution() {
  if (sol_state == "hide") {
    sol_state = "show";
    sol_btn_doc.innerHTML = `hide solution`;
    sol_cont_doc.style.display = "grid";
  } else if (sol_state == "show") {
    sol_state = "hide";
    sol_btn_doc.innerHTML = `view solution`;
    sol_cont_doc.style.display = "none";
  }
}

function putValuesSol() {
  for (let w = 0; w < 9; w++) {
    sol_arr[w].value = get_sol_sudo_arr[0][w];
  }

  for (let w = 9; w < 18; w++) {
    sol_arr[w].value = get_sol_sudo_arr[1][w - 9];
  }

  for (let w = 18; w < 27; w++) {
    sol_arr[w].value = get_sol_sudo_arr[2][w - 18];
  }
  for (let w = 27; w < 36; w++) {
    sol_arr[w].value = get_sol_sudo_arr[3][w - 27];
  }
  for (let w = 36; w < 45; w++) {
    sol_arr[w].value = get_sol_sudo_arr[4][w - 36];
  }
  for (let w = 45; w < 54; w++) {
    sol_arr[w].value = get_sol_sudo_arr[5][w - 45];
  }
  for (let w = 54; w < 63; w++) {
    sol_arr[w].value = get_sol_sudo_arr[6][w - 54];
  }
  for (let w = 63; w < 72; w++) {
    sol_arr[w].value = get_sol_sudo_arr[7][w - 63];
  }
  for (let w = 72; w < 81; w++) {
    sol_arr[w].value = get_sol_sudo_arr[8][w - 72];
  }
}

function loadInpVal() {
  for (let i = 0; i < 81; i++) {
    try {
      inp_arr[i].value = JSON.parse(localStorage.getItem("inparr"))[i];
    } catch {
      console.log("not able to load");
    }
  }
}
function loadSolVal() {
  let temp_sol_arr = JSON.parse(localStorage.getItem("solarr"));

  for (let i = 0; i < 81; i++) {
    sol_arr[i].value = temp_sol_arr[i];
  }
}
function loadCpyVal() {
  for (let i = 0; i < 81; i++) {
    inp_arr_cpy[i] = JSON.parse(localStorage.getItem("inparrcpy"))[i];
  }
}
function saveInpVal() {
  for (let i = 0; i < 81; i++) {
    inp_arr_stor[i] = inp_arr[i].value;
  }
  localStorage.setItem("inparr", JSON.stringify(inp_arr_stor));
}
function saveSolVal() {
  for (let i = 0; i < 81; i++) {
    sol_arr_stor[i] = sol_arr[i].value;
    //sol_arr_stor[i]=get_sol_sudo_arr[i]
  }
  for (let w = 0; w < 9; w++) {
    sol_arr_stor[w] = get_sol_sudo_arr[0][w];
  }

  for (let w = 9; w < 18; w++) {
    sol_arr_stor[w] = get_sol_sudo_arr[1][w - 9];
  }

  for (let w = 18; w < 27; w++) {
    sol_arr_stor[w] = get_sol_sudo_arr[2][w - 18];
  }
  for (let w = 27; w < 36; w++) {
    sol_arr_stor[w] = get_sol_sudo_arr[3][w - 27];
  }
  for (let w = 36; w < 45; w++) {
    sol_arr_stor[w] = get_sol_sudo_arr[4][w - 36];
  }
  for (let w = 45; w < 54; w++) {
    sol_arr_stor[w] = get_sol_sudo_arr[5][w - 45];
  }
  for (let w = 54; w < 63; w++) {
    sol_arr_stor[w] = get_sol_sudo_arr[6][w - 54];
  }
  for (let w = 63; w < 72; w++) {
    sol_arr_stor[w] = get_sol_sudo_arr[7][w - 63];
  }
  for (let w = 72; w < 81; w++) {
    sol_arr_stor[w] = get_sol_sudo_arr[8][w - 72];
  }
  localStorage.setItem("solarr", JSON.stringify(sol_arr_stor));
}
function saveCpyVal() {
  for (let i = 0; i < 81; i++) {
    inp_arr_cpy_stor[i] = inp_arr_cpy[i];
  }
  localStorage.setItem("inparrcpy", JSON.stringify(inp_arr_cpy_stor));
}

getSudo();

//##############################################################################################

//create sperate array for solution set and do rather than just directly taking from input.value

//##############################################################################################
