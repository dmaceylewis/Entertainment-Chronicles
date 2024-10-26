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

export const getSeriesByCollectionId = async (collectionId) => {
  const response = await fetch(`/api/Series?collectionId=${collectionId}`);
  if (!response.ok) {
      throw new Error(`Failed to fetch series: ${response.statusText}`);
  }
  return await response.json();
};

// Fetch to add new Series to database
export const addSeries = (series) => {
    return fetch(`${apiUrl}/api/Series`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(series)
    });
};

// Fetch to handle the Edit
export const editSeries = (series) => {
  return fetch(`${apiUrl}/api/Series/${series.id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(series),
  });
};

// Fetch to handle Delete
export const deleteSeries = (id) => {
  return fetch(`${apiUrl}/api/Series/${id}`, {
    method: "DELETE",
  });
};