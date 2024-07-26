import React, { useState, useEffect } from "react";
import TableCell from '@mui/material/TableCell';
import Container from '@mui/material/Container';
import Table from '@mui/material/Table';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TableBody from '@mui/material/TableBody';
import ReactPaginate from "react-paginate";
import { userAPI } from "../apis/UserAPI"
import TableSortLabel from '@mui/material/TableSortLabel';

const Users = (props) => {
  const {valueToOrderBy, orderDirection, handleRequestSort} = props
  
  const [userList, setUserList] = useState([]);

  const [pageCount, setpageCount] = useState(0);

  let limit = 4;

  useEffect(() => {
    getUserWithFetch();
  }, []);

  const responseUserAPI = userAPI.getAll().then((userList) => {
    const responseUserAPI = userList;
    return responseUserAPI
  });

  const responseUserPageAPI = userAPI.getPage().then((userList) => {
    const responseUserPageAPI = userList;
    return responseUserPageAPI
  });

  const createSortHandler = (property) => (event) => {
    handleRequestSort(event, property)
  }

  useEffect(() => {
    const getUsersPage = async () => {
    var result: any = [];

    for(var i in (await responseUserAPI).items) {
      result.push((await responseUserAPI).items[i]);
    }
    const total = (await responseUserAPI).total;
    setpageCount(Math.ceil(total / limit));
    setUserList(result);
  };

    getUsersPage();
  }, [limit]);

  const getUserWithFetch = async () => {
    var result: any = [];

    for(var i in (await responseUserAPI).items) {
      result.push((await responseUserAPI).items[i]);
    }
    setUserList(result);
  };
  
  const paginatedUsers = async (currentPage: any) => {
    currentPage = (await responseUserPageAPI).page;
    var result: any = [];

    for(var i in (await responseUserPageAPI).items) {
      result.push((await responseUserPageAPI).items[i]);
    }
    return result;
  };

  const handlePageClick = async (responseUserPageAPI: any) => {
    let currentPage = responseUserPageAPI.selected;

    const commentsFormServer: any = await paginatedUsers(currentPage);

    setUserList(commentsFormServer);
  };

  function descendingComparator(a, b, orderBy) {
    if(b[orderBy] < a[orderBy]){
      return -1
    }
    if(b[orderBy] > a[orderBy]){
      return 1
    }
    return 0
  }

  function getComparator(order, orderBy) {
    return order === "desc"
          ? (a,b) => descendingComparator(a,b, orderBy)
          : (a,b) => -descendingComparator(a,b, orderBy)
  }

  const sortedRowInformation = (userList, comparator) => {
    const stabilizedRowArray = userList.map((el, index) => [el, index])
    stabilizedRowArray.sort((a,b) => {
      const order = comparator(a[0], b[0])
      if(order !==0) return order
      return a[1] - b[1]
    })
    return stabilizedRowArray.map((el) => el[0])
  }

  return (
    <div className="App">
      <header className="App-header">
        <h2>Get Users</h2>
      </header>
      <Container className="container">
        <Table className="table table-striped table-bordered">
            <TableHead className="row-header">
                <TableRow>
                  <TableCell align="left" key="name">
                    <TableSortLabel active={valueToOrderBy === "name"}
                                    direction={valueToOrderBy === "name" ? orderDirection: 'asc'}
                                    onClick={createSortHandler("name")}
                    >
                      Name
                    </TableSortLabel>  
                  </TableCell>
                  <TableCell align="left" key="surname">
                    <TableSortLabel active={valueToOrderBy === "surname"}
                                    direction={valueToOrderBy === "surname" ? orderDirection: 'asc'}
                                    onClick={createSortHandler("surname")}
                    >
                      Surname
                    </TableSortLabel>
                  </TableCell>
                  <TableCell align="left" key="username">
                    <TableSortLabel active={valueToOrderBy === "username"}
                                    direction={valueToOrderBy === "username" ? orderDirection: 'asc'}
                                    onClick={createSortHandler("username")}
                    >
                      Username
                    </TableSortLabel>
                  </TableCell>
                  <TableCell align="left" key="email">
                    <TableSortLabel active={valueToOrderBy === "email"}
                                    direction={valueToOrderBy === "email" ? orderDirection: 'asc'}
                                    onClick={createSortHandler("email")}
                    >
                      Email
                    </TableSortLabel>
                  </TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
              {sortedRowInformation(userList, getComparator(orderDirection, valueToOrderBy)).map((user: any) => (
                <>
                  <TableRow key={user.id} className="row-data">
                    <TableCell align="left" className="row-item">{user.name}</TableCell>
                    <TableCell align="left" className="row-item">{user.surname}</TableCell>
                    <TableCell align="left" className="row-item">{user.username}</TableCell>
                    <TableCell align="left" className="row-item">{user.email}</TableCell>
                  </TableRow>
                </>
              ))}
            </TableBody>
        </Table>
      </Container>

      <ReactPaginate
        previousLabel={"previous"}
        nextLabel={"next"}
        breakLabel={"..."}
        pageCount={pageCount}
        marginPagesDisplayed={2}
        pageRangeDisplayed={3}
        onPageChange={handlePageClick}
        containerClassName={"pagination justify-content-center"}
        pageClassName={"page-item"}
        pageLinkClassName={"page-link"}
        previousClassName={"page-item"}
        previousLinkClassName={"page-link"}
        nextClassName={"page-item"}
        nextLinkClassName={"page-link"}
        breakClassName={"page-item"}
        breakLinkClassName={"page-link"}
        activeClassName={"active"}
      />
    </div>
  );

};
export default Users;