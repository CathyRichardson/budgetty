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
// IMPORT THE ACTION CREATOR FROM THE REDUCER FILE FOR USE BY THE CONNECT METHOD, WHICH THEN ADDS THE FUNCTION TO THE PROPS // OBJECT OF THIS COMPONENT
import { requestUserData } from '../../ducks/userReducer';
import { requestBudgetData, addPurchase, removePurchase } from '../../ducks/budgetReducer';


class Budget extends Component {
  componentDidMount() {
    // WHEN THE COMPONENT MOUNTS, THE ACTION CREATOR IS INVOKED, THE REDUCER FUNCTION FIRES, AND STATE IS UPDATED ACCORDINGLY   // IN THE REDUX STORE
    this.props.requestUserData();
    this.props.requestBudgetData();
  }

  render() {
    //DESTRUCTURE THE LOADING PROPERTY FROM THE BUDGET OBJECT THAT WAS MAPPED TO PROPS THROUGH MAPSTATETOPROPS/CONNECT
    const { loading, purchases, budgetLimit } = this.props.budget;
    const { firstName, lastName } = this.props.user;
    const { addPurchase, removePurchase } = this.props;
    return (
      <Background>
        {loading ? <Loading /> : null}
        <div className='budget-container'>
          <Nav firstName={firstName} lastName={lastName} />
          <div className='content-container'>
            <div className="purchases-container">
              <AddPurchase addPurchase={addPurchase} />
              <DisplayPurchases purchases={purchases} removePurchase={removePurchase} />
            </div>
            <div className='chart-container'>
              <Chart1 purchases={purchases} budgetLimit={budgetLimit} />
              <Chart2 purchases={purchases} />
            </div>
          </div>
        </div>
      </Background>
    )
  }
}

// THIS FUNCTION TAKES IN THE REDUX STORE STATE AND MAPS THE budgetReducer and userReducer INFO 
// FROM THE REDUX STORE TO A budget and user KEY ON THIS COMPONENT'S PROPS OBJECT
function mapStateToProps(state) {
  return {
    budget: state.budget,
    user: state.user
  }
}


const mapDispatchToProps = {
  requestUserData,
  requestBudgetData,
  addPurchase,
  removePurchase
}

// THE CONNECT METHOD TAKES IN THE mapStateToProps FUNCTION AND CONNECTS THIS COMPONENT TO THE REDUX STORE
// IN ORDER TO ACCESS THE requestUserData and requestBudgetData ACTION CREATOR, YOU NEED TO CONNECT IT TO
// THE REDUCER FUNCTION THROUGH THE CONNECT METHOD. THE CONNECT METHOD ACCEPTS TWO ARGUMENTS, A mapStateToProps OBJECT, AND A mapDispatchToProps OBJECT. OUR DISPATCHED ACTIONS GO INSIDE OF THE SECOND ARGUMENT OBJECT AS A KEY/VALUE PAIR. 
export default connect(mapStateToProps, mapDispatchToProps)(Budget);
