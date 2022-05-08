import React, {useState} from 'react'
import { ImPlus } from "react-icons/im";
import { ImMinus } from "react-icons/im";

 export interface StudentProps {
    id?: number
    email: string
    company: string
    skill: string
    firstName: string
    lastName: string
    pic: string
    data: any
    intTags?: string[]
    updateStudentInfo?: any
}

type AddTags = (tagName: string) => void;

export const StudentItem = ({
    email,
    company,
    skill,
    firstName,
    lastName,
    pic,
    data,
    intTags,
    updateStudentInfo
}: StudentProps) => {
    const [isOpen, setIsOpen] = useState(false)
    const [text, setText] = useState('');
    const [tags, setTags] = useState(intTags || [])

    const addTags: AddTags = (tagName: string) => {
        const newTag = tagName ;
        setTags([...tags, newTag]);
        updateStudentData([...tags, newTag])
    };

    const getAverage = (grades: string[]) : number => {
        let average = 0
        for (let element of grades) {
            average += parseInt(element)
        }
        return average/grades.length
    }

    const onSubmit = (event: any) =>{
        if( text && text !== '' ){
            event.preventDefault();
            addTags(text);
            setText('');
        }
    }

    const updateStudentData = (tags: string[]) => {
        let newData = {...data, tags: tags}
        updateStudentInfo(newData)
    }

    return (
        <div className="border-b-2">
            <div className="flex justify-between py-4 px-6">
                <div className="flex flex-row space-x-6">
                    <img className="h-20 w-20 object-cover border-black border rounded-full" src={pic} alt="userPhoto"/>
                    <div >
                        <div>
                            <p className="text-2xl font-bold text-gray-700 uppercase font-body mb-1">{firstName} {lastName}</p>
                        </div>
                        <div className="pl-4">
                            <p className="text-base font-normal font-body">Email: {email} </p>
                            <p className="text-base font-normal font-body">Company: {company} </p>
                            <p className="text-base font-normal font-body">Skill: {skill} </p>
                            <p className="text-base font-normal font-body">Average: {getAverage(data.grades)}% </p>
                        </div>
                        {isOpen ?
                            (
                                <div className="pl-4 mt-6">
                                    {data?.grades.map((item: any, index: any) => (
                                        <p className="text-sm  font-normal font-body">Test{index + 1}: {item}% </p>
                                    ))}
                                </div>
                            )
                            :
                            null
                        }
                        <div className="mt-4">
                            <div className="flex flex-row space-x-2">
                                {tags?.map((item: any, index: any) => (
                                        <div className="mr-1 mb-2 bg-gray-600 text-white p-2 rounded leading-none flex items-center">
                                            {item}
                                        </div>
                                    )
                                )}
                            </div>
                            <form onSubmit={e => onSubmit(e)}>
                                <input
                                    value={text}
                                    onChange={e => {
                                        setText(e.target.value);
                                    }}
                                    type="text"
                                    placeholder="add tag"
                                    className="mb-2 appearance-none w-full border-b-2 focus:outline-none active:outline-none font-body"
                                />
                            </form>
                        </div>
                    </div>
                </div>
                <div onClick={() => setIsOpen(!isOpen)} >
                    {isOpen ? <ImMinus  size={30} color="gray" /> : <ImPlus size={30} color="gray"/>
                    }
                </div>
            </div>
        </div>
    )
}

export default StudentItem
