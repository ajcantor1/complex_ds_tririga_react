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
    const headers = [
        {
            key: "id",
            header: "id",
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
            let assetReviewCodes = await BuildingsServices.getAssetReviewTypeCodes();
            assetReviewCodes.forEach((item) => {
                item.id = item._id;
            });
            setSelectedReviewCode(assetReviewCodes[0].name);
            setAssetReviewCodes(assetReviewCodes);
            await loadAsssetReviews(id)

        })();
    }, [id]);

    const loadAsssetReviews = async (id) => {
        let _assetReviewsByBuildingId = await BuildingsServices.getAssetReviewsByBuildingId(id);
        let rpimIds = _assetReviewsByBuildingId.map((assetReviewById) => {
            return assetReviewById.rpimId;
        });

        let _assetReviews = await BuildingsServices.getAssetReviews(rpimIds)

        setAssetReviews(_assetReviews);
    }
    const addAssetReview = async (event) => {

        await BuildingsServices.addAssetReviews({
            buildingId: id,
            assetReviewTypeCode: selectedReviewCode,
            assetReviewDate: selectedDate,
        });
        setOpenModal(false);
    }

    const onAssetReviewCodeChange = async (event) => {
        setSelectedReviewCode(event.target.value)
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
                                    <option value={reviewCode.name}>{reviewCode.name}</option>
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
                <Table data={assetReviews}>
                    <Column width={150}>
                        <HeaderCell>ID</HeaderCell>
                        <Cell dataKey="id" />
                    </Column>
                    <Column width={200}>
                        <HeaderCell>Asset Review Type Code</HeaderCell>
                        <Cell dataKey="assetReviewTypeCode" />
                    </Column>
                    <Column width={200}>
                        <HeaderCell>Asset Review Date</HeaderCell>
                        <Cell>
                            {(rowData, rowIndex) => {
                                return (
                                format(new Date(rowData.assetReviewDate), 'dd/MM/yyyy')
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

