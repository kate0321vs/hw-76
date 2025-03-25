import { useState } from 'react';
import axiosApi from "../../../axiosApi.ts";
import {Data} from "../../types";
import {Button, Container, TextField, Typography} from "@mui/material";

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
    if (form.author.trim().length === 0 || form.message.trim().length === 0) {
        alert("Fields 'message' and 'author' are required");
        return;
    }
    await axiosApi.post<Data>('/messages', {author: form.author, message: form.message,});
    setForm(initialForm);
  };

  return (
      <Container maxWidth="sm">
          <Typography variant='h5' textAlign='center' my={3}>Chat</Typography>
          <form onSubmit={onSubmit}>
              <TextField
                  sx={{mb: 3}}
                  label="Your Name"
                  name="author"
                  value={form.author}
                  onChange={inputChangeHandler}
                  fullWidth
                  variant="outlined"
                  required
              />
              <TextField
                  sx={{mb: 3}}
                  label="Your Message"
                  name="message"
                  value={form.message}
                  onChange={inputChangeHandler}
                  fullWidth
                  variant="outlined"
                  required
                  multiline
                  rows={4}
              />
              <Button type="submit" variant="contained" color="primary" fullWidth>
                  Send
              </Button>
          </form>
      </Container>
  );
};


export default UserForm;