import { Control, FieldPath } from "react-hook-form";
import { z } from "zod";
import { Input } from "@/components/ui/input";
import { authFormSchema } from "@/lib/utils";
import { FormControl, FormField, FormLabel, FormMessage } from "./ui/form";

const formSchema = authFormSchema("sign-up");

interface CustomInput {
  name: FieldPath<z.infer<typeof formSchema>>;
  control: Control<z.infer<typeof formSchema>>;
  label: string;
  placeholder: string;
}

const CustomInput = ({ control, name, label, placeholder }: CustomInput) => {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <div className="form-item">
          <FormLabel className="form-label">{label}</FormLabel>
          <div>
            <FormControl>
              <Input
                placeholder={placeholder}
                className="input-class"
                type = {name === "password" ? "password" : "text"}
                {...field}
              />
            </FormControl>
            <FormMessage  className="form-message mt-2"/>
          </div>
        </div>
      )}
    />
  );
};

export default CustomInput;