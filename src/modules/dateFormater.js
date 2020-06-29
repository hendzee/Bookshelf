import moment from 'moment';

/** Convert milisecond to date format */
const convertDate = (date) => {
    return moment(date).format('YYYY-MM-DD')
}

/** Convert duration to date */
const durationToDate = (duration) => {
    return moment().add(duration, 'days').format('YYYY-MM-DD');
}

/** Convert date to duration */
const dateToDuration = (date1, date2) => {
    let dateA = new moment(date1);
    let dateB = new moment(date2);

    return Math.abs(dateA.diff(dateB, 'days')) + 1;
}

export { convertDate, durationToDate, dateToDuration }