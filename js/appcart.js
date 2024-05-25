let obj = JSON.parse(localStorage.getItem("OrderData"));
let objN = JSON.parse(localStorage.getItem("OrderDataNV"));
const orderList = document.getElementById("orderList");
const total = document.getElementById("total");
const noitem = document.getElementById("noitem");
const totalquantity = document.getElementById("totalquantity");
const cartnumber = document.getElementById("lblCartCount");

let inPageChange = false;

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

document.getElementById("printButton").onclick = function () {
    printElement(document.getElementById("printThis"));
};

function printElement(elem) {
    var domClone = elem.cloneNode(true);

    var printSection = document.getElementById("printSection");

    if (!printSection) {
        var printSection = document.createElement("div");
        printSection.id = "printSection";
        document.body.appendChild(printSection);
    }
    //total.style.display="none";
    printSection.innerHTML = "";
    printSection.appendChild(domClone);
    window.print();
    //total.style.display="block";
}
//var divList;

function increaseOrder(orderid, type) {
    inPageChange = true;
    let num = parseInt(document.getElementById(type + "order" + orderid).innerHTML);
    let cost = parseInt(document.getElementById(type + "cost" + orderid).innerHTML);
    let totstr = total.innerHTML;
    totstr = parseInt(totstr.substring(11));
    totstr = totstr - cost;
    cost = cost / num;
    num = num + 1;
    document.getElementById(type + "order" + orderid).innerHTML = num;
    cost = cost * num;
    totstr = totstr + cost;
    total.innerHTML = (total.innerHTML).substring(0, 11) + totstr;
    totstr = totalquantity.innerHTML;
    totstr = parseInt(totstr.substring(8));
    totstr = totstr +1;
    totalquantity.innerHTML = (totalquantity.innerHTML).substring(0, 8) + totstr;
    if (totstr == 0) {
        totalquantity.style.visibility = "hidden";
        total.style.visibility = "hidden";
        noitem.style.display = "block";
    }
    else {
        totalquantity.style.visibility = "visible";
        total.style.visibility = "visible";
        noitem.style.display = "none";
    }
    document.getElementById(type + "cost" + orderid).innerHTML = cost;
    if (type == "one") {
        obj[type + "order" + orderid].cost = cost;
        obj[type + "order" + orderid].order = num;
        localStorage.setItem("OrderData", JSON.stringify(obj));
    }
    else {
        objN[type + "order" + orderid].cost = cost;
        objN[type + "order" + orderid].order = num;
        localStorage.setItem("OrderDataNV", JSON.stringify(objN));
    }
    let c=0;
    if((JSON.parse(localStorage.getItem("OrderDataNV"))) != null)
    {
        c = c+ Object.keys(JSON.parse(localStorage.getItem("OrderDataNV"))).length;
    }
    if((JSON.parse(localStorage.getItem("OrderData"))) != null)
    {
        c = c+ Object.keys(JSON.parse(localStorage.getItem("OrderData"))).length;
    }
    cartnumber.innerHTML = c;
    if(c>0)
    {
        cartnumber.style.visibility = "visible";
    }
    else
    {
        cartnumber.style.visibility = "hidden";
    }
}

