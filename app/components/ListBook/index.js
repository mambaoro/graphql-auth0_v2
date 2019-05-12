/**
 *
 * ListBook
 *
 */

import React from 'react';
// import PropTypes from 'prop-types';
// import styled from 'styled-components';
import { gql } from 'apollo-boost';
import { Query } from 'react-apollo';
// import '../App.css';

function ListBook() {
  return (
    <Query query={LIST_BOOKS}>
      {({ data, loading, error }) => {
        if (loading) return <p>...Loading</p>;
        if (error) {
          return <p>Error...</p>;
        }
        return (
          <div className="row">
            {!loading &&
              data.books.map(book => (
                <div className="col-sm-4" key={book.id}>
                  <div className="pa3 bg-black-05 ma3">
                    <div
                      style={{
                        backgroundImage: `url(${book.cover_image_url})`,
                        backgroundSize: 'cover',
                        paddingBottom: '100%',
                      }}
                    />
                    <div>
                      <div className="book">
                        <h3 align="center">
                          {book.title}
                          &nbsp;
                        </h3>
                        <h4 align="center">
                          Average Rating: {book.average_rating} / 10
                        </h4>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        );
      }}
    </Query>
  );
}

const LIST_BOOKS = gql`
  query AllBooks {
    books {
      id
      title
      cover_image_url
      average_rating
    }
  }
`;

ListBook.propTypes = {};

export default ListBook;
