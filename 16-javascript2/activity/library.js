var b1 = new Book(
  "Harry Potter and the Deathly Hallows",
  "J.K. Rowling",
  10.49
  )

var b2 = new Book(
  "Harry Potter and the Philosopher's Stone",
  "J.K. Rowling",
  10.62
)
var b3 = new Book(
  "You Don't Know JS",
  "Kyle Simpson",
  2.99
)

var books = [b1, b3, b2];

// sort by price ascending (lowest to highest)
books.sort(function(a,b){
  if (a.price === b.price){
    return 0
  }else if (a.price > b.price){
    return 1
  }else{
    return -1
  }
})

// display the books
// you can't just console.log(books) because chrome stores a ref
// so after we sort, you won't see the OLD value in the console
// unless you explicitly iterate through.
for (var b in books){
  console.log(books[b])
}

// sort by price descending (highest to lowest)
books.sort(function(a,b){
  if (a.price === b.price){
    return 0
  }else if (a.price < b.price){
    return 1
  }else{
    return -1
  }
})

for (var b in books){
  console.log(books[b])
}
