/* eslint-disable no-unused-vars */
import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Context as AppContext } from '../../../context/AppContext';


const SideBarPredict = ({ showComponent, taggleComponent }) => {
    const { state: { menuItems, lineItems }, } = useContext(AppContext);

    return (
        //   {/* <!-- Sidebar --> */}
        <div id="sidebar-container" className="sidebar-expanded col-2 d-none d-md-block">
            {/* <!-- d-* hiddens the Sidebar in smaller devices. Its itens can be kept on the Navbar 'Menu' --> */}
            {/* <!-- Bootstrap List Group --> */}
            <ul className="list-group sticky-top sticky-offset">
                {/* <!-- Separator with title --> */}
                <li className="list-group-item main-menu text-muted d-flex align-items-center menu-collapsed">
                    <small>MAIN MENU</small>
                </li>
                {menuItems.map(t =>
                    <a key={t.key} href={`#${t.name}`}
                        className={(showComponent === t.key) ? " list-group-item list-group-item-action active" : " list-group-item list-group-item-action"}
                        onClick={e => { e.preventDefault(); taggleComponent({ "id": t.key, "menu": t.name }); }}>
                        <FontAwesomeIcon icon="spinner" spin className={(showComponent === t.key) ? "mr-2" : " mr-2 text-success"} />
                        <span className="menu-collapsed">{t.name}</span>
                    </a>
                )}


            </ul>

            <ul className="list-group list-group" style={{ fontSize: '13px', }}>
                {lineItems.map(p =>
                    <li key={p.Ordinal} className="list-group-item" title={`${p.LineItem}`}>
                        <FontAwesomeIcon icon="check" className="mr-2" style={{ color: '#6f42c1', fontSize: '10px', }} />
                        <small className="text-danger" style={{ fontSize: '14px', fontWeight: 'bold' }}>{p.LineItem}</small>
                    </li>
                )
                }
            </ul>


            {/* <!-- List Group END--> */}
        </div>
        //   {/* sidebar-container END  */}

    )

}
SideBarPredict.propTypes = {
    showComponent: PropTypes.any,
    taggleComponent: PropTypes.any,
    inActiveDeals: PropTypes.any,
};

export default SideBarPredict;
