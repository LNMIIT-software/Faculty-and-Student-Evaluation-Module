import React, { useEffect, useState } from "react";
import service from "../../appwrite/configure";
import { useSelector } from "react-redux";
import authSlice from "../../store/authSlice";
import Button from "../Button";
import { useLocation, useNavigate } from "react-router-dom";

function AddFeedback() {
    const [entries, setEntries] = useState([])
    const userData = useSelector(state => state.auth.userData)
    const navigate = useNavigate()

    useEffect(() => {
        service.getEntries([])
            .then((entries) => {
                if (entries) {
                    setEntries(entries.documents)
                }
            })
    }, [])

    const handleClick = (item) => {

        const id = `${item.studentName}${item.facultyName}${item.subject}`
        const url = `/student/${id}`
        console.log(item, url)
        navigate(url, {state: item})
    }


    if (!entries || entries.length === 0) {
        return <p>Loading...</p>;
    }

    const keysToShow = Object.keys(entries[0]).slice(0, 4);

    return (
        <div>
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
                    <th className="text-center">Feedback</th>
                  </tr>
                </thead>
                <tbody>
                  {entries
                    .filter((item) => item.studentName === userData.name)
                    .map((item, index) => (
                      <tr key={index} className={index % 2 === 0 ? 'bg-pink-100' : 'bg-pink-200 bg-opacity-75'}>
                        {keysToShow.map((key, index) => (
                          <td key={index} className="py-2 px-4 border-b text-sm">
                            {item[key]}
                          </td>
                        ))}
                        <td className="py-2 px-4 text-center">
                            <div className="flex items-center justify-center">
                                <button 
                                type="button"
                                className="text-white bg-pink-700 px-3 py-1 rounded-lg"
                                onClick={() => handleClick(item)}
                                >Feedback</button>
                            </div>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
        </div>
      );
}

export default AddFeedback