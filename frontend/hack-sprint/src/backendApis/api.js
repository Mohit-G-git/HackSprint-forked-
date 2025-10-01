import axios from 'axios';

// Create a configured instance of axios
const API = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
});

API.interceptors.request.use((req) => {
  const userToken = localStorage.getItem("token");
  const adminToken = localStorage.getItem("adminToken");

  if (req.url.includes("/api/admin")) {
    // Admin routes
    if (adminToken) {
      req.headers.Authorization = `Bearer ${adminToken}`;
    }
  } else {
    // User routes
    if (userToken) {
      req.headers.Authorization = `Bearer ${userToken}`;
    }
  }

  return req;
});


export const addConnectedApp = (data) => {
  API.post("/api/user/addConnectedApps", data)
}

export const editConnectedApp = (data) => {
  API.put("/api/user/editConnectedApps", data)
}

export const deleteConnectedApp = (data) => {
  API.delete("/api/user/deleteConnectedApps", { data })
}

export const addEducation = (data) => {
  API.post("/api/user/addEducation", data)
}

export const editEducation = (data) => {
  API.put("/api/user/editEducation", data)
}

export const deleteEducation = (data) => {
  API.delete("/api/user/deleteEducation", { data })
}

export const addLanguages = ({ userId, language }) => {
  return API.post("/api/user/addLanguages", { userId, language });
};

export const deleteLanguages = ({ userId, language }) => {
  return API.delete("/api/user/deleteLanguages", {
    data: { userId, language }
  });
};

export const addSkills = ({ userId, skill }) => {
  return API.post("/api/user/addSkills", { userId, skill });
};

export const deleteSkills = ({ userId, skill }) => {
  return API.delete("/api/user/deleteSkills", {
    data: { userId, skill }
  });
};


// --- USER/GENERAL API CALLS ---

export const googleAuth = (code) => API.get(`/api/account/google?code=${code}`);

export const getDashboard = () => API.get(`/api/userData`);

// Public hackathon routes
export const getActiveHackathons = () => API.get('/api/hackathons/activeHackathons');
export const getExpiredHackathons = () => API.get('/api/hackathons/expiredHackathons');
export const getUpcomingHackathons = () => API.get('/api/hackathons/upcomingHackathons');
export const getHackathonById = (id) => API.get(`/api/hackathons/${id}`);


// --- ADMIN API CALLS ---

/**
 * Logs in an admin. The token is handled by the interceptor for subsequent requests.
 * @param {object} credentials - { email, password }
 */
export const adminLogin = (credentials) => API.post('/api/admin/login', credentials);

/**
 * Fetches the logged-in admin's profile details.
 * The token is automatically attached by the interceptor.
 */
export const getAdminDetails = () => API.get('/api/admin/adminDetails');

/**
 * Fetches all hackathons created by a specific admin.
 * @param {string} adminId - The ID of the admin.
 */
export const getAdminHackathons = (adminId) => API.post('/api/admin/my-hackathons', { adminId });

/**
 * Fetches the details of a single hackathon for its creator admin.
 * @param {object} ids - { adminId, hackathonId }
 */
export const getAdminHackathonDetail = (ids) => API.post('/api/admin/my-hackathon-detail', ids);

/**
 * Creates a new hackathon. The submission goes to a pending queue for approval.
 * @param {FormData} formData - The hackathon data, including the image file.
 */
export const createHackathon = (formData) => API.post('/api/admin/createHackathon', formData, {
  headers: {
    'Content-Type': 'multipart/form-data',
  },
});

/**
 * Fetches all hackathons pending approval.
 */
export const getPendingHackathons = () => API.get('/api/admin/pendingHackathon');

/**
 * Approves a pending hackathon.
 * @param {object} data - { pendingHackathonId, adminId }
 */
export const approveHackathon = (data) => API.post('/api/admin/approveHackathon', data);

/**
 * Rejects a pending hackathon.
 * @param {object} data - { pendingHackathonId, adminId }
 */
export const rejectHackathon = (data) => API.post('/api/admin/rejectHackathon', data);

/**
 * Updates the points for a submission.
 * @param {object} data - { adminId, submissionId, points }
 */
export const updateSubmissionPoints = (data) => API.post('/api/admin/HackathonPoints', data);
