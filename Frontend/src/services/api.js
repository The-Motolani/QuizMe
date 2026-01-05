import axios from "axios";

const API_BASE = "http://127.0.0.1:8000";

export const loginUser = async ({ identifier, password }) => {
  const response = await axios.post(`${API_BASE}/accounts/login/`, {
    login: identifier,
    password,
  });

  return response.data;
};

export const registerUser = async (data) => {
  const response = await axios.post(`${API_BASE}/accounts/register/`, data);
  return response.data;
};

export const fetchCurrentUser = async (accessToken) => {
  const response = await axios.get(`${API_BASE}/accounts/me/`, {
    headers: {
      Authorization: `Bearer ${accessToken}`
    }
  });
  return response.data;
};

export const requestPasswordReset = async (email) => {
  const response = await axios.post(
    `${API_BASE}/accounts/password-reset/`,
    { email }
  );
  return response.data;
};

export const confirmPasswordReset = async ({ token, new_password }) => {
  const response = await axios.post(
    `${API_BASE}/accounts/password-reset-confirm/`,
    { token, new_password }
  );
  return response.data;
};

export const updateProfilePicture = async (file) => {
  const formData = new FormData();
  formData.append("profile_picture", file);

  const token = localStorage.getItem("accessToken");
  const res = await axios.patch(`${API_BASE}/accounts/update-profile-picture/`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${token}`,
    },
  });

  return res.data;
};


export const fetchQuizzes = async ({
  page = 1,
  category,
  subcategory,
  difficulty,
  ordering,
  search
}) => {
  const params = {
    page,
    ordering,
    search,
    "quiz_questions__category__slug": category,
    "quiz_questions__subcategory__id": subcategory,
    difficulty
  };

  Object.keys(params).forEach(
    key => params[key] === undefined && delete params[key]
  );

  const res = await axios.get(`${API_BASE}/api/quizzes/`, { params });
  return res.data;
};


export const subCategory = async ({categoryId}) => {
  const response = await axios.get(`${API_BASE}/api/subcategories/`, {
  params: { category: categoryId }
});
return response.data
  };
