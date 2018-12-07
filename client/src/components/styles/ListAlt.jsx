import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const StyledDiv = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
`;

const List = ({ items, Card }) => {

  const cardList = items.map(comment => {
    return (
      <Card
        key={comment.id}
        comment={items}
      />
    );
  });

  return (
    <div>
      <StyledDiv>
        {cardList}
      </StyledDiv>
    </div>
  );
};

List.propTypes = {
  items: PropTypes.array.isRequired
};

export default List;
