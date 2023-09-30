import { StaticImageData } from "next/image";

export type ProjectMeta = {
    title: string
    imgSrc: StaticImageData //image to display on summary card
    summary: string //blurb for this card
    tags?: string[] //notable things related to this project
} & (
    //either a github repo to pull timestamp from or a raw timestamp string
    { github: string, lastUpdated?: never } | { lastUpdated: string, github?: never }
) & (
    //either an internal page link or an external link for this card
    { internalLink: string, externalLink?: never } | { externalLink: string, internalLink?: never }
);

export type FetchedProjectMeta = ProjectMeta & { route: string, timestamp: Date|string|undefined };

export const isProjectContent = (obj: any): obj is ProjectMeta => {
    return obj !== undefined
        && obj.title !== undefined 
        && obj.imgSrc !== undefined 
        && obj.summary !== undefined 
        && (obj.github !== undefined || obj.lastUpdated !== undefined) 
        && (obj.internalLink !== undefined || obj.externalLink !== undefined);
}


export const sortOptionsList = ['Recommended', 'Date (New-Old)', 'Date (Old-New)', 'Alphabetical (A-Z)', 'Alphabetical (Z-A)'] as const;
export type SortOption = typeof sortOptionsList[number];
export const isSortOption = (text: any): text is SortOption => sortOptionsList.includes(text as SortOption);