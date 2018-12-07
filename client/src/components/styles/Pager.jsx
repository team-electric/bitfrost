import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const PageButton = styled.button`
  padding: 15px;
  margin: 10px;
  border-radius: 8px;
`;


const Pager = ({ currentPage, totalPages, updatePage }) => {

  const page = (currentPage) ? currentPage : 0;

  let previousButton = null;
  if(page > 0) {
    previousButton =
      <PageButton onClick={() => updatePage(page - 1)} >
        Previous
      </PageButton>;
  }

  let nextButton = null;
  if(page < totalPages - 1) {
    nextButton =
      <PageButton onClick={() => updatePage(page + 1)} >
        Next
      </PageButton>;
  }

  return (
    <div>
      {previousButton}
      <span>{page + 1} out of {totalPages} pages</span>
      {nextButton}
    </div>
  );
};

Pager.propTypes = {
  currentPage: PropTypes.number.isRequired,
  totalPages: PropTypes.number.isRequired,
  updatePage: PropTypes.func.isRequired
};

export default Pager;
