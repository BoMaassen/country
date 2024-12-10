function numberToMillion(number){
    const million = (number / 1000000).toFixed(2)
    return million + "M"
}

export default numberToMillion;