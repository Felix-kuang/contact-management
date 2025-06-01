interface FormFieldProps {
    label: string;
    name: string;
    type: string;
    value: string;
    setValue: (val: string) => void;
    placeholder?: string;
    iconClass?: string;
}

export default function FormField(
    {
        label,
        name,
        type,
        value,
        setValue,
        placeholder,
        iconClass,

    }: FormFieldProps) {

    const title = label
        .toLowerCase()
        .split(' ')
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');

    return (
        <div className='mb-4'>
            <label htmlFor={name}
                   className='block text-gray-300 text-sm font-medium mb-2'>{title}</label>
            <div className='relative'>
                <div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
                    <i className={`${iconClass} text-gray-500`}></i>
                </div>
                <input
                    type={type} id={name} name={name} value={value}
                    className='
                                    w-full pl-10 pr-3 py-3
                                    bg-gray-700 opacity-50 border border-gray-600 text-white
                                    rounded-lg duration-200 transition-all
                                    focus:outline-none focus:ring-2 focus:border-blue-500
                                 '
                    placeholder={placeholder} required
                    onChange={(e) => setValue(e.target.value)}
                />
            </div>
        </div>
    )
}