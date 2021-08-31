interface validation {
    trim(): void
}

export const signUpValidation = (name: string, value: string, formData: any) => {
    switch (name) {
        case "name":
            if (!value || value.trim() === "") {
                return "Name is required";
            } else {
                return "";
            }


        case "email":
            if (!value || value.trim() === "") {
                return "Email is required";
            } else if (
                !value.match(/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/)
            ) {
                return "Enter a valid email address";
            } else {
                return "";
            }

        case "image":
            if (!value) {
                return "Please select your profile."
            } else {
                return ""
            }

        case "oldPassword":
            if (!value) {
                return "Password is Required";
            } else if (value.length < 8 || value.length > 15) {
                return "Please fill at least 8 character";
            } else if (!value.match(/[a-z]/g)) {
                return "Please enter at least lower character.";
            } else if (!value.match(/[A-Z]/g)) {
                return "Please enter at least upper character.";
            } else if (!value.match(/[0-9]/g)) {
                return "Please enter at least one digit.";
            } else {
                return "";
            }

        case "password" || "newPassword":
            if (!value) {
                return "Password is Required";
            } else if (value.length < 8 || value.length > 15) {
                return "Please fill at least 8 character";
            } else if (!value.match(/[a-z]/g)) {
                return "Please enter at least lower character.";
            } else if (!value.match(/[A-Z]/g)) {
                return "Please enter at least upper character.";
            } else if (!value.match(/[0-9]/g)) {
                return "Please enter at least one digit.";
            } else {
                return "";
            }


        case "confirmPassword":
            if (!value) {
                return "Confirm Password Required";
            } else if (value !== formData.password) {
                return "New Password and Confirm Password Must be Same";
            } else {
                return "";
            }


        default:
            return ""

    }
}