const navbar = document.querySelector('nav');

window.onscroll = function() {
  if(window.pageYOffset > 0) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
}

const form = document.getElementById('form');

if(form) {
  const onSubmit = form.addEventListener('submit', (event) => {
    event.preventDefault();

    let data = new FormData(form);
    submitForm(data);
  })
}

const submitForm = (data) => {
  fetch("/send", {
    method: "post",
    body: data,
    }).then((response) => {
      window.location.href="/success";
  });
}
