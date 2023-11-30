import styled from 'styled-components';

const Wrapper = styled.div`
    position: relative;
    display: flex;
`;

const SearchInput = styled.input`
    margin-right: 16px;
    width: 248px;
    color: #9DBFAF;
    background: #fff;
    color: #525865;
    border-radius: 1px;
    border: 1px solid #d1d1d1;
    box-shadow: inset 1px 2px 8px rgba(0, 0, 0, 0.07);
    font-family: inherit;
    font-size: 0.75em;
    line-height: 1.45;
    outline: none;
    padding: 0.55em 0.75em 0.65em;
    padding-right: 45px;
    -webkit-transition: .18s ease-out;
    -moz-transition: .18s ease-out;
    -o-transition: .18s ease-out;
    transition: .18s ease-out;

    &:hover {
        box-shadow: inset 1px 2px 8px rgba(0, 0, 0, 0.02);
    }

    &:focus {
        border: 1px solid #B8B6B6;
        border-right: none;
        box-shadow: inset 1px 2px 4px rgba(0, 0, 0, 0.01), 0px 0px 8px rgba(0, 0, 0, 0.2);  
    }
`;

const SearchButton = styled.button`
    width: 40px;
    border: none;
    position: absolute;
    right: 12px;
    cursor: pointer;
    font-size: 20px;
    background-color: transparent;
    height: 100%;    
`;

const Icon = styled.div`
    background: url('data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiA/PjwhRE9DVFlQRSBzdmcgIFBVQkxJQyAnLS8vVzNDLy9EVEQgU1ZHIDEuMS8vRU4nICAnaHR0cDovL3d3dy53My5vcmcvR3JhcGhpY3MvU1ZHLzEuMS9EVEQvc3ZnMTEuZHRkJz48c3ZnIGhlaWdodD0iNTEycHgiIGlkPSJMYXllcl8xIiBzdHlsZT0iZW5hYmxlLWJhY2tncm91bmQ6bmV3IDAgMCA1MTIgNTEyOyIgdmVyc2lvbj0iMS4xIiB2aWV3Qm94PSIwIDAgNTEyIDUxMiIgd2lkdGg9IjUxMnB4IiB4bWw6c3BhY2U9InByZXNlcnZlIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIj48cGF0aCBkPSJNMzQ0LjUsMjk4YzE1LTIzLjYsMjMuOC01MS42LDIzLjgtODEuN2MwLTg0LjEtNjguMS0xNTIuMy0xNTIuMS0xNTIuM0MxMzIuMSw2NCw2NCwxMzIuMiw2NCwyMTYuMyAgYzAsODQuMSw2OC4xLDE1Mi4zLDE1Mi4xLDE1Mi4zYzMwLjUsMCw1OC45LTksODIuNy0yNC40bDYuOS00LjhMNDE0LjMsNDQ4bDMzLjctMzQuM0wzMzkuNSwzMDUuMUwzNDQuNSwyOTh6IE0zMDEuNCwxMzEuMiAgYzIyLjcsMjIuNywzNS4yLDUyLjksMzUuMiw4NWMwLDMyLjEtMTIuNSw2Mi4zLTM1LjIsODVjLTIyLjcsMjIuNy01Mi45LDM1LjItODUsMzUuMmMtMzIuMSwwLTYyLjMtMTIuNS04NS0zNS4yICBjLTIyLjctMjIuNy0zNS4yLTUyLjktMzUuMi04NWMwLTMyLjEsMTIuNS02Mi4zLDM1LjItODVjMjIuNy0yMi43LDUyLjktMzUuMiw4NS0zNS4yQzI0OC41LDk2LDI3OC43LDEwOC41LDMwMS40LDEzMS4yeiIvPjwvc3ZnPg==');
    background-size: cover;
    height: 25px;
    width: 25px;
    filter: brightness(0) invert(0.4);
`;

export default function SearchBar(){
    return (
        <Wrapper>
            <SearchInput type="text" placeholder="Search for info, models, courses..." />
            <SearchButton type="submit">
                <Icon />
            </SearchButton>
        </Wrapper>
    )
}