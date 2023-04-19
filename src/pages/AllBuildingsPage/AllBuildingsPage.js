import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Routes, AppMsg } from "../../utils";
import { FooterButtons } from "../../components";
import { BuildingsServices } from "../../services";
import SearchBox from "../../components/SearchBox";
import { Table, Column, HeaderCell, Cell } from 'rsuite-table';
import 'rsuite-table/dist/css/rsuite-table.css'
const cssBase = "allBuildingsPage";

const AllBuildingsPage = () => {

    useEffect(() => { }, []);

    const headers = [
        {
            key: "building",
            header: AppMsg.getMessage(AppMsg.MESSAGES.NAME),
        },
        {
            key: "parentProperty",
            header: AppMsg.getMessage(AppMsg.MESSAGES.PARENT_PROPERTY),
        },
    ];

    const columns = [
        { key: 'building', name: 'AppMsg.getMessage(AppMsg.MESSAGES.NAME)' },
        { key: 'parentProperty', name: 'AppMsg.getMessage(AppMsg.MESSAGES.PARENT_PROPERTY' }
    ];

    const [searchTerm, setSearchTerm] = useState('');
    const [buildings, setBuildings] = useState([]);

    const onSearchTermChange = async (event) => {
        setSearchTerm(event.target.value);
    }

    const loadBuildingById = async () => {
        const buildings = await BuildingsServices.getBuildingsById(searchTerm);
        await (async () => {
            buildings.forEach((item) => {
                item.id = item._id;
            });
        })();
        //building
        //parentProperty
        setBuildings(buildings);
    };

    return (
        <div>
            <SearchBox onSearch={loadBuildingById} searchTerm={searchTerm} onSearchTermChange={onSearchTermChange} />
            <div className="grid-frame">
                <Table data={buildings}>
                    <Column width={200} sortable>
                        <HeaderCell>Name</HeaderCell>
                        <Cell>
                            {(rowData, rowIndex) => {
                                return <Link to={`/assetsreview/${rowData.id}`}>{rowData.building}</Link>;
                            }}
                        </Cell>
                    </Column>
                    <Column width={200}>
                        <HeaderCell>Parent Property</HeaderCell>
                        <Cell dataKey="parentProperty" />
                    </Column>
                </Table>
            </div>
        </div>
    );
}
export default AllBuildingsPage;