function decreaseOrder(orderid, type) {
    inPageChange = true;
    let num = parseInt(document.getElementById(type + "order" + orderid).innerHTML);
    let cost = parseInt(document.getElementById(type + "cost" + orderid).innerHTML);
    let totstr = total.innerHTML;
    totstr = parseInt(totstr.substring(11));
    totstr = totstr - cost;
    
    if (num > 1) {
        cost = cost / num;
        num = num - 1;
        document.getElementById(type + "order" + orderid).innerHTML = num;
        cost = cost * num;
        document.getElementById(type + "cost" + orderid).innerHTML = cost;
        if (type == "one") {
            obj[type + "order" + orderid].cost = cost;
            obj[type + "order" + orderid].order = num;
            localStorage.setItem("OrderData", JSON.stringify(obj));
        }
        else {
            objN[type + "order" + orderid].cost = cost;
            objN[type + "order" + orderid].order = num;
            localStorage.setItem("OrderDataNV", JSON.stringify(objN));
        }
    }
    else {
        // minusicon.removeAttribute('data-toggle');
        // minusicon.removeAttribute('data-placement');
        // minusicon.removeAttribute('title');
        cost = 0;
        let o = type + "order" + orderid;
        if (type == "one") {
            delete obj[type + "order" + orderid];
            localStorage.setItem("OrderData", JSON.stringify(obj));
        }
        else {
            delete objN[o];
            localStorage.setItem("OrderDataNV", JSON.stringify(objN));
        }
        $('#' + type + 'minus' + orderid).tooltip('hide');
        $('#' + type + 'orderCard' + orderid).remove();
    }
    totstr = totstr + cost;
    total.innerHTML = (total.innerHTML).substring(0, 11) + totstr;
    totstr = totalquantity.innerHTML;
    totstr = parseInt(totstr.substring(8));
    totstr = totstr -1;
    totalquantity.innerHTML = (totalquantity.innerHTML).substring(0, 8) + totstr;
    if (totstr == 0) {
        totalquantity.style.visibility = "hidden"
        total.style.visibility = "hidden";
        noitem.style.display = "block";
    }
    else {
        totalquantity.style.visibility = "visible";
        total.style.visibility = "visible";
        noitem.style.display = "none";
    }
    let c=0;
    if((JSON.parse(localStorage.getItem("OrderDataNV"))) != null)
    {
        c = c+ Object.keys(JSON.parse(localStorage.getItem("OrderDataNV"))).length;
    }
    if((JSON.parse(localStorage.getItem("OrderData"))) != null)
    {
        c = c+ Object.keys(JSON.parse(localStorage.getItem("OrderData"))).length;
    }
    cartnumber.innerHTML = c;
    if(c>0)
    {
        cartnumber.style.visibility = "visible";
    }
    else
    {
        cartnumber.style.visibility = "hidden";
    }
}

function removeAll(orderid, type) {
    inPageChange = true;
    let o = type + "order" + orderid;
    let num = parseInt(document.getElementById(type + "order" + orderid).innerHTML);
    let cost = parseInt(document.getElementById(type + "cost" + orderid).innerHTML);
    let totstr = total.innerHTML;
    totstr = parseInt(totstr.substring(11));
    totstr = totstr - cost;
    total.innerHTML = (total.innerHTML).substring(0, 11) + totstr;
    totstr = totalquantity.innerHTML;
    totstr = parseInt(totstr.substring(8));
    totstr = totstr -num;
    totalquantity.innerHTML = (totalquantity.innerHTML).substring(0, 8) + totstr;
    if (totstr == 0) {
        totalquantity.style.visibility = "hidden";
        total.style.visibility = "hidden";
        noitem.style.display = "block";
    }
    else {
        totalquantity.style.visibility = "visible";
        total.style.visibility = "visible";
        noitem.style.display = "none";
    }
    if (type == "one") {
        for (let keys in obj) {
            console.log(keys);
            console.log(o);
            if (o == keys) {
                console.log(true);
                delete obj[keys];
            }
        }
        localStorage.setItem("OrderData", JSON.stringify(obj));
    }
    else {
        delete objN[type + "order" + orderid];
        localStorage.setItem("OrderDataNV", JSON.stringify(objN));
    }
    $('#' + type + 'trash' + orderid).tooltip('hide');
    $('#' + type + 'orderCard' + orderid).remove();
    let c=0;
    if((JSON.parse(localStorage.getItem("OrderDataNV"))) != null)
    {
        c = c+ Object.keys(JSON.parse(localStorage.getItem("OrderDataNV"))).length;
    }
    if((JSON.parse(localStorage.getItem("OrderData"))) != null)
    {
        c = c+ Object.keys(JSON.parse(localStorage.getItem("OrderData"))).length;
    }
    cartnumber.innerHTML = c;
    if(c>0)
    {
        cartnumber.style.visibility = "visible";
    }
    else
    {
        cartnumber.style.visibility = "hidden";
    }
}

