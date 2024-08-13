const cont_doc = document.getElementById("cont");
const diff_doc = document.getElementById("diff");
const sub_btn_doc = document.getElementById("sub_btn");
const new_btn_doc = document.getElementById("new_btn");
const sol_btn_doc = document.getElementById("sol_btn");
const sol_cont_doc = document.getElementById("sol_cont");
const save_btn_doc = document.getElementById("save_btn");
const load_btn_doc = document.getElementById("load_btn");
const score_sec_doc = document.getElementById("score_sec");
const score_doc = document.getElementById("score");

const f_new_btn_doc = document.getElementById("f_new_btn");
const main_doc = document.getElementById("main");
const home_scr_doc = document.getElementById("home_scr");

const bcktop_doc = document.getElementById("bcktop");

//const err_doc = document.getElementById("err")
const err_pop_btn_doc = document.getElementById("errpop_btn")
const save_pop_btn_doc = document.getElementById("savepop_btn")

err_pop_btn_doc.addEventListener("click",function(){
  document.querySelector(".load_popup").classList.remove("load_popup_show");
  home_scr_doc.style.opacity="1"


})

save_pop_btn_doc.addEventListener("click",function(){
  document.querySelector(".save_popup").classList.remove("save_popup_show");
  main_doc.style.opacity="1";
  document.body.style.backgroundColor="#daf5ff";
})
save_btn_doc.addEventListener("click",function(){
  document.querySelector(".save_popup").classList.add("save_popup_show")
  main_doc.style.opacity="0.1"
  document.body.style.backgroundColor="#bbbbbb"

  document.querySelector(".save_popup").scrollIntoView({
      behavior:"smooth"
    });
})

load_btn_doc.addEventListener("click",function(){
  if(localStorage.length==0){
  document.querySelector(".load_popup").classList.add("load_popup_show");
  home_scr_doc.style.opacity="0.1"

  document.querySelector(".load_popup").scrollIntoView({
      behavior:"smooth"
    });

  }
})

main_doc.style.display = "none";

//document.querySelector(".load_popup").classList.add("load_popup_show");

f_new_btn_doc.addEventListener("click", function () {
  home_scr_doc.style.display = "none";
  main_doc.style.display = "flex";
  document.body.style.backgroundImage = `none`;
  //document.body.style.backgroundImage = `url(assets/bg2.jpg)`;

});

load_btn_doc.addEventListener("click", function () {
  if(localStorage.length!=0){
  document.body.style.backgroundImage = `none`;
  }
});

// set background image for home screen
if (main_doc.style.display == "none") {
  document.body.style.backgroundImage = `url(assets/bg.jpg)`;
}

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

let SCORE = 0;
score_sec_doc.style.display = "none";

let GAMEOVER = "false";

new_btn_doc.addEventListener("click", function () {
  location.reload();
  //localStorage.clear();
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
  inp_arr[i].inputMode = "numeric";
  inp_arr[i].pattern="[0-9]*";
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



document.getElementById("diff2").style.display="none";


async function getSudo() {
  const response = await fetch(URL);

  let data = await response.json();

  get_sudo_arr = [...data.newboard.grids[0].value];
  get_sol_sudo_arr = [...data.newboard.grids[0].solution];

  //  console.log(get_sol_sudo_arr);

  diff_doc.innerHTML = `Difficulty: ${data.newboard.grids[0].difficulty}`;

  sub_btn_doc.addEventListener("click", function () {
    if (GAMEOVER == "false") {
      GAMEOVER = "true";
      checkValues();
      chckInitialVal();
      checkScore();  
    }


    score_sec_doc.style.display = "flex";

    if (GAMEOVER == "true") {
      for (let i = 0; i < 81; i++) {
        inp_arr[i].readOnly = true;
      }
    }

    score_sec_doc.scrollIntoView({
      behavior:"smooth"
    });

  });

  sol_btn_doc.addEventListener("click", function () {
      document.getElementById("sol_head").innerHTML=`Solution`;
      document.getElementById("diff2").innerHTML=`Difficulty: ${data.newboard.grids[0].difficulty}`;
     
    showSolution();
     sol_cont_doc.scrollIntoView({
      behavior:"smooth"
    });
  });

  save_btn_doc.addEventListener("click", function () {
    saveInpVal();
    saveCpyVal();
    saveSolVal();
  });

  load_btn_doc.addEventListener("click", function () {
  if(localStorage.length!=0)
{
    main_doc.style.display = "flex";
    home_scr_doc.style.display = "none";
    loadInpVal();
    loadCpyVal();
    loadSolVal();
  }
  });

  cpyInpVal();
  putValuesSol();
  putValuesSudo();
  borderColorInp();
  borderColorSol();
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
      inp_arr[i].style.color = "white";
    }
  }
}

