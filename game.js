// 游戏变量
let targetNumber;
let guessHistory = [];

// 初始化游戏
function initGame() {
    // 生成0-100之间的随机数
    targetNumber = Math.floor(Math.random() * 101);
    guessHistory = [];
    
    // 清空界面
    document.getElementById('guessInput').value = '';
    document.getElementById('result').textContent = '';
    document.getElementById('result').className = 'result';
    document.getElementById('history').innerHTML = '<h3>猜测历史</h3><ul></ul>';
    
    console.log('游戏已初始化，目标数字：', targetNumber);
}

// 处理猜测
function handleGuess() {
    const input = document.getElementById('guessInput');
    const resultDiv = document.getElementById('result');
    const historyDiv = document.getElementById('history');
    
    const guess = parseInt(input.value);
    
    // 验证输入
    if (isNaN(guess)) {
        showResult('请输入有效数字', 'error');
        return;
    }
    
    // 验证范围
    if (guess < 0 || guess > 100) {
        showResult('你sb吧', 'error');
        return;
    }
    
    // 记录猜测
    guessHistory.push(guess);
    updateHistory();
    
    // 判断猜测结果
    if (guess === targetNumber) {
        showResult('答对了！', 'correct');
    } else if (guess < targetNumber) {
        showResult('小了', 'too-low');
    } else {
        showResult('大了', 'too-high');
    }
    
    // 清空输入框
    input.value = '';
    input.focus();
}

// 显示结果
function showResult(message, type) {
    const resultDiv = document.getElementById('result');
    resultDiv.textContent = message;
    resultDiv.className = `result ${type}`;
}

// 更新历史记录
function updateHistory() {
    const historyDiv = document.getElementById('history');
    const ul = historyDiv.querySelector('ul');
    
    ul.innerHTML = '';
    
    guessHistory.forEach((guess, index) => {
        const li = document.createElement('li');
        li.textContent = `第${index + 1}次：${guess}`;
        ul.appendChild(li);
    });
    
    // 滚动到底部
    historyDiv.scrollTop = historyDiv.scrollHeight;
}

// 事件监听器
document.addEventListener('DOMContentLoaded', function() {
    // 初始化游戏
    initGame();
    
    // 猜测按钮点击事件
    document.getElementById('guessButton').addEventListener('click', handleGuess);
    
    // 回车键事件
    document.getElementById('guessInput').addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            handleGuess();
        }
    });
    
    // 重新开始按钮点击事件
    document.getElementById('resetButton').addEventListener('click', initGame);
});
