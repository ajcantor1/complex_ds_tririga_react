import { LoadingServices } from ".";
import { BuildingsDS } from "../model";

export async function getAllBuildings() {
    let buildings = [];
    try {
        LoadingServices.setLoading("getAllBuildings", true);
        buildings = await BuildingsDS.getAllBuildings();
    } finally {
        LoadingServices.setLoading("getAllBuildings", false);
    }
    return buildings;
}

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
export async function getAssetReviews(ids) {
    let buildings = [];
    try {
        LoadingServices.setLoading("getAssetReviews", true);
        buildings = await BuildingsDS.getAssetReviews(ids);
    } finally {
        LoadingServices.setLoading("getAssetReviews", false);
    }
    return buildings;
}
export async function addAssetReviews(assetReview) {
    let response = null;
    try {
        LoadingServices.setLoading("addAssetReview", true);
        response = await BuildingsDS.addAssetReview(assetReview);
    } finally {
        LoadingServices.setLoading("addAssetReview", false);
    }
    return response;
}