function checkValues() {
  for (let w = 0; w < 9; w++) {
    if (inp_arr[w].value != sol_arr[w].value) {
      inp_arr[w].style.color = " rgb(255, 135, 135)";
    } else {
      inp_arr[w].style.color = " rgb(63, 240, 63)";
    }
  }

  for (let w = 9; w < 18; w++) {
    if (inp_arr[w].value != sol_arr[w].value) {
      inp_arr[w].style.color = " rgb(255, 135, 135)";
    } else {
      inp_arr[w].style.color = " rgb(63, 240, 63)";
    }
  }

  for (let w = 18; w < 27; w++) {
    if (inp_arr[w].value != sol_arr[w].value) {
      inp_arr[w].style.color = " rgb(255, 135, 135)";
    } else {
      inp_arr[w].style.color = " rgb(63, 240, 63)";
    }
  }
  for (let w = 27; w < 36; w++) {
    if (inp_arr[w].value != sol_arr[w].value) {
      inp_arr[w].style.color = " rgb(255, 135, 135)";
    } else {
      inp_arr[w].style.color = " rgb(63, 240, 63)";
    }
  }
  for (let w = 36; w < 45; w++) {
    if (inp_arr[w].value != sol_arr[w].value) {
      inp_arr[w].style.color = " rgb(255, 135, 135)";
    } else {
      inp_arr[w].style.color = " rgb(63, 240, 63)";
    }
  }
  for (let w = 45; w < 54; w++) {
    if (inp_arr[w].value != sol_arr[w].value) {
      inp_arr[w].style.color = " rgb(255, 135, 135)";
    } else {
      inp_arr[w].style.color = " rgb(63, 240, 63)";
    }
  }

  for (let w = 54; w < 63; w++) {
    if (inp_arr[w].value != sol_arr[w].value) {
      inp_arr[w].style.color = " rgb(255, 135, 135)";
    } else {
      inp_arr[w].style.color = " rgb(63, 240, 63)";
    }
  }
  for (let w = 63; w < 72; w++) {
    if (inp_arr[w].value != sol_arr[w].value) {
      inp_arr[w].style.color = " rgb(255, 135, 135)";
    } else {
      inp_arr[w].style.color = " rgb(63, 240, 63)";
    }
  }
  for (let w = 72; w < 81; w++) {
    if (inp_arr[w].value != sol_arr[w].value) {
      inp_arr[w].style.color = " rgb(255, 135, 135)";
    } else {
      inp_arr[w].style.color = " rgb(63, 240, 63)";
    }
  }
}

