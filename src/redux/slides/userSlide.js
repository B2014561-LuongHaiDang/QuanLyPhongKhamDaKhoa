import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  email: '',
  avatar: '',
  phone: '',
  name: '',
  id: '',
  birthday: '',
  address: '',
  access_token: '',
  isAdmin: false,
  isDoctor: false,
  doctor: '',
}

export const userSlide = createSlice({
  name: 'user',
  initialState,
  reducers: {
    updateUser: (state, action) => {
      const { email = '', access_token = '', avatar = '', phone = '', name = '', _id = '', isAdmin, isDoctor, doctor = '', birthday = '', address = '', } = action.payload
      state.email = email;
      state.phone = phone;
      state.name = name;
      state.avatar = avatar;
      state.id = _id;
      state.access_token = access_token;
      state.isAdmin = isAdmin;
      state.isDoctor = isDoctor;
      state.doctor = doctor;
      state.birthday = birthday;
      state.address = address;
    },
    resetUser: (state) => {
      state.email = '';
      state.avatar = '';
      state.id = '';
      state.phone = '';
      state.name = '';
      state.access_token = '';
      state.doctor = '';
      state.birthday = '';
      state.address = '';
      state.isAdmin = null;
      state.isDoctor = null;
    }
  },
})

export const { updateUser, resetUser } = userSlide.actions

export default userSlide.reducer