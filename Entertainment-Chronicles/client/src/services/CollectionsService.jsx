const apiUrl = "https://localhost:5001/";

// Fetch to get list of Collections => /api/Collections/
export const getAllCollections = () => {
    return fetch(`${apiUrl}/api/Collections`)
    .then((res) => {
        if (res.ok) {
            return res.json();
        } else {
            throw new Error('Failed to fetch collections');
        }
    });
  };

// Fetch to get Collection by Id => /api/Collections/{id}
export const getCollectionById = (id) => {
    return fetch(`${apiUrl}/api/Collections/${id}`)
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else {
          return null; // Return null if there's no valid JSON response
        }
      })
      .catch((error) => {
        console.error("Error fetching collection by ID:", error);
        return null;
      });
    };

// Fetch to add new Collection to database
export const addCollection = (collection) => {
    return fetch(`${apiUrl}/api/Collections`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(collection)
    });
};