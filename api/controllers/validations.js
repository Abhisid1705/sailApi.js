module.exports={
    validateEmail:(email)=>{
        var reg = /^[A-Z0-9._%+-]+@([A-Z0-9-]+\.)+[A-Z]{2,4}$/i;
        if(!reg.test(email)){
            return false;
        }
        return true;
    }  
}