// window.onload = function() {
//     localStorage.clear();
//   }

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

let imageArray = ["./images/nv1.jpg", "./images/nv1.jpg", "./images/nv1.jpg", "./images/nv1.jpg", "./images/nv1.jpg", "./images/nv1.jpg", "./images/nv1.jpg", "./images/nv1.jpg", "./images/nv1.jpg"]
let foodArray = ["Chicken11", "Chicken12", "Chicken13", "Chicken14", "Chicken15", "Chicken16", "Chicken17", "Chicken18", "Chicken19"];
let costArray = [125, 175, 225, 275, 325, 375, 425, 475, 525];
let orderArray = ["twoorder1", "twoorder2", "twoorder3", "twoorder4", "twoorder5", "twoorder6", "twoorder7", "twoorder8", "twoorder9"];
let plusArray = ["plus1", "plus2", "plus3", "plus4", "plus5", "plus6", "plus7", "plus8"];
let minusArray = ["minus1", "minus2", "minus3", "minus4", "minus5", "minus6", "minus7", "minus8", "minus9"];
let trashArray = ["trash1", "trash2", "trash3", "trash4", "trash5", "trash6", "trash7", "trash8", "trash9"];
let buttonArray = ["orderbutton1", "orderbutton2", "orderbutton3", "orderbutton4", "orderbutton5", "orderbutton6", "orderbutton7", "orderbutton8", "orderbutton9"];
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
    count["images"] = imageArray[index];

    orderCart[orderNumber] = count;
    //console.log(count);
    order.innerHTML = "Added : 1";
    order.disabled = true;
    let pid2 = document.getElementById(pid);
    let mid2 = document.getElementById(mid);
    let tid2 = document.getElementById(tid);
    pid2.style.display = "inline-flex";
    mid2.style.display = "inline-flex";
    tid2.style.display = "inline-flex";
    console.log(orderNumber)
    let ordernumber = document.getElementById(orderNumber);
    ordernumber.style.visibility = "visible";
    order.classList.add('text-bold');
    let cartnumber = document.getElementById("lblCartCount");
    let c;
    if ((JSON.parse(localStorage.getItem("OrderData"))) != null) {
        c = Object.keys(orderCart).length + Object.keys(JSON.parse(localStorage.getItem("OrderData"))).length;
    }
    else {
        c = Object.keys(orderCart).length;
    }
    cartnumber.innerHTML = c;
    cartnumber.style.visibility = "visible";
    localStorage.setItem("OrderDataNV", JSON.stringify(orderCart));
}

function increaseOrder(id, orderid, index) {
    let ordernumber = document.getElementById(id);
    let orderNumber = document.getElementById(orderid);
    //count[id] = (parseInt(count[id]) + 1).toString();
    orderCart[orderid].order = orderCart[orderid].order + 1;
    orderCart[orderid].cost = orderCart[orderid].order * costArray[index];
    ostr = ordernumber.innerHTML;
    ostr = ostr.substring(0, 8) + orderCart[orderid].order;
    orderNumber.innerHTML = "Added : Rs."+orderCart[orderid].cost;
    ordernumber.innerHTML = ostr;
    localStorage.setItem("OrderDataNV", JSON.stringify(orderCart));
}

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
        order.innerHTML = "Add to Cart";
        order.classList.remove('text-bold');
        order.disabled = false;
        pid2.style.display = "none";
        mid2.style.display = "none";
        tid2.style.display = "none";
        let cartnumber = document.getElementById("lblCartCount");
        let c;
        if ((JSON.parse(localStorage.getItem("OrderData"))) != null) {
            c = Object.keys(orderCart).length + Object.keys(JSON.parse(localStorage.getItem("OrderData"))).length;
        }
        else {
            c = Object.keys(orderCart).length;
        }
        if (c > 0) {
            cartnumber.innerHTML = c;
            cartnumber.style.visibility = "visible";
        }
        else {
            cartnumber.innerHTML = c;
            cartnumber.style.visibility = "hidden";
        }
        localStorage.setItem("OrderDataNV", JSON.stringify(orderCart));
    }
    else {
        ostr = order.innerHTML;
        ostr = ostr.substring(0, 8) + orderCart[orderNumber].order;
        ordernumber.innerHTML = "Added : Rs."+orderCart[orderNumber].cost;
        //ordernumber.innerHTML = ostr;
        order.innerHTML = ostr;
        localStorage.setItem("OrderDataNV", JSON.stringify(orderCart));
    }
}

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
    order.innerHTML = "Add to Cart";
    order.disabled = false;
    order.classList.remove('text-bold');
    pid2.style.display = "none";
    mid2.style.display = "none";
    tid2.style.display = "none";
    let cartnumber = document.getElementById("lblCartCount");
    let c;
    if ((JSON.parse(localStorage.getItem("OrderData"))) != null) {
        c = Object.keys(orderCart).length + Object.keys(JSON.parse(localStorage.getItem("OrderData"))).length;
    }
    else {
        c = Object.keys(orderCart).length;
    }
    if (c > 0) {
        cartnumber.innerHTML = c;
        cartnumber.style.visibility = "visible";
    }
    else {
        cartnumber.innerHTML = c;
        cartnumber.style.visibility = "hidden";
    }

    localStorage.setItem("OrderDataNV", JSON.stringify(orderCart));
}

