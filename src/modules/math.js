const ratingConverter = (rating) => {
    const numOfDecimal = 1;

    return rating.toFixed(Math.max(numOfDecimal, (rating.toString().split('.')[1] || []).length));
} 

export { ratingConverter };