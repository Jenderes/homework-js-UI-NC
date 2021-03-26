//let str = "1 x^2 - 8x + 15 = 0";
let button = document.getElementById("buttonAnswer").addEventListener('click', getAnswer, false);

// Получение ответа и вывод ошибок
function getAnswer() {
    let str = document.getElementById("formulaString").value;
    let error = document.getElementById("error");
    let strFullPatern = str.replace(/\s+/g, "");
    let strCoefPattern = str.trim().replace(/\s+/g, " ");

    // Регулярное выражения которые проверяет введенное уровнение, можно использовать десятичные числа
    let patternFull = /(-*(?!0{2,})\d+([.,]\d+){0,1})x\^2((-|\+)(?!0{2,})\d+([.,]\d+){0,1})x((-|\+)(?!0{2,})\d+([.,]\d+){0,1})=0/;

    // Регулярное выражения которые проверяет введенные коэффициенты, можно использовать десятичные числа
    let patternCoef = /(-*(?!0{2,})\d+([.,]\d+){0,1})\s+(-*(?!0{2,})\d+([.,]\d+){0,1})\s+(-*(?!0{2,})\d+([.,]\d+){0,1})/;
    let answer = "";

    if (patternFull.test(strFullPatern)) {
        let group = patternFull.exec(str);
        console.log(group);
        answer = calculateDiscriminant(group[1], group[3], group[6]);
        addElement(strFullPatern, answer);
        error.textContent = "";
    } else if (patternCoef.test(strCoefPattern)) {
        let group = patternCoef.exec(str);
        console.log(group);
        answer = calculateDiscriminant(group[1], group[3], group[5]);
        addElement(strCoefPattern, answer);
        error.textContent = "";
    } else {
        error.textContent = "Ошибка: неправельный ввод данных";
    }
}

// Расчет дескриминанта
function calculateDiscriminant(a, b, c) {
    let D = b * b - 4 * a * c;
    if (D > 0) {
        let x1 = ((-b - Math.sqrt(D)) / (2 * a)).toFixed(1);
        let x2 = ((-b + Math.sqrt(D)) / (2 * a)).toFixed(1);
        return "x1 = " + x1 + ", x2 = " + x2;
    } else if (D == 0) {
        let x = (-b / (2 * a)).toFixed(1);
        return "x = " + x;
    } else {
        return "Уравнение не имеет корней";
    }
}

// Добавление элемента в таблицу
function addElement(str, answer) {
    let table = document.getElementById("body_answer");
    let tr = document.createElement("tr");
    let tdFormul = document.createElement("td");
    let tdAnwer = document.createElement("td");

    tdFormul.innerHTML = str;
    tdAnwer.innerHTML = answer;
    tr.classList.add("tr_inf");
    tr.appendChild(tdFormul);
    tr.appendChild(tdAnwer);
    tr.addEventListener('click', function (e) {
        e.target.parentElement.remove();
    }, false);
    table.appendChild(tr);
}