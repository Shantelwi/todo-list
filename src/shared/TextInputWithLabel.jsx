function TextInputWithLabel({
    elementId,
    labelText,
    onChange,
    inputRef,
    value,
    maxLength
  }) {
    return (
      <>
        <label htmlFor={elementId}>{labelText}</label>
  
        <input
          type="text"
          id={elementId}
          ref={inputRef}
          value={value}
          onChange={onChange}
          maxLength={maxLength}
        />
      </>
    );
  }
  
  export default TextInputWithLabel;