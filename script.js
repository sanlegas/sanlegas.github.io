
import Type from './type.js';
let flag = false;

function delay(delayInms) {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve(2);
        }, delayInms);
    });
}


let setCursor = function(command){
    setInterval( function() {

    },1000)
}

document.addEventListener('click', function (event) {
    console.log("click",event.target);
    if (flag){
        return;
    }

    var command = document.getElementById("command");

    let data = event.target.getAttribute("data");
    if (data === null){
        return;
    }
    flag =  true;
    command.textContent = "";
    let type = new Type(data );
    type.type(function(letra){
        command.textContent = command.textContent + " ";
        delay(300);
        command.textContent = command.textContent.substring(0,command.textContent.length - 1);
        command.textContent = command.textContent + letra;

    },function(){
        flag = false;
    });

    console.log("data:",data);

    event.preventDefault();

}, false);
