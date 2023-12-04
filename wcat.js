#!/usr/bin/env node
let fs = require("fs");
//input
let inputArr = process.argv.slice(2);
// console.log(inputArr);
// segregate -> --> option
// segregate -> --> file
let optionsArr = [];
let filesArr = [];
// identify options
for (let i = 0; i < inputArr.length; i++) {
    let firstChar = inputArr[i].charAt(0);
    if (firstChar == "-") {
        optionsArr.push(inputArr[i]);
    } else {
        filesArr.push(inputArr[i]);
    }
}

// options check is both n and b present

let isBothPresent = optionsArr.includes("-n") && optionsArr.includes("-b");
if (isBothPresent) {
    console.log("either enter -n or -b");
    return;
}
// existance of file path
for (let i = 0; i < filesArr.length; i++) {
    let isPresent = fs.existsSync(filesArr[i]);
    if (isPresent == false) {
        console.log(`file ${filesArr[i]} is not present`);
        return;
    }
}

//read
let content = "";
for (let i = 0; i < filesArr.length; i++) {
    content = content + fs.readFileSync(filesArr[i]) + "\r\n";
}

// console.log(content.split("\r\n"));
let contentArr = content.split("\r\n");
// console.log(optionsArr);
// console.log(contentArr);

// -s check
let isSPresent = optionsArr.includes("-s");
if (isSPresent) {
    for (let i = 0; i < contentArr.length; i++) {
        if (contentArr[i] == "" && contentArr[i - 1] == "") {
            contentArr[i] = null;
        }else if(contentArr[i] == "" && contentArr[i - 1] == null){
            contentArr[i] = null;
        }
    }
    let tempArr = [];
    for(let i = 0; i < contentArr.length; i++){
        if (contentArr[i] != null) {
            tempArr.push(contentArr[i]);
        }
    }
    contentArr = tempArr;
}

// console.log(contentArr.join("\n"));
//-n check
let isNPresent = optionsArr.includes("-n");
if (isNPresent) {
    for(let i = 0;i < contentArr.length; i++){
        contentArr[i] = (i + 1) + " " + contentArr[i];
    }
}
// console.log(contentArr);
// console.log(contentArr.join("\n"));
// -b check

let isBPresent = optionsArr.includes("-b");
if (isBPresent) {
    let count = 1;
    for(let i = 0; i < contentArr.length; i++){
        if (contentArr[i] != "") {
            contentArr[i] = count + " " + contentArr[i];
            count++;
        }
    }
}
// console.log(contentArr);

console.log(contentArr.join("\n"));

