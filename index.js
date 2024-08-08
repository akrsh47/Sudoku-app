const cont_doc = document.getElementById("cont");

let inp_arr = [];
let get_sudo_arr = [];
const URL =
  "https://sudoku-api.vercel.app/api/dosuku?query={newboard(limit:1){grids{value,solution,difficulty},results,message}}";

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

  //console.log(data.newboard.grids[0].value)
  get_sudo_arr = [...data.newboard.grids[0].value];

  putValuesSudo();
  //    console.log(get_sudo_arr[1])
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
  for (let w =45; w < 54; w++) {
    inp_arr[w].value = get_sudo_arr[5][w - 45];
  }
  for (let w =54; w < 63; w++) {
    inp_arr[w].value = get_sudo_arr[6][w - 54];
  }
  for (let w =63; w < 72; w++) {
    inp_arr[w].value = get_sudo_arr[7][w - 63];
  }
  for (let w =72; w < 81; w++) {
    inp_arr[w].value = get_sudo_arr[8][w - 72];
  }


for (let i = 0; i < 81; i++) {    
  if(inp_arr[i].value=="0"){
    inp_arr[i].value="";
  }
}
}

getSudo();
