// const square = function(x) {
//     return x * x
// }

// const square = (x) => x * x

// console.log(square(4))

const event = {
    name: 'Paulo',
    guestList: ['Paulo', 'Andrew'],
    printGuestList () {
        this.guestList.forEach(guest => console.log(guest, this.name))
    }
}

event.printGuestList()