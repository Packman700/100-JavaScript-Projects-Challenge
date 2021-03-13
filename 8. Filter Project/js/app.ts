class Filter{
    private _filterButtonsNodeList: NodeList;
    private _storeItemsNodeListHTML: NodeList;

    public test:any;
    constructor(buttonsDiv: HTMLElement, storeItemsHTML: HTMLElement) {
        this._filterButtonsNodeList = buttonsDiv.querySelectorAll('a');
        this._storeItemsNodeListHTML = storeItemsHTML.querySelectorAll('div [data-item]');
    }

    public set(){
        const buttonsHTML = this._filterButtonsNodeList;
        buttonsHTML.forEach((button)=>{
            button.addEventListener('click', ()=>{
                this.applyFilters(button);
            });
        })
    }

    private applyFilters = (button)=>{
        if (button.dataset.filter === undefined) throw Error('Filter.applyFilters: Object button dont have data-filter property');

        const filterName = button.dataset.filter;
        const items = this._storeItemsNodeListHTML;

        items.forEach((item:HTMLElement)=>{
            if (filterName === 'all' || filterName === item.dataset.item)
                item.style.display = 'block';
            else
                item.style.display = 'none';
        })

    }
}

const buttonsDiv:HTMLElement = document.querySelector('#filters');
const storeItemsHTML:HTMLElement = document.querySelector('#store-items');

const filter:Filter = new Filter(buttonsDiv, storeItemsHTML);
filter.set();