# Defensive JavaScript

## Maybe Pattern

By using Maybe pattern we can avoid the implementation of the failing flow
Handle it only in the borders of the application like DAL or DTO

### Maybe Class
```javascript
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

  static of(x) {
    return new Maybe(x);
  }

  map(fn) {
    return this.isNothing ? this : Maybe.of(fn(this.$value));
  }

  join() {
    return this.isNothing ? this : this.value;
  }
}
```

### Example
Usually we will want to use default values in the API, except some special cases,
In this example branded data should be sent only for clients with branded content

```javascript
const getUserDebt = async (userId) => {
    const user = await userProvider.get(userId);
    const currentRate = await currencyRateProvider.get(user.currency);
   
    // brandedContent is optional property
    const brandedContent = new Maybe(user.brandedContent);

    // No if statement needed, which means low code complexity 
    // And avoiding returning not clear meaning value like null or undefined, 
    // we have only one simple success flow
    return brandedContent.map(content => content.getPrice(currentRate));
};
```

```javascript
// In the client of this function we can use the Maybe object until the app borders like DTO or DAL
getUserDebt()
    .then(debt => debt.join())); // Promise<Maybe<number>> --> Promise<number>
```
