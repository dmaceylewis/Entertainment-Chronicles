const apiUrl = "https://localhost:5001";

// Fetch to get list of Shows => /api/Shows/
export const getAllShows = () => {
    return fetch(`${apiUrl}/api/Shows`)
    .then((res) => {
        if (res.ok) {
            return res.json();
        } else {
            throw new Error('Failed to fetch shows');
        }
    });
};

// Fetch to get Shows by Id => /api/Shows/{id}
export const getShowById = (id) => {
    return fetch(`${apiUrl}/api/Shows/${id}`)
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else {
          return null; // Return null if there's no valid JSON response
        }
      })
      .catch((error) => {
        console.error("Error fetching Show by ID:", error);
        return null;
      });
};

// Fetch to get list of show Seasons => /api/Season/
export const getAllSeasons = () => {
    return fetch(`${apiUrl}/api/Season`)
    .then((res) => {
        if (res.ok) {
            return res.json();
        } else {
            throw new Error('Failed to fetch seasons');
        }
    });
};

// Fetch to add new Show to database
export const addShow = (show) => {
    return fetch(`${apiUrl}/api/Shows`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(show)
    });
};

// Fetch to handle the Edit Show
export const editShow = (show) => {
    return fetch(`${apiUrl}/api/Shows/${show.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(show),
    });
};