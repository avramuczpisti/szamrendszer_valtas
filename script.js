const BIN = 2;
const OCT = 8;
const DEC = 10;
const HEX = 16;
// Aktuális számrendszer alapértelmezett értékének beállítása.
var current_num_sys = DEC;
// Faktoriális számítás.
function fact(n) {
    let res = 1;
    //0! = 1
    if (n === 0) {
        return 1;
    }
    for (let i = 2; i <= n; i++) {
        res = res * i;
    }
    return res;
}
function parseExpr(expr) {
    // Négyzetre emelés függvény
    const OFFSET = "Math.pow(";
    // <--- Négyzetgyök.
    for (i = 0; i < expr.length; i++) {
        if (expr[i] == "√") {
            isNumber = true;
            j = i + 1;
            while (isNumber && j < expr.length) {
                if (isFinite(expr[j])) {
                    j++;
                } else {
                    isNumber = false;
                }
            }
            expr = expr.substring(0, j) + ")" + expr.substring(j);
        }
    }
    // Gyökjel cseréje függvényhívásra.
    expr = expr.replace(/\√/g, "Math.sqrt(");
    // Négyzetgyök. --->
    // <--- Hatvány.
    for (i = 0; i < expr.length; i++) {
        if (expr[i] == "^") {
            // ^ karakter csere ,-re.
            firstPart = expr.substr(0, i);
            lastPart = expr.substr(i + 1);
            expr = firstPart + "," + lastPart;
            // Alap.
            isNumber = true;
            j = i - 1;
            while (isNumber && j >= 0) {
                if (isFinite(expr[j])) {
                    j--;
                } else {
                    isNumber = false;
                }
            }
            expr =
                expr.substring(0, j + 1) + OFFSET + expr.substring(j + 1, expr.length);
            // Kitevő.
            isNumber = true;
            j = i + 2 + OFFSET.length;
            while (isNumber && j < expr.length) {
                if (isFinite(expr[j])) {
                    j++;
                } else {
                    isNumber = false;
                }
            }
            // Kifejezés összeállítása rész-sztringekből.
            expr =
                expr.substring(0, j - 1) + expr.substring(j - 1, j) + ")" + expr.substring(j, expr.length);
            i = 0;
        }
    }
    // Hatvány. --->
    return expr;
}
//Eseménykezelő függvény
function num_sys_change(value, num_sys, selected_button) {
    new_value = Number(parseInt(value, current_num_sys)).toString(num_sys);
    current_num_sys = num_sys;
    //Az aktuálisan kiválasztott számrendszer gombjának stílusozása.
    clear_selected_num_sys();
    set_selected_num_sys(selected_button);
    return new_value;
}
function clear_selected_num_sys() {
    const collection = document.getElementsByClassName("num_sys_button_selected");
    for (let i = 0; i < collection.length; i++) {
        collection[i].classList.remove('num_sys_button_selected');
    }
}
function set_selected_num_sys(selected_button) {
    selected_button.classList.add('num_sys_button_selected');
}

function kettesQuizMegnyitasa(){
    window.open('tizenhatos_quiz.html')
}

function nyolcasQuizMegnyitasa(){
    window.open('tizenhatos_quiz.html')
}

function tizesQuizMegnyitasa(){
    window.open('tizenhatos_quiz.html')
}

function tizenhatosQuizMegnyitasa(){
    window.open('tizenhatos_quiz.html')
}