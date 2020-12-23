import $ from 'jquery';
import 'select2';

export default class CovidSearch {
    constructor(id) {
        this.id = id;
    }

    init() {
        $(document).ready(function () {
            $('.header__search').select2();
        });
        $(this.id).select2({
            selectOnClose: true
        });
        $(this.id).select2({
            closeOnSelect: true
        });
    }

}
