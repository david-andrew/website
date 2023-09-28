import Image, { StaticImageData } from 'next/image'
import Link from 'next/link';
import { getProjects } from "./projects";
import { SortOption, isSortOption } from './sorttypes';

type CardProps = {
    imgSrc: StaticImageData;
    title: string;
    lastUpdated: string;
    description: string;
    tags: string[];
    onClick?: () => void;
};

const Card = ({ imgSrc, title, lastUpdated, description, tags, onClick }: CardProps) => {
    return (
        <div 
            className="
                flex flex-col md:flex-row items-center md:space-x-6 p-4 
                border-solid border-black hover:border-white border-2
                cursor-pointer select-none
                "
            onClick={onClick}
        >
            {/* Image */}
            <Image src={imgSrc} alt={title} className="w-1/2 md:w-1/6 object-cover mb-4 md:mb-0" draggable={false}/>
    
            {/* Content */}
            <div className="w-full md:w-3/4">
            <h2 className="text-2xl font-quadon">{title}</h2>
            <p className="text-lg text-gray-500 mb-1 font-gentona">Last Updated: {lastUpdated}</p>
            <p className="text-lg mb-1 font-gentona">{description}</p>
            <p className="text-md text-gray-400 font-gentona">Tags: {tags.join(', ')}</p>
            </div>
        </div>
    );
};



const Projects = async ({searchParams}:{searchParams:{ [key: string]: string | string[] | undefined }}): Promise<JSX.Element> => {
    let sort: SortOption = isSortOption(searchParams.sort) ? searchParams.sort : 'Recommended';
    const projects = await getProjects(sort);
    return (
        <>
            {projects.map(({name:route, content:project}) => (
                <Link href={`/projects/${route}`} key={project.title}>
                    <Card
                        imgSrc={project.imgSrc}
                        title={project.title}
                        lastUpdated={project.lastUpdated ?? 'unknown'}
                        description={project.summary}
                        tags={project.tags ?? []}
                    />
                </Link>
            ))}
        </>

    )
}

export default Projects;



