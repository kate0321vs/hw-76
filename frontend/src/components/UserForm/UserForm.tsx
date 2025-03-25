import { useState } from 'react';
import axiosApi from "../../../axiosApi.ts";
import {Data} from "../../types";

const initialForm = {
    message: "",
    author: "",
}

const UserForm = () => {

  const [form, setForm] = useState<Data>(initialForm);

  const inputChangeHandler = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const {value, name} = e.target;
    setForm(prevForm => ({...prevForm, [name]: value}));
  }

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await axiosApi.post<Data>('/messages', {author: form.author, message: form.message,});
    setForm(initialForm);
  };

  return (
    <form className="w-75 mx-auto my-4" onSubmit={onSubmit}>
      <label htmlFor="author">Your Name</label>
      <input name="author"
             value={form.author}
             onChange={inputChangeHandler}
             className="form-control mb-3"
             type="text"
             id="author"
             required/>
      <label htmlFor="message">Your Message</label>
      <textarea name="message"
                value={form.message}
                onChange={inputChangeHandler}
                className="form-control mb-3"
                id="message"
                required></textarea>
      <button type="submit" className="btn btn-primary">Send</button>
    </form>
  );
};

export default UserForm;