import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

// Define a schema with Zod
const formSchema = z.object({
  name: z.string().min(1, { message: "Name is required" }),
  email: z.string().email({ message: "Invalid email address" }),
  age: z.number().min(18, { message: "Must be at least 18 years old" }),
  password: z.string().min(8, { message: "Password must be at least 8 characters" }),
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords do not match",
  path: ["confirmPassword"],
});

type FormData = z.infer<typeof formSchema>;

const App: React.FC = () => {
  const { control, handleSubmit, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      email: '',
      age: 18,
      password: '',
      confirmPassword: '',
    },
  });

  const onSubmit = (data: FormData) => {
    alert('Form is valid! Submitting...');
    console.log(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <label>Name:</label>
        <Controller
          name="name"
          control={control}
          render={({ field }) => <input {...field} />}
        />
        {errors.name && <p style={{ color: 'red' }}>{errors.name.message}</p>}
      </div>

      <div>
        <label>Email:</label>
        <Controller
          name="email"
          control={control}
          render={({ field }) => <input {...field} />}
        />
        {errors.email && <p style={{ color: 'red' }}>{errors.email.message}</p>}
      </div>

      <div>
        <label>Age:</label>
        <Controller
          name="age"
          control={control}
          render={({ field }) => <input type="number" {...field} />}
        />
        {errors.age && <p style={{ color: 'red' }}>{errors.age.message}</p>}
      </div>

      <div>
        <label>Password:</label>
        <Controller
          name="password"
          control={control}
          render={({ field }) => <input type="password" {...field} />}
        />
        {errors.password && <p style={{ color: 'red' }}>{errors.password.message}</p>}
      </div>

      <div>
        <label>Confirm Password:</label>
        <Controller
          name="confirmPassword"
          control={control}
          render={({ field }) => <input type="password" {...field} />}
        />
        {errors.confirmPassword && <p style={{ color: 'red' }}>{errors.confirmPassword.message}</p>}
      </div>

      <button type="submit">Submit</button>
    </form>
  );
};

export default App;