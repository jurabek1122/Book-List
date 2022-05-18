import { useEffect, useState } from 'react';
import { Table, Button } from "react-bootstrap";
import BookDataService from '../services/book.sevices';


const BooksList = ({ getBookID }) => {

    const [books, setBooks] = useState([])

    

    const getBooks = async () => {
        const data = await BookDataService.getAllBooks();
        console.log(data.docs)
        setBooks(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
    }

    const deleteHandler = async (id) => {
        await BookDataService.deleteBook(id);
        getBooks();
    }
    useEffect(() => {
        getBooks()
    }, [books])
    
    useEffect(() => {
        getBooks()
    }, [])

    return (
        <>
        <div className="b-2">
            <Button variant="dark edit" onClick={getBooks}>
                Refresh List
            </Button>
        </div>

        <Table striped bordered hover size="sm">
            <thead>
            <tr>
                <th>#</th>
                <th>Book Title</th>
                <th>Book Author</th>
                <th>Status</th>
                <th>Action</th>
            </tr>
            </thead>
            <tbody>
                {books.map((doc, index) => {
                    return(
                        <tr key={doc.id}>
                            <td>{index + 1}</td>
                            <td>{doc.title}</td>
                            <td>{doc.author}</td>
                            <td>{doc.status}</td>
                            <td>
                            <Button
                                variant="secondary"
                                className="edit"
                                onClick={() => getBookID(doc.id)}
                            >
                                Edit
                            </Button>
                            <Button
                                variant="danger"
                                className="delete"
                                onClick={() => deleteHandler(doc.id)}
                            >
                                Delete
                            </Button>
                            </td>
                        </tr>
                    )
                })}
                
            </tbody>
        </Table>
        </>
    );
};

export default BooksList;