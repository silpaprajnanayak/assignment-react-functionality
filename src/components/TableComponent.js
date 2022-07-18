import React, { useEffect, useState } from 'react';
import { Table } from 'reactstrap';
import axios from 'axios';
import _ from 'lodash';
import SearchBarComponent from './SearchBarComponent';

const pageSize = 10;
export const TableComponent = () => {
    const [tableData, setTableData] = useState();
    const [paginatedPosts, setPaginatedPosts] = useState();
    const [currentPage, setCurrentPage] = useState(1);
    const [searchInput, setSearchInput] = useState('');
    const [resultFound, setResultFound] = useState(false);

    useEffect(() => {
        axios.get('https://jsonplaceholder.typicode.com/todos/')
        .then(res => {
            setTableData(res.data);
            setPaginatedPosts(_(res.data).slice(0).take(pageSize).value());
            applyFilters();
        });
    }, [searchInput]);

    // Pagination Logic 
    const pageCount = tableData ? Math.ceil(tableData.length/pageSize) : 0;
    if(pageCount === 1) return null;
    const pages = _.range(1, pageCount+1);

    const pagination = (pageNo) => {
        setCurrentPage(pageNo);
        const startIndex = (pageNo - 1) * pageSize;
        const paginatedPost = _(tableData).slice(startIndex).take(pageSize).value();
        setPaginatedPosts(paginatedPost);
    }
     // Search Filter
    const applyFilters = () => {
        let updatedList = tableData;

        // Search Filter
        if (searchInput) {
            updatedList = updatedList.filter(
                (item) =>
                item.title.toLowerCase().search(searchInput.toLowerCase().trim()) !==
                -1
            );
        }

        !updatedList.length ? setResultFound(false) : setResultFound(true);
        setPaginatedPosts(_(updatedList).slice(0).take(pageSize).value());
    }
  return (
    <div style={{backgroundImage: "url(images/app_bg.png)"}}>
        {/* Search Bar */}
        <SearchBarComponent value={searchInput}
            changeInput={(e) => setSearchInput(e.target.value)} />

        <Table striped bordered hover >
            <thead>
                <tr>
                    <th>Id</th>
                    <th>Title</th>
                </tr>
            </thead>
            <tbody>
                {!paginatedPosts ? ("No Data Found") : paginatedPosts.map((data) => (
                    <tr>
                        <td>{data.id}</td>
                        <td>{data.title}</td>
                    </tr>
                ))}
            </tbody>
        </Table>
        {/* Pagination List Starts*/}
        <div className="mt-3">
            <nav className="d-flex justify-content-center">
            <ul className="pagination">
                {
                pages.map((page)=>(
                    <li className={
                    page === currentPage ? "page-item active" : "page-item"
                    }><p className="page-link" onClick={() => pagination(page)}>{page}</p></li>
                ))
                }
            </ul>
            </nav>
        </div>
        {/* Pagination List Ends*/}
    </div>
  )
}
