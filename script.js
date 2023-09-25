const row = document.getElementById('ch-row');

const CARDS_CONTENT = [
    {
        img:"./images/challenges/currency-converter.jpg",
        img_description:"Currency converter app",
        link:'currency-converter/',
        title:"Currency Converter app",
        description:"A web application allowing you to convert 3 currencies between them.The conversion is done with fixed rates."
    },
    {
        img:"./images/challenges/web-forms.jpg",
        img_description:"Img description",
        link:'/forms',
        title:"Registration and signup forms",
        description:"A small project to practice knowledge relating to <a href='https://developer.mozilla.org/fr/docs/Learn/Forms' target='_blank'>web forms</a>. The project consists of a registration and connection form validated using javascript."
    },
    {
        img:"./images/challenges/image-gallery.jpg",
        img_description:"Img description",
        link:'/image-gallery',
        title:"Image gallery app ",
        description:"An image gallery built using knowledge of <strong>grid layout CSS</strong>"
    },
    {
        img:"./images/challenges/rating-component.jpg",
        img_description:"Img description",
        link:'/interactive-rating-component',
        title:"Interactive rating component",
        description:" This is a <a href='https://www.frontendmentor.io/challenges/interactive-rating-component-koxpeBUmI' target='_blank'>frontend mentor challenge</a>. A nice, small project to practice handling user interactions and updating the DOM. A perfect one for practicing javascript basics"
    },
    {
        img:"./images/challenges/login-card.jpg",
        link:'/login-card',
        title:"Login card design",
        description:"This involves cloning a login card as in <a href='/login-card/challenge-original.png'>this image</a>. It's built from scratch using HTML and CSS"
    },
    {
        img:"./images/challenges/modal.jpg",
        img_description:"Img description",
        link:'/modal',
        title:"Modal design ",
        description:"This challenge was inspired by @icodethis on Twitter and consists of reproducing the design of an article sharing modal box."
    },
    {
        img:"./images/challenges/post-card.jpg",
        img_description:"Img description",
        link:'/post-card',
        title:"Post card ",
        description:"As the name of the project indicates, it involves the development of a static card allowing the user to post a message or a comment."
    },
    {
        img:"./images/challenges/studio-headphones.jpg",
        img_description:"Img description",
        link:'/product-card-challenge',
        title:"Product card challenge",
        description:"The development of a presentation card for studio headphones from the company HeadBox with HTML and CSS"
    },
    {
        img:"./images/challenges/todo-list.jpg",
        img_description:"Img description",
        link:'/static-todo-page-challenge',
        title:"Static to-do list",
        description:"Development of a static to-do list. This little project is ideal for practicing how to style lists in css."
    },
    {
        img:"./images/challenges/schedule-2023.jpg",
        img_description:"Img description",
        link:'/schedule-2023',
        title:"2023 Schedule",
        description:"This simple project involves coding the calendar for the year 2023. On the project demo page, view the 2023 calendar in grid or carousel format. Manipulating the DOM or even CSS grids are the major skills that fall within the scope of this project."
    },
    {
        img:"./images/challenges/qr-component.jpg",
        img_description:"Img description",
        link:'/qr-code-component',
        title:"Qr code component",
        description:" This is a <a href='https://www.frontendmentor.io/challenges/qr-code-component-iux_sIO_H' target='_blank'>frontend mentor challenge</a> which consists of reproducing the design of a qr code component."
    },
    {
        img:"./images/challenges/testimonial-card.jpg",
        img_description:"Img description",
        link:'/testimonial-card',
        title:"Testimonial card",
        description:"A Simple testimonial card designed with HTML and CSS"
    },
    {
        img:"./images/challenges/gabrielle-perfume.jpg",
        img_description:"Img description",
        link:'/product-preview-card-component',
        title:"Product preview card",
        description:"Another <a href='https://www.frontendmentor.io/challenges/product-preview-card-component-GO7UmttRfa' target='_blank'>frontend mentor challenge</a> met"
    },
];
const element_per_page = 6;

const urlParams = new URLSearchParams(window.location.search);

let page = urlParams.get('page');
page = Number(page) ? Number(page) : 1;

const length = Math.ceil(CARDS_CONTENT.length / element_per_page)

if(page>length){
    page=1
}

let displayed_cards = CARDS_CONTENT.slice(element_per_page*(page-1),element_per_page*(page))

console.log(page,displayed_cards)
let html_string = "";
displayed_cards.forEach(({img,title,link,description}) => {
    html_string += `

        <div class="col-12 col-sm-6 col-lg-4">
            <div class="card">
                <img src=${img} class="card-img-top" alt="Screenshot of the">
                <div class="card-body">
                    <h5 class="card-title">
                        <a href=${link} class="card-link">${title}</a>
                    </h5>
                    <p class="card-text">${description}</p>
                </div>
            </div>
        </div>

    `
})

const items_for_pagination = Array.from({length:length},((_,i) => i + 1))
row.innerHTML = html_string + `

    <nav aria-label="Page navigation">
        <ul class="pagination justify-content-center">
            
            <li class="page-item ${page === 1 ? 'disabled' : ''}">
                <a class="page-link" href="?page=${page === 1 ? '' : page - 1}">Previous</a>
            </li>

            ${
                items_for_pagination.map(item => `<li class="page-item ${item === page ? 'active' : ''}"><a class="page-link" href="?page=${item}">${item}</a></li>`).join('')
            }

            <li class="page-item ${page === length ? 'disabled' : ''}">
                <a class="page-link" href="?page=${page === length ? '' : page + 1}">Next</a>
            </li>
        </ul>
    </nav>

`;