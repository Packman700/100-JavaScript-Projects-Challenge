var Filter = /** @class */ (function () {
    function Filter(buttonsDiv, storeItemsHTML) {
        var _this = this;
        // Events listeners functions
        this.applyFilters = function (button) {
            if (button.dataset.filter === undefined)
                throw Error('Filter.applyFilters: Object button dont have data-filter property');
            _this._currentFilter = button.dataset.filter;
            var filteredItems = _this.returnFilteredPhotos();
            var allItems = _this._storeItemsNodeListHTML;
            allItems.forEach(function (item) {
                if (filteredItems.includes(item))
                    item.style.display = 'block';
                else
                    item.style.display = 'none';
            });
        };
        this._filterButtonsNodeList = buttonsDiv.querySelectorAll('a');
        this._storeItemsNodeListHTML = storeItemsHTML.querySelectorAll('div [data-item]');
        this._currentFilter = 'all';
    }
    Filter.prototype.set = function () {
        var _this = this;
        var buttonsHTML = this._filterButtonsNodeList;
        // Set event listeners
        buttonsHTML.forEach(function (button) {
            return button.addEventListener('click', function () { return _this.applyFilters(button); });
        });
    };
    // Public methods
    Filter.prototype.returnFilteredPhotos = function () {
        var filteredPhotos = [];
        var items = this._storeItemsNodeListHTML;
        var filterName = this._currentFilter;
        items.forEach(function (item) {
            if (filterName === 'all' || filterName === item.dataset.item)
                filteredPhotos.push(item);
        });
        return filteredPhotos;
    };
    return Filter;
}());
var PhotoPopup = /** @class */ (function () {
    function PhotoPopup(storeItemsHTML, popup, filter) {
        var _this = this;
        // Events listeners functions
        this._showPopup = function (photo) {
            _this._currentPhoto = photo;
            _this._updatePhoto(photo.src);
            _this._popup.classList.add('show');
        };
        this._closePopup = function () {
            _this._popup.classList.remove('show');
        };
        this._lastPhoto = function () {
            _this._changePhoto('last');
        };
        this._nextPhoto = function () {
            _this._changePhoto('next');
        };
        this._storeItemsNodeListHTML = storeItemsHTML.querySelectorAll('div img');
        this._popup = popup;
        this._filter = filter;
    }
    PhotoPopup.prototype.set = function () {
        var _this = this;
        // Declare local variables
        var photoHTML = this._storeItemsNodeListHTML;
        var popupCloseWindow = this._popup.querySelector('.fa-window-close');
        var controlButtons = this._popup.querySelectorAll('.lightbox-control');
        // Show popup
        photoHTML.forEach(function (photo) {
            photo.addEventListener('click', function () { _this._showPopup(photo); });
        });
        // Close popup
        popupCloseWindow.addEventListener('click', this._closePopup);
        // Next last photo
        controlButtons.forEach(function (controlButton) {
            if (controlButton.classList.contains('btnLeft'))
                controlButton.addEventListener('click', function () { _this._lastPhoto(); });
            if (controlButton.classList.contains('btnRight'))
                controlButton.addEventListener('click', function () { _this._nextPhoto(); });
        });
    };
    // Normal methods
    PhotoPopup.prototype._updatePhoto = function (src) {
        var popupPhoto = this._popup.querySelector('.lightbox-item');
        popupPhoto.style.backgroundImage = "url(" + src + ")";
    };
    PhotoPopup.prototype._changePhoto = function (action) {
        // Declare local variables
        var photosArray = this._filter.returnFilteredPhotos()
            .map(function (div) { return div.querySelector('img'); });
        var photoIndex = photosArray.indexOf(this._currentPhoto);
        var arrayLength = photosArray.length;
        // Change index
        if (action === "next")
            if (++photoIndex >= arrayLength)
                photoIndex = 0;
        if (action === "last")
            if (--photoIndex < 0)
                photoIndex = arrayLength - 1;
        // Update photos
        this._currentPhoto = photosArray[photoIndex];
        this._updatePhoto(this._currentPhoto.src);
    };
    return PhotoPopup;
}());
var buttonsDiv = document.querySelector('#filters');
var storeItemsHTML = document.querySelector('#store-items');
var photoPopupHTML = document.querySelector('.lightbox-container');
var filter = new Filter(buttonsDiv, storeItemsHTML);
filter.set();
var photoPopup = new PhotoPopup(storeItemsHTML, photoPopupHTML, filter);
photoPopup.set();
