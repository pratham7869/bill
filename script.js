var sysdate = new Date().toISOString().split('T')[0];
let btnAdd = document.querySelector('button');  
let table = document.getElementById('mytable'); 


let input2 = document.getElementById('itemtype');
let input3 = document.getElementById('box');
let input4 = document.getElementById('qty');
let input5 = document.getElementById('rate');
function callBothFunction() {
    btnClick();
    calculateTotal();
}

function calculateTotal() {
    var table= document.getElementById("mytable");
    var sumVal=0; 
    var sumbox=0;
    var sumqty=0; 

    for (var i=1; i<table.rows.length; i++){
        sumVal = sumVal + parseFloat(table.rows[i].cells[5].innerHTML);
    }
    
    for (var i=1; i<table.rows.length; i++){
        sumbox = sumbox + parseFloat(table.rows[i].cells[2].innerHTML);
    }
   
    for (var i=1; i<table.rows.length; i++){
        sumqty = sumqty + parseFloat(table.rows[i].cells[3].innerHTML);
    }
    
    document.getElementById('tbox').innerText ="" + sumbox + " box";
    document.getElementById('tqty').innerText ="" + sumqty + " pcs";
   // Display the total in an element with the id "total"
    document.getElementById('total').innerText = sumVal;  
}
function sumPrint() {
    var table= document.getElementById("mytable");
    var sumVal=0; 
    var sumbox = 0;
    var sumqty = 0;


    document.getElementById('thp').style.display="block";
    document.getElementById('thp').style.height="27px";
    document.getElementById('thp').innerText = document.getElementById('cus').value;
    document.getElementById('thp').style.color= "indigo";

  //<p id="cusp" ></p>

    for (var i=1; i<table.rows.length; i++){
        sumVal = sumVal + parseFloat(table.rows[i].cells[5].innerHTML);
    }
    for (var i=1; i<table.rows.length; i++){
        sumbox = sumbox + parseFloat(table.rows[i].cells[2].innerHTML);
    }
    for (var i=1; i<table.rows.length; i++){
        sumqty = sumqty + parseFloat(table.rows[i].cells[3].innerHTML);
    }

    let template = '<tr><th> </th> <th> </th> <th>'+sumbox+'  बाक्स </th> <th>'+sumqty+' नग</th> <th>कुल</th> <th>'+sumVal+'</th></tr>';
    table.innerHTML += template;
    
    var disc= document.getElementById("discount").value;
    var discper = sumVal * disc / 100; 
    template = '<tr><th colspan=\'4\'>discount</th><th>-'+disc+' %</th><th> -'+discper+' </th></tr>';
    table.innerHTML += template;
    
    var afdisc = parseFloat(sumVal - discper) ;
    template = '<tr><th colspan=\'5\' style=\"text-align: right;\"></th><th> '+afdisc +' </th></tr>';
    table.innerHTML += template;

    var bhada=  parseFloat(document.getElementById("bhada").value);
    template = '<tr><th colspan=\'5\' style=\"text-align: right;\">packaging</th><th>'+bhada+'</th></tr>';
    table.innerHTML += template;
    
    var gst=  parseFloat(document.getElementById("gst").value);
    template = '<tr><th colspan=\'5\' style=\"text-align: right;\">GST</th><th>'+gst+'</th></tr>';
    table.innerHTML += template;


    sumVal = afdisc + gst + bhada ;

    template = '<tr><th colspan=\'5\' style=\"text-align: right;\">कुल योग</th><th style=\"color: indigo\">'+sumVal+'</th></tr>';
    table.innerHTML += template;

    template = '<tr><th colspan=\'6\'>Thanks, Please visit again </th></tr>';
    table.innerHTML += template;
}

function printFun() {
    sumPrint();
    window.print();
    
}

function btnClick() {

let scno = document.getElementById("mytable").rows.length;
let itemtype = input2.value;
let box = input3.value;
let qty = input4.value;
let rate = input5.value;
let amount = rate * qty;
let template = '<tr><th>'+scno+'</th> <th>'+itemtype+'</th> <th>'+box+'</th> <th>'+qty+'</th> <th>'+rate+'</th> <th>'+amount+'</th><td class="hide"><button onclick="deleteRow(this)" class="hide">Delete</button></td></tr>';

table.innerHTML += template;
}

function deleteRow(btn) {
    var row = btn.parentNode.parentNode;
    row.parentNode.removeChild(row);
}
