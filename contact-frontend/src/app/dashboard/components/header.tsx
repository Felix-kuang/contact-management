import Link from "next/link";

export default function Header() {
    return (
        <header className='bg-gradient shadow-lg'>
            <div className='container mx-auto p-4 flex justify-between items-center'>
                <Link href='/dashboard'
                      className='flex items-center hover:opacity-90 transition-opacity duration-200'>
                    <i className='fas fa-address-book text-white text-2xl mr-3'/>
                    <div className='text-white font-bold text-xl'>Contact Management</div>
                </Link>
                <nav>
                    <ul className='flex space-x-6'>
                        <li>
                            <Link
                                href='/dashboard/users/profile'
                                className='text-gray-100 hover:text-white flex items-center transition-colors duration-200'>
                                <i className='fas fa-user-circle mr-2'></i>
                                <span>Profile</span>
                            </Link>
                        </li>
                        <li>
                            <Link
                                href='/dashboard/users/logout'
                                className='text-gray-100 hover:text-white flex items-center transition-colors duration-200'>
                                <i className='fas fa-sign-out mr-2'></i>
                                <span>Log out</span>
                            </Link>
                        </li>
                        {/*<li>*/}
                        {/*    <Link*/}
                        {/*        href='/dashboard/users/logout'*/}
                        {/*        className='text-gray-100 hover:text-white flex items-center transition-colors duration-200'>*/}
                        {/*        <i className='fas fa-sign-out mr-2'></i>*/}
                        {/*        <span>Log out</span>*/}
                        {/*    </Link>*/}
                        {/*</li>*/}
                    </ul>
                </nav>
            </div>
        </header>
    )
}