export default function Input(props) {
  const { type, placeholder, value, onChange } = props;
  let field =
    type === "text" ? (
      <input
        type={type}
        placeholder={placeholder}
        ref={props.titleRef} // Added ref for text input
        value={value}
        onChange={onChange}
        className="border border-gray-300 rounded-md p-2 w-full"
      />
    ) : type === "textarea" ? (
      <textarea
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className="border border-gray-300 rounded-md p-2 w-full h-32"
      ></textarea>
    ) : type === "button" ? (
      <button
        onClick={onChange}
        className="bg-blue-500 text-white rounded-md p-2 w-qull justify-center hover:bg-blue-600 transition duration-200 text-center display-flex items-center mx-auto align-items-center"
      >
        {placeholder}
      </button>
    ) : null;
  return <div className="mb-4">{field}</div>;
}
