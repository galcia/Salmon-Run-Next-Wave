const LOCAL_STORAGE_KEY = "0b8210cf751a851e31a9985e904b14e3bd4b1cb76cdc4d554879030e9eb557e1fc68c3d9e17b0aea878d300a1918c7c2b0584f03355eb5f5e5f37daf359b1873"

const KingSalmonid = ['Cohozuna', 'Horrorboros'];
const BossSalmonids = ['steelhead', 'Flyfish', 'SteelEel', 'Scrapper', 'Stinger', 'Maws', 'BigShot', 'Drizzler', 'FishStick', 'FlipperFlopper', 'SlamminLid']
const SalmonidsData =
{
  'Cohozuna': { nameJP: 'ヨコヅナ' },
  'Horrorboros': { nameJP: 'タツ' },
  'steelhead': { HP: 300, nameJP: 'バクダン' },
  'Flyfish': { HP: 360, nameJP: 'カタパッド' },
  'Scrapper': { HP: 400, nameJP: 'テッパン' },
  'SteelEel': { HP: 500, nameJP: 'ヘビ' },
  'Stinger': { HP: 60, nameJP: 'タワー' },
  'Maws': { HP: 1200, nameJP: 'モグラ' },
  'Drizzler': { HP: 400, nameJP: 'コウモリ' },
  'FishStick': { HP: 400, nameJP: 'ハシラ' },
  'FlipperFlopper': { HP: 400, nameJP: 'ダイバー' },
  'BigShot': { HP: 1200, nameJP: 'テッキュウ' },
  'SlamminLid': { HP: 400, nameJP: 'ナベブタ' },
}

var data = {
  'Cohozuna': { count: 0 }, 'Horrorboros': { count: 0 },
  'steelhead': { count: 0 }, 'Flyfish': { count: 0 }, 'SteelEel': { count: 0 }, 'Stinger': { count: 0 },
  'Maws': { count: 0 }, 'Drizzler': { count: 0 }, 'FishStick': { count: 0 }, 'FlipperFlopper': { count: 0 }, 'SlamminLid': { count: 0 }
};

function init() {
  $("#log").prop("readonly", true);
  loadLocalStorage()
  makeBossSalmonidsTable(BossSalmonids)
  setSubjugation()
}

function setSubjugationSum(id, n) {

  console.log(`setSubjugationSum:${id},${n}`)
  data[id].count = n
  $(`#${id}_cnt`).text(n);


  addLog(`set ${id} to ${n}`)
  setSubjugation();
  saveLocalStorage()
}
function getSubjugationSum(id) {
  console.log(`getSubjugationSum:${id}`)
  return Number($(`#${id}_cnt`).text());
}

function setSubjugation() {
  $('#subjugation_sum').text(getSum())
}

function getSum() {
  return data.Cohozuna.count + data.Horrorboros.count
}


/** データをストレージに保存する
 * 
 */
function saveLocalStorage() {
  var setjson = JSON.stringify(data);
  localStorage.setItem(LOCAL_STORAGE_KEY, setjson);

  addLog("saved local storage")
}

/** 過去データをロードする
 * 
 */
function loadLocalStorage() {
  if (localStorage.getItem(LOCAL_STORAGE_KEY)) {
    var obj = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY));
    data = obj

    // BossSalmonids.forEach(key => {
    //   if (!data[key]) {
    //     data[key] = { count: 0 }
    //   }
    // })
    // KingSalmonid.forEach(key => {
    //   if (!data[key]) {
    //     data[key] = { count: 0 }
    //   }
    // })

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
  data['log'] = '(' + getTimeStamp() + '):' + text + '\n' + data['log']
  $('#log').text(data['log'])
}

function getTimeStamp() {
  let date = new Date()
  return date.toLocaleString("ja", {
    "year": "numeric",
    "month": "2-digit",
    "day": "2-digit",
    "hour": "2-digit",
    "minute": "2-digit",
    "second": "2-digit"
  }) + '.' + zerofill(date.getMilliseconds(), 3)

  function zerofill(str, digit) {
    return ('0'.repeat(digit) + str).slice(-digit)
  }
}

function makeBossSalmonidsTable() {

  let tablestr = '<table class="kingSalmonid-name"><tr><td>名称</td><td>討伐数</td><td></td></tr>';
  Object.keys(SalmonidsData).forEach(key => {
    tablestr += `<tr id="${key}">`
    tablestr += `<td>${SalmonidsData[key].nameJP}</td>`
    tablestr += `<td id="${key}_cnt">${data[key].count}</td>`
    tablestr += `<td><input type="button" value="ー" onclick="setSubjugationSum('${key}',getSubjugationSum('${key}')-1)"> <input type="button" value="＋" onclick="setSubjugationSum('${key}',getSubjugationSum('${key}')+1)"></td>`
    tablestr += `</tr>`
  })
  tablestr += '</table>'
  $('#BossSalmonids_area').append(tablestr)
}