export default function Blogs(props) {
  return (
    <div className="container mx-auto p-4 bg-orange-300 rounded-lg shadow-md mt-4">
      <h1 className="text-2xl font-bold mb-4">Blogging App</h1>
      <p className="mb-4">This is a simple blogging application.</p>
      {props.children.map((child, index) => (
        <div key={index} className="mb-2 bg-blue-100 p-2 rounded-md">
          <p className="text-blue-900 text-xl">{child.input1}</p>
          <p className="text-blue-900 text-xl"> {child.input2}</p>
          <div className="btn">
            <button
              className="bg-red-900 rounded-md mb-2 p-2 text-yellow-100 cursor-pointer hover:bg-red-700 transition duration-200"
              onClick={() => props.handleDelete(index)}
            >
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
