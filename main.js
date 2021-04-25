// A 4 element array:

let employeeArray = [
    ['Rose', 'Nylund', 'waitress', 10],
    ['Dorothy', 'Zbornak', 'teacher', 20]
]

/* Employee record objects can be created and returned in the createEmployeeRecord function. */
const createEmployeeRecord = (testEmployee) =>  {
    const recordObject = {
        firstName: testEmployee[0],
        familyName: testEmployee[1],
        title: testEmployee[2],
        payPerHour: testEmployee[3],
        timeInEvents: [],
        timeOutEvents: []
    }
    return recordObject 
}

createEmployeeRecord(['Gray', 'Worm', 'Security', 1]) // => returns an employee record object.
console.log(createEmployeeRecord(employeeArray[0])) // => returns Rose's record only
console.log(createEmployeeRecord(employeeArray[1])) // => returns Dorothy's record only

const createEmployeeRecords = (dataEmployees) => {
    const newRecordsList = []
    dataEmployees.forEach(element => {
        newRecordsList.push(createEmployeeRecord(element))
    });
    console.log(newRecordsList[0]) // => returns Rose's record only
    console.log(newRecordsList[1]) // => returns Dorothy's record only
    return newRecordsList
}

let employeeRecords = createEmployeeRecords(employeeArray)
console.log(employeeRecords) // => returns array of 2 employee record objects

let dataEmployees = [
    ["Thor", "Odinsson", "Electrical Engineer", 45],
    ["Loki", "Laufeysson-Odinsson", "HR Representative", 35],
    ["Natalia", "Romanov", "CEO", 150],
    ["Darcey", "Lewis", "Intern", 15],
    ["Jarvis", "Stark", "CIO", 125],
    ["Anthony", "Stark", "Angel Investor", 300],
    ["Byron", "Poodle", "Mascot", 3],
    ["Julius", "Caesar", "General", 27],
    ["Rafiki", "", "Aide", 10],
    ["Simba", "", "King", 100]
]

employeeRecords = createEmployeeRecords(dataEmployees)
console.log(employeeArray, employeeRecords) // returns golden girls array and also other dataEmployees array

const createTimeInEvent = (employeeRecordObj, dateStamp) => {
    const timeInObj = {
        type: `TimeIn`,
        hour: parseInt(dateStamp.slice(11)),
        date: dateStamp.slice(0, 10) 
    }
    employeeRecordObj.timeInEvents.push(timeInObj) 
    return employeeRecordObj
}

const createTimeOutEvent = (employeeRecordObj, dateStamp) => {
    const timeOutObj = {
        type: `TimeOut`,
        hour: parseInt(dateStamp.slice(11)), 
        date: dateStamp.slice(0, 10) 
    }
    employeeRecordObj.timeOutEvents.push(timeOutObj)
    return employeeRecordObj
}

let bpRecord = createEmployeeRecord(["Byron", "Poodle", "Mascot", 3])
let updatedBpRecord = createTimeInEvent(bpRecord, "2014-02-28 1400")
let newEvent = updatedBpRecord.timeInEvents[0]
updatedBpRecord = createTimeOutEvent(bpRecord, "2015-02-28 1700")
newEvent = updatedBpRecord.timeOutEvents[0]
console.log(bpRecord) // => returns Byron's employee record object including time in and out data

const hoursWorkedOnDate = (employeeRecordObj, dateStamp) => {
    const timeInObj = employeeRecordObj.timeInEvents.find(element => element.date === dateStamp)
    const timeOutObj = employeeRecordObj.timeOutEvents.find(element => element.date === dateStamp)

    return (timeOutObj.hour - timeInObj.hour)/100
}

cRecord = createEmployeeRecord(["Julius", "Caesar", "General", 27])
updatedBpRecord = createTimeInEvent(cRecord, "0044-03-15 0900")
updatedBpRecord = createTimeOutEvent(cRecord, "0044-03-15 1100")

const wagesEarnedOnDate = (employeeRecordObj, dateStamp) => {
    let payOwed = hoursWorkedOnDate (employeeRecordObj, dateStamp)
    return payOwed * employeeRecordObj.payPerHour
}

const allWagesFor = (employeeRecordObj) => {
    let allDatesWorked = []

    employeeRecordObj.timeInEvents.forEach(dayWorked => {
        allDatesWorked.push(dayWorked.date)
    })

    let total = 0

    for (const dateStamp of allDatesWorked) {
        total += wagesEarnedOnDate(employeeRecordObj, dateStamp)
    }
    return total
}

const findEmployeeByFirstName = (ArrOfEmployeeObject, firstName) => {
    return ArrOfEmployeeObject.find(employee => firstName === employee.firstName)
}

const calculatePayroll = (ArrOfEmployeeObject) => {
    let totalWages = 0
    ArrOfEmployeeObject.forEach(element => {
        totalWages = totalWages + allWagesFor(element)
    })
    return totalWages
}

let rRecord = createEmployeeRecord(["Rafiki", "", "Aide", 10])
let sRecord = createEmployeeRecord(["Simba", "", "King", 100])

let sTimeData = [
    ["2019-01-01 0900", "2019-01-01 1300"], // 4 * 100 = 400
    ["2019-01-02 1000", "2019-01-02 1300"]  // 3 * 100 = 300 ===> 700 total
]

let rTimeData = [
    ["2019-01-11 0900", "2019-01-11 1300"], // 4 * 10 = 40
    ["2019-01-12 1000", "2019-01-12 1300"]  // 3 * 10 = 40 ===> 70 total ||=> 770
]

sTimeData.forEach(function (d) {
    let [dIn, dOut] = d
    sRecord = createTimeInEvent(sRecord, dIn)
    sRecord = createTimeOutEvent(sRecord, dOut)
})

rTimeData.forEach(function (d, i) {
    let [dIn, dOut] = d
    rRecord = createTimeInEvent(rRecord, dIn)
    rRecord = createTimeOutEvent(rRecord, dOut)
})

let employees = [sRecord, rRecord]
let grandTotalOwed = employees.reduce((m, e) => m + allWagesFor(e), 0)
console.log(employees) // => array of 2 employee objects
console.log(grandTotalOwed) // => returns total wages