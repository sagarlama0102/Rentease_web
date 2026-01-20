// "use client";

// import { useState } from "react";
// import { loginSchema, LoginData } from "../schema";
// import { handleLogin } from "@/lib/actions/auth-action";

// export default function useLoginForm(onSuccess : ()=> void) {
//   const [formData, setFormData] = useState<LoginData>({
//     email: "",
//     password: "",
//   });

//   const [errors, setErrors] = useState<Record<string, string>>({});
//   const [loading, setLoading] = useState(false);

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const { name, value } = e.target;

//     setFormData((prev) => ({
//       ...prev,
//       [name]: value,
//     }));
//   };

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();

//     const result = loginSchema.safeParse(formData);

//     if (!result.success) {
//       const fieldErrors: Record<string, string> = {};

//       result.error.issues.forEach((issue) => {
//         const fieldName = issue.path[0];
//         if (fieldName) {
//           fieldErrors[fieldName as string] = issue.message;
//         }
//       });

//       setErrors(fieldErrors);
//       return;
//     }

//     // ✅ Valid login (dummy for sprint 1)
//     setErrors({});
//     setLoading(true);
//     const response = await handleLogin(formData);
//     setLoading(false);
//     if(!response.success){
//       setErrors({general: response.message});
//       return;
//     }
    

//     onSuccess();

//     setFormData({
//       email: "",
//       password: "",
//     });
//   };

//   return {
//     formData,
//     errors,
//     loading,
//     handleChange,
//     handleSubmit,
//   };
// }