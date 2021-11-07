const { calculateTip } = require('../src/math')
const { add } = require('../../playground/9-async-await')

test ('Calculating tip', () => {
    //Given
    const total = 10
    const tipPercent = 20

    //When
    const totalWithTip = calculateTip(total, tipPercent)

    //Then
    expect(totalWithTip).toBe(12)

})

// test('Async test demo', (done) => {
//     setTimeout(() => {
//         expect(1).toBe(2)
//         done()
//     }, 2000)
// })

test('Promise demo', (done) => {
    add(1, 2).then((sum) => {
        expect(sum).toBe(3)
        done()
    })
})

test('Async await demo', async () => {
    const sum = await add(1,2)
    expect(sum).toBe(3)
})