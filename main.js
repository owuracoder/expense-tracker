const balance = document.getElementById("balance")
const money_plus = document.getElementById("money-plus")
const money_minus = document.getElementById("money-minus")
const list = document.getElementById("list")
const form = document.getElementById("form")
const text = document.getElementById("text")
const amount = document.getElementById("amount")

// const dummyTransactions = [
//     { id: 1, text: 'flower', amount: -20 },
//     { id: 2, text: 'Salary', amount: 300 },
//     { id: 3, text: 'Book', amount: -10 },
//     { id: 4, text: 'Camera', amount: 150 }
// ]

const localStorageTransactions = JSON.parse(localStorage.getItem('transactions'))

let transactions = localStorage.getItem('transactions') !== null ? localStorageTransactions : []

//take input from the user
function addTransaction(e) {
    e.preventDefault()


    if (text.value.trim() === '' || amount.value.trim() === '') {
        alert('Please add a text and amount')
    } else {
        const transaction = {
            id: generateID(),
            text: text.value,
            amount: parseInt(amount.value)
        }

        transactions.push(transaction)

        addTansactionDOM(transaction)

        updateValues()

        updateLocalStorage()

        text.value = ''

        amount.value = ''
    }
}

function generateID() {
    return Math.floor(Math.random() * 10000000)
}

//We're trying to add transactions to DOM List
function addTansactionDOM(transaction) {
    // get sign
    const sign = transaction.amount < 0 ? '-' : '+'

    const item = document.createElement('li')

    // add class based on value
    item.classList.add(transaction.amount < 0 ? 'minus' : 'plus')

    item.innerHTML = `
        ${transaction.text} <span>${sign}${Math.abs(transaction.amount)}</span> <button? class="delete-btn" onclick="removeTransaction(${transaction.id})">x</button?
    `

    list.appendChild(item)
}

//upadate income and expense balance
function updateValues() {
    const amounts = transactions.map((transaction) => transaction.amount)

    const reducer = (accu, item) => {
        return (accu + item)
    }



    const total = amounts.reduce(reducer, 0)

    const income = amounts.filter((item) => item > 0).reduce(reducer, 0)

    const expense = amounts.filter((item) => item < 0).reduce(reducer, 0) * -1


    balance.innerText = `$${total}`
    money_plus.innerText = `$${income}`
    money_minus.innerText = `$${expense}`

}

// update local storage
function updateLocalStorage() {
    localStorage.setItem('transactions', JSON.stringify(transactions))
}


function init() {
    list.innerHTML = ''

    transactions.forEach(addTansactionDOM)
    updateValues()
}

function removeTransaction(id) {
    transactions = transactions.filter((transaction) => transaction.id !== id)

    updateLocalStorage()

    init()
}

init()

form.addEventListener('submit', addTransaction)