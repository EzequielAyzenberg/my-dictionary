import { createGlobalStyle } from 'styled-components';
import 'bootstrap/dist/css/bootstrap.css';

const GlobalStyle = createGlobalStyle`
  body { 
    background-color: #404040;
    color: #f3e8e8;
  }
  
  .search-box, .search-box:focus-visible {
    background-color: #404040;
    border: #404040;
    color: #f3e8e8;
  }

`;

// .container {
//   height: calc(100vh - 44px);
// }

export default GlobalStyle;
