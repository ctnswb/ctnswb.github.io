const showMessage = () => {
  var myDiv = document.getElementById('contact');
  myDiv.innerHTML = ("Thank you for submitting the form! I will be in touch with you shortly.");
}

const sanitize = (input) => {
    var output = input.replace(/<script[^>]*?>.*?<\/script>/gi, '').
           replace(/<[\/\!]*?[^<>]*?>/gi, '').
           replace(/<style[^>]*?>.*?<\/style>/gi, '').
           replace(/<![\s\S]*?--[ \t\n\r]*>/gi, '');
      return output;
  };
const contactData = {};

$(document).on('keyup', '#contact-name, #contact-email, #contact-message', () => {
  contactData.name = sanitize($('#contact-name').val());
  contactData.email = sanitize($('#contact-email').val());
  contactData.message = sanitize($('#contact-message').val());
})

$(document).on('click','#contact-button', ()=>{
  if (contactData.name && contactData.email && contactData.message) {
    let data = new URLSearchParams();
    data.append('data', JSON.stringify(contactData));
    axios.post("https://script.google.com/macros/s/AKfycbxlz2WPcH89zIOXij4cNKLQjiBhkSUgchr_3LzmQ0tOYdO9nbhj/exec",data).then((response) => {
      showMessage();
      $('#contact-name').val('');
      $('#contact-email').val('');
      $('#contact-message').val('');
    })
  }
  else {
    if (!contactData.name){
      $('#contact-name').css("border-color","tomato");
    }
    if (!contactData.email){
      $('#contact-email').css("border-color","tomato");
    }
    if (!contactData.message){
      $('#contact-message').css("border-color","tomato");
    }
    if (contactData.name) {
      $('#contact-name').css("border-color","#76D7C4");
    }
    if (contactData.email) {
      $('#contact-email').css("border-color","#76D7C4");
    }
    if (contactData.message) {
      $('#contact-message').css("border-color","#76D7C4");
    }
  }
})