// https://react-hook-form.com/advanced-usage#ConnectForm

import { useFormContext } from "react-hook-form";

export const ConnectForm = ({ children }) => {
 const methods = useFormContext();
 
 return children({ ...methods });
};