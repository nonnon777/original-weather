document.addEventListener("keydown", keypress_ivent);
document.addEventListener("keyup", keyup_ivent);
document.addEventListener(
  "dblclick",
  function (e) {
    e.preventDefault();
  },
  { passive: false }
);
var x = 4;
var y = 0;
var score = 0;
var text = document.getElementById("scoredisp");
text.textContent = "score:" + score;
var start = 0;
var keyS = 1;
var keyA = 1;
var keyD = 1;
var keyW = 1;
var interval = 500;
let loop = setInterval(main, interval);
function removetest(){
  var element = document.getElementById("test");
  if (element) {
    getClassNameAndRemoveById("test");
    return element.className;
    
  } else {
    return null; 
  }
  
}
var id = removetest();
console.log(id);
function gettoken(){
  let urldata =
    "https://nonnon777-original-we-41.deno.dev/game/highscore.csv";
  let request = new XMLHttpRequest();
  request.open("GET", urldata, true);
  request.send("");

  request.onreadystatechange = function () {
    if (request.readyState == 4 && request.status == 200) {
      //受信完了時の処理
      console.log(request.responseText);
    }
  }
}


function SendData() {
  const textbox1 = document.getElementById("name");

  let url = "https://script.google.com/macros/s/AKfycbxwvE96q5jH0g5bcpz7yEVNUkY6Vf_D925yY9Xk-MDak7xx7Os0TO13tsBcmNNd-o1W/exec";

  // ハンドルネームの欄になにも入力されていなければ「名無しさん」とする
  let name = textbox1.value;
  if (name == "") name = "名無しさん";

  const data = {
    'name': name,
    'score': score
  };
  const options = {
    'method': 'post',
    'headers': {
      'Content-Type': 'application/json'
      //,'Authorization': `Bearer ${token}` //ウェブアプリを全体公開出来ない場合この認証が必要なので、コメントアウトをはずす。
    },
    'payload': JSON.stringify(data) //送りたいデータをpayloadに配置してJSON形式変換。
  };
  res = UrlFetchApp.fetch(url, options); 
  
}

//block配列作成
var block = new Array(11); // 11行
for (let i = 0; i < 11; i++) {
  block[i] = new Array(21); // 21列
}
for (let i = 0; i < 11; i++) {
  for (let j = 0; j < 21; j++) {
    block[i][j] = 0;
    if (i == 10 || j == 20) {
      block[i][j] = 1;
    }
  }
}
//終了
var block_pattern_next = [
  [0, 0, 0],
  [0, 0, 0],
  [0, 0, 0],
];
var block_pattern = [
  [0, 0, 0],
  [0, 0, 0],
  [0, 0, 0],
];
const p0 = [
  [0, 1, 0],
  [1, 1, 1],
  [0, 0, 0],
]; //凸
const p1 = [
  [0, 1, 0],
  [0, 1, 0],
  [0, 1, 0],
]; //｜
const p2 = [
  [1, 1, 0],
  [0, 1, 1],
  [0, 0, 0],
]; //N
const p3 = [
  [0, 1, 1],
  [1, 1, 0],
  [0, 0, 0],
]; //Nの逆
const p4 = [
  [0, 1, 0],
  [0, 1, 0],
  [0, 1, 1],
]; //L
const p5 = [
  [0, 1, 0],
  [0, 1, 0],
  [1, 1, 0],
]; //Lの逆
const p6 = [
  [0, 0, 0],
  [0, 1, 0],
  [0, 0, 0],
]; // ・
const p7 = [
  [1, 1, 0],
  [1, 1, 0],
  [0, 0, 0],
]; //四角
const p8 = [
  [1, 0, 0],
  [0, 1, 0],
  [0, 0, 1],
]; //斜め
const p9 = [
  [0, 0, 0],
  [1, 1, 1],
  [1, 0, 1],
]; //U
const p10 = [
  [0, 1, 0],
  [1, 1, 1],
  [0, 1, 0],
]; //+

