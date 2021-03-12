// INTERFACES //
declare interface String {
    repeat(length : number) : string;
}

interface testimonialsInterface {
    [index: number]: {
        image: string;
        rate: number;
        customerName: string;
        customerComment: string;
    },
    length: number;
}

interface testimonialsDataInterface {
    image: string;
    rate: number;
    customerName: string;
    customerComment: string;
}

// DATA //
const testimonials:testimonialsInterface = [
    {image: "customer1.jpg", rate: 5, customerName:"Kate" , customerComment:"Really knowledgeable and friendly advice. I bought a music book which worked out just perfect for what I wanted. Massive selection of music."},
    {image: "customer2.jpg", rate: 4.6, customerName:"Jack" , customerComment:"This place is AMAZING!!! I get all my guitars here, and it is great service and they can do anything. I would highly recommend this place everyone should be coming to this place. There's not 1 bad thing about this place I LOVE IT."},
    {image: "customer3.jpg", rate: 3.7, customerName:"David" , customerComment:"Nice shop"},
    {image: "customer4.jpg", rate: 4.1, customerName:"Juliet" , customerComment:"Great selection of music 🎶 gear over two floors and the staff are friendly and helpful"},
    {image: "customer5.jpg", rate: 4.5, customerName:"Buddy" , customerComment:"Bark, bark!"},
]

// CLASSES //
class OpinionBox {
    // Testimonials data
    private _testimonials: testimonialsInterface;
    private _currentTestimonialIndex: number;
    // HTML Sections
    private _opinionBoxWithButtons: HTMLElement;
    private _photo: HTMLImageElement;
    private _name: HTMLElement;
    private _stars: HTMLElement;
    private _comment: HTMLElement;

    constructor(opinionBoxWithButtons: HTMLElement, testimonials: testimonialsInterface) {
        this._testimonials = testimonials;
        this._currentTestimonialIndex = 0;

        this._opinionBoxWithButtons = opinionBoxWithButtons;
        this._photo = opinionBoxWithButtons.querySelector('.opinion-box__photo');
        this._name = opinionBoxWithButtons.querySelector('.opinion-box__name');
        this._stars = opinionBoxWithButtons.querySelector('.opinion-box__stars');
        this._comment = opinionBoxWithButtons.querySelector('.opinion-box__comment');
    }

    init() {
        this._updateOpinionBox();
        // Add Event listeners
        let leftButton: HTMLElement = this._opinionBoxWithButtons.querySelector('.btn-left');
        let rightButton: HTMLElement = this._opinionBoxWithButtons.querySelector('.btn-right');

        leftButton.addEventListener('click', this._leastTestimonial);
        rightButton.addEventListener('click', this._nextTestimonial);
    }

    destroy(){
        // Delete Event listeners
        let leftButton: HTMLElement = this._opinionBoxWithButtons.querySelector('.btn-left');
        let rightButton: HTMLElement = this._opinionBoxWithButtons.querySelector('.btn-right');

        leftButton.removeEventListener('click', this._leastTestimonial);
        rightButton.removeEventListener('click', this._nextTestimonial);
    }

    private _updateOpinionBox(photoDirectory='photos'):void{
        const starsObject:Stars = new Stars();
        const index:number = this._currentTestimonialIndex;
        const data:testimonialsDataInterface = this._testimonials[index];

        this._comment.innerText = data.customerComment;
        this._name.innerText    = data.customerName;
        this._photo.src         = `${photoDirectory}/${data.image}`;
        this._stars.innerHTML   = starsObject.returnHTML(data.rate);
    }

    // Event listeners
    private _leastTestimonial = () => {
        // Calculate least index
        const arrayLength:number = this._testimonials.length;
        let index:number = this._currentTestimonialIndex;

        if(--index < 0) index = arrayLength;
        this._currentTestimonialIndex = index;

        // Update opinion box
        this._updateOpinionBox()
    }

    private _nextTestimonial = () => {
        // Calculate next index
        const arrayLength:number = this._testimonials.length;
        let index:number = this._currentTestimonialIndex;

        if(++index >= arrayLength) index = 0;
        this._currentTestimonialIndex = index;

        // Update opinion box
        this._updateOpinionBox()
    }
}


class Stars {
    private _fullStar: string;
    private _halfStar: string;
    private _emptyStar: string;

    constructor() {
        this._fullStar  = `<i class="fas fa-star"></i>`;
        this._halfStar  = `<i class="fas fa-star-half-alt"></i>`;
        this._emptyStar = `<i class="far fa-star"></i>`;
    }

    public returnHTML(rate:number):any{
        rate = this._roundHalf(rate);
        const STARS_AMOUNT:number = 5
        const fullStars:string = this._fullStar.repeat(Math.floor(rate))
        const halfStars:string = this._halfStar.repeat( Math.ceil(rate) - Math.floor(rate))
        const emptyStars:string = this._emptyStar.repeat( STARS_AMOUNT - Math.ceil(rate))

        return `${fullStars}${halfStars}${emptyStars}`;
    }

    private _roundHalf(num:number):number {
        const NUMBER_OF_PARTS:number = 2;
        return Math.round(num * NUMBER_OF_PARTS) / NUMBER_OF_PARTS;
    }
}

// Initiation
const opinionBoxWithButtons: HTMLElement = document.querySelector('.opinion-box-with-buttons');
const opinionBox = new OpinionBox(opinionBoxWithButtons, testimonials);
opinionBox.init();
// console.log(opinionBox.testimonials.length)