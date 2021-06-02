/* eslint-disable no-unused-vars,no-undef  */
import React, { useContext } from 'react';
import { Context as AppContext } from '../../../context/AppContext';
import SalesTable from './SalesTable';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import ProcessIndicator from './ProcessIndicator';
import BarChartView from '../../../components/d3/BarChartView';
import GaugeChart from 'react-gauge-chart'
import numeral from 'numeral'
// import { dashboard } from '../../../fixtures/staticdata.json.js'


const Sales = () => {
    const { state: { send, receive, success, showComponent, selectedMenu, prediction, loading, showModal, errorMessage,
        lineItems, mayPrediction, junePrediction, accuracy }, _predictSales } = useContext(AppContext);
    var margin = { left: 60, right: 60, top: 60, bottom: 60 }

    /* build may bar chart data */
    let _may = Number.parseInt(mayPrediction.map(item => 1 * item.randvalue).reduce((accumulator, currentValue) => accumulator + currentValue, 0)).toFixed(2)
    let _mayCollected = Number.parseInt(mayPrediction.map(item => 1 * item.afterrandvalue).reduce((accumulator, currentValue) => accumulator + currentValue, 0)).toFixed(2)

    let _mayData = {
        "yKey": "Prediction",
        "data": [
            { "xValue": "Predictions", "yValue": _may },
            { "xValue": "Collected", "yValue": _mayCollected }
        ]
    }

    /* build june bar chart data */

    let _june = Number.parseInt(junePrediction.map(item => 1 * item.randvalue).reduce((accumulator, currentValue) => accumulator + currentValue, 0)).toFixed(2)
    let _juneCollected = Number.parseInt(junePrediction.map(item => 1 * item.afterrandvalue).reduce((accumulator, currentValue) => accumulator + currentValue, 0)).toFixed(2)

    let _juneData = {
        "yKey": "Prediction",
        "data": [
            { "xValue": "Predictions", "yValue": _june },
            { "xValue": "Collected", "yValue": _juneCollected }
        ]
    }


    // console.log('beginningTime :', send)
    // console.log('endTime :', receive)
    var diffMs = (receive - send); // milliseconds between now & send
    var diffS = numeral(0.001 * diffMs).format('0,0.00'); // seconds
    var diffMins = numeral(((diffMs % 86400000) % 3600000) / 60000).format('0,0.00'); // minutes
    var diffHrs = numeral((diffMs % 86400000) / 3600000).format('0,0.00'); // hours
    // console.log('Seconds :', diffS, 'Minutes :', diffMins, 'Hours :', diffHrs)

    /** ------------------------------- render form based on showModal,action,selectedParentRecord -------------------------------*/
    const renderForm = () => {
        // console.log('showModal :', showModal)
        return (
            <ProcessIndicator
                showModal={showModal}
                loading={loading}
                header="Linear Regression Gradient Descent Algoritm Computational process... Please wait"
                errorMessage={errorMessage}
            />
        );
    }
    /** for Predict button*/
    const onClick = (action) => {
        const fileName = action === 1 ? 'may' : 'june'
        _predictSales({ action, fileName });
    };

    /** ------------------------------- render on the screen -------------------------------*/
    return (
        <div className="animation">
            <div className="row">
                <div className="col-4 pt-0" >
                    <div className="col" style={{ fontSize: '15px' }}>
                        {(showComponent === 1 && mayPrediction.length !== 0) &&
                            <div>
                                <GaugeChart id="gauge-chart1"
                                    percent={0.01 * accuracy}
                                    textColor="#106eea"
                                />
                                {success && <span className="d-flex justify-content-center">  {'Accuracy '} <FontAwesomeIcon icon="thumbs-up" color="green" pull="left" size="xs" /></span>}
                            </div>
                        }
                        {(showComponent === 2 && junePrediction.length !== 0) &&
                            <div>
                                <GaugeChart id="gauge-chart2"
                                    nrOfLevels={20}
                                    colors={['#5BE12C', '#F5CD19', '#EA4228']}
                                    arcWidth={0.3}
                                    percent={0.01 * accuracy}
                                    textColor="#106eea"

                                />
                                {success && <span className="d-flex justify-content-center">  {'Accuracy '} <FontAwesomeIcon icon="thumbs-up" color="green" pull="left" size="xs" /></span>}
                            </div>
                        }
                    </div>
                </div>
                <div className="col-4 pt-0" >
                    <div>
                        {(showComponent === 1 && mayPrediction.length !== 0) &&
                            <BarChartView
                                gdata={_mayData}
                                container="p1"
                                width='350'
                                height='350'
                                margin={margin}
                                xAxisLabel={`Action`}
                                yAxisLabel="Prediction"
                                isFormat="Y"
                                label={''} />
                        }
                        {(showComponent === 2 && junePrediction.length !== 0) &&
                            <BarChartView
                                gdata={_juneData}
                                container="p2"
                                width='350'
                                height='350'
                                margin={margin}
                                xAxisLabel={`Action`}
                                yAxisLabel="Prediction "
                                isFormat="Y"
                                label={''} />
                        }
                    </div>
                </div>
                <div className="col-4 pt-2 ml-auto" >
                    <div className="row">
                        <div className="col" >
                            <button
                                title={`Predict ${selectedMenu}`}
                                type="button"
                                className="btn btn-outline-primary btn-block"
                                style={{ width: '80%', borderRadius: '20px 20px 20px 20px' }}
                                disabled={loading ? true : false}
                                onClick={() => onClick(showComponent)}>
                                {loading && <div><span className="spinner-grow spinner-grow-sm" role="status" aria-hidden="true"></span> <span >Processing...</span></div>}
                                {!loading && <span><FontAwesomeIcon icon="check" className="mr-2" />{`Predict ${selectedMenu}`}</span>}
                            </button>
                        </div>
                    </div>
                    <hr />
                    <div className="row py-0">
                        <div className="col-4">
                            <span><small>Dataset:</small> <code> April-2019 </code> </span>
                        </div>
                        <div className="col-4">
                            <span><small>Key Accounts:</small><code> 1000 </code> </span>
                        </div>
                        <div className="col-4">
                            <span><small>Company Code:</small><code> 300 </code> </span>
                        </div>
                    </div>
                    <hr />
                    {success &&
                        <div className="row py-0">
                            <div className="col-6">
                                <div className="row py-0">
                                    <div className="col">
                                        <span><small>Time taken:</small> <code>  {diffS} </code><small> seconds</small></span>
                                    </div>
                                </div>
                                <div className="row py-0">
                                    <div className="col">
                                        <span><small>Time taken:</small> <code>  {diffMins} </code><small> minutes</small></span>
                                    </div>
                                </div>
                                <div className="row py-0">
                                    <div className="col">
                                        <span><small>Time taken:</small> <code>  {diffHrs} </code><small> hours</small></span>
                                    </div>
                                </div>
                            </div>
                            <div className="col-6 position-relative">

                            </div>
                        </div>
                    }
                </div>

            </div>
            {showModal && renderForm()}
            {(mayPrediction.length !== 0 || junePrediction.length !== 0) &&
                <div className="row">
                    <div className="col py-0" style={{ paddingTop: '21px', fontSize: '15px' }}>
                        <SalesTable salesData={showComponent === 1 ? mayPrediction : junePrediction} />
                    </div>
                </div>
            }
        </div>
    );
}

export default Sales;
