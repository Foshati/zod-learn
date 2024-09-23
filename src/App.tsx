import React, { useState } from 'react';
import { z } from 'zod';

// Define a schema with Zod
const formSchema = z.object({
  name: z.string().min(1, { message: "Name is required" }),
  email: z.string().email({ message: "Invalid email address" }),
  age: z.number().min(18, { message: "Must be at least 18 years old" }),
});

type FormData = z.infer<typeof formSchema>;

const App: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({ name: '', email: '', age: 18 });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Parse and validate form data
    const result = formSchema.safeParse(formData);
    if (!result.success) {
      const validationErrors: Record<string, string> = {};
      result.error.errors.forEach((err) => {
        if (err.path[0]) {
          validationErrors[err.path[0]] = err.message;
        }
      });
      setErrors(validationErrors);
    } else {
      setErrors({});
      // Form submission logic here
      alert('Form is valid! Submitting...');
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === 'age' ? parseInt(value, 10) : value,
    }));
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Name:</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
        />
        {errors.name && <p style={{ color: 'red' }}>{errors.name}</p>}
      </div>

      <div>
        <label>Email:</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
        />
        {errors.email && <p style={{ color: 'red' }}>{errors.email}</p>}
      </div>

      <div>
        <label>Age:</label>
        <input
          type="number"
          name="age"
          value={formData.age}
          onChange={handleChange}
        />
        {errors.age && <p style={{ color: 'red' }}>{errors.age}</p>}
      </div>

      <button type="submit">Submit</button>
    </form>
  );
};

export default App;
