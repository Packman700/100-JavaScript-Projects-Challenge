var Filter = /** @class */ (function () {
    function Filter(buttonsDiv, storeItemsHTML) {
        var _this = this;
        this.applyFilters = function (button) {
            if (button.dataset.filter === undefined)
                throw Error('Filter.applyFilters: Object button dont have data-filter property');
            var filterName = button.dataset.filter;
            var items = _this._storeItemsNodeListHTML;
            items.forEach(function (item) {
                if (filterName === 'all' || filterName === item.dataset.item)
                    item.style.display = 'block';
                else
                    item.style.display = 'none';
            });
        };
        this._filterButtonsNodeList = buttonsDiv.querySelectorAll('a');
        this._storeItemsNodeListHTML = storeItemsHTML.querySelectorAll('div [data-item]');
    }
    Filter.prototype.set = function () {
        var _this = this;
        var buttonsHTML = this._filterButtonsNodeList;
        buttonsHTML.forEach(function (button) {
            button.addEventListener('click', function () {
                _this.applyFilters(button);
            });
        });
    };
    return Filter;
}());
var buttonsDiv = document.querySelector('#filters');
var storeItemsHTML = document.querySelector('#store-items');
var filter = new Filter(buttonsDiv, storeItemsHTML);
filter.set();
