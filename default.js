class CommonTool {
  /**
   * 移动端rem布局
   */
  deployRem(doc, win) {
    let docEl = doc.documentElement
    let getRem = () => {
      let width = docEl.clientWidth
      let rem = width / 375 * 100
      docEl.style.fontSize = rem + 'px'
      let actualSize = parseFloat(win.getComputedStyle(docEl, ['font-size']));
      if (rem !== actualSize) {
        let remActual = rem / (actualSize / rem)
        docEl.style.fontSize = remActual + 'px'
      }
    }
    win.addEventListener('resize', getRem, false)
    doc.addEventListener('ready', getRem, false)
    if (!doc.addEventListener) {
      return
    } else {
      getRem()
    }
  }

  /***
   * 数组去重
   */

  unique(arr) {
    return Array.from(new Set(arr))
  }

  /**
   * 数组并集
   */

  union(a, b) {
    let newArr = a.concat(b)
    return this.unique(newArr)
  }

  /**
   * 根据某属性找出两个数组的交集
   */

  sizerByPropName(arr_1, arr_2, propName) {
    return arr_1.filter(item => {
      return arr_2.some(ele => {
        return item[propName] == ele[propName]
      })
    })
  }

  /**
   * 数组根据某属性排序
   */

  sortFn(propName) {
    return (obj_1, obj_2) => {
      let val_1 = obj_1[propName]
      let val_2 = obj_2[propName]
      if (val_1 < val_2) {
        return -1
      } else if (val_1 > val_2) {
        return 1
      } else {
        return 0
      }
    }
  }

  /**
   * 保留n位小数
   */
  retainNum(num, digit = 2) {
    num = Number(num)
    try {
      let num_fixed = num.toFixed(digit)
      let num_floor = Math.floor(num)
      if (num_fixed > num_floor) {
        return num_fixed
      } else {
        return num_floor
      }
    } catch {
      return num
    }
  }

  /**
   * 克隆
   */
  deepCopy(obj) {
    let result = Array.isArray(obj) ? [] : {}
    for (let key in obj) {
      if (obj.hasOwnProperty(key)) {
        if (typeof obj[key] === 'object' && obj[key] !== null) {
          result[key] = this.deepCopy(obj[key])
        } else {
          result[key] = obj[key]
        }
      }
    }
  }

  /**
   * 时间戳转换
   */

  formatTime(time) {
    let nowTime = new Date(time)
    return nowTime.toLocaleDateString().replace(/\//g, '-') + nowTime.toTimeString().substr(0, 8)
  }

  /**
   * 是否是ios
   */

  isIOS() {
    let u = navigator.userAgent
    return u.includes('iphone')
  }

  /**
   * 是否是PC
   */
  isPC() {
    let u = navigator.userAgent
    let agents = ['Android', 'iphone', 'SymbianOS', 'Windows phone', 'ipad', 'ipod']
    return !agents.includes(u)
  }

  /**
   * 判断是否是微信
   */

  isWeChat() {
    let u = navigator.userAgent.toLowerCase()
    if (u.match(/MicroMessenger/i) == 'micromessenger') {
      return true
    } else {
      return false
    }
  }

  /**
   * 获取今天是星期几
   */
  isWeekDay(time) {
    let week = ['星期日', '星期一', '星期二', '星期三', '星期四', ' 星期五', '星期六']
    let day = new Date(time).getDay()
    return week[day]
  }

  /**
   * 去除空参数
   */
  fliterEmpty(obj) {
    for (let key in obj) {
      obj[key] === '' ? delete obj[key] : obj[key]
    }
    return obj
  }

  /**
   * api参数整合
   */
  joinParams(obj) {
    obj = this.fliterEmpty(obj)
    let result = []
    for (let key in result) {
      let str = `${key}=${obj[key]}`
      result.push(str)
    }
    return result.join('&')
  }

  /**
   * ajax封装 
   * option = {url: '', data: {}, method = '', type = 'application/x-www-form-urlencoded'}
   */
  ajaxPositing(option) {
    let xhr = Window.XMLHttpRequest() ? new XMLHttpRequest() : new ActiveXObject('Mircosoft.XMLHTTP')
    if (option.method == get) {
      xhr.open(option.url + '?' + this.joinParams(option.data))
      xhr.send()
    } else {
      xhr.open(url)
      xhr.setRequestHeader('Content-Type', option.type)
      xhr.send(this.joinParams(option.data))
    }
    return new Promise((reslove, reject) => {
      xhr.onreadystatechange = () => {
        if (xhr.readyState == 4 && xhr.status == 200) {
          reslove(JSON.parse(xhr.response))
        } else {
          reject('请求失败')
        }
      }
    })
  }

  /**
   * 冒泡排序
   */
  bubble(arr) {
    for (let i = 0, len = arr.length - 1; i < len; i++) {
      for (let j = 0; j < len - i; j++) {
        if (a[j] > a[j + 1]) {
          [a[j], a[j + 1]] = [a[j + 1], a[j]]
        }
      }
    }
  }

  /**
   * 双循环加去除
   */
  circleDelete(arr, fn) {
    for (let i = 0, len = arr.length; i < len; i++) {
      for (let j = i + 1; j < len; j++) {
        if (fn) {
          arr.splice(j, 1)
          len--
          j--
        }
      }
    }
  }

  /**
   * 防抖
   */
  debounce(fn, time) {
    let timeout = null
    return () => {
      clearTimeout(timeout)
      timeout = setTimeout(() => {
        fn.apply(this, arguments)
      }, time)
    }
  }
  /**
   * 节流
   */
  throttle(fn, time) {
    let flag = true
    return () => {
      if (!flag) return
      flag = false
      setTimeout(() => {
        fn.apply(this, arguments)
        flag = true
      }, time)
    }
  }

  /**
   * JSONP
   */
  jsonP(option) {
    let generateUrl = () => {
      let dataSrc = ''
      for (let key in option.params) {
        if (Object.prototype.hasOwnProperty.call(option.params, key)) {
          dataSrc = `${key}=${option.params[key]}&`
        }
      }
      dataSrc += `callback=${option.callbackName}`
      return `${option.url}?${dataSrc}`
    }
    return new Promise((resolve, reject) => {
      let scriptEl = document.createElement('script')
      scriptEl.src = generateUrl()
      document.body.appendChild(scriptEl)
      window[option.callbackName] = data => {
        resolve(data)
        document.removeChild(scriptEl)
      }
    })
  }

  /**
   * 图片懒加载可以给img标签统一自定义属性src='default.png'，当检测到图片出现在窗口之后再补充src属性，此时才会进行图片资源加载。
   */
  lazyLoad() {
    let imgs = document.getElementsByTagName('img')
    let len = imgs.length
    let viewHeight = document.documentElement.clientHeight
    let scrollHeight = document.documentElement.scrollTop || document.body.scrollTop
    for (let i = 0; i < len; i++) {
      let offsetHeight = imgs[i].offsetTop
      if (offsetHeight < viewHeight + scrollHeight) {
        imgs[i].src = imgs[i].dataset.src
      }
    }
  }

  /**
   *时间戳间隔
   */

  dateDiff(dateTimeStamp) {
    let minute = 1000 * 60; //把分，时，天，周，半个月，一个月用毫秒表示
    let hour = minute * 60;
    let day = hour * 24;
    let week = day * 7;
    let halfamonth = day * 15;
    let month = day * 30;
    let now = new Date().getTime(); //获取当前时间毫秒
    let diffValue = now - dateTimeStamp; //时间差
    if (diffValue < 0) {
      return;
    }
    let minC = diffValue / minute; //计算时间差的分，时，天，周，月
    let hourC = diffValue / hour;
    let dayC = diffValue / day;
    let weekC = diffValue / week;
    let monthC = diffValue / month;
    let result;
    if (monthC >= 1 && monthC <= 3) {
      result = " " + parseInt(monthC) + "月前"
    } else if (weekC >= 1 && weekC <= 3) {
      result = " " + parseInt(weekC) + "周前"
    } else if (dayC >= 1 && dayC <= 6) {
      result = " " + parseInt(dayC) + "天前"
    } else if (hourC >= 1 && hourC <= 23) {
      result = " " + parseInt(hourC) + "小时前"
    } else if (minC >= 1 && minC <= 59) {
      result = " " + parseInt(minC) + "分钟前"
    } else if (diffValue >= 0 && diffValue <= minute) {
      result = "刚刚"
    } else {
      let datetime = new Date();
      datetime.setTime(dateTimeStamp);
      let Nyear = datetime.getFullYear();
      let Nmonth = datetime.getMonth() + 1 < 10 ? "0" + (datetime.getMonth() + 1) : datetime.getMonth() + 1;
      let Ndate = datetime.getDate() < 10 ? "0" + datetime.getDate() : datetime.getDate();
      let Nhour = datetime.getHours() < 10 ? "0" + datetime.getHours() : datetime.getHours();
      let Nminute = datetime.getMinutes() < 10 ? "0" + datetime.getMinutes() : datetime.getMinutes();
      let Nsecond = datetime.getSeconds() < 10 ? "0" + datetime.getSeconds() : datetime.getSeconds();
      result = Nyear + "-" + Nmonth + "-" + Ndate
    }
    return result;
  }

  /**
   * 求平均值
   */
  getMean(arr) {
    return arr.reduce((total, pre) => total + Number(pre), 0) / arr.length
  }

  /**
   * 验证邮箱
   */
  validateEmail(str) {
    return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(str)
  }

  /**
   * 验证身份证
   */
  isCard(str) {
    return /^(^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$)|(^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])((\d{4})|\d{3}[Xx])$)$/.test(str)
  }

  /**
   * 阶乘
   */
  factorial(n) {
    return n < 0 ? (() => { throw new TypeError('Negative numbers are not allowed!') })() : n <= 1 ? 1 : n * this.factorial(n - 1)
  }
}