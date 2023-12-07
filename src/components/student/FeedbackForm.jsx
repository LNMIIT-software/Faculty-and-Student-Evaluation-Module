import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import service from '../../appwrite/configure';

const FeedbackForm = () => {
  const location = useLocation()
  const navigate = useNavigate()
  const item = location.state
  const [error, setError] = useState()

  const [formData, setFormData] = useState({
    rating: '1',
    comments: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };


  const handleSubmit = async(e) => {
    e.preventDefault();
    console.log('Form Data:', formData);

    try {
        const entry1 = await service.addFeedbackEntry(item.facultyName, formData.rating, item.subject, formData.comments)
        console.log(entry1)
        navigate('/student/feedback')
    } catch (error) {
        setError(error.message)
    }

    // setFormData({
    //   rating: 1,
    //   comments: '',
    // });
  };

  return (
    <div className="p-4 bg-gradient-to-tr from-violet-300 to-pink-300 h-screen w-full">
      <p className="text-xl font-medium mb-1 text-white text-center">Feedback Form: {item.subject}</p>
      <p className="text-m text-white text-center mb-4">Faculty: {item.facultyName}</p>
      <form onSubmit={handleSubmit} className="max-w-md mx-auto bg-white p-6 rounded-md shadow-md">
        <div className="mb-4">
          <label htmlFor="rating" className="block text-sm font-semibold text-gray-600 mb-2">
            Rating:
          </label>
          <select
            id="rating"
            name="rating"
            value={formData.rating}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
          >
            {[1, 2, 3, 4, 5].map((value) => (
              <option key={value} value={value}>
                {value}
              </option>
            ))}
          </select>
        </div>

        <div className="mb-4">
          <label htmlFor="comments" className="block text-sm font-semibold text-gray-600 mb-2">
            Comments:
          </label>
          <textarea
            id="comments"
            name="comments"
            value={formData.comments}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
          />
        </div>

        <div className='text-center'>
            <button
            type="submit"
            className="bg-pink-600 text-white py-2 px-4 rounded-md hover:bg-pink-700 focus:outline-none focus:ring focus:border-blue-300"
            >
            Submit Feedback
            </button>
        </div>
      </form>
    </div>
  );
};

export default FeedbackForm;