const TIME_MILISECONDS = 200;

function delay(delayInms) {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve(2);
        }, delayInms);
    });
}

export default class Type{

    constructor(cadena){
        this.cadena = cadena;
    }

    async type(callbackExecution, callBackEnded){
        this.callback = callbackExecution;
        this.callBackEnded = callBackEnded;
        //console.log("Se va a comenzar a typear",this.cadena,this.callback);
        for (let i = 0; i < this.cadena.length; i++){
            await delay(TIME_MILISECONDS);
            this.callback(this.cadena[i]);
        }
        this.callBackEnded();
    }


}
