import moment from 'moment';

/** Convert milisecond to date format */
const convertDate = (date) => {
    return moment(date).format('YYYY-MM-DD')
}

/** Convert duration to date */
const durationToDate = (duration) => {
    return moment().add(duration, 'days').format('YYYY-MM-DD');
}

export { convertDate, durationToDate }