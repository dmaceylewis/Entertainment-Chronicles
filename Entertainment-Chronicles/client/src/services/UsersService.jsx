const apiUrl = "https://localhost:5001";

// Fetch to get Users email => /api/Users/GetByEmail
// 'https://localhost:5001/api/Users/GetByEmail?email=me%40example.com'
export const login = (user) => {
  return fetch(`${apiUrl}/api/Users/GetByEmail?email=${user.email}`)
    .then((r) => r.json())
};

export const logout = () => {
      localStorage.clear()
};

// Fetch to get User by Id => /api/Users/{id}
export const getUserById = (id) => {
    return fetch(`${apiUrl}/api/Users/${id}`)
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else {
          return null; // Return null if there's no valid JSON response
        }
      })
      .catch((error) => {
        console.error("Error fetching user by ID:", error);
        return null;
      });
    };

// Fetch to get list of Users
export const getAllUsers = () => {
    return fetch(`${apiUrl}/api/Users`)
    .then((res) => {
        if (res.ok) {
            return res.json();
        } else {
            throw new Error('Failed to fetch users');
        }
    });
  };
