// DATA //
var testimonials = [
    { image: "customer1.jpg", rate: 5, customerName: "Kate", customerComment: "Really knowledgeable and friendly advice. I bought a music book which worked out just perfect for what I wanted. Massive selection of music." },
    { image: "customer2.jpg", rate: 4.6, customerName: "Jack", customerComment: "This place is AMAZING!!! I get all my guitars here, and it is great service and they can do anything. I would highly recommend this place everyone should be coming to this place. There's not 1 bad thing about this place I LOVE IT." },
    { image: "customer3.jpg", rate: 3.7, customerName: "David", customerComment: "Nice shop" },
    { image: "customer4.jpg", rate: 4.1, customerName: "Juliet", customerComment: "Great selection of music 🎶 gear over two floors and the staff are friendly and helpful" },
    { image: "customer5.jpg", rate: 4.5, customerName: "Buddy", customerComment: "Bark, bark!" },
];
// CLASSES //
var OpinionBox = /** @class */ (function () {
    function OpinionBox(opinionBoxWithButtons, testimonials) {
        var _this = this;
        // Event listeners
        this._leastTestimonial = function () {
            // Calculate least index
            var arrayLength = _this._testimonials.length;
            var index = _this._currentTestimonialIndex;
            if (--index < 0)
                index = arrayLength;
            _this._currentTestimonialIndex = index;
            // Update opinion box
            _this._updateOpinionBox();
        };
        this._nextTestimonial = function () {
            // Calculate next index
            var arrayLength = _this._testimonials.length;
            var index = _this._currentTestimonialIndex;
            if (++index >= arrayLength)
                index = 0;
            _this._currentTestimonialIndex = index;
            // Update opinion box
            _this._updateOpinionBox();
        };
        this._testimonials = testimonials;
        this._currentTestimonialIndex = 0;
        this._opinionBoxWithButtons = opinionBoxWithButtons;
        this._photo = opinionBoxWithButtons.querySelector('.opinion-box__photo');
        this._name = opinionBoxWithButtons.querySelector('.opinion-box__name');
        this._stars = opinionBoxWithButtons.querySelector('.opinion-box__stars');
        this._comment = opinionBoxWithButtons.querySelector('.opinion-box__comment');
    }
    OpinionBox.prototype.init = function () {
        this._updateOpinionBox();
        // Add Event listeners
        var leftButton = this._opinionBoxWithButtons.querySelector('.btn-left');
        var rightButton = this._opinionBoxWithButtons.querySelector('.btn-right');
        leftButton.addEventListener('click', this._leastTestimonial);
        rightButton.addEventListener('click', this._nextTestimonial);
    };
    OpinionBox.prototype.destroy = function () {
        // Delete Event listeners
        var leftButton = this._opinionBoxWithButtons.querySelector('.btn-left');
        var rightButton = this._opinionBoxWithButtons.querySelector('.btn-right');
        leftButton.removeEventListener('click', this._leastTestimonial);
        rightButton.removeEventListener('click', this._nextTestimonial);
    };
    OpinionBox.prototype._updateOpinionBox = function (photoDirectory) {
        if (photoDirectory === void 0) { photoDirectory = 'photos'; }
        var starsObject = new Stars();
        var index = this._currentTestimonialIndex;
        var data = this._testimonials[index];
        this._comment.innerText = data.customerComment;
        this._name.innerText = data.customerName;
        this._photo.src = photoDirectory + "/" + data.image;
        this._stars.innerHTML = starsObject.returnHTML(data.rate);
    };
    return OpinionBox;
}());
var Stars = /** @class */ (function () {
    function Stars() {
        this._fullStar = "<i class=\"fas fa-star\"></i>";
        this._halfStar = "<i class=\"fas fa-star-half-alt\"></i>";
        this._emptyStar = "<i class=\"far fa-star\"></i>";
    }
    Stars.prototype.returnHTML = function (rate) {
        rate = this._roundHalf(rate);
        var STARS_AMOUNT = 5;
        var fullStars = this._fullStar.repeat(Math.floor(rate));
        var halfStars = this._halfStar.repeat(Math.ceil(rate) - Math.floor(rate));
        var emptyStars = this._emptyStar.repeat(STARS_AMOUNT - Math.ceil(rate));
        return "" + fullStars + halfStars + emptyStars;
    };
    Stars.prototype._roundHalf = function (num) {
        var NUMBER_OF_PARTS = 2;
        return Math.round(num * NUMBER_OF_PARTS) / NUMBER_OF_PARTS;
    };
    return Stars;
}());
// Initiation
var opinionBoxWithButtons = document.querySelector('.opinion-box-with-buttons');
var opinionBox = new OpinionBox(opinionBoxWithButtons, testimonials);
opinionBox.init();
// console.log(opinionBox.testimonials.length)
