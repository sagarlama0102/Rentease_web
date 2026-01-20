// "use client";

// import { useState } from "react";
// import { registerSchema, RegisterData } from "../schema";
// import { handleRegister } from "@/lib/actions/auth-action";

// export default function useRegisterForm() {
//   const [formData, setFormData] = useState<RegisterData>({
//     username: "",
//     firstName: "",
//     lastName: "",
//     email: "",
//     password: "",
//     confirmPassword: "",
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

//     const result = registerSchema.safeParse(formData);

//     if (!result.success) {
//       const fieldErrors: Record<string, string> = {};

//       result.error.issues.forEach((issues) => {
//         const fieldName = issues.path[0];
//         if (fieldName) {
//           fieldErrors[fieldName as string] = issues.message;
//         }
//       });

//       setErrors(fieldErrors);
//       return;
//     }

//     // ✅ Valid data
//     setErrors({});
//     setLoading(true);
//     const response = await handleRegister(formData);
//     setLoading(false);
//      if (!response.success) {
//       setErrors({ general: response.message });
//       return;
//     };

    

    
//     setFormData({
//       username: "",
//       firstName: "",
//       lastName: "",
//       email: "",
//       password: "",
//       confirmPassword: "",
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