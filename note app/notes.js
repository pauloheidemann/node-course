const fs = require('fs')
const chalk = require('chalk')

const addNote = (title, text) => {
    const notes = loadNotes()
    const duplicateNote = notes.find(note => note.title === title)

    debugger

    if(!duplicateNote) {
        const newNote = {
            title: title,
            text: text
        }
        
        notes.push(newNote)
        fs.writeFileSync('notes.json', JSON.stringify(notes))
        console.log(chalk.green.bgBlue('Note added'))
    } else {
        console.log(chalk.bgBlue.red('Note title taken!'))
    }
}

const removeNote = (title) => {
    const notes = loadNotes()
    const notesToKeep = notes.filter(note => note.title !== title)

    if(notesToKeep.length === notes.length) {
        console.log(chalk.redBright.bgBlue('No notes removed'))
    } else {
        console.log(chalk.redBright.bgBlue.inverse('Note with title ' + title + ' removed'))
    }

    fs.writeFileSync('notes.json', JSON.stringify(notesToKeep))
}

const loadNotes = () => {
    try {
        const dataBuffer = fs.readFileSync('notes.json')
        const jsonString = dataBuffer.toString()
        return JSON.parse(jsonString)
    } catch(e) {
        return []
    }
}

const listNotes = () => {
    const notes = loadNotes()
    notes.forEach(note => console.log(chalk.bgGreen(note.title))) 
}

const readNote = (title) => {
    const notes = loadNotes()
    const note = notes.find(note => note.title === title)
    if(note) {
        console.log(chalk.bgGrey.red(note.text))
    } else {
        console.log(chalk.bgGrey.red.inverse('Note not found'))
    }
}

module.exports = {
    addNote: addNote,
    removeNote: removeNote,
    listNotes: listNotes,
    readNote: readNote
}