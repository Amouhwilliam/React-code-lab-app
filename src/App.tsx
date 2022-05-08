import React, { useEffect, useState } from 'react';
import * as API from "./API/APICalls";
import {StudentItem, StudentProps} from './components/StudentItem';
import './assets/css/App.css'

function App() {
  const [students, setStudents] = useState<StudentProps[]>([]);
  const [studentFilter, setStudentFilter] = useState<StudentProps[]>([])
  const [name, setName] = useState("")
  const [tag, setTag] = useState("")

  useEffect(() => {
    API.getStudents()
      .then((response: any) => {
        let data = []
        for (let item of response.students) {
          data.push({...item, tags: []})
        }
        setStudents(data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const arraySearchName = (array: any, keyword: any) => {
    const searchTerm = keyword.toLowerCase()
    return array.filter((value: any) => {
      return value.lastName.toLowerCase().match(new RegExp(searchTerm, '')) ||
       value.firstName.toLowerCase().match(new RegExp(searchTerm, ''))
    })
  }

  const arraySearchTag = (array: any, keyword: any) => {
    const searchTerm = keyword.toLowerCase()
    return array.filter((value: any) => {
      const rule = (element: string) => element.toLowerCase().match(new RegExp(searchTerm, ''));
      return value.tags.some(rule)
    })
  }

  const handleOnNameChange = async (e: any) => {
    setName(e.target.value);
    if (name.length > 0) {
      let search = await arraySearchName(students, name);
      setStudentFilter(search)
    } else {
      setStudentFilter(students)
    }
  }

  const handleOnTagChange = async (e: any) => {
    setTag(e.target.value);
    if (tag.length > 0) {
      console.log(tag)
      let search = arraySearchTag(students, tag);
      setStudentFilter(search)
    } else {
      setStudentFilter(students)
    }
  }

  const updateStudentsData = (data: any) => {
    let studentsTmp = students
    for(let i=0; i<studentsTmp.length; i++) {
      if(studentsTmp[i].id === data.id){
        studentsTmp[i] = data
      }
    }
    console.log("updated list",studentsTmp)
  }

  useEffect(() => {
    console.log("Filter list",studentFilter)
    console.log("Normal list",students)
  }, [studentFilter, students]);


  return (
    <div className="w-full h-screen py-12 bg-gray-300 border drop-shadow-lg">
      <div className="w-full flex justify-center items-center">
        <div className="bg-white rounded-lg w-2/4 box-height">
          <div className="mb-10 p-4">
            <input onChange={handleOnNameChange} type="text" value={name}  placeholder="Search by name"
              className="appearance-none w-full border-b-2 mb-4 focus:outline-none active:outline-none font-body"/>
            <input onChange={handleOnTagChange} type="text" value={tag} placeholder="Search by tag"
              className="appearance-none w-full border-b-2 focus:outline-none active:outline-none font-body"/>
          </div>

          {studentFilter.length === 0 && (name.length === 0 || tag.length === 0) ?
            (
              <div className="overflow-y-scroll h-4/5" >
                {students.map((item: any) => (
                  <StudentItem
                    email={item.email}
                    company={item.company}
                    skill={item.skill}
                    firstName={item.firstName}
                    lastName={item.lastName}
                    pic={item.pic}
                    data={item}
                    intTags={item.tags}
                    updateStudentInfo={updateStudentsData}
                  />
                ))}
              </div>
            )
            :
            (
              <div className="overflow-y-scroll   h-4/5" >
                {studentFilter.map((item: any) => (
                  <StudentItem
                    email={item.email}
                    company={item.company}
                    skill={item.skill}
                    firstName={item.firstName}
                    lastName={item.lastName}
                    pic={item.pic}
                    data={item}
                    intTags={item.tags}
                    updateStudentInfo={updateStudentsData}
                  />
                ))}
              </div>
            )}
        </div>
    </div>
  </div>

  );
}

export default App;
