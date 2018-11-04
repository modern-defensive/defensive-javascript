class Maybe {
  get isNothing() {
    return this.value === null || this.value === undefined;
  }

  get isJust() {
    return !this.isNothing;
  }

  constructor(value) {
    this.value = value;
  }

  toString() {
    return `Maybe(${this.value})`;
  }

  static of(value) {
    return new Maybe(value);
  }

  map(fn) {
    return this.isNothing ? this : Maybe.of(fn(this.value));
  }

  join() {
    return this.isNothing ? this : this.value;
  }
}
