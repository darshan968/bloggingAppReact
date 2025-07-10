import Blogs from "./Blogs";
import Input from "./Input";
import { useState, useRef, useEffect, useReducer } from "react";
import { db } from "./firebaseInit"; // Import the Firestore database
import {
  collection,
  addDoc,
  doc,
  setDoc,
  getDocs,
  onSnapshot,
  deleteDoc,
} from "firebase/firestore"; // Import Firestore functions
function blogsReducer(state, action) {
  switch (action.type) {
    case "ADD":
      return {
        ...state,
        input1: "",
        input2: "",
        children: [
          { input1: action.blog.input1, input2: action.blog.input2 },
          ...state.children,
        ],
      };
    case "REMOVE":
      return {
        ...state,
        children: state.children.filter((_, index) => index !== action.index),
      };
    case "UPDATE_INPUT1":
      return {
        ...state,
        input1: action.value,
      };
    case "UPDATE_INPUT2":
      return {
        ...state,
        input2: action.value,
      };
    case "RESET":
      return {
        input1: "",
        input2: "",
        children: action.blogs || [],
      };
    default:
      return state;
  }
}
export default function Container() {
  /*   const [state, setState] = useState({
    input1: "",
    input2: "",
    children: [],
  }); */
  const [state, dispatch] = useReducer(blogsReducer, {
    input1: "",
    input2: "",
    children: [],
  });
  const titleRef = useRef(null);
  /*   useEffect(() => {
    titleRef.current?.focus();

    (async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "blogs"));
        const blogs = querySnapshot.docs.map((doc) => {
          const data = doc.data();
          return {
            input1: data.title || "",
            input2: data.content || "",
          };
        });
        dispatch({ type: "RESET", blogs });
      } catch (err) {
        console.error("Failed to fetch blogs:", err);
      }
    })();
  }, []); */
  useEffect(() => {
    titleRef.current?.focus();

    const unsubscribe = onSnapshot(
      collection(db, "blogs"),
      (querySnapshot) => {
        const blogs = querySnapshot.docs.map((doc) => {
          const data = doc.data();
          return {
            id: doc.id, // ✅ Add this
            input1: data.title || "",
            input2: data.content || "",
          };
        });

        dispatch({ type: "RESET", blogs });
      },
      (error) => {
        console.error("Realtime fetch failed:", error);
      }
    );

    // Cleanup the listener on unmount
    return () => unsubscribe();
  }, []);
  useEffect(() => {
    if (state.children.length > 0) {
      if (state.children.length && state.children[0].input1) {
        document.title = `${state.children[0].input1}`;
      } else {
        document.title = "No Blogs!!";
      }
    } else {
      document.title = "No Blogs!!";
    }
  }, [state.children]);
  const handleAdd = async () => {
    // if (!state.input1 || !state.input2) return;
    dispatch({
      type: "ADD",
      blog: {
        input1: state.input1,
        input2: state.input2,
      },
    });
    const docRef = doc(collection(db, "blogs"));
    // Add a new document with a generated id.
    await setDoc(docRef, {
      title: state.input1,
      content: state.input2,
      createdOn: new Date(),
    });
    /*         await addDoc(collection(db, "blogs"), {
      title: state.input1,
      content: state.input2,
      createdOn: new Date(),
    }); */
    /*     setState((prev) => ({
      input1: "",
      input2: "",
      children: [
        { input1: prev.input1, input2: prev.input2 },
        ...prev.children,
      ],
    })); */
    titleRef.current.focus(); // Focus back on the input field after adding
  };
  async function handleDelete(index) {
    /*     props.setState((prev) => ({
      ...prev,
      children: prev.children.filter((_, i) => i !== index),
    })); */
    await deleteDoc(doc(db, "blogs", state.children[index].id));
    dispatch({ type: "REMOVE", index: index });
  }
  return (
    <>
      <div className="container mx-auto p-4 bg-orange-300 rounded-lg shadow-md">
        <h1 className="text-2xl font-bold mb-4">Blogging App</h1>
        <p className="mb-4">This is a simple blogging application.</p>

        <Input
          type="text"
          titleRef={titleRef}
          placeholder="Enter your name"
          onChange={
            /*             (e) =>
            setState((prev) => ({
              ...prev,
              input1: e.target.value,
            })) */
            (e) => dispatch({ type: "UPDATE_INPUT1", value: e.target.value })
          }
          value={state.input1}
        />
        <Input
          type="textarea"
          placeholder="Enter your message"
          onChange={
            /* (e) =>
            setState((prev) => ({
              ...prev,
              input2: e.target.value,
            })) */
            (e) => dispatch({ type: "UPDATE_INPUT2", value: e.target.value })
          }
          value={state.input2}
        />
        <Input type="button" placeholder="ADD" onChange={handleAdd} />
      </div>

      <hr />
      <Blogs
        children={state.children}
        setState={dispatch}
        handleDelete={handleDelete}
      />
    </>
  );
}
