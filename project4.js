const balanceEL = document.querySelector('#balance')
const incomeAmountEL = document.querySelector('#income-amount')
const expenseAmountEL = document.querySelector('#expense-amount')
const transectionListEL = document.querySelector('#transection-list')
const transectionFormEL = document.querySelector('#transection-form')
const descriptionEl = document.querySelector('#description')
const amountEL = document.querySelector('#amount')

let transections = JSON.parse(localStorage.getItem('transections')) || [];

transectionFormEL.addEventListener('submit',addTransection)

function addTransection(e){
    e.preventDefault();
    // get form values
    const description = descriptionEl.value.trim()
    const amount = parseFloat(amountEL.value)

    transections.push({
        id : Date.now(),
        description,
        amount
    })
    localStorage.setItem('transections',JSON.stringify(transections))

    updateTransectionList()
    updateSummary()
    transectionFormEL.reset()
}


function updateTransectionList(){
    transectionListEL.innerHTML = ""

    const sortedTransections = [...transections].reverse()
    sortedTransections.forEach((transection)=>{
        const transectionElement = createTransectionEL(transection)
        transectionListEL.appendChild(transectionElement)
    })
}

function createTransectionEL(transection){
    const li = document.createElement('li')
    li.classList.add('transection')
    li.classList.add(transection.amount>0? "income" : 'expense')
    li.innerHTML = `
     <span>${transection.description}</span>
     <span>${transection.amount}</span>
     <button class="delete-btn" onclick="removeTransection(${transection.id})">X</button>
    `
    return li
}

// Added the missing remove function referenced in your HTML string
window.removeTransection = function(id) {
    transections = transections.filter(t => t.id !== id)
    localStorage.setItem('transections', JSON.stringify(transections))
    updateTransectionList()
    updateSummary()
}

function updateSummary() {
    const balance = transections.reduce((acc, t) => acc + t.amount, 0)

    const income = transections
      .filter(t => t.amount > 0)
      .reduce((acc, t) => acc + t.amount, 0)

    const expense = transections
      .filter(t => t.amount < 0)
      .reduce((acc, t) => acc + t.amount, 0)

    balanceEL.textContent = balance
    incomeAmountEL.textContent = income
    expenseAmountEL.textContent = Math.abs(expense)
}

// Initial calls to display data from localStorage on page load
updateTransectionList()
updateSummary()
