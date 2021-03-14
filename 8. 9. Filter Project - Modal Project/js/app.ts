// @ts-ignore
// Array have default this method but webstorm don't detect this method ;<
declare interface Array {
    includes(any): boolean;
}

class Filter{
    private readonly _filterButtonsNodeList: NodeList;
    private readonly _storeItemsNodeListHTML: NodeList;
    private _currentFilter: string;

    constructor(buttonsDiv: HTMLElement, storeItemsHTML: HTMLElement) {
        this._filterButtonsNodeList = buttonsDiv.querySelectorAll('a');
        this._storeItemsNodeListHTML = storeItemsHTML.querySelectorAll('div [data-item]');
        this._currentFilter = 'all';
    }

    public set(){
        const buttonsHTML = this._filterButtonsNodeList;
        // Set event listeners
        buttonsHTML.forEach((button) =>
            button.addEventListener('click', () => this.applyFilters(button))
        )
    }

    // Events listeners functions
    private applyFilters = (button) => {
        if (button.dataset.filter === undefined) throw Error('Filter.applyFilters: Object button dont have data-filter property');

        this._currentFilter = button.dataset.filter;

        const filteredItems = this.returnFilteredPhotos();
        const allItems = this._storeItemsNodeListHTML;

        allItems.forEach((item:HTMLElement)=>{
            if (filteredItems.includes(item))
                item.style.display = 'block';
            else
                item.style.display = 'none';
        })
    }

    // Public methods
    public returnFilteredPhotos():HTMLElement[] {
        const filteredPhotos:HTMLElement[] = [];
        const items = this._storeItemsNodeListHTML;
        const filterName = this._currentFilter;

        items.forEach((item:HTMLElement) => {
            if (filterName === 'all' || filterName === item.dataset.item) filteredPhotos.push(item);
        })
        return filteredPhotos
    }
}


class PhotoPopup {
    private readonly _storeItemsNodeListHTML: NodeList;
    private readonly _popup: HTMLElement;
    private _filter: Filter;
    private _currentPhoto: HTMLImageElement;

    constructor (storeItemsHTML: HTMLElement, popup: HTMLElement, filter: Filter) {
        this._storeItemsNodeListHTML = storeItemsHTML.querySelectorAll('div img');
        this._popup = popup;
        this._filter = filter;
    }

    public set() {
        // Declare local variables
        const photoHTML = this._storeItemsNodeListHTML;
        const popupCloseWindow:HTMLElement = this._popup.querySelector('.fa-window-close');
        const controlButtons:NodeList = this._popup.querySelectorAll('.lightbox-control');

        // Show popup
        photoHTML.forEach((photo)=> {
            photo.addEventListener('click', ()=>{ this._showPopup(photo) });
        })

        // Close popup
        popupCloseWindow.addEventListener('click', this._closePopup);

        // Next last photo
        controlButtons.forEach((controlButton:HTMLElement)=> {
            if(controlButton.classList.contains('btnLeft'))
                controlButton.addEventListener('click', ()=>{this._lastPhoto()});

            if(controlButton.classList.contains('btnRight'))
                controlButton.addEventListener('click', ()=>{this._nextPhoto()});
        })
    }

    // Events listeners functions
    private _showPopup = (photo):void => {
        this._currentPhoto = photo;
        this._updatePhoto(photo.src);

        this._popup.classList.add('show');
    }

    private _closePopup = ():void => {
        this._popup.classList.remove('show');
    }

    private _lastPhoto = ():void => {
        this._changePhoto('last')
    }

    private _nextPhoto = ():void => {
        this._changePhoto('next')
    }

    // Normal methods
    private _updatePhoto(src:string):void {
        const popupPhoto:HTMLElement = this._popup.querySelector('.lightbox-item');
        popupPhoto.style.backgroundImage = `url(${src})`;
    }

    private _changePhoto(action:string):void {
        // Declare local variables
        const photosArray:HTMLImageElement[] = this._filter.returnFilteredPhotos()
              .map((div)=>{return div.querySelector('img')});
        let photoIndex:number = photosArray.indexOf(this._currentPhoto);
        const arrayLength:number = photosArray.length;

        // Change index
        if(action==="next") if(++photoIndex >= arrayLength) photoIndex = 0;
        if(action==="last") if(--photoIndex < 0) photoIndex = arrayLength-1;

        // Update photos
        this._currentPhoto = photosArray[photoIndex];
        this._updatePhoto(this._currentPhoto.src)
    }
}

const buttonsDiv:HTMLElement = document.querySelector('#filters');
const storeItemsHTML:HTMLElement = document.querySelector('#store-items');
const photoPopupHTML:HTMLElement = document.querySelector('.lightbox-container');

const filter:Filter = new Filter(buttonsDiv, storeItemsHTML);
filter.set();

const photoPopup:PhotoPopup = new PhotoPopup(storeItemsHTML, photoPopupHTML, filter);
photoPopup.set();
