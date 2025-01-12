import * as Yup from "yup";
import { Formik } from "formik";
import { useSelector } from "react-redux";
import moment from "moment";
import DatePicker from 'react-datetime';
import "react-datetime/css/react-datetime.css";
import { TokenSliceState } from "../store/slices/token";
import axios from "axios";
import { CloseButton } from "react-bootstrap";


const formSchema = Yup.object().shape({
  task_name: Yup.string().required(),
  task_desc: Yup.string().required(),
  due_date: Yup.date().required("Select the date"),
});

const Form = (props:{closeModal:Function}) => {
    const token = useSelector((state:{token:TokenSliceState}) => {
        return state?.token?.token;
      });
  const yesterday = moment().subtract(1, "day")

  const disdate = (current: any) => {
    return current.isAfter(yesterday) 
  }

  return (
    <Formik
      validationSchema={formSchema}
      onSubmit={async (values, { resetForm }) => {
        const todo={...values,checked: false,user_id:token}
        console.log(todo)
         await axios.post('http://localhost:5000/todos', {
            headers: {
              'Content-Type': 'application/json'
            },
            todo
          })         
        
              
        if (props?.closeModal)
          props.closeModal();
        resetForm({ values: {
          task_desc:'',
          task_name:'',
          due_date:''
        } })
      }}
      initialValues={{
        task_name: "",
        task_desc: "",
        due_date: "",
      }}
    >
      {({ handleSubmit, handleChange, handleBlur, errors, values,setFieldValue }) => {
        return (
          <div className="mx-auto bg-gray-300 p-10 w-96 rounded-lg ">
            <form onSubmit={handleSubmit} noValidate>
              <div className="mb-4">
            <h1 className="block text-xl font-bold text-center">
              Add your todo
</h1><CloseButton className="w-2" variant="white"  onClick={()=>props.closeModal()}/>
</div>
              <div className="mb-4">

                <label className="block text-lg font-medium">Task Title</label>
                <input
                  type="text"
                  className="bg-gray-700 text-white rounded px-6 py-3 w-full"
                  placeholder="Task Title"
                  name="task_name"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.task_name}

                />
                {errors?.task_name && (
                  <span className="text-red-600">{errors?.task_name}</span>
                )}
              </div>
              <div className="mb-4">

<label className="block text-lg font-medium">Task Description</label>
<input
  type="text"
  className="bg-gray-700 text-white rounded px-6 py-3 w-full"
  placeholder="Task Description"
  name="task_desc"
  onChange={handleChange}
  onBlur={handleBlur}
  value={values.task_desc}

/>
{errors?.task_desc && (
  <span className="text-red-600">{errors?.task_desc}</span>
)}
</div>

<div className="mb-4">
                <label className="block text-lg font-medium">Due Date</label>

                <DatePicker timeFormat={false} closeOnSelect dateFormat="DD-MM-YYYY"
                 onChange={(date: any) => {

                    console.log("From due date :", date)
                    setFieldValue("due_date", date?._d.toDateString());
                  }}

                  isValidDate={disdate} />
                {errors?.due_date && (
                  <span className="text-red-600">{errors?.due_date}</span>
                )}
              </div>


              <button
                type="submit"
                className="bg-green-500 text-white px-12 py-4 rounded hover:bg-green-400 w-full"
              >
                Submit
              </button>
            </form>
          </div>
        );
      }}
    </Formik>
  );
};

export default Form;
