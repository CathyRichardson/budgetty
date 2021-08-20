import React, { Component } from 'react';
import { connect } from 'react-redux';
import Background from './../shared/Background/Background'
import Chart1 from './../shared/Chart1';
import Chart2 from './../shared/Chart2';
import AddPurchase from './../shared/AddPurchase';
import DisplayPurchases from './../shared/DisplayPurchases';
import Loading from './../shared/Loading/Loading';
import Nav from './../shared/Nav';
import './Budget.css';


class Budget extends Component {

  render() {
    //DESTRUCTURE THE LOADING PROPERTY FROM THE BUDGET OBJECT THAT WAS MAPPED TO PROPS THROUGH MAPSTATETOPROPS/CONNECT
    const { loading } = this.props.budget;
    return (
      <Background>
        {loading ? <Loading /> : null}
        <div className='budget-container'>
          <Nav />
          <div className='content-container'>
            <div className="purchases-container">
              <AddPurchase />
              <DisplayPurchases />
            </div>
            <div className='chart-container'>
              <Chart1 />
              <Chart2 />
            </div>
          </div>
        </div>
      </Background>
    )
  }
}

// THIS FUNCTION TAKES IN THE REDUX STORE STATE AND MAPS THE BUDGET REDUCER INFO 
// FROM THE REDUX STORE TO A BUDGET KEY ON THIS COMPONENT'S PROPS OBJECT
function mapStateToProps(state) {
  return {
    budget: state.budget
  }
}

// THE CONNECT METHOD TAKES IN THE MAPSTATETOPROPS FUNCTION AND CONNECTS THIS COMPONENT TO THE REDUX STORE
export default connect(mapStateToProps)(Budget);
