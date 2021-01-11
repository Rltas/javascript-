function deploy(doc, win, screenW = 375) {
  let ele = doc.doucmentElement,
      getSize = () => {
        let width = ele.clientWidth,
            rem = width / screenW * 100;
        ele.style.fontSize = rem + 'px';
        let realSize = parseFloat(win.getComputedStyle(ele, ['font-size']));
        if (rem !== realSize) {
          ele.style.fontSize = rem / (realSize / rem) + 'px';
        }
      };
  if (!doc.addEventListener) return;
  getSize();
  doc.addEventListener('ready', getSize, false);
  win.addEventListener('resize', getSize, false);
}

function unique(arr) {
  let vessel = new Set();
  return arr.filter(item => {
    let id = item + JSON.stringify(item);
    if (vessel.has(id)) {
      return false;
    } else {
      vessel.add(id);
      return true;
    }
  })
}

function uniqueObj(arr, key) {
  let vessel =[];
  arr.map(item => {
    let judge = vessel.some(ele => item[key] === ele[key]);
    if (judge) {
      return;
    } else {
      vessel.push(item);
    }
  })
  return vessel;
}

function sortKey(key, order = true) {
  return function(obj_1, obj_2) {
    let val_1 = obj_1[key],
        val_2 = obj_2[key];
    if (val_1 < val_2) {
      return order ? -1 : 1;
    } else if (val_1 > val_2) {
      return order ? 1 : -1;
    } else {
      return 0;
    }
  }
}

function sizer(all, part, key) {
  return all.filter(item => {
    return part.some(ele => {
      return item[key] == ele[key];
    })
  })
}

function keepDigit(num, digit = 2) {
  try {
    num = Number(num);
    let num_fixed = Number(num.toFixed(digit)),
        num_floor = Number(Math.floor(num));
    if (num_fixed > num_floor) {
      return num_fixed;
    } else if (num_fixed <= num_floor) {
      return num_floor;
    } else {
      return 0;
    }
  } catch {
    return num;
  }
}

function filterData(obj) {
  for (let key in obj) {
    obj[key] === '' ? delete obj[key] : obj[key];
  }
  return obj;
}

function joinParams(obj) {
  let result = [];
  obj = filterData(obj);
  for (let key in obj) {
    let str = `${key}=${obj[key]}`;
    result.push(str);
  }
  return result.join('&');
}

function postAjax({url = '', data = {}, method = 'get', type = 'application/x-www-from-urlencoded'} = {}) {
  let xhr = Window.XMLHttpRequest() ? Window.XMLHttpRequest() : new ActiveXObject('Mircosoft.XMLHTTP');
  if (method ='get') {
    xhr.open(url + '?' + joinParams(data));
    xhr.send();
  } else {
    xhr.open(url);
    xhr.setRequestHeader('Content-Type', type);
    xhr.send(data);
  }
  return new Promise((resolve,reject) => {
    xhr.onreadystatechange = () => {
      if (xhr.status == 200 && xhr.readyState == 4) {
        resolve(JSON.parse(xhr.response));
      } else {
        reject('连接失败');
      }
    }
  })
}

function bubble(arr) {
  for (let i = 0, len = arr.length; i < len; i++) {
    for (let j = 0; j < len - 1; j++) {
      if (arr[j] > arr[j+1]) {
        [arr[j], arr[j+1]] = [arr[j+1], arr[j]];
      }
    }
  }
}

 function flatIn(arr) {
   let result = [];
   let flatChlid = arr => {
    arr.map(item => {
      if (Array.isArray(item)) {
        flatChlid(item);
      } else {
        result.push(item);
      }
    })
   };
   flatChlid(arr);
   return result;
 }

