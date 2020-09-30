
class CommonTool {
  /**
   * 移动端rem布局
   */
  deployRem(doc, win) {
    let docEl = doc.documentElement
    let getRem = () => {
          let width = docEl.clientWidth
          let   rem = width / 375 * 100
          docEl.style.fontSize = rem +'px'
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

   sizerByPropName(arr_1, arr_2, propName ) {
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
      return nowTime.toLocaleDateString().replace(/\//g,'-') + nowTime.toTimeString().substr(0, 8)
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
      let week = ['星期日', '星期一', '星期二', '星期三', '星期四', ' 星期五' , '星期六']
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
          if (a[j] > a[j+1]) {
            [a[j], a[j+1]] = [a[j+1], a[j]]
          }
        }
      }
    }
}