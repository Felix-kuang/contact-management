import Link from "next/link";

interface RedirectLinkProps {
    text: string;
    linkText: string;
    href: string;
}

const RedirectLink = ({text,linkText,href}: RedirectLinkProps) => (
    <div className='text-center text-sm text-gray-400'>
        {text}
        <Link
            href={href}
            className='text-blue-400 hover:text-blue-300 font-medium transition-colors duration-200'
        >
            {' '}
            {linkText}
        </Link>
    </div>
)

export default RedirectLink;