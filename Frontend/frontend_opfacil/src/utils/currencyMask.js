function reverseString(str) {
    var splitString = str.split("");
    var reverseArray = splitString.reverse();
    var joinArray = reverseArray.join("");

    //Step 4. Return the reversed string
    return joinArray; // "olleh"
}

export const MaskCurrency = (value) => {
    console.log(value);
    if(value.length === 0)
        return 'R$ 0,00'
    if(value.length === 1)
        return 'R$ 0,0' + value;
    if(value.length === 2)
        return 'R$ 0,' + value; 
    
    let retorno = ""
    let reverseValue = reverseString(value)
    let cont = 0
    for (let i of reverseValue.replace(/\D/g, "")) {
        if (cont === 2 && retorno.length === 2 && i !== "") {
            retorno += "," + i
            cont = 0
        } else if (cont === 3) {
            retorno += "." + i
            cont = 0
        } else {
            retorno += i
        }
        cont++
    }

    return retorno;
}