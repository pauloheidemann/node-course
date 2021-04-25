const geoCode = (address, callback) => {
    setTimeout(() => {
        const data = {
            latitude,
            longitude: 0,
        }
        callback(data)
    }, 2000)
}

const data = geoCode('Philadelphia', (data)=> {
    console.log(data)
})

const add = (firstTerm, secondTerm, callback) => {
    setTimeout(() => {
        const event = 'Paulo'
        const uuid = '1234'
        console.log(`${event}/${uuid}`)
        callback(firstTerm + secondTerm)
    }, 2000)
}

add(1, 4, (sum) => {
    console.log(sum)
})