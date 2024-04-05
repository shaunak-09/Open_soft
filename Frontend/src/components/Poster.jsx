export const Poster = ({
    img
}) => {
    return(
    <div className="mix-blend-overlay">
        <img className='object-contain w-full' style={{height:"34vh"}} src={img} alt="" />
    </div>
    )
}