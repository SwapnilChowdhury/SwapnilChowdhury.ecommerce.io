window.onscroll = function () {
  if (document.body.scrollTop > 500 || document.documentElement.scrollTop > 500) {
    document.getElementById("backToTop").style.visibility = "visible";
  } else {
    backToTop.style.visibility = "hidden";
  }
}

$('.carousel').carousel({
  interval: 3500
})

let vfoodArray = ["Burger1", "Burger2", "Burger3", "Burger4", "Burger5", "Burger6", "Burger7", "Burger8"];
let vcostArray = [100, 150, 200, 250, 300, 350, 400, 450, 500];
let nvfoodArray = ["Chicken1", "Chicken2", "Chicken3", "Chicken4", "Chicken5", "Chicken6", "Chicken7", "Chicken8"];
let nvcostArray = [100, 150, 200, 250, 300, 350, 400, 450, 500];
let vmaxlen = vfoodArray.length;
let nvmaxlen = nvfoodArray.length;
let vmenu = document.getElementById("vmenu");
let nvmenu = document.getElementById("nvmenu");

function addMenu() {
  for (let i = 0; i < vmaxlen; i++) {
    let liFood = document.createElement('li');
    let spanName = document.createElement('span');
    let spanCost = document.createElement('span');
    liFood.setAttribute('class','card-text food-details');
    spanName.setAttribute('class', 'foodname');
    spanName.innerHTML = vfoodArray[i];
    spanCost.setAttribute('class','foodcost badge badge-secondary');
    spanCost.innerHTML = "Rs."+vcostArray[i];
    liFood.appendChild(spanName);
    liFood.appendChild(spanCost);
    vmenu.appendChild(liFood);
  }
  for (let i = 0; i < nvmaxlen; i++) {
    let liFood = document.createElement('li');
    let spanName = document.createElement('span');
    let spanCost = document.createElement('span');
    liFood.setAttribute('class','card-text food-details');
    spanName.setAttribute('class', 'foodname');
    spanName.innerHTML = nvfoodArray[i];
    spanCost.setAttribute('class','foodcost badge badge-secondary');
    spanCost.innerHTML =  "Rs."+nvcostArray[i];
    liFood.appendChild(spanName);
    liFood.appendChild(spanCost);
    nvmenu.appendChild(liFood);
  }

}

window.onload = function () {
  localStorage.clear();
  if (document.body.scrollTop > 500 || document.documentElement.scrollTop > 500) {
    document.getElementById("backToTop").style.visibility = "visible";
  } else {
    backToTop.style.visibility = "hidden";
  }
  addMenu();
}

fname = document.getElementById("name");
email = document.getElementById("emailID");

function validateEmail() {
  const pattern = /^\w+([\.-]?\w+)+@\w+([\.:]?\w+)+(\.[a-zA-Z0-9]{2,3})+$/;
  let f = true;
  if (email.value == "") {
    f = false;
    document.getElementById("emailWarn").innerHTML = "Email required";
    document.getElementById("emailWarn").classList.remove("warning");
    document.getElementById("emailWarn").classList.add("warning-visible");
  }
  else if (!(email.value.match(pattern))) {
    f = false;
    document.getElementById("emailWarn").innerHTML = "Invalid Email";
    document.getElementById("emailWarn").classList.remove("warning");
    document.getElementById("emailWarn").classList.add("warning-visible");
  }
  else {
    document.getElementById("emailWarn").classList.remove("warning-visible");
    document.getElementById("emailWarn").classList.add("warning");
  }
  return f;
}

function validateName() {
  let f = true;
  if ((fname.value).trim() == "") {
    document.getElementById("nameWarn").innerHTML = "Name required";
    document.getElementById("nameWarn").classList.remove("warning");
    document.getElementById("nameWarn").classList.add("warning-visible");
    f = false;
  }
  else if (((fname.value).trim()).length > 20) {
    document.getElementById("nameWarn").innerHTML = "Invalid length of name";
    document.getElementById("nameWarn").classList.remove("warning");
    document.getElementById("nameWarn").classList.add("warning-visible");
    f = false;
  }
  else {
    document.getElementById("nameWarn").classList.remove("warning-visible");
    document.getElementById("nameWarn").classList.add("warning");
  }
  return f;
}

function validate() {
  flag1 = validateName();
  flag2 = validateEmail();
  if (flag1 && flag2) {
    form.submit();
    return true;
  }
  else {
    return false;
  }
}

// $('#veglink').click(function(){
//   if(localStorage.getItem("OrderData")!=null)
//   {
//     localStorage.removeItem("OrderData");
//   }
// })

// $('#nonveglink').click(function(){
//   if(localStorage.getItem("OrderDataNV")!=null)
//   {
//     localStorage.removeItem("OrderDataNV");
//   }
// })

// $('#cartlink').click(function(){
  
// })