const p11 = [
  [0, 1, 0],
  [0, 1, 0],
  [0, 1, 0],
]; //｜
const p12 = [
  [0, 1, 0],
  [0, 1, 0],
  [0, 1, 0],
]; //｜
const p13 = [
  [0, 1, 0],
  [1, 1, 1],
  [0, 0, 0],
]; //凸
const p14 = [
  [0, 0, 0],
  [0, 1, 0],
  [0, 0, 0],
]; // ・
const block_pattern_memory = [
  p0,
  p1,
  p2,
  p3,
  p4,
  p5,
  p6,
  p7,
  p8,
  p9,
  p10,
  p11,
  p12,
  p13,
  p14,
];
random();
random();
setcolor();
function keypress_ivent(e) {
  //キーイベント　押したとき

  if (e.code == "KeyA" || e.code == "ArrowLeft") {
    if (lefttest() == 1) {
      if (keyA == 1) {
        x--;
        keyA = 0;
      }
    }
  } else if (e.code == "KeyD" || e.code == "ArrowRight") {
    if (righttest() == 1) {
      if (keyD == 1) {
        x++;
        keyD = 0;
      }
    }
  } else if (e.code == "KeyS" || e.code == "ArrowDown") {
    if (keyS == 1) {
      clk_fall();
      keyS = 0;
    }
    down = 1;
  } else if (e.code == "KeyW" || e.code == "ArrowUp") {
    if (keyW == 1) {
      rotate();
    }
  }
  setcolor();
}
function keyup_ivent(e) {
  //キーイベント 離した時

  if (e.code == "KeyA" || e.code == "ArrowLeft") {
    keyA = 1;
  } else if (e.code == "KeyD" || e.code == "ArrowRight") {
    keyD = 1;
  } else if (e.code == "KeyS" || e.code == "ArrowDown") {
    keyS = 1;
  } else if (e.code == "KeyS" || e.code == "ArrowDown") {
    keyW = 0;
  }
}
function clk_start() {
  start = 1;
}
function clk_reset() {
  gamereset();
}
function clk_left() {
  if (start == 1) {
    if (lefttest() == 1) {
      x--;
    }
    setcolor();
  }
}
function clk_right() {
  if (start == 1) {
    if (righttest() == 1) {
      x++;
    }
    setcolor();
  }
}
function clk_rote() {
  if (start == 1) {
    rotate();
  }
}
function clk_fall() {
  if (start == 1) {
    fall();
  }
}