function addItemDesc(orderid, food, cost, order, img, type) {
    inPageChange = true;
    let divCard = document.createElement('div');
    // if (type == "one") {
    //     divCard.setAttribute('class', 'card orders bg-light border-success text-success');
    // }
    // else {
    //     divCard.setAttribute('class', 'card orders bg-light border-danger text-danger');
    // }
    divCard.setAttribute('class', 'card orders bg-light');
    //divCard.setAttribute('id','orderCard');
    divCard.setAttribute('id', type + 'orderCard' + orderid);
    let divRow = document.createElement('div');
    divRow.setAttribute('class', 'row');
    let divColImg = document.createElement('div');
    divColImg.setAttribute('class', 'col-md-2 col-sm-2 central');
    let divColName = document.createElement('div');
    divColName.setAttribute('class', 'col-md-3 col-sm-2 central');
    let divColType = document.createElement('div');
    divColType.setAttribute('class', 'col-md-2 col-sm-2 central');
    let divColOrder = document.createElement('div');
    divColOrder.setAttribute('class', 'col-md-3 col-sm-4 central');
    let divColCost = document.createElement('div');
    divColCost.setAttribute('class', 'col-md-2 col-sm-2 central');
    let image = document.createElement('img');
    image.src = img;
    image.alt = "FoodImage";
    image.setAttribute('class', 'img fimg');
    let divRowInner = document.createElement('div');
    divRowInner.setAttribute('class', 'row innerrow');
    let minusicon = document.createElement('i');
    minusicon.setAttribute('class', 'fa-solid fa-circle-minus minus');
    minusicon.setAttribute('id', type + 'minus' + orderid);
    minusicon.setAttribute('data-toggle', 'tooltip');
    minusicon.setAttribute('data-placement', 'bottom');
    minusicon.setAttribute('title', 'Remove');
    minusicon.style.display = "inline-flex";
    minusicon.onclick = function () {
        //decreaseOrder(buttonArray[index], plusArray[index], minusArray[index], orderArray[index], trashArray[index],index);
        decreaseOrder(orderid, type)
    }
    let plusicon = document.createElement('i');
    plusicon.setAttribute('class', 'fa-solid fa-circle-plus plus');
    plusicon.setAttribute('id', type + 'plus' + orderid);
    plusicon.setAttribute('data-toggle', 'tooltip');
    plusicon.setAttribute('data-placement', 'bottom');
    plusicon.setAttribute('title', 'Add');
    plusicon.style.display = "inline-flex";
    plusicon.onclick = function () {
        increaseOrder(orderid, type);
    }
    let trashicon = document.createElement('i');
    trashicon.setAttribute('class', 'fa-solid fa-trash-can trash');
    trashicon.setAttribute('id', type + 'trash' + orderid);
    trashicon.setAttribute('data-toggle', 'tooltip');
    trashicon.setAttribute('data-placement', 'bottom');
    trashicon.setAttribute('title', 'Delete');
    trashicon.style.display = "inline-flex";
    trashicon.onclick = function () {
        //removeAll(buttonArray[index], plusArray[index], minusArray[index], orderArray[index], trashArray[index],index);
        removeAll(orderid, type);
    }
    //let obj = JSON.parse(localStorage.getItem('OrderData'));
    let pFood = document.createElement('p');
    let spanOrder = document.createElement('span');
    spanOrder.setAttribute('class', 'order-number');
    spanOrder.setAttribute('id', type + 'order' + orderid);
    let pCost = document.createElement('p');
    pCost.setAttribute('id', type + 'cost' + orderid);
    let pType = document.createElement('p');
    pType.setAttribute('id', type + 'foodtype' + orderid);
    pType.setAttribute('class','badge foodtype')
    // for(const foodtype in obj)
    // {
    //     pFood.innerHTML = foodtype["food"];
    //     pCost.innerHTML = foodtype["cost"];
    //     pOrder.innerHTML = foodtype["order"];
    // }
    pFood.innerHTML = food;
    pCost.innerHTML = cost;
    spanOrder.innerHTML = order;
    if (type == "one") {
        pType.innerHTML = "Veg";
        pType.classList.add('badge-success');
    }
    else {
        pType.innerHTML = "NonVeg";
        pType.classList.add('badge-danger');
    }
    divColImg.appendChild(image);
    divColName.appendChild(pFood);
    divColType.appendChild(pType);
    divRowInner.appendChild(minusicon);
    divRowInner.appendChild(spanOrder);
    divRowInner.appendChild(plusicon);
    divRowInner.appendChild(trashicon);
    // divColOrder.appendChild(minusicon);
    // divColOrder.appendChild(spanOrder);
    // divColOrder.appendChild(plusicon);
    // divColOrder.appendChild(trashicon);
    divColOrder.appendChild(divRowInner);
    divColCost.appendChild(pCost);
    divRow.appendChild(divColImg);
    divRow.appendChild(divColName);
    divRow.appendChild(divColType);
    divRow.appendChild(divColOrder);
    divRow.appendChild(divColCost);
    divCard.appendChild(divRow);
    divWrap = document.getElementById("wrapper");
    //let divWrap = document.createElement('div');
    //divWrap.setAttribute('id','wrapper');
    divWrap.appendChild(divCard);
    orderList.appendChild(divWrap);
}

