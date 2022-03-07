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
    console.log(task);
    addTask(task);
};

/** taskを受け取って、tasks配列に追加する
 * @param task
 * @return tasks
 */
function addTask(x) {
    tasks.push(x);
    console.log(tasks);
    displayTaskList();
    storeTasks(tasks);
    console.log(localStorage);
}


//削除するtaskの添え数deleteIndexを受け取り、tasksの対応するtaskを削除する
/**
 * @param  {int} deleteIndex
 * @return tasks
 */
function deleteTask(deleteIndex){
    tasks = tasks.splice(deleteIndex);   //spliceも配列オブジェクトの組み込みメソッド
    displayTaskList();
    localStorage.removeItem(i);
}


//tasksの情報をtaskListTbodyに移して、それを表示する
function displayTaskList() {
    //初期化(これを書かないで実験してみると...)
    taskListTbody.innerText = "";

    for(let i = 0; i < tasks.length; i++) {
        const task = tasks[i];
        console.log(task);
        let taskTr = document.createElement('tr');
        let taskTd = document.createElement('td');

        
        taskTd.innerText = task.month;
        console.log(taskTd.innerText);
        taskTr.appendChild(taskTd);

        taskTd = document.createElement('td');
        taskTd.innerText = task.status;
        console.log(taskTd.innerText);
        taskTr.appendChild(taskTd);

        taskTd = document.createElement('td');
        taskTd.innerText = task.title;
        console.log(taskTd.innerText);
        taskTr.appendChild(taskTd);

        taskTd = document.createElement('td');
        taskTd.innerText = task.detail;
        console.log(taskTd.innerText);
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
        console.log(taskTr);
        taskListTbody.appendChild(taskTr);
    };
}

//一回目にブラウザを読み込んだときは以下の処理をする。
if (localStorage.length === 0) {
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

    //addSampleを呼んでおく

    addSample();
}

/** tasksを受け取って、その要素をストレージに保存する
 * @param {array} tasks
 * 
 */

 function storeTasks(tasks) {
     //初期化
    localStorage.clear

     for(let i = 0; i < tasks.length; i++){
        const taskJSON = JSON.stringify(tasks[i])
        localStorage.setItem(i , taskJSON);
     }
}



/**
 * localStorageから、保存しておいたリストを呼ぶ
 * 
 * 
 */
function callLocal() {
    for (let i = 0; i < localStorage.length; i++){
    const tasksParse = JSON.parse(localStorage.getItem(i));
    tasks.push(tasksParse);
    }
}

