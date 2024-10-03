class HashMap {
  constructor(capacity = 16, loadFactor = 0.75) {
    this.capacity = capacity
    this.loadFactor = loadFactor
    this.buckets = new Array(this.capacity)
  }

  hash(key) {
    let hashCode = 0
    const primeNumber = 33
    for (let i = 0; i < key.length; i++) {
      hashCode =
        (hashCode * primeNumber + key.charCodeAt(i)) % this.buckets.length
    }
    return hashCode
  }

  set(key, value) {
    if (this.has(key)) {
      for (const entry of this.buckets[this.hash(key)]) {
        if (entry[0] === key) {
          entry[1] = value
        }
      }
    } else {
      if (!this.buckets[this.hash(key)]) {
        this.buckets[this.hash(key)] = []
      }
      this.buckets[this.hash(key)].push([key, value])
    }

    if (this.length > this.capacity * this.loadFactor) {
      this.grow()
    }
  }

  get(key) {
    const bucket = this.buckets[this.hash(key)]
    if (bucket) {
      for (const entry of bucket) {
        if (entry[0] === key) {
          return entry[1]
        }
      }
    }
    return null
  }

  has(key) {
    const bucket = this.buckets[this.hash(key)]
    if (bucket) {
      for (const entry of bucket) {
        if (entry[0] === key) {
          return true
        }
      }
    }
    return false
  }

  remove(key) {
    if (this.has(key)) {
      const hashCode = this.hash(key)
      if (this.buckets[hashCode].length === 1) {
        delete this.buckets[hashCode]
      } else {
        this.buckets[hashCode] = this.buckets[hashCode].filter(
          (entry) => entry[0] !== key
        )
      }
      return true
    }
    return false
  }

  get length() {
    let counter = 0
    for (const bucket of this.buckets) {
      if (bucket) {
        counter += bucket.length
      }
    }
    return counter
  }

  clear() {
    this.buckets = new Array(this.capacity)
  }

  keys() {
    return this.buckets
      .filter((bucket) => !!bucket)
      .reduce((total, curr) => [...total, ...curr], [])
      .map((entry) => entry[0])
  }

  values() {
    return this.buckets
      .filter((bucket) => !!bucket)
      .reduce((total, curr) => [...total, ...curr], [])
      .map((entry) => entry[1])
  }

  entries() {
    return this.buckets
      .filter((bucket) => !!bucket)
      .reduce((total, curr) => [...total, ...curr], [])
  }

  grow() {
    console.log("Growing!")
    const entries = this.entries()
    this.capacity *= 2
    this.clear()
    for (const entry of entries) {
      this.set(entry[0], entry[1])
    }
  }
}

module.exports = HashMap
