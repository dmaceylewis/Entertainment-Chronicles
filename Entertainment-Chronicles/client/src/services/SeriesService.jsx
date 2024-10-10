const apiUrl = "https://localhost:5001";

// Fetch to get list of Series => /api/Series/
export const getAllSeries = () => {
    return fetch(`${apiUrl}/api/Series`)
    .then((res) => {
        if (res.ok) {
            return res.json();
        } else {
            throw new Error('Failed to fetch series');
        }
    });
  };

// Fetch to get Series by Id => /api/Series/{id}
export const getSeriesById = (id) => {
    return fetch(`${apiUrl}/api/Series/${id}`)
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else {
          return null; // Return null if there's no valid JSON response
        }
      })
      .catch((error) => {
        console.error("Error fetching Series by ID:", error);
        return null;
      });
    };