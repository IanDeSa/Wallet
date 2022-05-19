import React from 'react';
import { connect } from 'react-redux';
import Header from '../components/Header';

class Wallet extends React.Component {
  render() {
    return (
      <section>
        <Header />
      </section>
    );
  }
}

const mapStateToProps = (state) => state;

export default connect(mapStateToProps)(Wallet);
