import { getAppModel } from "../AppModel";
import { DatasourceNames } from "../../utils";



export async function getAssetReviewTypeCodes() {
    const response = await getAppModel().getRecord(
        DatasourceNames.ASSET_REVIEW_TYPE_CODE_DS_NAME
    );
    return response.data;
}

export async function getBuildingsById(name) {
    const response = await getAppModel().getRecord(
        DatasourceNames.BUILDINGS_DS_NAME,
        {
            filters: [
                { name: "building", operator: "contains", value: name },
            ]
        }
    );
    return response.data;
}

export async function getAssetReviewsByBuildingId(id) {
    const response = await getAppModel().getRecord(
        `buildingRPIMAssetReview/${id}/assetReviews`
    );
    return response.data;
}



export async function addAssetReview(buildingSpecId, assetReview) {
    console.log("Asset Review Object:")
    console.log(assetReview)
    const requestResponse = await getAppModel().createRecord(`buildingRPIMAssetReview/${buildingSpecId}/assetReviews`, assetReview, {}, true, "group", "triCreate");

    //const requestResponse = await getAppModel().performAction("buildingRPIMAssetReview", 136763165, true, "group", "preCreate");
    //const wfParameterMap = {assetReviewTypeCode: "APPR", assetReviewDate: '2023-02-09'}
    //const requestResponse = await getAppModel().performAction("buildingRPIMAssetReview", 136763165, {}, true, "group", "preCreate", wfParameterMap);
    console.log(requestResponse)
    return requestResponse;
}
