


const form = document.forms['form-rating'];
const radios = form['rating']
console.log(radios)
for(const radio of radios){
    console.log(radio.addEventListener('change',(e) => {
        console.log(e.target)
        const label_active = document.querySelector('.form-rating .form-content ul li label.active')
        if(label_active){
            label_active.classList.remove('active')
        }
        e.target.parentNode.classList.toggle('active')
    }))
}
form.addEventListener('submit',(e) => {

    e.preventDefault()
    const radio_active = document.querySelector(".form-rating .form-content input[type='radio']:checked")
    if(radio_active){
        document.querySelector('.form-rating').classList.add('none');
        document.querySelector('.state-submit').classList.add('block');
        const resultSpan = document.querySelector('.state-submit .result span');
        resultSpan.textContent = radio_active.previousElementSibling.textContent
    }
})