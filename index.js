const cont_doc = document.getElementById("cont");
let inp_arr = [];

for (let i = 0; i < 9; i++) {
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
    }
    else{
        inp_arr[i].value=""
    }
  });


 
  cont_doc.append(inp_arr[i]);
}

