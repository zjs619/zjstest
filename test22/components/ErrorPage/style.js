import styled from 'styled-components'

export const StyledErrorPage = styled.div`
  position: absolute;
  top: 22%;
  left: 50%;
  width: 500px;
  margin-left: -250px;
  text-align: center;
  color: #666;

  .logo {
    margin: 0 auto 30px;
    height: 120px;
    
    img {
      width: 220px;
    }
  }

  .action {
    margin-top: 30px;

    a {
      display: inline-block;
      margin: 0 10px;
      padding: 5px 10px;
      text-decoration: none;
      color: #f55d54;
    }

    a:hover {
      color: #f12216;
    }
  }

  //@media only screen and (max-device-width: 1024px) and (orientation: portrait) {
  //  #content {
  //    position: absolute;
  //    margin: 0;
  //    top: 47%;
  //    left: 50%;
  //    width: auto;
  //    transform: translate(-50%, -50%) scale(1.8);
  //  }
  //}
`
