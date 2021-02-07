import React from 'react';

const Filters = ({ setprice, price, propsprice }) => {
    return (
        <div className="col l1 m1 offset-l1 offset-m1 mt-4">
                <p className="mb-sm">Filter</p>
                <div>
                    <p>
                        <label>
                            <input type="checkbox"
                                name='group1'
                                checked={propsprice === '1'}
                                onChange={() => price !== '1' ? setprice('1') : setprice('')}
                                className="filled-in"
                            />
                            <span>$</span>
                        </label>
                    </p>
                    <p>
                        <label>
                            <input type="checkbox"
                                name='group1'
                                checked={propsprice === '2'}
                                onChange={() => price !== '2' ? setprice('2') : setprice('')}
                                className="filled-in"
                            />
                            <span>$$</span>
                        </label>
                    </p>
                    <p>
                        <label>
                            <input type="checkbox"
                                name='group1'
                                checked={propsprice === '3'}
                                onChange={() => price !== '3' ? setprice('3') : setprice('')}
                                className="filled-in"
                            />
                            <span>$$$</span>
                        </label>
                    </p>
                    <p>
                        <label>
                            <input type="checkbox"
                                name='group1'
                                checked={propsprice === '4'}
                                onChange={() => price !== '4' ? setprice('4') : setprice('')}
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