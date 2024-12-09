import '../styles/scss/SearchModal.scss';

// eslint-disable-next-line react/prop-types
const SearchModal = ({ isModalOpen, closeModal, searchResults, onBookSelect }) => {
    return (
        <div className={`modal-overlay ${isModalOpen ? 'open' : ''}`}>
            <div className="modal">
                <h2>책 검색 결과</h2>
                <ul className="modal-list">
                    {searchResults.map((book, index) => (
                        <li key={index} className="modal-item" onClick={() => onBookSelect(book)}>
                            <img src={book.image} alt={book.title} className="book-URLimage" />
                            <div className="book-info">
                                <p className='book-title'>{book.title}</p>
                                <p className='book-author'>{book.author}</p>
                            </div>
                        </li>
                    ))}
                </ul>
                <button className='modal-cancel' onClick={closeModal}>닫기</button>
            </div>
        </div>
    );
};

export default SearchModal;
