export default function CatchErros(error,displayError){
    let errorMsg;
    if(error.response){
        errorMsg=error.response.data;
        console.log("Error Response "+errorMsg);

        if(error.response.data.error){
            errorMsg=error.response.data.error.message;
        }
    }
    else if(error.request){
        errorMsg=error.request;
        console.log("Error Request : "+errorMsg);

    }
    else{
        errorMsg=error.message;
        console.log(errorMsg);
    }
    displayError(errorMsg);

}