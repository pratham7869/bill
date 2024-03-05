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
    var table= document.getElementById("mytable"), sumVal=0;
    for (var i=2; i<table.rows.length; i++){
        sumVal = sumVal + parseFloat(table.rows[i].cells[5].innerHTML);
    }
    // Display the total in an element with the id "total"
    document.getElementById('total').innerText = sumVal;
}

function btnClick() {
let scno = document.getElementById("mytable").rows.length;
let itemtype = input2.value;
let box = input3.value;
let qty = input4.value;
let rate = input5.value;
let amount = rate * qty;

let template = '<tr><td>'+scno+'</td> <td>'+itemtype+'</td> <td>'+box+'</td> <td>'+qty+'</td> <td>'+rate+'</td> <td>'+amount+'</td></tr>';

table.innerHTML += template;
}