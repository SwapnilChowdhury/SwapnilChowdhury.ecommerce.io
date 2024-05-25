// window.onload = function() {
//     localStorage.clear();
//   }

let vData = JSON.parse(localStorage.getItem("OrderData"));

$(document).ready(function () {
    $('[data-toggle="tooltip"]').tooltip({
        placement: 'bottom'
    });
});

window.onscroll = function () {
    if (document.body.scrollTop > 500 || document.documentElement.scrollTop > 500) {
        document.getElementById("backToTop").style.visibility = "visible";
    } else {
        backToTop.style.visibility = "hidden";
    }
}

let imageArray = ["./images/v1.jpeg","./images/v1.jpeg","./images/v1.jpeg","./images/v1.jpeg","./images/v1.jpeg","./images/v1.jpeg","./images/v1.jpeg","./images/v1.jpeg"]
let foodArray = ["Burger1", "Burger2", "Burger3", "Burger4", "Burger5", "Burger6", "Burger7", "Burger8"];
let costArray = [100, 150, 200, 250, 300, 350, 400, 450, 500];
let orderArray = ["oneorder1", "oneorder2", "oneorder3", "oneorder4", "oneorder5", "oneorder6", "oneorder7", "oneorder8"];
let plusArray = ["plus1", "plus2", "plus3", "plus4", "plus5", "plus6", "plus7", "plus8"];
let minusArray = ["minus1", "minus2", "minus3", "minus4", "minus5", "minus6", "minus7", "minus8"];
let trashArray = ["trash1", "trash2", "trash3", "trash4", "trash5", "trash6", "trash7", "trash8"];
let buttonArray = ["orderbutton1", "orderbutton2", "orderbutton3", "orderbutton4", "orderbutton5", "orderbutton6", "orderbutton7", "orderbutton8"];
let maxlen = foodArray.length;
let orderCart = {};
let existingCart = {};
let storage = "";
let ostr = "";
let columns = 3;//should be a divisor of 12;

/*function updateLocalStorgage(count){
    storage = localStorage.getItem("OrderCart");
    if(existingCart===null)
    {
        localStorage.setItem("OrderData", JSON.stringify(orderCart));
    }
    else
    {
        existingCart = JSON.parse(storage);

    }
}*/

function changebutton(id, pid, mid, orderNumber, tid, index) {
    let count = {};
    let order = document.getElementById(id);
    count["order"] = 1;
    count["cost"] = costArray[index];
    count["food"] = foodArray[index];
    //count["images"] = "D:/HTML Project/ECommerce/images/v1.jpeg";
    count["images"] = imageArray[index];
    //count["images"] = "v1.jpeg";

    orderCart[orderNumber] = count;
    //console.log(count);
    order.innerHTML = "Added : 1";
    order.disabled = true;
    //order.style.display = "none";
    //document.getElementById(orderNumber).style.display = "inline-flex";
    let pid2 = document.getElementById(pid);
    pid2.style.display = "inline-flex";
    let mid2 = document.getElementById(mid);
    mid2.style.display = "inline-flex";
    let tid2 = document.getElementById(tid);
    tid2.style.display = "inline-flex";
    let ordernumber = document.getElementById(orderNumber);
    ordernumber.style.visibility = "visible";
    order.classList.add('text-bold');
    let cartnumber = document.getElementById("lblCartCount");
    let c;
    if((JSON.parse(localStorage.getItem("OrderDataNV"))) != null)
    {
        c = Object.keys(orderCart).length + Object.keys(JSON.parse(localStorage.getItem("OrderDataNV"))).length;
    }
    else
    {
        c = Object.keys(orderCart).length;
    }
    cartnumber.innerHTML = c;
    cartnumber.style.visibility = "visible";
    localStorage.setItem("OrderData", JSON.stringify(orderCart));
}

