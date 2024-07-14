import React from 'react';
import { useForm } from 'react-hook-form';

const RegisterComponent = ({ onRegister }) => {
  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = (data) => {
    console.log(data);
    onRegister(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <label>Name:</label>
        <input
          type="text"
          {...register("name", { required: true })}
        />
        {errors.name && <span>This field is required</span>}
      </div>
      <div>
        <label>Email:</label>
        <input
          type="email"
          {...register("email", { required: true })}
        />
        {errors.email && <span>This field is required</span>}
      </div>
      <div>
        <label>Password:</label>
        <input
          type="password"
          {...register("password", { required: true, minLength: 6 })}
        />
        {errors.password && <span>This field is required and must be at least 6 characters</span>}
      </div>
      <button type="submit">Register</button>
    </form>
  );
};

export default RegisterComponent;
