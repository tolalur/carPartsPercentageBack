export interface generalSearch {
    id: number;
    manufacturerName: string;
    partName: string;
}
export interface targetSearch {
    partNumber: number;
    displayPartNumber: string;
    name: string;
    manufacturer: {
        id: number;
        name: string;
    }
    minimalPrice: number;
}
export interface targetSearchAnalog {
    isOfficial: boolean;
    partNumber: string;
    name: string;
    manufacturer: {
        id: number;
        name: string;
    }
    minimalPrice: number;
}
export interface targetSearchAnalogs {
    analogs: targetSearchAnalog[];
}
export interface autodocTargetSearch {
    item: targetSearch;
    analogs: targetSearchAnalog[];
}