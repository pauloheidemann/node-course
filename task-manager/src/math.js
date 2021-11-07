const calculateTip = (total, tipPercent) => {
    const tip = total * (tipPercent/100)
    return total + tip
}

module.exports = {
    calculateTip
}