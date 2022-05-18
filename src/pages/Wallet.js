import React from 'react';
import { connect } from 'react-redux';

class Wallet extends React.Component {
  render() {
    console.log(this.props);
    const { user } = this.props;
    return (
      <main>
        <h2>TrybeWallet</h2>
        <h2>{user.email}</h2>
      </main>
    );
  }
}

const mapStateToProps = (state) => state;

export default connect(mapStateToProps)(Wallet);
