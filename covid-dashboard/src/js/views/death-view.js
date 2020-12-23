import FormatHelper from '../component/FormatHelper/format-helper';

export default class DeathView {
    constructor() {
      this.formatHelper = new FormatHelper();
    }

    getDeathListHtml(country) {
        return `<div class="death__list" data-country="${country.Country}" data-slug="${country.Slug}" data-cases="deaths">
          <p class="death__list-deaths">
            ${this.formatHelper.formatNumber(country.TotalDeaths)}
            <span class="death__list-text">deaths</span>
          </p>
          <p class="death__list-country">${country.Country}</p>
        </div>`
    }
}