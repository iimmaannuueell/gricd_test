exports.setTime = (numOfHours, numOfMinutes = null) => {
    const date = new Date();

    (numOfHours === 0) ? 
            date.setTime(date.getTime() + (numOfHours + 1) * 60 * 60 * 1000)
            : date.setTime(date.getTime() + 1 * 60 * 60 * 1000)

    numOfMinutes ? 
            date.setMinutes(date.getMinutes() + numOfMinutes) 
            : date

    return date;
}
