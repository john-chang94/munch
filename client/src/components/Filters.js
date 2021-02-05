import React from 'react';

const Filters = ({ setPriceRange, priceRange, propsPriceRange }) => {
    return (
        <div className="col l1 m1 offset-l1 offset-m1 mt-4">
                <p className="mb-sm">Filter</p>
                <div>
                    <p>
                        <label>
                            <input type="checkbox"
                                name='group1'
                                checked={propsPriceRange === '1'}
                                onChange={() => priceRange !== '1' ? setPriceRange('1') : setPriceRange('')}
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
                                onChange={() => priceRange !== '2' ? setPriceRange('2') : setPriceRange('')}
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
                                onChange={() => priceRange !== '3' ? setPriceRange('3') : setPriceRange('')}
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
                                onChange={() => priceRange !== '4' ? setPriceRange('4') : setPriceRange('')}
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