menu = document.getElementById("menuContainer");

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
    image.src = imageArray[index];
    image.height = 250;
    image.alt = "FoodImage";
    // image.width = 320;
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
    button.setAttribute('class', 'btn btn-warning addbutton');
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
    divCardBody.appendChild(plusicon);
    divCardBody.appendChild(trashicon);
    divCard.appendChild(image);
    divCard.appendChild(divCardBody);
    divCol.appendChild(divCard);
    divRow.appendChild(divCol);
}
let divRow;
function addMenu() {
    //localStorage.removeItem("OrderDataNV");
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
    let c;
    if (JSON.parse(localStorage.getItem("OrderData")) != null) {
        c = Object.keys(JSON.parse(localStorage.getItem("OrderData"))).length;
    }
    else {
        c = 0;
    }
    if (JSON.parse(localStorage.getItem("OrderDataNV")) != null) {
        c = c+Object.keys(JSON.parse(localStorage.getItem("OrderDataNV"))).length;
    }
    if (c > 0) {
        let cartnumber = document.getElementById("lblCartCount");
        cartnumber.innerHTML = c;
        cartnumber.style.visibility = "visible";
    }
    let nvData = JSON.parse(localStorage.getItem("OrderDataNV"));
    for(let keys in nvData)
    {
        let num = parseInt(keys.substring(8));
        console.log(num);
        document.getElementById(buttonArray[num-1]).disabled=true;
        document.getElementById(buttonArray[num-1]).innerHTML="Added : " + nvData[keys].order;
        document.getElementById(buttonArray[num-1]).classList.add('text-bold');
        document.getElementById(plusArray[num-1]).style.display = "inline-flex";
        document.getElementById(minusArray[num-1]).style.display = "inline-flex";
        document.getElementById(trashArray[num-1]).style.display = "inline-flex";
        document.getElementById(orderArray[num-1]).innerHTML = "Added : Rs."+nvData[keys].cost;
        document.getElementById(orderArray[num-1]).style.visibility="visible";
        orderCart[keys] = nvData[keys];
    }
}

let buttonPressed = false;

// $('a').click(function(){
//     buttonPressed = true;
// })

// if (performance.navigation.type == 1) {
//     buttonPressed=true;
// }
// else
// {
//     buttonPressed=false;
// }

window.onbeforeunload = function(){
    $('a').click(function(){
        buttonPressed = true;
    })
    
    if (performance.navigation.type == 1) {
        buttonPressed=true;
        console.log(1);
    }
    else
    {
        buttonPressed=false;
    }
}

window.onunload = function(){
    console.log(buttonPressed)
    if(!buttonPressed){
        //localStorage.removeItem("OrderDataNV");
    }
    else
    {
        buttonPressed=false;
    }
}

window.onload = function(){
    addMenu();
}