import { create } from "zustand";

const useAuthStore = create((set, get) => ({
  user: null,
  token: null,
  loading: false,
  error: null,

  login: async (email, password) => {
    set({ loading: true, error: null });

    try {
        const res = await fetch("http://localhost:8000/api/v1/users/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    const data = await res.json()
    if(!res.ok) throw new Error(data.message || "login failed")
    set({
        user : data.loggedInUser,
        token : data.tokens,
        loading:false
    })
    } catch (err) {
         set({ error: err.message, loading: false });
    }
    
  },
  logout: async () => {
  try {
    // optionally get token from state if your backend expects it
    const { token } = get();

    const res = await fetch("http://localhost:8000/api/v1/users/logout", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token.accessToken}`, // if your backend uses JWT
      },
    });

    // optional: check response
    if (!res.ok) {
      const data = await res.json();
      throw new Error(data.message || "Logout failed");
    }

    // once backend logout succeeds, clear local state
    set({ user: null, token: null });
  } catch (err) {
    console.error("Logout error:", err.message);
    // you can also set an error in store if you want
    set({ user: null, token: null });
  }
}

}));


export default useAuthStore