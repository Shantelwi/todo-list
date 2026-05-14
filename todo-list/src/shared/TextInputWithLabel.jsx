function TextInputWithLabel({
    elementId,
    labelText,
    ref,
    value,
}){
    return(
    <>
        <label htmlFor={elementId}>{labelText}</label>
        <input 
        type="text"
        id= {elementId}
        ref = {ref}
        value = {value}
        />
    </>
    )

}
export default TextInputWithLabel;