/**
 *   @author Bloswick, Mackenzie (bloswickm@student.ncmich.edu)
 *   @version 0.0.1
 *   @summary Final Exam || created: 12.12.2016
 *   @todo
 */

"use strict";
const IO = require(`fs`);
let PROMPT = require(`readline-sync`);

let foodLogs = [], menu = [], months = [], meals = [], logEntryInfo = [];
let userChoice, correct, firstTime;

function main() {
    if (firstTime == null) {
        populateFoodLogs();
        populateMenu();
        populateMonthsAndMeals();
        firstTime = 0;
    }
    mainMenu();
    if (userChoice == 1) {
        setDate();
        addFoodLog();
    }
    else if (userChoice == 2) {
        setDate();
        addMealToMenuPlan();
    }
    else if (userChoice == 3) {
        viewFoodLogs();
    }
    else if (userChoice == 4) {
        viewMenuPlan();
    }
}

main();

function populateFoodLogs() {
    let fileContents = IO.readFileSync(`foodLogs.csv`, 'utf8');
    let lines = fileContents.toString().split(/\r?\n/);
    for (let i = 0; i < lines.length; i++) {
        foodLogs.push(lines[i].toString().split(/,/));
    }
}

function populateMenu() {
    let fileContents = IO.readFileSync(`menu.csv`, 'utf8');
    let lines = fileContents.toString().split(/\r?\n/);
    for (let i = 0; i < lines.length; i++) {
        menu.push(lines[i].toString().split(/,/));
    }
}

function populateMonthsAndMeals() {
    months[1] = 'January';
    months[2] = 'February';
    months[3] = 'March';
    months[4] = 'April';
    months[5] = 'May';
    months[6] = 'June';
    months[7] = 'July';
    months[8] = 'August';
    months[9] = 'September';
    months[10] = 'October';
    months[11] = 'November';
    months[12] = 'December';
    meals[1] = 'Breakfast';
    meals[2] = 'Lunch';
    meals[3] = 'Dinner';
    meals[4] = 'Snack';
}

function mainMenu() {
    userChoice = 0;
    while (userChoice < 1 || userChoice > 5) {
        userChoice = PROMPT.questionInt(`
        \n\tWelcome to Track Away The Pounds 2000!
        \n\n1. Add a Food Log
        \n\n2. Add an Item to Menu Plan
        \n\n3. View Food Logs
        \n\n4. View Menu Plan
        \n\n5. Exit
        \n\nPlease make a selection: `);
    }
}

function setDate() {
    let yearLog, monthLog, dayLog, hourLog;
    userChoice = 0;
    yearLog = 0;
    monthLog = 0;
    dayLog = 0;
    hourLog = -1;
    correct = 0;
    while (yearLog < 2014 || yearLog > 2017)
        yearLog = PROMPT.questionInt(`Answer the following questions about when you ate.\nYear? (Example: 2016): `);
    while (monthLog < 1 || monthLog > 12)
        monthLog = PROMPT.questionInt(`Which month of the year? (1 = January, 2 = February, etc.): `);
    while (dayLog < 1 || dayLog > 31)
        dayLog = PROMPT.questionInt(`Which day of the month? (1-31): `);
    while (hourLog < 0 || hourLog > 24)
        hourLog = PROMPT.questionInt(`Which hour of the day? (0-24): `);
    while (correct < 1 || correct > 2)
        correct = PROMPT.questionInt(`\nYou would like to log for ${months[monthLog]} ${dayLog}, ${yearLog} at ${hourLog}:00?
    \n(1 = Yes, 2 = No): `);
    if (correct == 2) {
        return setDate();
    }
    else {
        logEntryInfo[0] = hourLog + ':00';
        logEntryInfo[1] = dayLog;
        logEntryInfo[2] = monthLog;
        logEntryInfo[3] = yearLog;
    }
}

