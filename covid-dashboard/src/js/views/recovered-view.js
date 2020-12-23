import FormatHelper from '../component/FormatHelper/format-helper';

export default class RecoveredView {
    constructor() {
      this.formatHelper = new FormatHelper();
    }
    
    getRecoveredListHtml(country) {
        return `<div class="recovered__list" data-country="${country.Country}" data-slug="${country.Slug}" data-cases="recovered">
              <p class="recovered__list-recovered">
                ${this.formatHelper.formatNumber(country.TotalRecovered)}
                <span class="recovered__list-text">recovered</span>
              </p>
              <p class="recovered__list-country">${country.Country}</p>
            </div>`
    }
}