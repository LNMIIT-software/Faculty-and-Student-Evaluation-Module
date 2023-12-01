import React, { useEffect, useState } from "react";
import service from "../../appwrite/configure";
import { useSelector } from "react-redux";
import authSlice from "../../store/authSlice";

function GradingByFaculty() {
    const [entries, setEntries] = useState([])
    const userData = useSelector(state => state.auth.userData)
    const [subjects, setSubjects] = useState([])
    const [currGrade, setCurrGrade] = useState()

    //const keysToShow =  Object.keys(entries[0]).slice(0,5)

    useEffect(() => {
        service.getEntries([])
            .then((entries) => {
                if (entries) {
                    setEntries(entries.documents)
                }
            })
    }, [])

    useEffect(() => {
        const uniqueSubjects = [...new Set(entries.filter(item => item.facultyName === userData.name).map(item => item.subject))];
        //console.log(uniqueSubjects)
        setSubjects(uniqueSubjects)
    }, [entries])

    async function handleButtonClick(item){
        console.log(item)
        const updatedEntry = await service.updateEntry(item.$id, item.studentID, item.studentName, item.subject, item.facultyName, currGrade)
        console.log(updatedEntry)
    }
    // async function handleDelete(item){
    //     console.log(item)
    //     setCurrGrade(null)
    //     const updatedEntry = await service.updateEntry(item.$id, item.studentID, item.studentName, item.subject, item.facultyName, currGrade)
    //     console.log(updatedEntry)
    // }

    if (!entries || entries.length === 0) {
        return <p>Loading...</p>;
    }

    const keysToShow = Object.keys(entries[0]).slice(0, 5);

    return (
        <div>
            {/* {console.log(subjects)} */}
            {subjects.map((subject, subjectIndex) => (
                <div key={subjectIndex} className="mb-4">
                    <h2 className="text-xl font-semibold mb-2">{subject} Table</h2>
                    <table className="w-full bg-white border border-gray-300">
                        <thead>
                            <tr className="bg-pink-300">
                                {keysToShow.map((key) => (
                                    <th
                                        key={key}
                                        className="py-2 px-4 border-b font-semibold text-sm text-left"
                                    >
                                        {key}
                                    </th>
                                ))}
                                <th className="text-center">Enter Grades</th>
                            </tr>
                        </thead>
                        <tbody>
                            {entries
                                .filter((item) => item.facultyName === userData.name && item.subject === subject)
                                .map((item, index) => (
                                    <tr key={index} className={index % 2 === 0 ? 'bg-pink-100' : 'bg-pink-200 bg-opacity-75'}>
                                        {keysToShow.map((key, index) => (
                                            <td key={index} className="py-2 px-4 border-b text-sm">
                                                {item[key]}
                                            </td>
                                        ))}
                                        <td className="py-2 px-4 text-center">
                                            <div className="flex items-center justify-center">
                                                <input
                                                    type="text"
                                                    className="p-1 w-16 border border-gray-300 ml-2"
                                                    placeholder="Grade"
                                                    onChange={e => setCurrGrade(e.target.value)}
                                                // You can handle the input value using state or any other mechanism
                                                />
                                                <button
                                                    className="p-1 ml-2 text-green-500"
                                                    onClick={() => handleButtonClick(item)}
                                                >
                                                    ✅
                                                </button>
                                                {/* <button
                                                    className="p-1 ml-2 text-green-500"
                                                    onClick={() => handleDelete(item)}
                                                >
                                                    ❌
                                                </button> */}
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                        </tbody>
                    </table>
                </div>
            ))}
        </div>
    );


}

export default GradingByFaculty