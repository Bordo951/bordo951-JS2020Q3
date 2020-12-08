export default class StatisticsView {
    getHeaderTable() {
        return `<div class="statistics">
                       <div class="statistics__buttons-wrapper">
                           <button class="statistics__buttons">Repeat difficult words</button>
                           <button class="statistics__buttons">Reset</button>
                       </div>
                       <div class="table__wrapper">
                           <table class="table">
                               <thead>
                                   <caption class="table__title">Cards</caption>
                                   <tr>
                                       <td class="table__cell-name"><span>↓</span>Word</td>
                                       <td class="table__cell-name">Translation</td>
                                       <td class="table__cell-name">Category</td>
                                       <td class="table__cell-name">Clicks</td>
                                       <td class="table__cell-name">Right</td>
                                       <td class="table__cell-name">Mistakes</td>
                                       <td class="table__cell-name">%errors</td>
                                   </tr>
                               </thead>
                               <tbody>`;
    }

    getStatisticTableRows(card) {
        return `<tr class="table__string">
                                       <td>${card.language['en']}</td>
                                       <td>${card.language['ru']}</td>
                                       <td>${card.categoryId}</td>
                                       <td>0</td>
                                       <td>0</td>
                                       <td>0</td>
                                       <td>0</td>
                                   </tr>`;
    }

    getFooterTable() {
        return `</tbody>
                           </table>
                       </div>
                   </div>`
    }
}
