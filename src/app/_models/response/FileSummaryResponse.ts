export interface FilesSummaryResponse {
    id: number;
    fileParentId: number;
    name: string;
    type: string;
    size: number;
    updated: Date;
    created: Date;
    owner:boolean;
}