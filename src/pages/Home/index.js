import React from 'react';


import {Link} from 'react-router-dom';


class Home extends React.PureComponent{

  render() {
    
    return (
      <div>
        <h1>Home -v2</h1>
        <div> Welcome to my house</div>
        
        <Link to='/login'>log in</Link>
      </div>
    )
  }
}

export default Home;
