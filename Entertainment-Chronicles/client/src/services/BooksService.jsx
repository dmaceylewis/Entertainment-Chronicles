const apiUrl = "https://localhost:5001";

// Fetch to get list of Books => /api/Books/
export const getAllBooks = () => {
    return fetch(`${apiUrl}/api/Books`)
    .then((res) => {
        if (res.ok) {
            return res.json();
        } else {
            throw new Error('Failed to fetch books');
        }
    });
};

// Fetch to get Books by Id => /api/Books/{id}
export const getBookById = (id) => {
    return fetch(`${apiUrl}/api/Books/${id}`)
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else {
          return null; // Return null if there's no valid JSON response
        }
      })
      .catch((error) => {
        console.error("Error fetching Book by ID:", error);
        return null;
      });
};

// Fetch to add new Book to database
export const addBook = (book) => {
    return fetch(`${apiUrl}/api/Books`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(book)
    });
};

// Fetch to handle the Edit
export const editBook = (book) => {
    return fetch(`${apiUrl}/api/Books/${book.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(book),
    });
};