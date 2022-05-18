import { useState, useEffect } from 'react';
import { Form, InputGroup, Button, ButtonGroup, Alert } from "react-bootstrap";
import BookDataService from '../services/book.sevices';

const AddBook = ({ bookId, setBookId }) => {

    const [title, setTitle] = useState("");
    const [author, setAuthor] = useState("");
    const [status, setStatus] = useState("Available");
    const [flag, setFlag] = useState(true);
    const [message, setMessage] = useState({ error: false, msg: "" });

    const handlerSubmit = async(e) => {
        e.preventDefault();
        setMessage("")
        if (title === "" || author === "") {
            setMessage({ error: true, msg: "All fields are mandatory!"})
            return;
        }
        const newBook = {
            title,
            author, 
            status
        }
        console.log(newBook)

        try {
            if (bookId !== undefined && bookId !== "") {
                await BookDataService.updateBook(bookId, newBook)
                setMessage({error: false, msg: "Updated Succesfully"})
                setBookId("")
            } else {
                await BookDataService.addBooks(newBook)
                setMessage({error: false, msg: "New Book Added Succesfully"})
            }
           
        } catch (err) {
            setMessage({ error: true, msg: err.message })
        }

        setTitle("")
        setAuthor("")
    }

    const editHandler = async () => {
        setMessage("")
        try {
            const docSnap = await BookDataService.getBook(bookId)
            setTitle(docSnap.data().title)
            setAuthor(docSnap.data().author)
            setStatus(docSnap.data().status)
        } catch (err) {
            setMessage({ error: true, msg: err.message})
        }
    }

    useEffect(() => {
        if(bookId !== undefined && bookId !== "") {
            editHandler();
        }
    }, [bookId])
  
  return (
    <>
      <div className="p-4 box">

      {message?.msg && (
        <Alert 
        variant={message?.error ? "danger" : "success"} 
        dismissible 
        onClose={() => setMessage("")}>
            {message?.msg}
        </Alert>
        )}

        <Form onSubmit={handlerSubmit}>
          <Form.Group className="mb-3" controlId="formBookTitle">
            <InputGroup>
              <InputGroup.Text id="formBookTitle">B</InputGroup.Text>
              <Form.Control
                type="text"
                placeholder="Book Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </InputGroup>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBookAuthor">
            <InputGroup>
              <InputGroup.Text id="formBookAuthor">A</InputGroup.Text>
              <Form.Control
                type="text"
                placeholder="Book Author"
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
              />
            </InputGroup>
          </Form.Group>
          <ButtonGroup aria-label="Basic example" className="mb-3">
            <Button
              variant="success"
              onClick={(e) => {
                setStatus("Available");
                setFlag(true);
              }}
            >
              Available
            </Button>
            <Button
              variant="danger"
              onClick={(e) => {
                setStatus("Not Available");
                setFlag(false);
              }}
            >
              Not Available
            </Button>
          </ButtonGroup>
          <div className="d-grid gap-2">
            <Button variant="primary" type="submit">
              Add/ Update
            </Button>
          </div>
        </Form>
      </div>
    </>
  );
};

export default AddBook;