function addFoodLog() {
    let food, drink, fuel;
    while (userChoice < 1 || userChoice > 4)
        userChoice = PROMPT.questionInt(`\n1. Breakfast\n2. Lunch\n3. Dinner\n4. Snack\nWhich meal would you like to log for?: `);
    correct = 0;
    while (correct < 1 || correct > 2)
        correct = PROMPT.questionInt(`\nYou would like to log for ${meals[userChoice]}?\n(1 = Yes, 2 = No): `);
    if (correct == 2) {
        return addFoodLog();
    }
    else {
        food = PROMPT.question(`\nWhat did you eat for ${meals[userChoice]}?: `);
        drink = PROMPT.question(`\nWhat did you drink with your ${meals[userChoice]}?: `);
        fuel = PROMPT.question(`\nIf you're doing the THM diet, please enter what fuel your meal was.
        \nS (Satisfying), E (Energizing), FP (Fuel Pull), XO (Crossover)?: `);
        logEntryInfo[4] = food;
        logEntryInfo[5] = drink;
        logEntryInfo[6] = fuel;
        const COLUMNS = 7;
        IO.appendFileSync(`foodLogs.csv`, "\n", 'utf8');
        for (let i = 0; i < logEntryInfo.length; i++) {
            if (i < COLUMNS - 1) {
                IO.appendFileSync(`foodLogs.csv`, `${logEntryInfo[i]},`, 'utf8');
            }
            else {
                IO.appendFileSync(`foodLogs.csv`, logEntryInfo[i], 'utf8');
            }
        }
        IO.appendFileSync(`foodLogs.csv`, "\n", 'utf8');
        console.log(`\nYou've added a food log entry!`);
        return main();
    }
}

function addMealToMenuPlan() {
    let food, drink, fuel;
    userChoice = 0;
    while (userChoice < 1 || userChoice > 4)
        userChoice = PROMPT.questionInt(`\n1. Breakfast\n2. Lunch\n3. Dinner\n4. Snack\nWhich meal would you like to menu plan for?: `);
    correct = 0;
    while (correct < 1 || correct > 2)
        correct = PROMPT.questionInt(`\nYou would like to plan for ${meals[userChoice]}?\n(1 = Yes, 2 = No): `);
    if (correct == 2) {
        return addMealToMenuPlan();
    }
    else {
        food = PROMPT.question(`\nWhat food items would you like to add for ${meals[userChoice]}?: `);
        drink = PROMPT.question(`\nWhat drinks would you like to add with the ${meals[userChoice]}?: `);
        fuel = PROMPT.question(`\nIf you're doing the THM diet, please enter what fuel the meal is.
        \nS (Satisfying), E (Energizing), FP (Fuel Pull), XO (Crossover)?: `);
        logEntryInfo[4] = meals[userChoice];
        logEntryInfo[5] = food;
        logEntryInfo[6] = drink;
        logEntryInfo[7] = fuel;
        const COLUMNS = 8;
        IO.appendFileSync(`menu.csv`, "\n", 'utf8');
        for (let i = 0; i < logEntryInfo.length; i++) {
            if (i < COLUMNS - 1) {
                IO.appendFileSync(`menu.csv`, `${logEntryInfo[i]},`, 'utf8');
            }
            else {
                IO.appendFileSync(`menu.csv`, logEntryInfo[i], 'utf8');
            }
        }
        IO.appendFileSync(`menu.csv`, "\n", 'utf8');
        console.log(`\nYou've added a meal to your food plan!`);
        return main();
    }
}

function viewFoodLogs() {
    userChoice = 0;
    while (userChoice < 1 || userChoice > 2)
        userChoice = PROMPT.questionInt(`\n1. View All Logs\n2. See Amount of Existing Logs\nPlease select: `);
    if (userChoice == 1) {
        const COLUMNS = 7;
        console.log(`\nOrder of log information: Time, Day, Month, Year, Meal, Food, Drink, Fuel.`);
        for (let i = 0; i < foodLogs.length; i++) {
            for (let j = 0; j < COLUMNS; j++) {
                console.log(foodLogs[i][j]);
            }
            console.log(`\n`);
        }
        return main();
    }
    else {
        let localVariable = foodLogs.length;
        printExistingLogs(localVariable);
    }
}

function printExistingLogs(passedVariable) {
    console.log(`\nYou currently have ${passedVariable} food logs!`);
    return main();
}

function viewMenuPlan() {
    const COLUMNS = 7;
    console.log(`\nOrder of log information: Time, Day, Month, Year, Meal, Food, Drink, Fuel.`);
    for (let i = 0; i < foodLogs.length; i++) {
        for (let j = 0; j < COLUMNS; j++) {
            console.log(foodLogs[i][j]);
        }
        console.log(`\n`);
    }
    return main();
}