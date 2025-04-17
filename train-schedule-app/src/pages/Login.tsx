import { Form, useActionData, useNavigation, ActionFunctionArgs, redirect } from "react-router-dom";
import { useState } from "react";
import { writeToken } from "../utils/tokenUtil";
import classes from './Login.module.css'

export default function AuthForm() {
  const [isLogin, setIsLogin] = useState(true);
  const actionData = useActionData() as { error?: string };
  const navigation = useNavigation();

  const isSubmitting = navigation.state === "submitting";

  return (
    <div className={classes.authForm}>
      <h2>{isLogin ? "Login" : "Register"}</h2>

      {actionData?.error && (
        <p style={{ color: "red" }}>{actionData.error}</p>
      )}

      <Form method="post">
        <input type="hidden" name="mode" value={isLogin ? "login" : "register"} />
        
        <div>
          <label>Email:</label>
          <input type="email" name="email" required />
        </div>

        <div>
          <label>Password:</label>
          <input type="password" name="password" required />
        </div>

        <button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Sending..." : isLogin ? "Login" : "Register"}
        </button>
      </Form>

      <p style={{ marginTop: 10 }}>
        {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
        <button type="button" onClick={() => setIsLogin(!isLogin)}>
          {isLogin ? "Register here" : "Login here"}
        </button>
      </p>
    </div>
  );
}


export async function authAction({ request }: ActionFunctionArgs) {
  const formData = await request.formData();
  const mode = formData.get("mode"); 
  const email = formData.get("email");
  const password = formData.get("password");

  const response = await fetch("http://localhost:3000/auth/" + mode, {
    method: "POST",
    body: JSON.stringify({ email, password }),
    headers: {
      "Content-Type": "application/json",
    }
  });

  if (!response.ok) {
    return redirect('/auth');
  }

  const data = await response.json();

  writeToken(data.accessToken)
  console.log(data.accessToken)
  
  return redirect("/train-schedule");
}