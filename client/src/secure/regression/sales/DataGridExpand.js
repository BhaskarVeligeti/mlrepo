import React from 'react';
import PropTypes from 'prop-types';
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';
import ToolkitProvider, { CSVExport, Search } from 'react-bootstrap-table2-toolkit';
import { options } from '../../../fixtures/datagridoption.json';


const DataGridExpand = ({ data, columns, keyField, expandRow }) => {
    const { ExportCSVButton } = CSVExport;
    const { SearchBar } = Search;

    return (
        <ToolkitProvider
            keyField={keyField}
            columns={columns}
            data={data}
            bootstrap4
            search={true}
            exportCSV={true}>
            {props => (
                <div>
                    <div className="row">
                        <div className="col-md-1 pt-2">
                            <ExportCSVButton className="btn btn-success btn-sm  custom-button "  {...props.csvProps} >
                                <i className="fa fa fa-download" aria-hidden="true" />{' '}
                            </ExportCSVButton>
                        </div>
                        <div className="col-md-3 offset-md-8">
                            <SearchBar {...props.searchProps} />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-12 pt-1">
                            <BootstrapTable
                                {...props.baseProps}
                                condensed={true}
                                hover
                                headerClasses="custom-table-header"
                                pagination={paginationFactory(options)}
                                expandRow={expandRow}
                                noDataIndication="Table is Empty..."
                            />
                        </div>
                    </div>
                </div>)
            }
        </ToolkitProvider>
    )
}

DataGridExpand.propTypes = {
    data: PropTypes.any,
    columns: PropTypes.any,
    keyField: PropTypes.any,
    expandRow: PropTypes.any,
    csvProps: PropTypes.any,
    searchProps: PropTypes.any,
    baseProps: PropTypes.any

};
export default DataGridExpand;