//increases number of order on clicking plus icon
function increaseOrder(id, orderid, index) {
    let ordernumber = document.getElementById(id);
    let orderNumber = document.getElementById(orderid);
    //count[id] = (parseInt(count[id]) + 1).toString();
    orderCart[orderid].order = orderCart[orderid].order + 1;
    orderCart[orderid].cost = orderCart[orderid].order * costArray[index];
    orderNumber.innerHTML = "Added : Rs."+orderCart[orderid].cost;
    ostr = ordernumber.innerHTML;
    ostr = ostr.substring(0, 8) + orderCart[orderid].order;
    ordernumber.innerHTML = ostr;
    localStorage.setItem("OrderData", JSON.stringify(orderCart));
}

//decreases number of order on clicking minus icon
function decreaseOrder(id, pid, mid, orderNumber, tid, index) {
    let ordernumber = document.getElementById(orderNumber);
    let order = document.getElementById(id);
    let pid2 = document.getElementById(pid);
    let mid2 = document.getElementById(mid);
    let tid2 = document.getElementById(tid);
    orderCart[orderNumber].order = orderCart[orderNumber].order - 1;
    orderCart[orderNumber].cost = orderCart[orderNumber].order * costArray[index];
    if (orderCart[orderNumber].order == 0) {
        delete orderCart[orderNumber];
        ordernumber.style.visibility = "hidden";
        //ordernumber.innerHTML = "Add to Cart";
        order.classList.remove('text-bold');
        order.disabled = false;
        //order.style.display = "inline-block";
        order.innerHTML = "Add to Cart";
        //ordernumber.style.display = "none";
        pid2.style.display = "none";
        mid2.style.display = "none";
        tid2.style.display = "none";
        let cartnumber = document.getElementById("lblCartCount");
        let c;
    if(JSON.parse(localStorage.getItem("OrderDataNV")) != null)
    {
        c = Object.keys(orderCart).length + Object.keys(JSON.parse(localStorage.getItem("OrderDataNV"))).length;
    }
    else
    {
        c = Object.keys(orderCart).length;
    }
        cartnumber.innerHTML = c;
        if (cartnumber.innerHTML == "0") {
            cartnumber.style.visibility = "hidden";
        }
        localStorage.setItem("OrderData", JSON.stringify(orderCart));
    }
    else {
        ostr = order.innerHTML;
        ostr = ostr.substring(0, 8) + orderCart[orderNumber].order;
        order.innerHTML = ostr;
        //order.innerHTML = ostr;
        ordernumber.innerHTML = "Added : Rs."+orderCart[orderNumber].cost;
        localStorage.setItem("OrderData", JSON.stringify(orderCart));
    }
}

//removes order on clicking trash icon
function removeAll(id, pid, mid, orderNumber, tid, index) {
    let ordernumber = document.getElementById(orderNumber);
    let order = document.getElementById(id);
    let pid2 = document.getElementById(pid);
    let mid2 = document.getElementById(mid);
    let tid2 = document.getElementById(tid);
    //count[orderNumber] = 0;
    delete orderCart[orderNumber];
    ordernumber.innerHTML = "Added : Rs."+costArray[index];
    ordernumber.style.visibility = "hidden";
    //ordernumber.style.display = "none";
    order.innerHTML = "Add to Cart";
    order.disabled = false;
    //order.style.display = "inline-block";
    order.classList.remove('text-bold');
    pid2.style.display = "none";
    mid2.style.display = "none";
    tid2.style.display = "none";
    let cartnumber = document.getElementById("lblCartCount");
    let c;
    if(JSON.parse(localStorage.getItem("OrderDataNV")) != null)
    {
        c = Object.keys(orderCart).length + Object.keys(JSON.parse(localStorage.getItem("OrderDataNV"))).length;
    }
    else
    {
        c = Object.keys(orderCart).length;
    }
    cartnumber.innerHTML = c;
    if (cartnumber.innerHTML == "0") {
        cartnumber.style.visibility = "hidden";
    }
    localStorage.setItem("OrderData", JSON.stringify(orderCart));
}

