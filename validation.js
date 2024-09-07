const nameError=document.getElementById("name-error")
const lnameError=document.getElementById("lname-error")
const mobileError=document.getElementById("mobile-error")
const passwordError=document.getElementById("password-error")
const aadharError=document.getElementById("aadhar-error")
const ageError=document.getElementById("age-error")
const addressError=document.getElementById("address-error")

function formValidation(){
    if(nameValidation() & lnameValidation() & mobileValidation() & passwordValidation() & aadharValidation() & ageValidation() & addressValidation()){
        return true;
    }
    else{
       return false; 
    }  
    
}

function nameValidation(){

    const name=document.getElementById("inputName").value;

    if(name.length<3){
        nameError.innerHTML=`<i class="fa-solid fa-triangle-exclamation mx-1" style="color: #ff0000;"></i> please enter valid name`;
        return false;
    }

    if(name.length>10){
        nameError.innerHTML=`<i class="fa-solid fa-triangle-exclamation mx-1" style="color: #ff0000;"></i> name is very large`;

        return false;
    }


    else{
        nameError.innerHTML=`<i class="fa-solid fa-circle-check mx-2" style="color: #00ff00;"></i>`
        return true;
    }

}

function lnameValidation(){

    const lname=document.getElementById("inputLname").value;

    if(lname.length<3){
        lnameError.innerHTML=`<i class="fa-solid fa-triangle-exclamation mx-1" style="color: #ff0000;"></i> please enter valid Last name`;
        return false;
    }

    if(lname.length>10){
        lnameError.innerHTML=`<i class="fa-solid fa-triangle-exclamation mx-1" style="color: #ff0000;"></i> Last name is very large`;

        return false;
    }


    else{
        lnameError.innerHTML=`<i class="fa-solid fa-circle-check mx-2" style="color: #00ff00;"></i>`
        return true;
    }

}


function mobileValidation(){

    const mobile=document.getElementById("inputMobile").value;

    if(mobile.length>10){
        mobileError.innerHTML=`<i class="fa-solid fa-triangle-exclamation mx-1" style="color: #ff0000;"></i> please Enter 10 digits`;
        return false;
    }

    if(!mobile.match(/^\d{10}/)){
        mobileError.innerHTML=`<i class="fa-solid fa-triangle-exclamation mx-1" style="color: #ff0000;"></i> Enter 10digit no.`;

        return false;
    }


    else{
        mobileError.innerHTML=`<i class="fa-solid fa-circle-check mx-2" style="color: #00ff00;"></i>`
        return true;
    }

}

function passwordValidation(){

    const password=document.getElementById("inputPassword").value;

    if(password.length<8){
        passwordError.innerHTML=`<i class="fa-solid fa-triangle-exclamation mx-1" style="color: #ff0000;"></i> password must be of 8 digits`;
        return false;
    }

    if(!password.match(/(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}/)){
        passwordError.innerHTML=`<i class="fa-solid fa-triangle-exclamation mx-1" style="color: #ff0000;"></i> Please enter atleast one small and one capital latter and  digits`;
        return false;
    }


    else{
        passwordError.innerHTML=`<i class="fa-solid fa-circle-check mx-2" style="color: #00ff00;"></i>`
        return true;
    }

}

function aadharValidation(){

    const aadhar=document.getElementById("inputAadhar").value;

    if(!aadhar.match(/^\d{16}$/)){
        aadharError.innerHTML=`<i class="fa-solid fa-triangle-exclamation mx-1" style="color: #ff0000;"></i>Please enter valid aadhar no.`;
        return false;
    }

    else{
        aadharError.innerHTML=`<i class="fa-solid fa-circle-check mx-2" style="color: #00ff00;"></i>`
        return true;
    }

}

function ageValidation(){

    const age=document.getElementById("inputAge").value;

    if(age<18){
        ageError.innerHTML=`<i class="fa-solid fa-triangle-exclamation mx-1" style="color: #ff0000;"></i>Age must be 18 plus`;
        return false;
    }

    else{
        ageError.innerHTML=`<i class="fa-solid fa-circle-check mx-2" style="color: #00ff00;"></i>`
        return true;
    }

}

function addressValidation(){

    const address=document.getElementById("inputAddress").value;

    if(address.length<15){
        addressError.innerHTML=`<i class="fa-solid fa-triangle-exclamation mx-1" style="color: #ff0000;"></i>Please enter valid address`;
        return false;
    }

    else{
        addressError.innerHTML=`<i class="fa-solid fa-circle-check mx-2" style="color: #00ff00;"></i>`
        return true;
    }

}
