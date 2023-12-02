import axios from "axios";
const Token = localStorage.getItem("token");

const ApiService = {
  userLogin: async (data) => {
    const response = await axios.post(
      "http://localhost:5000/api/auth/otp",
      data
    );
    return response.data;
  },

  submitOtp: async (data) => {
    const response = await axios.post(
      "http://localhost:5000/api/auth/verify",
      data
    );
    return response.data;
  },

  addSeller: async (data) => {
    const response = await axios.post(
      "http://localhost:5000/api/seller/addseller",
      data,
      { headers: { Authorization: Token } }
    );
    return response.data;
  },

  getSeller: async (numberOfPages) => {
    const response = await axios.get(
      `http://localhost:5000/api/seller/getsellers?userId=653285ae782e2f42e482aa2c&page=${numberOfPages}&limit=5`,
    );
    return response.data;
  },

  deleteSeller: async (id) => {
    const response = await axios.delete(
      `http://localhost:5000/api/seller/deleteSeller?sellerId=${id}`
    );
    return response
  },

  sellerUpdate: async ( id,data) => {
    console.log("amit",id)
    const response = await axios.put(
      `http://localhost:5000/api/seller/updateseller?id=${id}`,data
    );
    return response.data;
  },

  getRecordForUpdate: async (id) => {
    const response = await axios.put(
      `http://localhost:5000/api/seller/updateseller?id=${id}`
    );
    return response.data;
  },


  searchSeller: async (data) => {
    const response = await axios.get(
      `http://localhost:5000/api/seller/searchseller?str=${data}&page=1&limit=5`,
      { headers: { Authorization: Token } }
    );
    return response.data;
  },
  

  addBuyer: async (data) => {
    const Token = localStorage.getItem("token");
    const response = await axios.post(
      "http://localhost:5000/api/buyer/addbuyer",
      data,
      { headers: { Authorization: Token } }
    );
    return response.data;
  },


  getBuyer: async (numberOfPages) => {
    const response = await axios.get(
      `http://localhost:5000/api/buyer/getbuyers?userId=653285ae782e2f42e482aa2c&page=${numberOfPages}&limit=5`,
    );
    return response.data;
  },

  deleteBuyer: async (id) => {
    const response = await axios.delete(
      `http://localhost:5000/api/buyer/deleteBuyer?buyerId=${id}`
    );
    return response
  },

  buyerUpdate: async ( id,data) => {
    console.log("amit",id)
    const response = await axios.put(
      `http://localhost:5000/api/buyer/updatebuyer?id=${id}`,data
    );
    return response.data;
  },

  searchBuyer: async (data) => {
    const response = await axios.get(
      `http://localhost:5000/api/buyer/searchbuyer?str=${data}&page=1&limit=5 `,
      { headers: { Authorization: Token } }
    );
    return response.data;
  },

};

export default ApiService;




