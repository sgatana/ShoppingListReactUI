import React, { Component } from 'react';

class Home extends Component {
    render() {
        return (
            <div className="col-md-8">

                <div className="item-1">
                    <h2>Save Time for Shopping </h2>
                    <p>The shopping list presents an organized approach enabling the shopper to get in and get out of
                        the store without wasting time looking for goods you do not need.
                    </p>
                </div>

                <div className="item-2">
                    <h2>Eat Healthy</h2>
                    <p>
                        A shopping list affords the opportunity to evaluate the type foods that are consumed in the household.
                        This list is your line of defense against making poor, last-minute food choices..
                    </p>
                </div>
                <div className="item-3">
                    <h2>Save Money</h2>
                    <p >
                        You must also have enough confidence in the list to know that you do not
                        need anything else. Your shopping list can reduce you food expense by between 20 and 25 percen
                    </p>

                </div>



            </div>

        )
    }
}
export default Home;