
import PropTypes from 'prop-types'; // Import PropTypes để sử dụng

import HeaderComponent from '../header/HeaderComponent';

const DefaultComponent = ({ children }) => {
  return (
    <div>
      <HeaderComponent />
      <main>{children}</main>
    </div>
  );
};

// Định nghĩa prop-types cho DefaultComponent
DefaultComponent.propTypes = {
  children: PropTypes.node.isRequired, // children là một node và bắt buộc
};

export default DefaultComponent;
