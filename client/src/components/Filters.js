import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

class Filters extends Component {
    state = {
        price_range: ''
    }

    componentDidMount() {
        const searchQuery = new URLSearchParams(this.props.history.location.search);
        if (searchQuery.has('price_range')) this.setState({ price_range: searchQuery.get('price_range') })
    }

    // componentDidUpdate() {
    //     const searchQuery = new URLSearchParams(this.props.history.location.search);
    //     if (searchQuery.has('price_range')) this.setState({ price_range: searchQuery.get('price_range') })
    // }

    handlePriceRange = e => {
        this.setState({ price_range: e.target.value })
    }

    temp = () => {
        const { price_range } = this.state;
        const searchQuery = new URLSearchParams(this.props.history.location.search);

        if (searchQuery.has('price_range')) {

            searchQuery.set('price_range', price_range);
            this.props.history.push(`/search?${searchQuery.toString()}`)
        } else {

            searchQuery.append('price_range', price_range);
            this.props.history.push(`/search?${searchQuery.toString()}`)
        }
    }

    render() {
        const { price_range } = this.state;
        return (
            <div className="col l2 m2 mt-4">
                <p className="center">Filter</p>
                <div>
                    <p>
                        <label>
                            <input type="radio"
                                name='group1'
                                value="1"
                                checked={price_range === '1'}
                                onChange={this.handlePriceRange}
                                className="with-gap"
                            />
                            <span>$</span>
                        </label>
                    </p>
                    <p>
                        <label>
                            <input type="radio"
                                name='group1'
                                value="2"
                                checked={price_range === '2'}
                                onChange={this.handlePriceRange}
                                className="with-gap"
                            />
                            <span>$$</span>
                        </label>
                    </p>
                    <p>
                        <label>
                            <input type="radio"
                                name='group1'
                                value="3"
                                checked={price_range === '3'}
                                onChange={this.handlePriceRange}
                                className="with-gap"
                            />
                            <span>$$$</span>
                        </label>
                    </p>
                    <p>
                        <label>
                            <input type="radio"
                                name='group1'
                                value="4"
                                checked={price_range === '4'}
                                onChange={this.handlePriceRange}
                                className="with-gap"
                            />
                            <span>$$$$</span>
                        </label>
                    </p>
                </div>
            </div>
        );
    }
}

export default withRouter(Filters);