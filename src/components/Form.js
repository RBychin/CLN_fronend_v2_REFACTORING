// import {LongButton} from "./LongButton";
// import {useState} from "react";
// import {postApiRequest} from "../utills/requests";
//
// export const Form = (props) => {
//
//     const [formData, setFormData] = useState({});
//     const [errors, setErrors] = useState({});
//
//     const OnClickButton = async () => {
//
//         const formErrors = {}
//
//         const response = await postApiRequest(props.prefix, {}, formData);
//
//         if (response.status === 400) {
//             const data = await response.json()
//             Object.keys(data).forEach(key => {
//                 formErrors[key] = data[key][0]
//             })
//         }
//         setErrors(formErrors)
//
//         if (response.status === 201 || response.status === 200) {
//             setFormData({});
//             setErrors({})
//             props.callback(response)
//         }
//     }
//
//     const handleInputChange = (e) => {
//         const { name, value } = e.target;
//         setFormData({ ...formData, [name]: value });
//         setErrors({ ...errors, [name]: "" });
//     };
//
//     return (
//         <form className="form-wrapper">
//             {errors['non_field_errors'] && <span style={{color: "red"}}>{errors['non_field_errors']}</span>}
//             {props.fields.length > 0 && (
//                 <>
//                     {props.fields.map((field, index) => (
//                         <div key={index} className="field">
//                             {/*<label htmlFor={field.name}>{field.label}</label><br/>*/}
//                             <input
//                                 type={field.type}
//                                 placeholder={field.label}
//                                 id={field.name}
//                                 name={field.name}
//                                 value={formData[field.name] || ''}
//                                 onChange={handleInputChange}
//                             /><br/>
//                             {errors[field.name] && <span style={{color: "red"}}>{errors[field.name]}</span>}
//                         </div>
//                     ))}
//                     <LongButton text={props.btnText} callback={OnClickButton}/>
//                 </>
//             )}
//         </form>
//     )
// }