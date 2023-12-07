import React, { useEffect, useState } from "react";
import service from "../../appwrite/configure";
import { useSelector } from "react-redux";
import authSlice from "../../store/authSlice";

function ViewFeedback() {
    const [entries, setEntries] = useState([])
    const userData = useSelector(state => state.auth.userData)
    const [subjects, setSubjects] = useState([])


    //const keysToShow =  Object.keys(entries[0]).slice(0,5)

    useEffect(() => {
        service.getFeedbackEntries([])
            .then((entries) => {
                if (entries) {
                    setEntries(entries.documents)
                }
                console.log(entries)
            })
    }, [])

    useEffect(() => {
        const uniqueSubjects = [...new Set(entries.filter(item => item.facultyName === userData.name).map(item => item.subject))];
        console.log(uniqueSubjects)
        setSubjects(uniqueSubjects)
    }, [entries])

    if (!entries || entries.length === 0) {
        return <p>Loading...</p>;
    }

    const keysToShow = Object.keys(entries[0]).slice(0, 4);

    return (
        <div>
          
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
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          ))}
        </div>
      );
}

export default ViewFeedback