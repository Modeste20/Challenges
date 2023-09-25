//Select HTML elements

const inputs = document.querySelectorAll(".change form .field input[type='text']");
const selectCurrency = document.querySelector(".change form .field .currency-fields select");
const selectConvertedCurrency = document.querySelector(".change form .field .converted-currency-fields select");
const results = document.getElementById('results');

let currency = selectCurrency.value
let convertedCurrency = selectConvertedCurrency.value

const [inputCurrency, inputConvertedCurrency] = inputs;

//CURRENCY REFERENCE

const CURRENCY_REF = 'usd'

const returnNumber = (value) => {
    return value ? Number(value) : 0;
}



//update currency and convertedCurrency when select change

selectCurrency.addEventListener('change', (e) => {
    currency = e.currentTarget.value;
    convertCurrency(e)
})

selectConvertedCurrency.addEventListener('change', (e) => {
    convertedCurrency = e.currentTarget.value;
    convertCurrency(e)
})


// Input number only in input field and handle input event

inputs.forEach(c => {
    c.addEventListener('keypress', (evt) => {
        console.log('press');
        const ASCIICode = (evt.which) ? evt.which : evt.keyCode
        if (ASCIICode > 31 && (ASCIICode < 48 || ASCIICode > 57)) {
            evt.preventDefault()
            return false;
        }
        return true;
    })

    c.addEventListener('input', (event) => {
        convertCurrency(event);
    })
});

const switchElement = document.querySelector('.change form .switch');
const switchCurrency = (e) => {
    let currency_intermediate = currency;
    selectCurrency.value = convertedCurrency
    currency = convertedCurrency;
    selectConvertedCurrency.value = currency_intermediate;
    convertedCurrency = currency_intermediate
    convertCurrency(e)
}

switchElement.addEventListener('click', switchCurrency)

// Currency conversion function

results.innerHTML = `<div><span>${Math.floor(returnNumber(inputCurrency.value) * 1000)/1000}</span> ${currency.toUpperCase()} = <span>${Math.floor(returnNumber(inputConvertedCurrency.value) * 1000) / 1000 }</span> ${convertedCurrency.toUpperCase()}</div>`

const convertCurrency = (event) => {
    currency = selectCurrency.value
    convertedCurrency = selectConvertedCurrency.value

    const convertedCurrencyChange = isItConvertedCurrencyChange(event);

    // not conversion when currency === converted current (Ex : euro and euro)

    if (currency === convertedCurrency) {
        const value = inputCurrency.value || inputConvertedCurrency.value || 0;
        inputConvertedCurrency.value = returnNumber(value);
        inputCurrency.value = returnNumber(value);
    }

    if (currency !== convertedCurrency) {

        let taux = 0;

        if (currency === CURRENCY_REF) {
            taux = change.find(c => c.convertedCurrency === convertedCurrency).coef;
            if (convertedCurrencyChange) {
                inputCurrency.value = returnNumber(inputConvertedCurrency.value) * taux;
            } else {
                taux === 0 ? taux = 0 : taux = 1 / taux;
                inputConvertedCurrency.value = returnNumber(inputCurrency.value) * taux;
            }
        } else {
            if (convertedCurrency === CURRENCY_REF) {
                taux = change.find(c => c.convertedCurrency === currency).coef;
                if (convertedCurrencyChange) {
                    taux === 0 ? taux = 0 : taux = 1 / taux;
                    inputCurrency.value = returnNumber(inputConvertedCurrency.value) * taux;
                } else {
                    console.log('taux',taux)
                    inputConvertedCurrency.value = returnNumber(inputCurrency.value) * taux;
                }
            } else{
                if(convertedCurrencyChange){

                    //Récupération du coefficient permettant la conversion de convertedCurrency vers CURRENCY_REF
                    taux = change.find(c => c.convertedCurrency === convertedCurrency).coef;

                    //le calcul du taux final est le taux précédent
                    //divisé par le coefficient de convertedCurrency en CURRENT_REF
                    taux = taux / change.find(c => c.convertedCurrency === currency).coef;

                    //Le montant final
                    inputCurrency.value = taux * returnNumber(inputConvertedCurrency.value);

                } else{
                    //Récupération du coefficient permettant la conversion de curency vers CURRENCY_REF
                    taux = change.find(c => c.convertedCurrency === currency).coef;

                    //le calcul du taux final est le taux précédent divisé par le coefficient permettant la conversion
                    //de convertedCurrency en CURRENCY_REF
                    
                    taux =  taux / change.find(c => c.convertedCurrency === convertedCurrency).coef;

                    //Le montant final
                    inputConvertedCurrency.value = taux * returnNumber(inputCurrency.value);

                }


            
            }
        }

    }

    results.innerHTML = `<div><span>${Math.floor(returnNumber(inputCurrency.value) * 1000)/1000}</span> ${currency.toUpperCase()} = <span>${Math.floor(returnNumber(inputConvertedCurrency.value) * 1000) / 1000 }</span> ${convertedCurrency.toUpperCase()}</div>`
}

const isItConvertedCurrencyChange = (event) => {

    const { name, localName, id } = event.target;

    return event.type === 'input' && localName === 'input' && name === 'converted-currency' && name === 'converted-currency'

}

const change = [
    {
        convertedCurrency: 'eur',
        coef: 1.07
    },
    {
        convertedCurrency: 'cad',
        coef: 0.744553
    },
    {
        convertedCurrency: 'dzd',
        coef: 0.0073
    }
];

/*

    1da = 5 CURRENT_REF

    {
        convertedCurrency: 'da',
        coef: 5
    }

*/