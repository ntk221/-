'use strict';

/**
 * HTML要素を取得
 */
const taskMonth     = document.getElementById("taskmonth");
const taskStatus    = document.getElementById("taskstatus");
const taskTitle     = document.getElementById("tasktitle");
const taskDetail    = document.getElementById("taskdetail");
const submitButton  = document.getElementById("submit");
const taskListTbody = document.getElementById("tasklist");

//タスクを管理する配列
let tasks = [];

//登録ボタンがクリックされたら、入力された値を代入されたタスクオブジェクトを生成して、tasksに追加する
submitButton.onclick = () => {
    let task = {           
        month : taskMonth.value,
        status : taskStatus.value,
        title : taskTitle.value,
        detail : taskDetail.value
    }
    addTask(task);
    updateStorage();
};

/** taskを受け取って、tasks配列に追加する
 * @param task
 * @return tasks
 */
function addTask(x) {
    tasks.push(x);
    displayTaskList();
}


//削除するtaskの添え数deleteIndexを受け取り、tasksとlocalStorageから対応するtaskを削除して、displayTaskListを呼ぶ
/**
 * @param  {int} deleteIndex
 * @return tasks
 */
function deleteTask(deleteIndex){
    tasks.splice(deleteIndex,1);   //spliceも配列オブジェクトの組み込みメソッド
    updateStorage();
    displayTaskList();
}


 /** tasksを受け取って、その要素をストレージに保存する
 * @param {array} tasks
 * @return localStrage
 */

  function updateStorage() {
    //初期化
   localStorage.clear();

    for(let i = 0; i < tasks.length; i++){
       const taskJSON = JSON.stringify(tasks[i]);
       localStorage.setItem(i , taskJSON);
    }
}

// localStrageに保存されているtaskの添え数を受け取り、対応するtaskを削除する




//tasksの情報をtaskListTbodyに移して、それを表示する
function displayTaskList() {
    //初期化(これを書かないで実験してみると...)
    taskListTbody.innerText = "";

    for(let i = 0; i < tasks.length; i++) {
        const task = tasks[i];
        let taskTr = document.createElement('tr');
        let taskTd = document.createElement('td');

        
        taskTd.innerText = task.month;
        taskTr.appendChild(taskTd);

        taskTd = document.createElement('td');
        taskTd.innerText = task.status;
        taskTr.appendChild(taskTd);

        taskTd = document.createElement('td');
        taskTd.innerText = task.title;
        taskTr.appendChild(taskTd);

        taskTd = document.createElement('td');
        taskTd.innerText = task.detail;
        taskTr.appendChild(taskTd);

        //削除ボタンを作成する
        let deleteTd = document.createElement('td');
        const deleteButton = document.createElement('button');
        deleteButton.innerText = "削除";

        //削除ボタンが押されたときの処理
        deleteButton.onclick = () => {
                deleteTask(i);
        }
        deleteTd.appendChild(deleteButton);
        taskTr.appendChild(deleteTd);
        taskListTbody.appendChild(taskTr);
    };
}

//HTML作成時に記述したサンプルデータをtaskListTbodyに登録する
function addSample() {
    let task = {
        month : "2021-07",
        status : "済",
        title : "A社経営統合プロジェクト",
        detail : "統合計画に伴う業務プロセス統合プロジェクト。\nプロジェクトリーダー(メンバー4人)として担当。\nQDC目標いずれも達成。 CS評価で5をいただいた。"
    };
    addTask(task);
 }


//一回目にブラウザを読み込んだときはサンプルをtasksに追加して表示する。そうでないときは、ストレージに保存したタスクを追加して表示する

function loadBrowser() {
if (localStorage.length === 0) {
    addSample();
} else {
    //初期化
    tasks = [];
     for (let i = 0; i < localStorage.length; i++) {
        const taskParsed = JSON.parse(localStorage.getItem(i));
        tasks.push(taskParsed);
        displayTaskList(tasks);
    };
};
}

loadBrowser();





