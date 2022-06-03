import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function NavBar(props) {
  const [searchStr, setSearchStr] = useState('');
  // console.log('searchStr', searchStr);
  return (
    <React.Fragment>
      <nav className="navbar navbar-expand-lg bg-light">
        <div className="container-fluid">
          <a className="navbar-brand" href="#">
            EtherScan
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <a className="nav-link active" aria-current="page" href="#">
                  Ana Sayfa
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link active" aria-current="page" href="#">
                  Bloklar
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#">
                  Transferler
                </a>
              </li>
            </ul>
            <form className="d-flex" role="search">
              <input
                className="form-control me-2"
                type="search"
                placeholder="Adres veya Txn Hash Arayın"
                aria-label="Search"
                value={searchStr}
                onChange={(e) => setSearchStr(e.target.value)}
              />
              <a
                href={props.getSearchResult(searchStr)}
                className="btn btn-outline-success"
              >
                Ara
              </a>
              {/* <button className="btn btn-outline-success" type="submit">
                Ara
              </button> */}
            </form>
          </div>
        </div>
      </nav>
    </React.Fragment>
  );
}

export default NavBar;