menu = document.getElementById("menuContainer");

//adding each item on menu one by one
function addMenuElement(divRow, index, cond) {
    let divCol = document.createElement('div');
    divCol.setAttribute('class', 'col-md col-sm-6');
    let divCard = document.createElement('div');
    divCard.setAttribute('class', 'card bg-light menuitem');
    if (!cond) {
        divCol.classList.remove('col-md');
        divCol.classList.add('col-md-4')
    }
    image = document.createElement('img');
    image.setAttribute('class', 'card-img-top');
    //image.src = "./images/v1.jpeg";
    image.src = imageArray[index];
    image.alt = "FoodImage";
    let divCardBody = document.createElement('div');
    divCardBody.setAttribute('class', 'card-body');
    let cardTitle = document.createElement('h5');
    cardTitle.innerHTML = foodArray[index];
    let pCardText = document.createElement('p');
    pCardText.setAttribute('class', 'card-text');
    let spanCost = document.createElement('span');
    spanCost.innerHTML = "Rs." + costArray[index];
    let spanOrder = document.createElement('span');
    spanOrder.setAttribute('id', orderArray[index]);
    spanOrder.setAttribute('class', 'numberOfOrder');
    spanOrder.innerHTML = "Added : Rs."+costArray[index];
    spanOrder.style.visibility = "hidden";
    let minusicon = document.createElement('i');
    minusicon.setAttribute('class', 'fa-solid fa-circle-minus minus');
    minusicon.setAttribute('id', minusArray[index]);
    minusicon.setAttribute('data-toggle', 'tooltip');
    minusicon.setAttribute('data-placement', 'bottom');
    minusicon.setAttribute('title', 'Remove');
    minusicon.style.display = "none";
    minusicon.onclick = function () {
        decreaseOrder(buttonArray[index], plusArray[index], minusArray[index], orderArray[index], trashArray[index], index);
    }
    let button = document.createElement('button');
    button.setAttribute('id', buttonArray[index]);
    button.setAttribute('class', 'btn btn-warning');
    button.innerHTML = "Add to Cart";
    button.onclick = function () {
        changebutton(buttonArray[index], plusArray[index], minusArray[index], orderArray[index], trashArray[index], index);
    }
    let plusicon = document.createElement('i');
    plusicon.setAttribute('class', 'fa-solid fa-circle-plus plus');
    plusicon.setAttribute('id', plusArray[index]);
    plusicon.setAttribute('data-toggle', 'tooltip');
    plusicon.setAttribute('data-placement', 'bottom');
    plusicon.setAttribute('title', 'Add');
    plusicon.style.display = "none";
    plusicon.onclick = function () {
        increaseOrder(buttonArray[index], orderArray[index], index);
    }
    let trashicon = document.createElement('i');
    trashicon.setAttribute('class', 'fa-solid fa-trash-can trash');
    trashicon.setAttribute('id', trashArray[index]);
    trashicon.setAttribute('data-toggle', 'tooltip');
    trashicon.setAttribute('data-placement', 'bottom');
    trashicon.setAttribute('title', 'Delete');
    trashicon.style.display = "none";
    trashicon.onclick = function () {
        removeAll(buttonArray[index], plusArray[index], minusArray[index], orderArray[index], trashArray[index], index);
    }
    divCardBody.appendChild(cardTitle);
    pCardText.appendChild(spanCost);
    pCardText.appendChild(spanOrder);
    divCardBody.appendChild(pCardText);
    divCardBody.appendChild(minusicon);
    divCardBody.appendChild(button);

    //divCardBody.appendChild(spanOrder);

    divCardBody.appendChild(plusicon);
    divCardBody.appendChild(trashicon);
    divCard.appendChild(image);
    divCard.appendChild(divCardBody);
    divCol.appendChild(divCard);
    divRow.appendChild(divCol);
}
let divRow;