function updateOrders() {
    let food = "food";
    let cost = "cost";
    let order = "order";
    //let img = "images";
    let t = 0;
    let cn=0;
    for (const keys in obj) {
        let ordernum = keys.substring(8);
        //console.log(ordernum);
        console.log(obj[keys].img);
        addItemDesc(ordernum, obj[keys].food, obj[keys].cost, obj[keys].order, obj[keys].images, "one");
        t = t + obj[keys].cost;
        cn = cn + obj[keys].order;
    }
    for (const keys in objN) {
        let ordernum = keys.substring(8);
        //console.log(ordernum);
        console.log(objN[keys].img);
        addItemDesc(ordernum, objN[keys].food, objN[keys].cost, objN[keys].order, objN[keys].images, "two");
        t = t + objN[keys].cost;
        cn = cn + objN[keys].order;
    }
    let totstr = total.innerHTML;
    totstr = totstr.substring(0, 11);
    totstr = totstr + t;
    total.innerHTML = totstr;
    totstr = totalquantity.innerHTML;
    totstr = totstr.substring(0, 8);
    totstr = totstr + cn;
    totalquantity.innerHTML = totstr;
    if (t == 0) {
        totalquantity.style.visibility = "hidden";
        total.style.visibility = "hidden";
        noitem.style.display = "block";
    }
    else {
        totalquantity.style.visibility = "visible";
        total.style.visibility = "visible";
        noitem.style.display = "none";
    }
    let c=0;
    if((JSON.parse(localStorage.getItem("OrderDataNV"))) != null)
    {
        c = c+ Object.keys(JSON.parse(localStorage.getItem("OrderDataNV"))).length;
    }
    if((JSON.parse(localStorage.getItem("OrderData"))) != null)
    {
        c = c+ Object.keys(JSON.parse(localStorage.getItem("OrderData"))).length;
    }
    cartnumber.innerHTML = c;
    if(c>0)
    {
        cartnumber.style.visibility = "visible";
    }
    else
    {
        cartnumber.style.visibility = "hidden";
    }
}

window.onload = function () {
    updateOrders();
}

function submitOrder() {
    if ((localStorage.length <= 0) || (((localStorage.getItem("OrderDataNV") == null) || (localStorage.getItem("OrderDataNV").length <= 2)) && ((localStorage.getItem("OrderData") == null) || (localStorage.getItem("OrderData").length <= 2) ))) {
        //alert("Order Something first");
        //$("#myalert").alert();
        //if(Object.keys(localStorage).length == 0){
            document.getElementById("noButton").innerHTML = "Close";
        document.getElementById("noButton").classList.add('btn-seconadry');
        document.getElementById("noButton").classList.remove('btn-danger');
        document.getElementById("payButton").style.display = "none";
        document.getElementById("modTitle").innerHTML = "Oops!";
        document.getElementById("modBody").innerHTML = "You need to Order Something First";
        $("#myModal").modal('show');
    }
    else {
        document.getElementById("noButton").innerHTML = "No";
        document.getElementById("noButton").classList.remove('btn-seconadry');
        document.getElementById("noButton").classList.add('btn-danger');
        document.getElementById("modTitle").innerHTML = "Confirmation";
        document.getElementById("payButton").style.visibility = "visibile";
        // let text = "";
        // for (const keys in obj) {
        //     text = text + obj[keys].food + " x " + obj[keys].order + " of  Rs." + obj[keys].cost + "<br>";
        // }
        // for (const keys in objN) {
        //     text = text + objN[keys].food + " x " + objN[keys].order + " of  Rs." + objN[keys].cost + "<br>";
        // }
        // text = text + total.innerHTML;
        // document.getElementById("modBody").innerHTML = text;
        invoiceDetails();
        $("#myModal").modal('show');
        $("#payButton").click(function(){
            //$("#myModal").removeClass('modal').modal('hide');
            $("#myModal").modal('hide');
            $("#myModal2").modal('show');
            //$("#myModal2").css('overflow-y','auto');
            // $('body').on('hidden.bs.modal', function () {
            //     if($('.modal.show').length > 0)
            //     {
            //         $('body').addClass('modal-open');
            //     }
            // })
        })
    }
}

