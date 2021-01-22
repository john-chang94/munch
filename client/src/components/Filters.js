import React from 'react';

const Filters = ({ setPriceRange, price_range, propsPriceRange }) => {
    return (
        <div className="col l2 m2 mt-4">
                <p className="center">Filter</p>
                <div>
                    <p>
                        <label>
                            <input type="checkbox"
                                name='group1'
                                checked={propsPriceRange === '1'}
                                onChange={() => price_range !== '1' ? setPriceRange('1') : setPriceRange('')}
                                className="filled-in"
                            />
                            <span>$</span>
                        </label>
                    </p>
                    <p>
                        <label>
                            <input type="checkbox"
                                name='group1'
                                checked={propsPriceRange === '2'}
                                onChange={() => price_range !== '2' ? setPriceRange('2') : setPriceRange('')}
                                className="filled-in"
                            />
                            <span>$$</span>
                        </label>
                    </p>
                    <p>
                        <label>
                            <input type="checkbox"
                                name='group1'
                                checked={propsPriceRange === '3'}
                                onChange={() => price_range !== '3' ? setPriceRange('3') : setPriceRange('')}
                                className="filled-in"
                            />
                            <span>$$$</span>
                        </label>
                    </p>
                    <p>
                        <label>
                            <input type="checkbox"
                                name='group1'
                                checked={propsPriceRange === '4'}
                                onChange={() => price_range !== '4' ? setPriceRange('4') : setPriceRange('')}
                                className="filled-in"
                            />
                            <span>$$$$</span>
                        </label>
                    </p>
                </div>
            </div>
    )
}

export default Filters;