
const time_doc = document.getElementById("time");
const ttaken_doc = document.getElementById("ttaken");
let save_time = [0,0,0]




let seconds= 0;
let hours = 0;
let minutes = 0;

 let beforeZeroSec = 0;
let beforeZeroMin =0;
let beforeZeroHour = 0;





function startClock(){
    seconds++;

    if(seconds/60===1){
        minutes++;
        seconds=0;
    }
    if(minutes/60===1){
        hours++;
        minutes=0;
    }
    if(hours/24==1){
        hours=0;
    }

    if(seconds<10){
        beforeZeroSec="0"+seconds.toString();
    }
    else{
        beforeZeroSec=seconds;
    }
    if(minutes<10){
        beforeZeroMin = "0"+minutes.toString();
    }
    else{
        beforeZeroMin = minutes;
    }
    if(hours<10){
        beforeZeroHour = "0"+hours.toString();
    }
    else{
        beforeZeroHour=hours;
    }

    


    time_doc.innerHTML =`${beforeZeroHour} : ${beforeZeroMin} : ${beforeZeroSec}`;


}

f_new_btn_doc.addEventListener("click",function(){
    time_interval= window.setInterval(startClock,1000);
})



save_btn_doc.addEventListener("click",function(){
save_time[0]= seconds;
save_time[1]= minutes;
save_time[2]= hours;

localStorage.setItem("time",JSON.stringify(save_time));
})

load_btn_doc.addEventListener("click",function(){
seconds=JSON.parse(localStorage.getItem("time"))[0]
minutes=JSON.parse(localStorage.getItem("time"))[1]
hours=JSON.parse(localStorage.getItem("time"))[2]

time_interval= window.setInterval(startClock,1000);

})

sub_btn_doc.addEventListener("click",function(){
    ttaken_doc.innerHTML=`Time Taken: ${beforeZeroHour} : ${beforeZeroMin} : ${beforeZeroSec}`;
    window.clearInterval(time_interval)
})