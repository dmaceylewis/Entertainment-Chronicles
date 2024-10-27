const apiUrl = "https://localhost:5001";

// Fetch to get list of Movies => /api/Movies/
export const getAllMovies = () => {
    return fetch(`${apiUrl}/api/Movies`)
    .then((res) => {
        if (res.ok) {
            return res.json();
        } else {
            throw new Error('Failed to fetch movies');
        }
    });
};

// Fetch to get Movies by Id => /api/Movies/{id}
export const getMoviesById = (id) => {
    return fetch(`${apiUrl}/api/Movies/${id}`)
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else {
          return null; // Return null if there's no valid JSON response
        }
      })
      .catch((error) => {
        console.error("Error fetching Movies by ID:", error);
        return null;
      });
};

// Fetch to add new Movie to database
export const addMovie = (movie) => {
    return fetch(`${apiUrl}/api/Movies`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(movie)
    });
};

// Fetch to handle the Edit Movie
export const editMovie = (movie) => {
    return fetch(`${apiUrl}/api/Movies/${movie.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(movie),
    });
};

// Fetch to handle Delete
export const deleteMovie = (id) => {
  return fetch(`${apiUrl}/api/Movies/${id}`, {
    method: "DELETE",
  });
};