//let comapnyaddress = "71B R.K. Chatterjee Lane Kasba Bakultala Kolkata-700041";
let custaddress = "71B R.K. Chatterjee Road Kasba Bakultala Kolkata-700041";
let custname = "John Doe";
let custemail = "johndoe@gmail.com"
let monthnames = ["Januray","February","March","April","May","June","July","August","September","October","November","December"];

function invoiceDetails(){
    $("#custcontacts").empty();
    $("#invoicedetails").empty();
    $("#ordertable").empty();
    let dateobj = new Date();
    let date = dateobj.getDate();
    let month = monthnames[dateobj.getMonth()];
    let year = dateobj.getFullYear();
    let hours = dateobj.getHours();
    let min = dateobj.getMinutes();
    let sec = dateobj.getSeconds();
    if(hours<10)
    {
        hours = "0"+hours;
    }
    if(min<10)
    {
        min = "0"+min;
    }
    if(sec<10)
    {
        sec = "0"+sec;
    }
    let time = hours + ":" + min + ":" + sec;
    let hcustName = document.createElement('h3');
    //hcustName.setAttribute('class')
    hcustName.innerHTML = custname;
    let pAddress = document.createElement('p');
    pAddress.innerHTML = custaddress;
    let pEmail = document.createElement('p');
    pEmail.innerHTML = custemail;
    let custcontacts = document.getElementById("custcontacts");
    custcontacts.appendChild(hcustName);
    custcontacts.appendChild(pAddress);
    custcontacts.appendChild(pEmail);
    let invno = "#"+parseInt(Math.round(Math.random()*1000));
    let hinvno = document.createElement('h3');
    let pdate = document.createElement('p');
    let ptime = document.createElement('p');
    hinvno.innerHTML = invno;
    pdate.innerHTML = "Order date : " + date + " " + month + " " + year;
    ptime.innerHTML = "Order time : " + time;
    let invoicedetails = document.getElementById("invoicedetails");
    invoicedetails.appendChild(hinvno);
    invoicedetails.appendChild(pdate);
    invoicedetails.appendChild(ptime);
    let obj1 = JSON.parse(localStorage.getItem("OrderData"));
    let obj2 = JSON.parse(localStorage.getItem("OrderDataNV"));
    let index=1;
    let ordertable = document.getElementById("ordertable");
    let totcost=0;
    let totqn=0;
    for(const keys in obj1){
        let tablerow = document.createElement('tr');
        let th = document.createElement('th');
        th.innerHTML=index;
        index++;
        tablerow.appendChild(th);
        let td = document.createElement('td');
        td.innerHTML = obj1[keys].food;
        tablerow.appendChild(td);
        td = document.createElement('td');
        td.innerHTML = obj1[keys].order;
        tablerow.appendChild(td);
        td = document.createElement('td');
        td.innerHTML = obj1[keys].cost;
        tablerow.appendChild(td);
        ordertable.appendChild(tablerow);
        totcost = totcost + obj1[keys].cost;
        totqn = totqn + obj1[keys].order;
    }
    for(const keys in obj2){
        let tablerow = document.createElement('tr');
        let th = document.createElement('th');
        th.innerHTML=index;
        index++;
        tablerow.appendChild(th);
        let td = document.createElement('td');
        td.innerHTML = obj2[keys].food;
        tablerow.appendChild(td);
        td = document.createElement('td');
        td.innerHTML = obj2[keys].order;
        tablerow.appendChild(td);
        td = document.createElement('td');
        td.innerHTML = obj2[keys].cost;
        tablerow.appendChild(td);
        ordertable.appendChild(tablerow);
        totcost = totcost + obj2[keys].cost;
        totqn = totqn + obj2[keys].order;
    }
    let totalq = document.getElementById("totalq");
    let totalc = document.getElementById("totalc");
    totalq.innerHTML = totqn;
    totalc.innerHTML = totcost;
}

window.addEventListener('storage', () => {
    // let orderCard = document.getElementById("orderCard");
    // orderList.parentNode.removeChild(orderCard);
    // body.parentNode.removeChild('orderList');
    // divList = document.createElement('div');
    // divList.setAttribute('class','container-fluid orderList');
    // divList.setAttribute('id','orderList');
    // orderList = document.getElementById("orderList");
    //let divList = document.getElementsByClassName('card');
    //let divList = document.getElementById('orders');
    // divList.forEach(element => {
    //     element.remove();
    // });
    // for(c in divList)
    // {
    //     c.remove();
    // }
    //$('#orders').remove();
    //orderList.parentElement.removeChild(divList);
    //$("#wrapper").empty();
    //updateOrders();
})

