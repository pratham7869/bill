
/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
var sysdate = new Date().toISOString().split('T')[0];
let btnAdd = document.querySelector('button');  
let table = document.getElementById('mytable'); 
let input2 = document.getElementById('itemtype');
let input3 = document.getElementById('hsn');
let input4 = document.getElementById('qty');
let input5 = document.getElementById('rate');

const inputitem = document.getElementById('itemtype');
const inputhsn = document.getElementById('hsn');
const inputqty = document.getElementById('qty');
const inputrate = document.getElementById('rate');
const inputcus = document.getElementById('cusname');
const inputadd = document.getElementById('address');
const inputstate = document.getElementById('state');
const inputmobno = document.getElementById('mobno');
const inputgst = document.getElementById('gst');
const button = document.getElementById('mybutton');
// for taking current date .....
const datecell = document.getElementById('datecell');
const currdate = new Date();
datecell.innerHTML= currdate.toLocaleDateString();
// for taking updated invoice number ...
let invnumber = localStorage.getItem('invoiceNumber');
if (!invnumber) {
    invnumber = 1;
}
document.getElementById('invoicenumber').innerText ="2425-00" + (parseInt(invnumber)+1);

//   ....
function callBothFunction() {
    btnClick();
    calculateTotal();
   
}
// ....
function calculateTotal() {
    var sumVal=0; 
    for (var i=1; i<table.rows.length; i++){
        sumVal = sumVal + parseFloat(table.rows[i].cells[5].innerHTML);
    }
    document.getElementById('total').innerText = sumVal;  
    const taxamount = (sumVal*3)/100;
    if(inputstate.value=="Madhya Pradesh"){
         document.getElementById('sgst').innerText =  taxamount/2;
         document.getElementById('cgst').innerText =  taxamount/2;
         document.getElementById('igst').innerText = 0.00;
         document.getElementById('grandtotal').innerText =  taxamount+sumVal;
         document.getElementById('gtotalinwords').innerText = "Total Invoice Value (in words) :" + numberToWords(taxamount+sumVal);
    }
    else{
        document.getElementById('igst').innerText = taxamount;
        document.getElementById('sgst').innerText =  0.00;
        document.getElementById('cgst').innerText =  0.00;
        document.getElementById('grandtotal').innerText =  taxamount+sumVal;
        document.getElementById('gtotalinwords').innerText = "Total Invoice Value (in words) :" + numberToWords(taxamount+sumVal);
    }
}
// adding items in bill 
function btnClick() {
    let scno = document.getElementById("mytable").rows.length;
    let itemtype = input2.value;
    let hsn = input3.value;
    let qty = input4.value;
    let rate = input5.value;
    let amount = rate * qty;
    let template = '<tr><th>'+scno+'</th> <th>'+itemtype+'</th> <th>'+hsn+'</th> <th>'+qty+'</th> <th>'+rate+'</th> <th>'+amount+'</th><td class="hide"><button onclick="deleteRow(this)" class="hide">Delete</button></td></tr>';
    table.innerHTML += template;
    document.getElementById('pname').innerHTML = inputcus.value;
    document.getElementById('paddress').innerHTML = inputadd.value;
    document.getElementById('pstate').innerHTML = inputstate.value;
    document.getElementById('pmobno').innerHTML = inputmobno.value;
    document.getElementById('pgst').innerHTML = inputgst.value;
}
// row deleting function .......
function deleteRow(btn) {
        var row = btn.parentNode.parentNode;
        row.parentNode.removeChild(row);
        updateSerialNumbers();
        calculateTotal();
        document.getElementById('pname').innerHTML = inputcus.value;
        document.getElementById('paddress').innerHTML = inputadd.value;
        document.getElementById('pstate').innerHTML = inputstate.value;
        document.getElementById('pmobno').innerHTML = inputmobno.value;
        document.getElementById('pgst').innerHTML = inputgst.value;
        
}
//   ...
button.addEventListener('click', function() {
  if (inputcus.checkValidity() && inputitem.checkValidity() && inputhsn.checkValidity() && inputqty.checkValidity() && inputrate.checkValidity() && inputadd.checkValidity() && inputstate.checkValidity() && inputmobno.checkValidity() && inputgst.checkValidity()) {
    callBothFunction();
    return;
  }
  alert('Please do all entries');
    return;
  // Input is valid, proceed with submission
});
//  .....
function printFun() {
    let template =  "<tr height='150px'> <th></th> <th ></th><th></th> <th ></th><th></th> <th ></th>  </tr> ";
    let table = document.getElementById('mytable');
    table.innerHTML += template;
    generateInvoice();
    window.print();
}
// ...
function generateInvoice() {
    let invoiceNumber = localStorage.getItem('invoiceNumber');
    if (!invoiceNumber) {
        invoiceNumber = 1;
    } else {
        invoiceNumber = parseInt(invoiceNumber) + 1;
    }
    document.getElementById('invoicenumber').innerText ="2425-00" + invoiceNumber;
    localStorage.setItem('invoiceNumber', invoiceNumber);
    
    // You can use the invoice number here to do whatever you need
    alert("NEW BILL NUMBER IS 2425-00" + invoiceNumber);
}
// to update serial number ....
function updateSerialNumbers() {
    var table = document.getElementById('mytable'); 
    var rows = table.rows;
    for (var i = 1; i < rows.length; i++) {
        rows[i].cells[0].innerText = i; // Update serial number
    }
}

//  
function numberToWords(number) {
    if (number === 0) {
        return "zero";
    }
    const units = [
        "zero", "one", "two", "three", "four", "five", "six", "seven", "eight", "nine"
    ];

    const teens = [
        "ten", "eleven", "twelve", "thirteen", "fourteen", "fifteen", "sixteen",
        "seventeen", "eighteen", "nineteen"
    ];

    const tens = [
        "", "", "twenty", "thirty", "forty", "fifty", "sixty", "seventy", "eighty", "ninety"
    ];

    const thousands = [
        "", "thousand", "million", "billion", "trillion", "quadrillion"
    ];

    function convertHundreds(num) {
        let result = "";
        if (num >= 100) {
            result += units[Math.floor(num / 100)] + " hundred ";
            num %= 100;
        }
        if (num >= 10 && num < 20) {
            result += teens[num - 10] + " ";
        } else {
            if (num >= 20) {
                result += tens[Math.floor(num / 10)] + " ";
                num %= 10;
            }
            if (num > 0) {
                result += units[num] + " ";
            }
        }
        return result.trim();
    }

    function convertToWords(num) {
        let result = "";
        let i = 0;

        while (num > 0) {
            const part = num % 1000;
            if (part > 0) {
                result = convertHundreds(part) + " " + thousands[i] + " " + result;
            }
            num = Math.floor(num / 1000);
            i++;
        }

        return result.trim();
    }

    // Handling integer and decimal parts separately
    const integerPart = Math.floor(number);
    const decimalPart = (number % 1).toFixed(2).slice(2); // Extracting two decimal places

    // Convert the integer part to words
    let integerPartWords = convertToWords(integerPart);
    
    if (decimalPart === "00") {
        return integerPartWords;
    } else {
        // Convert the decimal part to words
        let decimalPartWords = "";
        for (let i = 0; i < decimalPart.length; i++) {
            const digit = parseInt(decimalPart[i], 10);
            decimalPartWords += units[digit] + " ";
        }
        return integerPartWords + " point " + decimalPartWords.trim();
    }
}

// Example usage
// const number = 1234.56;
// console.log(numberToWords(number)); // Outputs: "one thousand two hundred thirty-four point five six"

  




