if(document.querySelector("#login-user-form")){
    const loginForm = document.querySelector("#login-user-form");

    loginForm.addEventListener("submit", function(event){
        event.preventDefault();

        let username = this.username.value.trim();
        let password = this.password.value.trim();

        if(username.length != 0 && password.length != 0){
            TaskList.loginUser(username, password);
        }


    })


  }


  if(document.querySelector("#register-user-form")){
    const registerForm = document.querySelector("#register-user-form");

    registerForm.addEventListener("submit", function(event){
        event.preventDefault();
        let registerInfo = document.querySelector("#register-info");

        registerInfo.innerHTML = "";

        const firstname = this.firstname.value.trim();
        const lastname = this.lastname.value.trim();
        const username = this.username.value.trim();
        const email = this.email.value.trim();
        const password = this.password.value.trim();

        let form_errors = [];

        if(firstname.length == 0 ){
            form_errors.push("Please enter first name")
        }

        if(lastname.length == 0 ){
            form_errors.push("Please enter last name")
        }

        if(username.length == 0 ){
            form_errors.push("Please enter username")
        }

        if(password.length == 0 ){
            form_errors.push("Please enter password")
        }

        if(email.length == 0 ){
            form_errors.push("Please enter email")
        }

        if(form_errors.length == 0){
            //there are no errors
        }else{
            //there are errors
          
            for(let i = 0; i < form_errors.length; i++){
                registerInfo.innerHTML += `<div class='alert alert-danger'>${form_errors[i]}</div>`
            }
        }



    })

  }