/* eslint-disable react/no-this-in-sfc */

/**
 *
 * CreateBook
 *
 */

import React, { useRef } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
// import styled from 'styled-components';
import { gql } from 'apollo-boost';
import { Mutation } from 'react-apollo';

function CreateBook(props) {
  const titleInput = useRef(null);
  const coverImageInput = useRef(null);
  const ratingInput = useRef(null);
  const authorInput = useRef(null);
  return (
    <Mutation mutation={ADD_BOOK} onCompleted={() => props.history.push('/')}>
      {(addBook, { loading, error }) => (
        <div>
          <div className="w-100 pa4 flex justify-center">
            <form
              // eslint-disable-next-line consistent-return
              onSubmit={e => {
                e.preventDefault();
                if (!props.auth.isAuthenticated()) return props.auth.login();
                addBook({
                  variables: {
                    title: titleInput.current.value,
                    cover_image_url: coverImageInput.current.value,
                    average_rating: parseFloat(ratingInput.current.value),
                    author: authorInput.current.value,
                  },
                });
                titleInput.current.value = '';
                coverImageInput.current.value = '';
                ratingInput.current.value = '';
                authorInput.current.value = '';
              }}
            >
              <div style={{ maxWidth: 400 }} className="">
                <label htmlFor="title">Book Title: </label>
                <input
                  className="w-100 pa3 mv2"
                  type="text"
                  required
                  placeholder="Title of the book"
                  // eslint-disable-next-line no-return-assign
                  ref={titleInput}
                  id="title"
                />
                <label htmlFor="coverImage">Book Cover Image: </label>
                <input
                  className="w-100 pa3 mv2"
                  type="text"
                  required
                  placeholder="Image Url"
                  // eslint-disable-next-line no-return-assign
                  ref={coverImageInput}
                  id="coverImage"
                />
                <label htmlFor="rating">
                  Book Rating as decided by Popular votes:
                </label>
                <input
                  className="w-100 pa3 mv2"
                  type="number"
                  required
                  min="1"
                  max="10"
                  placeholder="Average Rating"
                  // eslint-disable-next-line no-return-assign
                  ref={ratingInput}
                  id="rating"
                />
                <label htmlFor="author">Author: </label>
                <select
                  // eslint-disable-next-line no-return-assign
                  ref={authorInput}
                  name="author"
                  required
                  id="author"
                >
                  <option value="">Select an author</option>
                  <option value="cjt9179k8govb0b56xqqq7j54">Wole</option>
                  <option value="cjt9181ehj8g20b79vjmkzbw9">Tomi</option>
                  <option value="cjt918ps0j8i70b79h3vxd641">Chimamanda</option>
                </select>
              </div>
              {loading && <p>...Loading</p>}
              {error && <p>Error :( Please try again</p>}
              <button type="submit">Add Book</button>
            </form>
          </div>
        </div>
      )}
    </Mutation>
  );
}

const ADD_BOOK = gql`
  mutation addBook(
    $title: String!
    $cover_image_url: String!
    $average_rating: Float!
    $author: ID!
  ) {
    addBook(
      data: {
        title: $title
        cover_image_url: $cover_image_url
        average_rating: $average_rating
        author: $author
      }
    ) {
      id
      title
      cover_image_url
      average_rating
    }
  }
`;

CreateBook.propTypes = {
  history: PropTypes.object,
  auth: PropTypes.any,
};

export default withRouter(CreateBook);
