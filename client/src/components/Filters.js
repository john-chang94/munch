import React from 'react';

const Filters = ({ setPrice, price, propsPrice }) => {
    return (
        <div className="col l1 m1 offset-l1 offset-m1 mt-4">
                <p className="mb-sm">Filter</p>
                <div>
                    <p>
                        <label>
                            <input type="checkbox"
                                name='group1'
                                checked={propsPrice === '1'}
                                onChange={() => price !== '1' ? setPrice('1') : setPrice('')}
                                className="filled-in"
                            />
                            <span>$</span>
                        </label>
                    </p>
                    <p>
                        <label>
                            <input type="checkbox"
                                name='group1'
                                checked={propsPrice === '2'}
                                onChange={() => price !== '2' ? setPrice('2') : setPrice('')}
                                className="filled-in"
                            />
                            <span>$$</span>
                        </label>
                    </p>
                    <p>
                        <label>
                            <input type="checkbox"
                                name='group1'
                                checked={propsPrice === '3'}
                                onChange={() => price !== '3' ? setPrice('3') : setPrice('')}
                                className="filled-in"
                            />
                            <span>$$$</span>
                        </label>
                    </p>
                    <p>
                        <label>
                            <input type="checkbox"
                                name='group1'
                                checked={propsPrice === '4'}
                                onChange={() => price !== '4' ? setPrice('4') : setPrice('')}
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