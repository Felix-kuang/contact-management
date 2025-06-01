interface SubmitButtonProps {
    label: string;
    iconClass?: string;
    type?: 'submit' | 'button';
}

const SubmitButton = ({label, iconClass = '', type = 'submit'}: SubmitButtonProps) => (
    <div className='my-6'>
        <button
            type={type}
            className='
                w-full bg-gradient text-white py-3 px-4 rounded-lg
                hover:opacity-90 hover:-translate-y-0.5
                focus:outline-none focus:ring-2
                focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-800
                transition-all duration-200 font-medium shadow-lg transform
            '
        >
            {iconClass && <i className={`${iconClass} mr-2`}></i>}
            {label}
        </button>

    </div>
)

export default SubmitButton;