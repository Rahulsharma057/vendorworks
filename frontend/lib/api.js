import axios from "axios";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api",
});

// attach admin token (if present) to every request
api.interceptors.request.use((config) => {
  if (typeof window !== "undefined") {
    const token = localStorage.getItem("vw_token");
    if (token) config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// centralised 401 handling: drop the stale token, bounce to login
api.interceptors.response.use(
  (res) => res,
  (err) => {
    if (typeof window !== "undefined" && err?.response?.status === 401) {
      localStorage.removeItem("vw_token");
      localStorage.removeItem("vw_admin");
      if (window.location.pathname.startsWith("/admin") && window.location.pathname !== "/admin/login") {
        window.location.href = "/admin/login";
      }
    }
    return Promise.reject(err);
  }
);

// Cloudinary always returns a full https URL, so this just guards against
// an unexpected relative path and unwraps the {url, publicId} image shape.
export const imgUrl = (image) => {
  if (!image) return "";
  const raw = typeof image === "string" ? image : image.url;
  if (!raw) return "";
  if (raw.startsWith("http")) return raw;
  const base = process.env.NEXT_PUBLIC_UPLOADS_URL || "";
  return `${base}${raw}`;
};

export default api;