function showSolution() {
  if (sol_state == "hide") {
    sol_state = "show";
    sol_btn_doc.innerHTML = `hide solution`;
    sol_btn_doc.style.color="rgb(0, 167, 0)";
    sol_btn_doc.style.backgroundColor="white"
    sol_cont_doc.style.display = "grid";
      document.getElementById("sol_head").style.display=`block`;
      document.getElementById("diff2").style.display=`block`;

  } else if (sol_state == "show") {
    sol_state = "hide";
    sol_btn_doc.innerHTML = `view solution`;
    sol_btn_doc.style.color="white";
    sol_btn_doc.style.backgroundColor="rgb(0, 167, 0)"
    sol_cont_doc.style.display = "none";
      document.getElementById("sol_head").style.display=`none`;
      document.getElementById("diff2").style.display=`none`;

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
function checkScore() {
  for (let i = 0; i < 81; i++) {
    if (inp_arr[i].style.color == "rgb(63, 240, 63)") {
      SCORE += 100;
      
    }
    if (inp_arr[i].style.color == "rgb(255, 135, 135)") {
      SCORE -= 100;
    }
  }

  if (SCORE < 0) {
    SCORE = 0;
  }

  score_doc.innerHTML += `${SCORE}`;
}

function borderColorInp() {
  for (let i = 0; i < 9; i++) {
    inp_arr[i].style.borderTop = " 3px solid black";
  }
  for (let i = 72; i < 81; i++) {
    inp_arr[i].style.borderBottom = " 3px solid black";
  }
  for (let i = 0; i < 81; i++) {
    if (i % 9 == 0) {
      inp_arr[i].style.borderLeft = " 3px solid black";
    }
  }
  for (let i = 8; i < 81; i += 9) {
    inp_arr[i].style.borderRight = " 3px solid black";
  }
  for (let i = 2; i < 75; i += 9) {
    inp_arr[i].style.borderRight = " 3px solid black";
  }

  for (let i = 3; i < 76; i += 9) {
    inp_arr[i].style.borderLeft = " 3px solid black";
  }
  for (let i = 5; i < 79; i += 9) {
    inp_arr[i].style.borderRight = " 3px solid black";
  }
  for (let i = 6; i < 80; i += 9) {
    inp_arr[i].style.borderLeft = " 3px solid black";
  }

  for (let i = 18; i < 27; i++) {
    inp_arr[i].style.borderBottom = " 3px solid black";
    inp_arr[i].style.marginBottom = "1rem";
  }
  for (let i = 18; i < 27; i++) {
    inp_arr[i].style.borderBottom = " 3px solid black";
    inp_arr[i].style.marginBottom = "1rem";
  }

  for (let i = 45; i < 54; i++) {
    inp_arr[i].style.borderBottom = " 3px solid black";
    inp_arr[i].style.marginBottom = "1rem";
  }

  for(let i=3;i<76;i+=9){
    inp_arr[i].style.marginLeft= "0.5rem"
    
  }

  for(let i=6;i<81;i+=9){
    inp_arr[i].style.marginLeft= "0.5rem"
    


  }

  
  
}

function borderColorSol(){
  for (let i = 0; i < 9; i++) {
    sol_arr[i].style.borderTop = " 3px solid black";
  }
  for (let i = 72; i < 81; i++) {
    sol_arr[i].style.borderBottom = " 3px solid black";
  }
  for (let i = 0; i < 81; i++) {
    if (i % 9 == 0) {
      sol_arr[i].style.borderLeft = " 3px solid black";
    }
  }
  for (let i = 8; i < 81; i += 9) {
    sol_arr[i].style.borderRight = " 3px solid black";
  }
  for (let i = 2; i < 75; i += 9) {
    sol_arr[i].style.borderRight = " 3px solid black";
  }

  for (let i = 3; i < 76; i += 9) {
    sol_arr[i].style.borderLeft = " 3px solid black";
  }
  for (let i = 5; i < 79; i += 9) {
    sol_arr[i].style.borderRight = " 3px solid black";
  }
  for (let i = 6; i < 80; i += 9) {
    sol_arr[i].style.borderLeft = " 3px solid black";
  }

  for (let i = 18; i < 27; i++) {
    sol_arr[i].style.borderBottom = " 3px solid black";
    sol_arr[i].style.marginBottom = "1rem";
  }
  for (let i = 18; i < 27; i++) {
    sol_arr[i].style.borderBottom = " 3px solid black";
    sol_arr[i].style.marginBottom = "1rem";
  }

  for (let i = 45; i < 54; i++) {
    sol_arr[i].style.borderBottom = " 3px solid black";
    sol_arr[i].style.marginBottom = "1rem";
  }

  for(let i=3;i<76;i+=9){
    sol_arr[i].style.marginLeft= "0.5rem"
    
  }

  for(let i=6;i<81;i+=9){
    sol_arr[i].style.marginLeft= "0.5rem"
    


  }
}

getSudo();

//##############################################################################################

//create sperate array for solution set and do rather than just directly taking from input.value

//##############################################################################################
