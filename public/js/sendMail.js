
function sendEmail(){
    let name = document.getElementsByClassName("name")[0].value;
    let formEmail = document.getElementsByClassName("Email")[0].value;
    let message = document.getElementsByClassName("message")[0].value;
    
     let body =  name + "<br/>" + formEmail + "<br/>"+ message;
    Email.send({
        Host : "smtp.elasticemail.com",
        Username :'arjun12345bhandari@gmail.com',
        Password : 'B257D7379CC3946C549D6282B38854A103F4',
        To : 'arjun12345bhandari@gmail.com',
        From :'arjun12345bhandari@gmail.com',
        Subject : "Mail from Dhphotography website",
        Body : body,
        
    }).then(
      message => {
        if(message == "OK"){
            swal("successfull!", "You message has ben send!", "success");
        }else{
            swal("Msg not send!", "Something went Wrong Try via email/ Call!", "error");
        }
      }
    );
    resetForm();
}

function resetForm() {
    document.getElementById("contactForm").reset();
}




