const apiUrl = "https://localhost:5001";

export const login = (user) => {
  return fetch(`${apiUrl}/api/Users/GetByEmail?email=${user.email}`)
    .then((r) => r.json())
};

export const logout = () => {
      localStorage.clear()
};
