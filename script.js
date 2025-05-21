let question = [
    { kana: "あ", roma: "a" },
    { kana: "い", roma: "i" },
    { kana: "う", roma: "u" },
    { kana: "え", roma: "e" },
    { kana: "お", roma: "o" },
    { kana: "か", roma: "ka" },
    { kana: "き", roma: "ki" },
    { kana: "く", roma: "ku" },
    { kana: "け", roma: "ke" },
    { kana: "こ", roma: "ko" },
    { kana: "さ", roma: "sa" },
    { kana: "し", roma: "shi" },
    { kana: "す", roma: "su" },
    { kana: "せ", roma: "se" },
    { kana: "そ", roma: "so" },
    { kana: "た", roma: "ta" },
    { kana: "ち", roma: "chi" },
    { kana: "つ", roma: "tsu" },
    { kana: "て", roma: "te" },
    { kana: "と", roma: "to" },
    { kana: "な", roma: "na" },
    { kana: "に", roma: "ni" },
    { kana: "ぬ", roma: "nu" },
    { kana: "ね", roma: "ne" },
    { kana: "の", roma: "no" },
    { kana: "は", roma: "ha" },
    { kana: "ひ", roma: "hi" },
    { kana: "ふ", roma: "fu" },
    { kana: "へ", roma: "he" },
    { kana: "ほ", roma: "ho" },
    { kana: "ま", roma: "ma" },
    { kana: "み", roma: "mi" },
    { kana: "む", roma: "mu" },
    { kana: "め", roma: "me" },
    { kana: "も", roma: "mo" },
    { kana: "や", roma: "ya" },
    { kana: "ゆ", roma: "yu" },
    { kana: "よ", roma: "yo" },
    { kana: "ら", roma: "ra" },
    { kana: "り", roma: "ri" },
    { kana: "る", roma: "ru" },
    { kana: "れ", roma: "re" },
    { kana: "ろ", roma: "ro" },
    { kana: "わ", roma: "wa" },
    { kana: "を", roma: "wo" },
    { kana: "ん", roma: "n" },
];

let answerInput = document.getElementById("answer");
let checkButton = document.getElementById("check");
let resultBox = document.getElementById("result");
let typingBox = document.getElementById("typing");
let resetbutton = document.getElementById("reset");
let nextbutton = document.getElementById("next");
let questionBox = document.getElementById("question");
let correctCount = 0;
let wrongCount = 0;
let wrongList = [];
let accuracyBox = document.getElementById("accuracy");
let isWrongMode = false;
let modeStatus = document.getElementById("modeStatus");
let toggleMode = document.getElementById("wrongMode");

let currentQuestionIndex = Math.floor(Math.random() * question.length);
let currentQuestion = question[currentQuestionIndex];
questionBox.textContent = currentQuestion.kana;


function loadNewQuestion() {
    let source = isWrongMode ? wrongList : question;
    currentQuestionIndex = Math.floor(Math.random() * source.length);
    currentQuestion = source[currentQuestionIndex];
    questionBox.textContent = currentQuestion.kana;
    answerInput.value = "";
    resultBox.textContent = "結果會顯示在這裡";
    typingBox.textContent = "(你現在輸入的文字會顯示在這裡)";
}

function restartQuestion() {
    answerInput.value = "";
    resultBox.textContent = "結果會顯示在這裡";
    typingBox.textContent = "(你現在輸入的文字會顯示在這裡)";
}

function accuracyCount() {
    let total = correctCount + wrongCount;
    let rate = total === 0 ? 0 : Math.round((correctCount / total) * 100);
    accuracyBox.textContent = `正確率:${rate}% (${correctCount} / ${total})`
}

function updateScore() {
    document.getElementById("score").textContent = `答對:${correctCount}題，答錯${wrongCount}題`
    accuracyCount();
}


answerInput.addEventListener("input", function () {
    typingBox.textContent = "你正在輸入:" + this.value;
})

checkButton.addEventListener("click", function () {
    let userInput = answerInput.value

    if (userInput === currentQuestion.roma) {
        resultBox.textContent = "回答正確！";
        if (!isWrongMode) {
            correctCount++;
        }
        if (isWrongMode) {
            wrongList = wrongList.filter(q => q.kana !== currentQuestion.kana);
            if (wrongList.length === 0) {
                isWrongMode = false;
                toggleMode.textContent = "進入錯題模式";
                modeStatus.textContent = "(目前為一般模式)";
                alert("你已完成所有錯題，已返回一般模式！")
            }
        }
    } else {
        resultBox.textContent = `回答錯誤！，正解是:${currentQuestion.roma}`;
        wrongCount++;

        if (!wrongList.some(item => item.kana === currentQuestion.kana)) {
            wrongList.push(currentQuestion)
        }

    }
    updateScore();
});

document.getElementById("clearScore").addEventListener("click", function () {
    correctCount = 0
    wrongCount = 0
    updateScore();
    alert("成績已重置！！");
});

document.getElementById("showWrong").addEventListener("click", function () {
    if (wrongList.length === 0) {
        alert("目前沒有錯題！")
    } else {
        alert("目前錯過的假名有：\n" + wrongList.map(q => q.kana).join("、"));
    }

});

document.getElementById("wrongMode").addEventListener("click", function () {
    if (wrongList.length === 0) {
        alert("目前沒有錯題，無法切換！")
        return
    }

    isWrongMode = !isWrongMode;

    if (isWrongMode) {
        this.textContent = "返回一般模式"
        modeStatus.textContent = "目前為錯題模式"
    } else {
        this.textContent = "進入錯題模式"
        modeStatus.textContent = "目前為一般模式"
    }
    loadNewQuestion();
});



resetbutton.addEventListener("click", restartQuestion);
nextbutton.addEventListener("click", loadNewQuestion);







