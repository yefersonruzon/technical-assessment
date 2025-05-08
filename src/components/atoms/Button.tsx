export default function Button({icon, label, style, onclick}: {icon: string, label: string, style: 'circle' | 'simple', onclick?: () => void}) {
    return (
        <button 
            onClick={onclick} 
            aria-label={label} 
            className={`${style === 'circle' ? 'p-3 rounded-full aspect-square  bg-primary hover:bg-primary-hover w-11 h-11' : ' p-2 rounded-full aspect-square border border-details hover:bg-primary w-10 h-10' } cursor-pointer flex items-center justify-center`}>
            <i className={`${icon}`}></i> 
        </button>
    )
}