const books = [
  { title: "The Great Gatsby", category: "Fiction" },
  { title: "A Brief History of Time", category: "Science" },
  { title: "Sapiens", category: "History" },
  { title: "Educated", category: "Non-fiction" },
  { title: "1984", category: "Fiction" },
];

let history = [];

const bookList = document.getElementById("bookList");
const searchInput = document.getElementById("searchInput");
const categoryFilter = document.getElementById("categoryFilter");
const historyList = document.getElementById("historyList");

function displayBooks() {
  const searchTerm = searchInput.value.toLowerCase();
  const category = categoryFilter.value;
  
  bookList.innerHTML = "";
  books.filter(book => {
    return (
      (category === "all" || book.category === category) &&
      book.title.toLowerCase().includes(searchTerm)
    );
  }).forEach(book => {
    const bookItem = document.createElement("div");
    bookItem.className = "book-item";
    bookItem.innerHTML = `
      <span>${book.title} (${book.category})</span>
      <button onclick="borrowBook('${book.title}')">Borrow</button>
    `;
    bookList.appendChild(bookItem);
  });
}

function borrowBook(title) {
  const date = new Date().toLocaleString();
  history.push({ title, date });
  updateHistory();
}

function updateHistory() {
  historyList.innerHTML = "";
  history.forEach(entry => {
    const li = document.createElement("li");
    li.textContent = `${entry.title} - Borrowed on ${entry.date}`;
    historyList.appendChild(li);
  });
}

searchInput.addEventListener("input", displayBooks);
categoryFilter.addEventListener("change", displayBooks);

// Initial render
displayBooks();
