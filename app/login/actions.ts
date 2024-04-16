"use server";
  export const handleForm = async (prevState:any,formData: FormData) => {    
    await new Promise((resolve) => setTimeout(resolve, 5000));
    // redirect("/");
    // console.log(formData.get("email"), formData.get("password"));
    console.log(prevState);
    // console.log("form submitted");
    return { errors: ["wrong password","password too short"],
      
    };
  };