function main() {
  console.log(start, interval, "インターバル");
  if (start == 1) {
    console.log(falltest() + "falltest");
    if (falltest() == 1) {
      y++;
      setcolor();
    } else {
      setblock();
      block_pattern = [
        [0, 0, 0],
        [0, 0, 0],
        [0, 0, 0],
      ];
      setcolor();
      line();
      overtest();
      random();
      setcolor();
    }
  }
}
function setcolor() {
  //blockの値に応じて色の変更
  for (let i = 0; i < 10; i++) {
    for (let j = 0; j < 20; j++) {
      if (block[i][j] == 1) {
        var block_id = document.getElementById(i + "." + j);
        block_id.style.backgroundColor = "rgb(100, 0, 0)";
      } else if (block[i][j] == 0) {
        var block_id = document.getElementById(i + "." + j);
        block_id.style.backgroundColor = "rgb(151, 151, 151)";
      }
    }
  }
  patterncolor();
}
function patterncolor() {
  //block_patternに応じて色の変更
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      let ii = i + x;
      let jj = j + y;
      if (block_pattern[i][j] == 1) {
        var block_id = document.getElementById(ii + "." + jj);
        block_id.style.backgroundColor = "red";
      }
    }
  }
}
function setblock() {
  //block_patternの値をblockcoloerに代入
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      if (block_pattern[i][j] == 1) {
        block[x + i][y + j] = 1;
        console.log(block[x + i][y + j] + "block[][]");
      }
    }
  }
  x = 4;
  y = 0;
  setcolor();
}
function falltest() {
  //下のblock検知 あるなら0,ないなら1
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      if (block_pattern[i][j] == 1) {
        if (block[x + i][y + j + 1] == 1) {
          return 0;
        }
      }
    }
  }
  return 1;
}
function lefttest() {
  //左のブロック検知 あるなら0,ないなら1
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      if (block_pattern[i][j] == 1) {
        if (block[x + i - 1][y + j] == 1) {
          return 0;
        }
      }
    }
  }
  return 1;
}
function righttest() {
  //右のブロック検知 あるなら0,ないなら1
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      if (block_pattern[i][j] == 1) {
        if (block[x + i + 1][y + j] == 1) {
          return 0;
        }
      }
    }
  }
  return 1;
}
function fall() {
  for (let cnt = 0; cnt < 5; cnt++) {
    if (falltest() == 1) {
      y++;
      setcolor();
    } else {
      down = 0;
    }
  }
}
function rotate() {
  //回転プログラム
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      if (block[x + i][y + j] == 1) {
        console.log("回転不可");
        return 0;
      }
    }
  }
  var copy = [
    [0, 0, 0],
    [0, 0, 0],
    [0, 0, 0],
  ];
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      if (block_pattern[i][j] == 1) {
        let jj = 2 - j;
        copy[jj][i] = 1;
        console.log(copy[jj][i]);
      }
    }
  }
  block_pattern = copy;
  setcolor();
}
function random() {
  //ランダムpatternとnext_block表示
  var min = 0;
  var max = 14;
  var a = Math.floor(Math.random() * (max + 1 - min)) + min;
  block_pattern = block_pattern_next;
  block_pattern_next = block_pattern_memory[a];
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      if (block_pattern_next[i][j] == 1) {
        var block_id = document.getElementById("n" + i + "." + j);
        block_id.style.backgroundColor = "red";
      } else {
        var block_id = document.getElementById("n" + i + "." + j);
        block_id.style.backgroundColor = "rgb(151, 151, 151)";
      }
    }
  }
  console.log(block_pattern_next + "a:" + a);
}
function line() {
  //横ぞろい検知と削除とスコア加算
  var bonus = -1;
  for (let jj = 19; jj >= 0; jj--) {
    var linetest = 0;
    for (let i = 0; i < 10; i++) {
      linetest += block[i][jj];
    }
    if (linetest == 10) {
      for (let i = 0; i < 10; i++) {
        block[i][jj] = 0;
      }
      for (let jjj = jj; jjj >= 1; jjj--) {
        for (let ii = 0; ii < 10; ii++) {
          block[ii][jjj] = block[ii][jjj - 1];
          block[ii][jjj - 1] = 0;
        }
      }
      jj++;
      score += 100;
      interval -= 5;
      clearInterval(loop);
      loop = setInterval(main, interval);
      bonus++;
    }
    setcolor();
  }
  var msg = document.getElementById("msg");
  msg.textContent = "";
  if (bonus > 0) {
    score += bonus * 100;
    console.log("連続ボーナス+" + bonus * 100);
    var msg = document.getElementById("msg");
    msg.textContent = "連続ボーナス+" + bonus * 100;
  }
  console.log(score + "スコア," + bonus);
  var text = document.getElementById("scoredisp");
  text.textContent = "score:" + score;
}
function overtest() {
  for (let i = 0; i < 10; i++) {
    let j = 0;
    if (block[i][j] == 1) {
      console.log("gameover");
      gamereset();
    }
  }
}
function gamereset() {
  for (let i = 0; i < 11; i++) {
    for (let j = 0; j < 21; j++) {
      block[i][j] = 0;
      if (i == 10 || j == 20) {
        block[i][j] = 1;
      }
    }
  }
  clearInterval(loop);
  SendData();
  if (!alert("今回のスコアは[" + score + "]でした。")) {
    document.getElementById("highscore").contentWindow.location.reload();
  }
  start = 0;
  x = 4;
  y = 0;
  score = 0;
  interval = 500;
  var text = document.getElementById("scoredisp");
  text.textContent = "score:" + score;
  block_pattern_next = [
    [0, 0, 0],
    [0, 0, 0],
    [0, 0, 0],
  ];
  block_pattern = [
    [0, 0, 0],
    [0, 0, 0],
    [0, 0, 0],
  ];
  random();
  random();
  setcolor();
  loop = setInterval(main, interval);
}
