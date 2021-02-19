  /**
   * 配置rem
   */
  function deployRem(doc, win, screenSize = 375) {
    let ele = doc.doucmentElement,
      getRem = () => {
        let width = ele.clientWidth,
          rem = width / screenSize * 100;
        ele.style.fontSize = rem + 'px';
        let realSize = parseFloat(win.getComputedStyle(ele, ['font-size']));
        if (rem !== realSize) {
          ele.style.fontSize = rem / (realSize / rem) + 'px';
        }
      };
    if (!doc.addEventListener) return;
    getRem();
    win.addEventListener('resize', getRem, false);
    doc.addEventListener('ready', getRem, false);
  }

  /**
   * 数组去重不包含对象
   */
  function deleteRepetition(arr) {
    return [...new Set(arr)];
  }

  /**
   * 数组去重，包含对象
   */
  function unique(arr) {
    let arrVessel = new Set();
    return arr.filter(item => {
      let id = item + JSON.stringify(item);
      if (arrVessel.has(id)) {
        return false;
      } else {
        arrVessel.add(id);
        return true;
      }
    })
  }
  /**
   * 数组对象根据某属性去重
   */
  function uniqueObj(arr, key) {
    let arrVessel = [];
    arr.map(item => {
      let jude = arrVessel.some(ele => item[key] == ele[key]);
      if (jude) {
        return;
      } else {
        arrVessel.push(item);
      }
    })
    return arrVessel;
  }
  /**
   * 根据某属性找出两个数组的交集
   */
  function sizerByKey(all, part, key) {
    return all.filter(item => {
      return part.some(ele => {
        return item[key] == ele[key];
      })
    })
  }
  /**
   * 数组根据某属性排序
   */
  function sortByKey(key, order = 0) {
    return function (obj_1, obj_2) {
      let val_1 = obj_1[key],
        val_2 = obj_2[key];
      if (val_1 < val_2) {
        return order == 0 ? -1 : 1;
      } else if (val_1 > val_2) {
        return order == 0 ? 1 : -1;
      } else {
        return 0;
      }
    }
  }
  /**
   * 保留n位小数
   */

  function retainNum(num, digit = 2) {
    try {
      num = Number(num);
      let num_fixed = num.toFixed(digit),
        num_floor = Math.floor(num);
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
  /**
   * 深拷贝
   */
  function deepCopy(obj) {
    let result = Array.isArray(obj) ? [] : {};
    for (let key in obj) {
      if (obj.hasOwnProperty(key)) {
        if (typeof obj[key] === 'object' && obj[key] !== null) {
          result[key] = deepCopy(obj[key]);
        } else {
          result[key] = obj[key];
        }
      }
    }
    return result;
  }

  /**
   * 时间戳转化
   */

  function formateTime(time, curt = true) {
    let nowTime = new Date(time);
    if (curt) {
      return nowTime.toLocaleDateString().replace(/\//g, '-');
    } else {
      return nowTime.toLocaleDateString().replace(/\//g, '-') + ' ' + nowTime.toTimeString().substr(0, 8);
    }
  }

  /**
   * 是否是微信
   */
  function isWechat() {
    let u = navigator.userAgent.toLowerCase();
    if (u.match(/MicroMessenger/i) == 'micromessenger') {
      return true;
    } else {
      return false;
    }
  }

  /**
   * 是否是IOS
   */
  function isIOS() {
    return navigator.userAgent.includes('iphone');
  }

  /**
   * 是否是PC
   */
  function isPC() {
    let u = navigator.userAgent;
    let agents = ['Android', 'iphone', 'SymbianOS', 'Windows phone', 'ipad', 'ipod', 'windows mobile', 'windows ce'];
    return !agents.includes(u);
  }

  /**
   * 获取今天是星期几
   */
  function isWeekDay(time) {
    let weeks = ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'];
    let day = new Date(time).getDay();
    return weeks[day];
  }
  /**
   * 去除空参数
   */
  function fliterEmpty(obj) {
    for (let key in obj) {
      obj[key] == '' ? delete obj[key] : obj[key];
    }
    return obj;
  }
  /**
   * api参数整合
   */
  function joinParams(obj) {
    let result = [];
    obj = fliterEmpty(obj);
    for (let key in obj) {
      let str = `${key}=${obj[key]}`;
      result.push(str);
    }
    return result.join('&');
  }
  /**
   * 滚动条平滑滚动
   */
  function animateScrollTo(ele, option) {
    ele.scrollTo({
      top: option.top ? option.top : 0,
      left: option.left ? option.left : 0,
      behavior: 'smooth'
    })
  }

  /**
   * 移动端平滑滚动
   */
  function toTop(ele = window, top) {
    let cb  = () => {
      if (ele.scrollTop <= top) return;
      let speed = 200;
      ele.scrollTop -= speed;
      requestAnimationFrame(cb);
    }
    requestAnimationFrame(cb);
  }
  /**
   * 禁止网页复制粘贴
   */
  function disableCP() {
    let html = document.querySelector('html');
    html.oncopy = () => false;
    html.onpaste = () => false;
  }
  /**
   * 封装AJAX
   * option = {url: '', data = {}, method = '', type = 'application/x-www-from-urlencoded'}
   */
  function positeAjax(option) {
    let xhr = Window.XMLHttpRequest() ? Window.XMLHttpRequest() : new ActiveXObject('Mircosoft.XMLHTTP');
    if (option.method == 'get') {
      xhr.open(option.url + '?' + joinParams(option.data));
      xhr.send();
    } else {
      xhr.open(option.url);
      xhr.setRequestHeader('Content-Type', option.type);
      xhr.send(joinParams(option.data));
    }
    return new Promise((reslove, reject) => {
      xhr.onreadystatechange = () => {
        if (xhr.readyState == 4 && xhr.status == 200) {
          reslove(JSON.parse(xhr.response));
        } else {
          reject('请求失败');
        }
      }
    })
  }
  /**
   * Bulle
   */
  function bubble(arr) {
    for (let i = 0, len = arr.length; i < len; i++) {
      for (let j = 0; j < len - 1; j++) {
        if (arr[j] > arr[j + 1]) {
          [a[j], a[j + 1]] = [a[j + 1], a[j]];
        }
      }
    }
  }

  /**
   * 双重循环加删除
   */
  function circleDelete(arr, fn) {
    for (let i = 0, len = arr.length; i < len; i++) {
      for (let j = i + 1; j < len; j++) {
        if (fn) {
          arr.splice()
        }
      }
    }
  }
  /**
   * 验证邮箱
   */
  function validateEmail(str) {
    return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(str)
  }
  /**
   * 验证身份证
   */
  function isCard(str) {
    return /^(^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$)|(^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])((\d{4})|\d{3}[Xx])$)$/.test(str)
  }
  /**
   * 扁平化
   */
  function flatten(arr) {
    let result = [];
    let flatChild = arr => {
      arr.map(item => {
        if (Array.isArray(item)) {
          flatChild(item);
        } else {
          result.push(item);
        }
      })
    }
    flatChild(arr);
    return result;
  }
  /**
   * 去前后空格
   */
  function myTrim() {
    return str.replace(/(^s+)|(s+$)/g, '');
  }
  /**
   * 广度优先实现
   */
  function combine(str) {
    if (str.length == 1) return [str];
    let result = [];
    for (let i in str) {
      for (let s of combine(str.slice(0, i) + str.slice(1 + (+i)))) {
        result.push(str[i] + s);
      }
    }
    return [...new Set(result)];
  }

  /**
   *时间戳间隔
   */
  function diffTime(time) {
    let minute = 1000 * 60,
        hour = minute * 60,
        day = hour * 24,
        week = day * 7,
        month = day * 30;
        now = new Date().getTime(),
        difVal = now - time,
        minuteD = difVal / minute,
        hourD = difVal / hour,
        dayD = difVal / day,
        weekD = difVal / week,
        monthD = difVal / month,
        result = null;
    if (difVal < 0) return;
    if (monthD >= 1 && monthD <= 3) {
      result = parseInt(monthD) + '月前';
    } else if (weekD >= 1 && weekD <= 3) {
      result = parseInt(weekD) + '周前';
    } else if (dayD >= 1 && dayD <= 6) {
      result = parseInt(dayD) + '天前';
    } else if (hourD >= 1 && hourD <= 23) {
      result = parseInt(hourD) + '小时前';
    } else if (minute >= 1 && minute <= 59) {
      result = parseInt(minuteD) + '分钟前';
    } else if (difVal >= 0 && difVal <= minute) {
      result = '刚刚'
    } else {
      let dateTime = new Date(time),
          nYear = dateTime.getFullYear(),
          nMonth = dateTime.getMonth() + 1 < 10 ? '0' + (dateTime.getMonth() + 1) : dateTime.getMonth() +1,
          nDay = dateTime.getDate() < 10 ? '0' + dateTime.getDate() : dateTime.getDate();
      result = nYear + '-' + nMonth + '-' + nDay;
    }
    return result;
  }
