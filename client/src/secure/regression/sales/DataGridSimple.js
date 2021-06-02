import React from 'react';
import PropTypes from 'prop-types';
import BootstrapTable from 'react-bootstrap-table-next';

const DataGridSimple = ({ data, columns, keyField }) => {
    return (
        <BootstrapTable
            keyField={keyField}
            columns={columns}
            data={data}
            bootstrap4
            condensed={true}
            bordered={true}
            hover
            headerClasses='custom-table-header'

        />
    )
}
DataGridSimple.propTypes = {
    data: PropTypes.any,
    columns: PropTypes.any,
    keyField: PropTypes.any,

};

export default DataGridSimple;

