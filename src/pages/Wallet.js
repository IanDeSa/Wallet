import React from 'react';
import { connect } from 'react-redux';
import Header from '../components/Header';

class Wallet extends React.Component {
  render() {
    return (
      <main>
        <Header />
      </main>
    );
  }
}

const mapStateToProps = (state) => state;

export default connect(mapStateToProps)(Wallet);
