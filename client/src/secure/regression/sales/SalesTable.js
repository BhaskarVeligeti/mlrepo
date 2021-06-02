/* eslint-disable no-unused-vars,no-undef */
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import numeral from 'numeral';
import SalesDataGrid from './SalesDataGrid';
// import DataGridExpand from './DataGridExpand';
// import DataGridSimple from './DataGridSimple';
import { dataColumns, dataColumns2 } from '../../../fixtures/datagridcolumns.json'


const SalesTable = ({ salesData }) => {
    const [columns, setColumns] = useState([]);
    // console.log('salesData:', salesData);
    // alert(JSON.stringify(salesData))

    const afterrandvalueFormate = (cell, row, enumObject, rowIndex) => {
        return numeral((row.afterrandvalue)).format('0,0.00');
    };

    const randvalueFormate = (cell, row, enumObject, rowIndex) => {
        return numeral((row.randvalue)).format('0,0.00');
    };
    // ***************************************************************************************************************************************************************
    // const expandRow = {
    //     // eslint-disable-next-line react/display-name
    //     renderer: row => {
    //         return (
    //             <div className="row d-flex justify-content-center">
    //                 <div className="col-10">
    //                     <DataGridSimple
    //                         keyField="key"
    //                         data={row.data}
    //                         columns={dataColumns2}
    //                     />
    //                 </div>
    //             </div>
    //         )
    //     },
    //     showExpandColumn: true,
    //     expandByColumnOnly: true,
    //     onlyOneExpanding: true,        // Enable this will only allow one row get expand at the same time.
    //     parentClassName: 'parentexpand',
    //     className: 'expand'
    // }

    // ***************************************************************************************************************************************************************
    /* When loading the component for the first time we need to initialize  "formatter"*/
    useEffect(() => {
        dataColumns.map(c => {
            if (c.dataField === 'afterrandvalue') {
                c.formatter = afterrandvalueFormate;
            }
            if (c.dataField === 'randvalue') {
                c.formatter = randvalueFormate;
            }
            
            return null;
        })
        setColumns(dataColumns);
    }, []);

    const renderDataGrid = () => {
        return (
            <SalesDataGrid
                keyField='ordinal'
                data={salesData.slice(0,50)}
                columns={dataColumns} />
        )
    }

    // const renderDataGrid = () => {
    //     return (
    //         <DataGridExpand
    //             keyField='ordinal'
    //             data={salesData}
    //             columns={dataColumns}
    //             expandRow={expandRow}
    //              />
    //     )
    // }

    return (
        <div>
            {columns.length > 0 && renderDataGrid()}
        </div>
    )
};

SalesTable.propTypes = {
    salesData: PropTypes.any
};

export default SalesTable;