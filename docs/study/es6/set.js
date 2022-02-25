function Set() {
  let item = {}
  this.size = 0

  this.has = (key) => {
    return item.hasOwnProperty(key)
  }
  this.add = (key, val) => {
    if(!this.has(key)) {
      item[key] = val
      this.size ++
    }
    return item
  }
  this.delete = (key) => {
    if(this.has(key)) {
      delete item[key]
      return true
    } else {
      return false
    }
  }
  this.clear = () => {
    item = {}
    this.size = 0
  }

  this.values = () => {

  }
}