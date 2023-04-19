import { useParams } from 'react-router-dom';
import React, { useState, useEffect } from "react";
import { BuildingsServices } from "../../services";
import { Table, Column, HeaderCell, Cell } from 'rsuite-table';
import 'rsuite-table/dist/css/rsuite-table.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles.scss'
import {format} from 'date-fns';
import Modal from 'react-bootstrap/Modal';

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const AssetsReviewPage = () => {


    const { id } = useParams();
    const [assetReviews, setAssetReviews] = useState([]);
    const [assetReviewCodes, setAssetReviewCodes] = useState([]);
    const [selectedReviewCode, setSelectedReviewCode] = useState('')
    const [selectedDate, setSelectedDate] = useState('');
    const [openModal, setOpenModal] = useState(false);
    const [refresh, setRefresh] = useState(true);
    const [sortDescOrder, setSortDescOrder] = useState(false);

    const headers = [
        {
            key: "RPIMID",
            header: "RPIMID",
        },
        {
            key: "assetReviewTypeCode",
            header: "Asset Review Type Code",
        },

        {
            key: "assetReviewDate",
            header: "Asset Review Date",
        },
    ];

    useEffect(() => {
        (async () => {
            if(refresh) {
                let assetReviewCodes = await BuildingsServices.getAssetReviewTypeCodes();
                assetReviewCodes.forEach((item) => {
                    item.id = item._id;
                });
                setSelectedReviewCode(assetReviewCodes[0]);
                setAssetReviewCodes(assetReviewCodes);
                await loadAsssetReviews(id);
                setRefresh(false)
            }
        })();
    }, [refresh]);

    const loadAsssetReviews = async (id) => {
        let _assetReviewsByBuildingId = await BuildingsServices.getAssetReviewsByBuildingId(id);
        console.log(_assetReviewsByBuildingId)
        _assetReviewsByBuildingId = await sortAssetReviews(_assetReviewsByBuildingId)
        await setAssetReviews(_assetReviewsByBuildingId);
    }

    const sortAssetReviews = async (_assetReviews) => {

        return _assetReviews.sort((assetReview1, assetReview2) => {
            if(sortDescOrder) {
                return new Date(assetReview2.assetReviewDate) - new Date(assetReview1.assetReviewDate);
            } else {
                return new Date(assetReview1.assetReviewDate) - new Date(assetReview2.assetReviewDate);
            }
            
            
        });
    }
    const addAssetReview = async (event) => {
        console.log(selectedReviewCode)
        await BuildingsServices.addAssetReviews(id, {
            cstBuildingSpecId: id,
            assetReviewTypeCode: {id: selectedReviewCode.id, value: selectedReviewCode.name},
            assetReviewDate: selectedDate.toISOString(),
        });
        setOpenModal(false);
        setRefresh(true);
        
    }

    const onAssetReviewCodeChange = async (event) => {
        setSelectedReviewCode(event.target.value)

    }

    const onSort = async (sortColumn, sortType) => {
        await setSortDescOrder(!sortDescOrder);
        setRefresh(true);
    }

    return (
        <>
            <Modal show={openModal} onHide={()=> {setOpenModal(false)}}>
                <Modal.Header closeButton>
                <Modal.Title></Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="asset-review-form">
                        <div className="asset-review-label">Date</div>
                        <div><DatePicker selected={selectedDate} onChange={(date) => setSelectedDate(date)} /></div>
                        <div className="asset-review-label">Asset Review Code</div>
                        <div>
                            <select onChange={event => onAssetReviewCodeChange(event)}>
                                {assetReviewCodes.map((reviewCode) => 
                                    <option value={reviewCode}>{reviewCode.name}</option>
                                )}
                            </select>
                        </div>
                    </div>
                     
                </Modal.Body>
                
                <Modal.Footer>
                    <button className="add-button" role="button" onClick={addAssetReview}>Save</button>
                    <button className="add-button" role="button" onClick={()=> {setOpenModal(false)}}>Cancel</button>
                </Modal.Footer>
            </Modal>
            <div className='asset-review-grid-frame'>
                <div className='heading-container'><h2>Asset Reviews</h2></div>
                <Table data={assetReviews} onSortColumn={onSort}>
                    <Column width={150}>
                        <HeaderCell>ID</HeaderCell>
                        <Cell dataKey="RPIMID" />
                    </Column>
                    <Column width={200}>
                        <HeaderCell>Asset Review Type Code</HeaderCell>
                        <Cell>
                            {(rowData, rowIndex) => {
                                return (
                                    rowData.assetReviewTypeCode.value
                                )
                            }}
                        </Cell>
                    </Column>
                    <Column width={200} sortable>
                        <HeaderCell>Asset Review Date</HeaderCell>
                        <Cell dataKey="assetReviewDate">
                            {(rowData, rowIndex) => {
                                return (
                                format(new Date(rowData.assetReviewDate), 'MM/dd/yyyy')
                                )
                            }}
                        </Cell>
                    </Column>
                </Table>
                <div className="add-button-container">
                    <button className="add-button" role="button" onClick={()=> {setOpenModal(true)}}>Add</button>
                </div>
            </div>
        </>
    );
}
export default AssetsReviewPage;

