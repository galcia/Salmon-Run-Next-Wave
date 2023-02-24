const KingSalmonid = ['Cohozuna', 'Horrorboros'];
const KingSalmonidName = { Cohozuna: 'ヨコヅナ', Horrorboros: 'タツ' };
const LOCAL_STORAGE_KEY = "0b8210cf751a851e31a9985e904b14e3bd4b1cb76cdc4d554879030e9eb557e1fc68c3d9e17b0aea878d300a1918c7c2b0584f03355eb5f5e5f37daf359b1873"

var cnt = { Cohozuna: { count: 0 }, Horrorboros: { count: 0 } };

function init() {
  loadLocalStorage()
  setSubjugation();
  KingSalmonid.forEach(key => {
    $(`#${key}_cnt`).text(cnt[key].count)
  })
}

function setSubjugationSum(id, n) {
  cnt[id].count = n
  $(`#${id}_cnt`).text(n);


  addLog(`set ${id} to ${n}`)
  setSubjugation();
  saveLocalStorage()
}
function getSubjugationSum(id) {
  return Number($(`#${id}_cnt`).text());
}

function setSubjugation() {
  $('#subjugation_sum').text(getSum())
}

function getSum() {
  return cnt.Cohozuna.count + cnt.Horrorboros.count
}


/** データをストレージに保存する
 * 
 */
function saveLocalStorage() {
  var setjson = JSON.stringify(cnt);
  localStorage.setItem(LOCAL_STORAGE_KEY, setjson);

  addLog("saved local storage")
}

/** 過去データをロードする
 * 
 */
function loadLocalStorage() {
  if (localStorage.getItem(LOCAL_STORAGE_KEY)) {
    var obj = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY));
    cnt = obj

    addLog("load local storage")
  } else {
    addLog("no data")
  }

}

/** 過去データを削除する
* 
*/
function deleteLocalStorage() {
  localStorage.removeItem(LOCAL_STORAGE_KEY);
  addLog("deleted storage")
}

function addLog(text) {
  $('#log').text(text + '\n' + $('#log').text())
}