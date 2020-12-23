export default class LastUpdateView {
    getFormattedDateHtml(time) {
        const currentTime = new Date(Date.parse(time)),
            month = currentTime.getUTCMonth() + 1,
            date = currentTime.getUTCDate(),
            year = currentTime.getUTCFullYear(),
            minutes = currentTime.getUTCMinutes(),
            seconds = currentTime.getUTCSeconds(),
            ampm = hours >= 12 ? 'PM' : 'AM';
        let hours = currentTime.getUTCHours();
        hours = hours % 12;
        hours = hours ? hours : 12;

        return `<p class="update-time__item-info">${month}/${date}/${year}, ${hours}:${minutes}:${seconds} ${ampm}</p>`;
    }
}
