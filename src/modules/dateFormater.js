import moment from 'moment';

/** Convert milisecond to date format */
const convertDate = (date) => {
    return moment(date).format('YYYY-MM-DD')
}

export { convertDate }