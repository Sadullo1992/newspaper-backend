export const BASE_URL = import.meta.env.VITE_API_BASE_URL || '/api';

export const headers = {
  Authorization: `Bearer ${localStorage.getItem('token')}`,
};
