import { LoadingServices } from ".";
import { BuildingsDS } from "../model";


export async function getAssetReviewTypeCodes() {
    let assetReviewTypeCodes = [];
    try {
        LoadingServices.setLoading("getAssetReviewTypeCodes", true);
        assetReviewTypeCodes = await BuildingsDS.getAssetReviewTypeCodes();
    } finally {
        LoadingServices.setLoading("getAssetReviewTypeCodes", false);
    }
    return assetReviewTypeCodes;
}

export async function getBuildingsById(id) {
    let buildings = [];
    try {
        LoadingServices.setLoading("getAllBuildings", true);
        buildings = await BuildingsDS.getBuildingsById(id);
    } finally {
        LoadingServices.setLoading("getAllBuildings", false);
    }
    return buildings;
}

export async function getAssetReviewsByBuildingId(id) {
    let buildings = [];
    try {
        LoadingServices.setLoading("getAssetReviewsByBuildingId", true);
        buildings = await BuildingsDS.getAssetReviewsByBuildingId(id);
    } finally {
        LoadingServices.setLoading("getAssetReviewsByBuildingId", false);
    }
    return buildings;
}

export async function addAssetReviews(buildingId, assetReview) {
    let response = null;
    try {
        LoadingServices.setLoading("addAssetReview", true);
        response = await BuildingsDS.addAssetReview(buildingId, assetReview);
    } finally {
        LoadingServices.setLoading("addAssetReview", false);
    }
    return response;
}