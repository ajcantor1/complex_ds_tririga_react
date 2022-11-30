import "./styles.css";
import { AiOutlineSearch } from "react-icons/ai";
export const SearchBox = (props) => {
    return (
        <div className="search-group">
            <input
                className="search-input"
                value={props.searchTerm}
                onChange={props.onSearchTermChange}
            />
            <button className="search-button" onClick={() => props.onSearch()}>
                <AiOutlineSearch size={24} />
            </button>
        </div>
    );
};

export default SearchBox;
