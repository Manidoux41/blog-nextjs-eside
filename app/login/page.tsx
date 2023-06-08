"use client";

import Input from "@/components/input/Input";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";

interface initialStateProps {
    email: string;
    password: string;
}

const initialState:initialStateProps = {
  email: "",
  password: "",
};

export default function page() {
  const [state, setState] = useState(initialState);
  const router = useRouter();

  function handleChange(e: any) {
    setState({ ...state, [e.target.name]: e.target.value });
  }

  const onSubmit = (event: FormEvent) => {
    event.preventDefault()
    
    signIn('credentials', {
        ...state,
        redirect: false,
    })
    .then((callback:any) => {
        if(callback?.ok) {
            router.refresh()
        }
        if(callback?.error) {
            throw new Error('Wrong credentials')
        }
    })
    router.push('/')
  };

  return (
    <form className="text-center" onSubmit={onSubmit}>
      <div
        className="
      flex flex-col justify-center h-{450px] w-[350px] mx-auto gap-2 py-6
      "
      >
       <Input
          placeholder="Email"
          name="email"
          id="email"
          type="email"
          onChange={handleChange}
          value={state.email}
        />
        <Input
          placeholder="Password"
          name="password"
          id="password"
          type="password"
          onChange={handleChange}
          value={state.password}
        />
        <button type="submit">Submit</button>
      </div>
      <div>
        Have not you got an account yet ?<Link href="/register">Sign Up</Link>
      </div>
    </form>
  );
}
