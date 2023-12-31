import React from 'react'
import { Link, NavLink } from 'react-router-dom'
import { useParams } from 'react-router-dom'
import LogoutBtn from '../LogoutButton';

function AdminHeader(){
    return (
        <>
            
            <header className="shadow sticky z-50 top-0">
                <nav className="bg-white border-gray-200 px-4 lg:px-6 py-2.5">
                    <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl">
                        <img
                            src="https://www.wonderskool.com//uploads/1587710975_LNMIIT.jpg"
                            className="mr-3 h-12"
                            alt="Logo"
                        />
                        <div className="flex items-center lg:order-2">  
                            <Link
                                to="/"
                                className="text-gray-800 hover:bg-orange-500 hover:text-white focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2 focus:outline-none"
                            >
                                <LogoutBtn />
                            </Link>
                        </div>
                        <div
                            className="hidden justify-between items-center w-full lg:flex lg:w-auto lg:order-1"
                            id="mobile-menu-2"
                        >
                            <ul className="flex flex-col mt-4 font-medium lg:flex-row lg:space-x-8 lg:mt-0">
                                <li>
                                    <NavLink
                                        to="/admin/add-student"
                                        className={({isActive}) =>
                                            `block py-2 pr-4 pl-3 duration-200 border-b
                                            
                                            ${isActive ? "text-orange-500" : "text-gray-700"}

                                            border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 hover:text-orange-500 lg:p-0`
                                        }
                                    >
                                        Students
                                    </NavLink>
                                </li>

                                <li>
                                    <NavLink
                                        to="/admin/add-faculty"
                                        className={({isActive}) =>
                                            `block py-2 pr-4 pl-3 duration-200 border-b
                                            
                                            ${isActive ? "text-orange-500" : "text-gray-700"}

                                            border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 hover:text-orange-500 lg:p-0`
                                        }
                                    >
                                        Faculty
                                    </NavLink>
                                </li>
{/* 
                                <li>
                                    <NavLink
                                        to="/subjects"
                                        className={({isActive}) =>
                                            `block py-2 pr-4 pl-3 duration-200 border-b
                                            
                                            ${isActive ? "text-orange-700" : "text-gray-700"}

                                            border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 hover:text-orange-700 lg:p-0`
                                        }
                                    >
                                        Subjects
                                    </NavLink>
                                </li> */}
                            </ul>
                        </div>
                    </div>
                </nav>
            </header>
        </>
    );
}

document.body.style.backgroundImage = 'url(https://www.orchidfoundation.info/sites/default/files/2021-03/The%20LNM%20Institute%20of%20Information%20Technology%20-%20%5BLNMIIT%5D%2C%20Jaipur.png)';
document.body.style.backgroundSize = 'cover';

export default AdminHeader