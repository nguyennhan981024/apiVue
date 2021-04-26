import axios from 'axios';
const axiosInstance = axios.create({
  baseURL: 'https://608446469b2bed0017040ddf.mockapi.io/api/v1',
  headers: {
    Accept: 'application/json',
    'Content-type': 'application/json'
  }
});
const apis = {
  getStudents: () => axiosInstance.get('/students'),
  addStudent: data => axiosInstance.post('/students', data),
  deleteStudent: id => axiosInstance.delete(`/students/${id}`),
  editStudent: (data, id) => axiosInstance.put(`/students/${id}`, data),
  getStudentById: id => axiosInstance.get(`/students/${id}`)
};
export default apis;
