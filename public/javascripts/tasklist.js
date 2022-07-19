const TaskList = (function(){

    const registerUser = (user) => {

    }


    const loginUser = async (username, password) => {

        startLoader();
        const feedback = await axios.post("/login-user", {
            username: username,
            password: password
        })

        if(feedback){
            if(feedback.data.code == "invalid-user"){
                if(document.querySelector("#login-info")){
                    document.querySelector("#login-info").innerHTML = `<div class='alert alert-warning'>
                        ${feedback.data.message}
                    </div>`
                }
            }

            stopLoader();
        }

        console.log(feedback);
        
    }

    const startLoader = () => {
        const modalElement = document.createElement("div");

        modalElement.innerHTML= `<div class="modal" tabindex="-1" id='start-loader-id' data-backdrop='static' data-keyboard='false'>
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-body">
              <p><div class="spinner-border" role="status">
              <span class="sr-only">Loading...</span>
            </div></p>
            </div>
          </div>
        </div>
      </div>`

      document.body.appendChild(modalElement);

      $("#start-loader-id").modal("show");


    }

    const stopLoader = () => {
        $("#start-loader-id").modal("hide");

    }




    return {
        registerUser: registerUser,
        loginUser: loginUser
    }




}());