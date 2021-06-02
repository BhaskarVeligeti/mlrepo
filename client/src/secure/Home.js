/* eslint-disable no-unused-vars,no-undef  */
import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import withAuth from '../security/withAuth';
import withNav from './navigation/withNav';
import { Context as AppContext } from '../context/AppContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';


const Home = () => {
    const { state: { showComponent, homeItems, selectedMenu, loading, errorMessage, }, _taggleNav } = useContext(AppContext);

    /**
 * 
 * This is a Parent component 
 * Pass actions to all child components
 */

    /** ------------------------------------ close deal action  ---------------------------------------------*/
    const _onClick = (itemId) => {
        // alert(itemId)
        _taggleNav(itemId)
    };

    /*----------------------- components to  rendered------------------------------*/
    const renderItems = () => {
        let model = homeItems;
        const groups = 3;
        const columns = 'col-md-4';
        //step 1:
        let rows = [...Array(Math.ceil(model.length / groups))]; // calculate the number of rows, given  items per row
        //step 2:
        let modelRows = rows.map((row, idx) => {
            return model.slice(idx * groups, idx * groups + groups); // The result is an array of arrays (rows of items).
        });
        //   console.log('modelRows :', modelRows)
        const content = modelRows.map((row, idx) => (
            <div className="row" key={idx}>
                {row.map((m, idx) => {
                    // console.log('m:',m)
                    let input;
                    input = (
                        <div className="card mb-3 pointer" >
                            {/* <img src={`data:image/png;base64,${m.image}`} className="card-img-top rounded mx-auto d-block " alt="..." /> */}
                            <div className="card-header">
                                {m.name}
                            </div>
                            <div className="card-body">
                                <ul className="list-group list-group-flush" style={{ fontSize: '12px', marginLeft: '-20px', paddingLeft: '2px',marginTop:"-15px" }}>
                                    {m.algorithm.map(p =>
                                        <li key={p.key} className="list-group-item" title={`${p.name}`} style={{ fontSize: '12px' }}>
                                            <FontAwesomeIcon icon="arrow-down" className="mr-1" style={{ color: '#106eea', fontSize: '8px', marginLeft: '-10px',}} />
                                            <span className="card-text text-muted">{p.name}</span>
                                        </li>
                                    )
                                    }
                                </ul>
                                <div className="row">
                                    <div className="col pt-3">
                                        <div className="row d-flex justify-content-center">
                                            <button
                                                type="button"
                                                className="btn btn-outline-primary"
                                                style={{ width: '30%', borderRadius: '30px 30px 30px 30px' }}
                                                onClick={() => _onClick(m.key)}>
                                                <div><FontAwesomeIcon icon="thumbs-up" className="mr-2" />{'Go... '}</div>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    );
                    return (
                        <div key={idx} className={columns}>
                            {input}
                        </div>
                    );
                }) // end row map
                }
            </div>
        ));
        return (<div>
            {content}

        </div>);
    }


    /*----------------------- components to  screen ------------------------------*/

    return (
        <div className="container  content-padding animation">
            <div className="col py-3">
                {renderItems()}
            </div>
        </div>
    );
};

Home.propTypes = {
    user: PropTypes.any,
    isAllowed: PropTypes.any,
    history: PropTypes.any
};

const HomePage = withAuth(withNav(Home));

export default HomePage;

