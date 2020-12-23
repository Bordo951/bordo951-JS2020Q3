import FormatHelper from '../component/FormatHelper/format-helper';

export default class GlobalView {
    constructor() {
      this.formatHelper = new FormatHelper();
    }

    getRegionListHtml(country) {
        return `<div class="region__list" data-country="${country.Country}" data-slug="${country.Slug}" data-cases="confirmed">
          <p class="region__list-country">
            <img class="region__list-country-flag" src="${country.Flag}" alt="${country.Country}">            
            ${country.Country}
          </p>
          <p class="region__list-сonfirmed-сases">${this.formatHelper.formatNumber(country.TotalConfirmed)}</p>
        </div>`;
    }
}
