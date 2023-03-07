import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Table } from "antd";

type Types = {
  name: string;
  age: number;
  email: string;
  password: string;
  confirmPassword: string;
}

type TypeColumns = {
  title: string;
  dataIndex: string;
  key: string;
}

type TypeRow = {
  name: string;
  age: number;
  email: string;
  password: string;
}

const schema = yup.object().shape({
  name: yup.string().required(),
  age: yup.number().positive().integer().required(),
  email: yup.string().email().required(),
  password: yup.string().min(6).max(6).required(),
  confirmPassword: yup.string().oneOf([yup.ref("password")]),
})

const App: React.FC = () => {
  const { register, handleSubmit, formState: { errors }} = useForm<Types>({
    resolver: yupResolver(schema),
  });
  const [item, setItem] = useState<TypeRow[]>([]);
  const submitItem = (data: Types) => {
    setItem([...item, {name: data.name, age: data.age, email: data.email, password: data.password }])
}

const columns:TypeColumns[]  = [
  {
    title: "Name",
    dataIndex: "name",
    key: "name",
  },
  {
    title: "Age",
    dataIndex: "age",
    key: "age",
  },
  {
    title: "Email",
    dataIndex: "email",
    key: "email",
  }, 
  {
    title: "Password",
    dataIndex: "password",
    key: "password",
  }
];

  return (
    <div className="app">
      <h1>Submit Form</h1>
      <form onSubmit={handleSubmit(submitItem)} className="input-form">
        <input type="text" placeholder="Name" {...register("name")} name="name"/>
        <p>{errors.name?.message}</p>
        <input type="text" placeholder="Age" {...register("age")} name="age"/>
        <p>{errors.age?.message}</p>
        <input type="text" placeholder="Email" {...register("email")} name="email"/>
        <p>{errors.email?.message}</p>
        <input type="text" placeholder="Password" {...register("password")} maxLength={6} name="password"/>
        <p>{errors.password?.message}</p>
        <input type="text" placeholder="Confirm Password" {...register("confirmPassword")} maxLength={6} name="confirmPassword"/>
        <p>{errors.confirmPassword?.message}</p>
        <button type="submit">Submit</button>
      </form>
      <div className="form" style={{display: item.length === 0 ? "none" : ""}}>
        <Table columns={columns} dataSource={item}/>
      </div>
    </div>
  )
}

export default App;
