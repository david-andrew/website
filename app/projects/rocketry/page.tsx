
import { ProjectMeta } from "../projects";
import rebel_scum from '../../(images)/projects/rebel_scum.jpg'

export const meta: ProjectMeta = {
    title: 'High Power Rocketry',
    imgSrc: rebel_scum,
    internalLink: '/projects/rocketry',
    summary: 'Level 1 & 2 High Powered Rocket built with the Johns Hopkins Rocketry Club, and Spaceport America Cup 2018',
    lastUpdated: 'January 2018',
    tags: ['High Power Rocketry', 'Arduino', 'C++', 'mechanical design', 'Tripoli'],
};

const Page = (): JSX.Element => {
    return <h1>High Power Rocketry</h1>
}

export default Page;