//adds all the items in the menu
function addMenu() {
    //localStorage.removeItem("OrderData");
    //loop through vData and change the buttons accordingly
    let c;
    if(JSON.parse(localStorage.getItem("OrderDataNV")) != null)
    {
        c = Object.keys(JSON.parse(localStorage.getItem("OrderDataNV"))).length;
    }
    else
    {
        c=0;
    }
    if(JSON.parse(localStorage.getItem("OrderData")) != null)
    {
        c = c + Object.keys(JSON.parse(localStorage.getItem("OrderData"))).length;
    }
        if (c > 0) {
        let cartnumber = document.getElementById("lblCartCount");
        cartnumber.innerHTML = c;
        cartnumber.style.visibility = "visible";
    }
    for (let i = 0; i < maxlen; i++) {
        if (i % 3 == 0) {
            if (divRow != null || divRow != undefined) {
                menu.appendChild(divRow);
            }
            divRow = document.createElement('div');
            divRow.setAttribute('class', 'row menu-row');
            divRow.setAttribute('id', 'menu-row')
        }
        if (maxlen % 3 != 0) {
            if ((maxlen - i) <= (maxlen % 3)) {
                addMenuElement(divRow, i, false)
            }
            else {
                addMenuElement(divRow, i, true);
            }
        }
        else {
            addMenuElement(divRow, i, true);
        }
    }
    menu.appendChild(divRow);
    for(let keys in vData)
    {
        let num = parseInt(keys.substring(8));
        document.getElementById(buttonArray[num-1]).disabled=true;
        document.getElementById(buttonArray[num-1]).innerHTML="Added : " + vData[keys].order;
        document.getElementById(buttonArray[num-1]).classList.add('text-bold');
        document.getElementById(plusArray[num-1]).style.display = "inline-flex";
        document.getElementById(minusArray[num-1]).style.display = "inline-flex";
        document.getElementById(trashArray[num-1]).style.display = "inline-flex";
        document.getElementById(orderArray[num-1]).innerHTML = "Added : Rs."+vData[keys].cost;
        document.getElementById(orderArray[num-1]).style.visibility="visible";
        orderCart[keys] = vData[keys];
    }
}

let buttonPressed = false;

$('a').click(function(){
    buttonPressed = true;
})

// // window.onload = function () {
// //     if (typeof history.pushState === "function") {
// //         //history.pushState("jibberish", null, null);
// //         window.onpopstate = function () {
// //             //history.pushState('newjibberish', null, null);
// //             buttonPressed = true;
// //         };
// //     }
// // }

// // $(window).on('popstate', function(event) {
// //     alert("pop");
// //    });

   if (performance.navigation.type == 2 || performance.navigation.type == 1) {
    buttonPressed=true;
}
else
{
    buttonPressed=false;
}

// // addEventListener("popstate",(e)=>{
// //     buttonPressed = true;
// // })

// // $(window).bind('statechange',function(){
// //     buttonPressed=true;
// // })

// // $(document).ready(function($) {

// //     if (window.history && window.history.pushState) {
  
// //       window.history.pushState('forward', null, './#forward');
  
// //       $(window).on('popstate', function() {
// //         alert('Back button was pressed.');
// //       });
  
// //     }
// //   });

window.onbeforeunload = function(){
    $('a').click(function(){
        buttonPressed = true;
    })
    
    if (performance.navigation.type == 1) {
        buttonPressed=true;
    }
    else
    {
        buttonPressed=false;
    }
}

window.onunload = function(){
    if(!buttonPressed)
    {
        buttonPressed = false;
        // localStorage.removeItem("OrderData");
    }
    else
    {
        buttonPressed = false;
    }
}

// window.onload = function(){
//     if(buttonPressed){
//         localStorage.removeItem("OrderData");
//     }
//     else
//     {
//         buttonPressed=true;
//     }
// }

addMenu();