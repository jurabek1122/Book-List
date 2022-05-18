import { useState } from 'react';
import { Container, Navbar, Row, Col } from "react-bootstrap";
import AddBook from "./components/AddBook";
import BooksList from "./components/BooksList";
import "./style.css";

function App() {

    const [bookId, setBookId] = useState("")

    const getBookIdHandler = (id) => {
        console.log("id", id)
        setBookId(id)
    }
  
  return (
    <>
      <Navbar bg="dark" variant="dark" className="header">
        <Container>
          <Navbar.Brand href="#home">Library - Firebase CRUD</Navbar.Brand>
        </Container>
      </Navbar>

      <Container style={{ width: "400px" }}>
        <Row>
          <Col>
            <AddBook bookId={bookId} setBookId={setBookId} />
          </Col>
        </Row>
      </Container>
      <Container>
        <Row>
          <Col>
            <BooksList getBookID={getBookIdHandler} />
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default App;