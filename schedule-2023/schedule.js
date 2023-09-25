const date = new Date();

const year = date.getFullYear();
const currentMonth = date.getMonth();
const day = date.getDate();
const YearMonths = Array.from({length:12}, (_,x) => x);

const IsItBisextileYear = (year) => {
    return Boolean(year % 4 === 0 && year % 100 !== 0)
}


console.log(IsItBisextileYear(year))

const months = [
    {
        month:'January',
        nbre_days:31,
        emptyCase:6
    },
    {
        month:'February',
        nbre_days:IsItBisextileYear(year) ? 29 : 28,
        emptyCase:2
    },{
        month:'March',
        nbre_days:31,
        emptyCase:2
    },{
        month:'April',
        nbre_days:30,
        emptyCase:5
    },{
        month:'May',
        nbre_days:31,
        emptyCase:0

    },{
        month:'June',
        nbre_days:30,
        emptyCase:3

    },{
        month:'July',
        nbre_days:31,
        emptyCase:5

    },{
        month:'August',
        nbre_days:31,
        emptyCase:1

    },{
        month:'september',
        nbre_days:30,
        emptyCase:4

    },{
        month:'October',
        nbre_days:31,
        emptyCase:6

    },{
        month:'November',
        nbre_days:30,
        emptyCase:2

    },{
        month:'December',
        nbre_days:31,
        emptyCase:4

    },
]



//select calendrier container

const calendrierContainer = document.getElementById('calendrier-container')

//Days of week

const DaysWeek = ['Mo','Tu','We','Th','Fr','Sa','Su'];

//create container children and insert in container

YearMonths.forEach(index => {

    //month
    
    const {month,nbre_days,emptyCase} = months[index];
    
    const calendrier = document.createElement('div');

    console.log(Array.from({length:emptyCase},(_,x) => ' '))

    const calendrierChildElement = `
        <div class='calendrier'>
        <h3>${month}</h3>
        <div class='days'>
            
            ${
                DaysWeek.map(day => `<div class="day name">${day}</div>`).join('')
            }
            ${
                Array.from({length:emptyCase},(_,x) => x).map(day => `<div class="day empty"></div>`).join('')
            }
            ${
                Array.from({length:nbre_days},(_,x) => x).map(x => `<div class="day ${(currentMonth === index && day -1 === x )?  'active' : ''}">${x + 1}</div>`).join(' ')
            }
        </div>
        </div>

    `
    calendrier.innerHTML = calendrierChildElement;
    calendrierContainer.appendChild(calendrier)

})


//Carousel gestion

let isCarouselLayout = false;
const carouselElement = document.getElementById('carousel');
const gridElement = document.getElementById('grid');

const arrowLeft = document.querySelector('.arrow-left');
const arrowRight = document.querySelector('.arrow-right');


let current = currentMonth;

//Setup grid


const setUpLayout = function (element,carousel){
    if(element){
        element.addEventListener('click',(e) => {
            const activeSpan = document.querySelector('body section p span.active');
            e.preventDefault();
            console.log(activeSpan)
            activeSpan && activeSpan.classList.remove('active')
            if(!e.currentTarget.classList.contains('active')){
                e.currentTarget.classList.add('active')
                if(carousel){
                    calendrierContainer.classList.add('carousel')
                    calendrierContainer && calendrierContainer.style.setProperty('--i', current = currentMonth);
                    arrowLeft.style.display = "block";
                    arrowRight.style.display = "block";
                } else{
                    calendrierContainer.classList.remove('carousel');
                    arrowLeft.style.display = "none";
                    arrowRight.style.display = "none";
                }
            }
        })
    }
}

//setup grid when click on button

calendrierContainer && calendrierContainer.style.setProperty('--n',YearMonths.length)

setUpLayout(gridElement,false);
setUpLayout(carouselElement,true);


calendrierContainer && calendrierContainer.style.setProperty('--i', current);


arrowLeft.addEventListener('click',() => {
    current === 0 ? current = YearMonths.length - 1 : current = current - 1;
    calendrierContainer && calendrierContainer.style.setProperty('--i', current);
})

arrowRight.addEventListener('click',() => {
    current === YearMonths.length - 1 ? current = 0 : current = current + 1;
    calendrierContainer && calendrierContainer.style.setProperty('--i', current);
})
