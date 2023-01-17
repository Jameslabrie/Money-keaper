let startBtn = document.getElementById("start"),
  budgetValue = document.getElementsByClassName("budget-value")[0],
  daybudgetValue = document.getElementsByClassName("daybudget-value")[0],
  levelValue = document.getElementsByClassName("level-value")[0],
  expensesValue = document.getElementsByClassName("expenses-value")[0],
  optionalexpensesValue = document.getElementsByClassName(
    "optionalexpenses-value"
  )[0],
  incomeValue = document.getElementsByClassName("income-value")[0],
  monthSavingsValue = document.getElementsByClassName("monthsavings-value")[0],
  yearSavingsValue = document.getElementsByClassName("yearsavings-value")[0],
  yearValue = document.querySelector(".year-value"),
  monthValue = document.querySelector(".month-value"),
  dayValue = document.querySelector(".day-value"),
  expensesItem = document.getElementsByClassName("expenses-item"),
  expensesItemBtn = document.getElementsByTagName("button")[0],
  optionalExpensesBtn = document.getElementsByTagName("button")[1],
  countBtn = document.getElementsByTagName("button")[2],
  optionalExpensesItem = document.querySelectorAll(".optionalexpenses-item"),
  chooseIncome = document.querySelector(".choose-income"),
  savings = document.querySelector("#savings"),
  chooseSum = document.querySelector(".choose-sum"),
  choosePercent = document.querySelector(".choose-percent"),
  year = document.querySelector(".year"),
  month = document.querySelector(".month"),
  day = document.querySelector(".day");

let money, time, budgetInOneDay, optExpenses, sum;

expensesItemBtn.disabled = true;
optionalExpensesBtn.disabled = true;
countBtn.disabled = true;

startBtn.addEventListener("click", function () {
  time = prompt("Введите дату в формате YYYY-MM-DD", "");
  money = +prompt("Ваш бюджет на месяц?");
  expensesItemBtn.disabled = false;
  optionalExpensesBtn.disabled = false;
  countBtn.disabled = false;
  while (isNaN(money) || money == "" || money == null) {
    money = +prompt("Ваш бюджет на месяц?");
  }

  appData.budget = money;
  appData.timeData = time;
  budgetValue.textContent = money.toFixed(1);
  yearValue.value = new Date(Date.parse(time)).getFullYear();
  monthValue.value = new Date(Date.parse(time)).getMonth() + 1;
  dayValue.value = new Date(Date.parse(time)).getDate();
});

expensesItemBtn.addEventListener("click", function () {
  let sum = 0;

  for (let i = 0; i < expensesItem.length; i++) {
    let question1 = expensesItem[i].value,
      question2 = expensesItem[++i].value;

    if (
      typeof question1 == "string" &&
      typeof question1 != null &&
      typeof question2 != null &&
      question1 != "" &&
      question2 != "" &&
      question1.length < 20 &&
      question2.length < 10
    ) {
      appData.expenses[question1] = question2;
      sum += +question2;
    } else {
      i = i - 1;
    }
  }
  appData.sum = sum;
  expensesValue.textContent = sum;
});

optionalExpensesBtn.addEventListener("click", function () {
  for (let i = 0; i < optionalExpensesItem.length; i++) {
    let opt = optionalExpensesItem[i].value;
    appData.optionalExpenses[i] = opt;
    optionalexpensesValue.textContent += appData.optionalExpenses[i] + " ";
  }
});

countBtn.addEventListener("click", function () {
  if (appData.budget != undefined) {
    appData.budgetInOneDay = ((appData.budget - appData.sum) / 30).toFixed(1);
    daybudgetValue.textContent = appData.budgetInOneDay;

    if (appData.budgetInOneDay < 50) {
      levelValue.textContent = "Минимальный";
    } else if (appData.budgetInOneDay > 50 && appData.budgetInOneDay < 130) {
      levelValue.textContent = "Средний";
    } else if (appData.budgetInOneDay > 130) {
      levelValue.textContent = "Ни в чем себе не отказывайте!";
    } else {
      levelValue.textContent = "Произошла ошибка!";
    }
  } else {
    daybudgetValue.textContent = "Нажмите начать расчет!";
  }
});

chooseIncome.addEventListener("input", function () {
  let items = chooseIncome.value;

  appData.income = items.split(", ");
  incomeValue.textContent = appData.income;
});

savings.addEventListener("click", function () {
  if (appData.savings == true) {
    appData.savings = false;
  } else {
    appData.savings = true;
  }
});

chooseSum.addEventListener("input", function () {
  if (appData.savings == true) {
    let sum = +chooseSum.value,
      percent = +choosePercent.value;

    appData.monthIncome = (sum / 100 / 12) * percent;
    appData.yearIncome = (sum / 100) * percent;

    monthSavingsValue.textContent = appData.monthIncome.toFixed(1);
    yearSavingsValue.textContent = appData.yearIncome.toFixed(1);
  }
});

choosePercent.addEventListener("input", function () {
  if (appData.savings == true) {
    let sum = +chooseSum.value,
      percent = +choosePercent.value;

    appData.monthIncome = (sum / 100 / 12) * percent;
    appData.yearIncome = (sum / 100) * percent;

    monthSavingsValue.textContent = appData.monthIncome.toFixed(1);
    yearSavingsValue.textContent = appData.yearIncome.toFixed(1);
  }
});

let appData = {
  budget: money,
  timeData: time,
  expenses: {},
  optionalExpenses: {},
  income: [],
  savings: false,
  chooseExpenses: {},
  detectDayBudget: {},
  detectLevel: {},
  chooseOptExpenses: {},
  checkSavings: {},
  chooseIncome: {},
};
