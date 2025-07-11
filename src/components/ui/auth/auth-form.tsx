"use client";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { GithubIcon } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { signIn, signUp } from "@/lib/auth-client";
import { toast } from "sonner";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../form";

const signInSchema = z.object({
  email: z.string().email(),
  password: z
    .string()
    .min(6, `Password must be at least 6 characters`)
    .max(128, `Password must be at most 128 characters`),
});

const signUpSchema = z
  .object({
    email: z.string().email(),
    name: z
      .string()
      .toLowerCase()
      .min(2, `Name is required`)
      .max(32, `Name must be at most 32 characters`),
    password: z
      .string()
      .min(6, `Password must be at least 6 characters`)
      .max(128, `Password must be at most 128 characters`),
    confirmPassword: z
      .string()
      .min(6, `Confirm Password must be at least 6 characters`)
      .max(128, `Confirm Password must be at most 128 characters`),
  })
  .superRefine(({ password, confirmPassword }, ctx) => {
    if (password !== confirmPassword) {
      ctx.addIssue({
        code: "custom",
        message: `Passwords do not match!`,
        path: [`confirmPassword`],
      });
    }
  });

type SignInData = z.infer<typeof signInSchema>;
type SignUpData = z.infer<typeof signUpSchema>;

export function AuthForm({ className, ...props }: React.ComponentProps<"div">) {
  const [isSigningUp, setIsSigningUp] = useState(false);
  const [loading, setLoading] = useState(false);
  const currentSchema = isSigningUp ? signUpSchema : signInSchema;
  const form = useForm<SignUpData | SignInData>({
    resolver: zodResolver(currentSchema),
    defaultValues: {
      email: "",
      name: "",
      password: "",
      confirmPassword: "",
    },
  });

  async function onSubmitSignUp(values: SignUpData) {
    try {
      setLoading(true);
      const { error } = await signUp.email({
        email: values.email,
        name: values.name,
        password: values.password,
        fetchOptions: {
          onSuccess: () => {
            toast.success(`You have successfully made an account!`);
          },
          onResponse: () => {
            setLoading(false);
          },
          onError: (ctx) => {
            toast.error(`error: ${ctx.error.message}`);
          },
        },
      });
      if (error) {
        toast.error(error.message);
      }
    } catch (err: unknown) {
      if (err instanceof Error) {
        toast.error(err.message);
      } else {
        toast.error(`unexpected-error`);
      }
    } finally {
      setLoading(false);
    }
  }

  async function onSubmitSignIn(values: SignInData) {
    try {
      setLoading(true);
      const { error } = await signIn.email({
        email: values.email,
        password: values.password,
        fetchOptions: {
          onSuccess: () => {
            toast.success(`You have successfully signed in`);
          },
          onResponse: () => {
            setLoading(false);
          },
          onError: (ctx) => {
            toast.error(`error: ${ctx.error.message}`);
          },
        },
      });
      if (error) {
        toast.error(error.message);
      }
    } catch (err: unknown) {
      if (err instanceof Error) {
        toast.error(err.message);
      } else {
        toast.error(`unexpected-error`);
      }
    } finally {
      setLoading(false);
    }
  }

  async function onSubmit(values: SignInData | SignUpData) {
    if (isSigningUp) {
      await onSubmitSignUp(values as SignUpData);
    } else {
      await onSubmitSignIn(values as SignInData);
    }
  }

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader>
          <CardTitle>
            {isSigningUp === true
              ? `Create an account`
              : `Login to your account`}
          </CardTitle>
          <CardDescription>
            {`Enter your account info below to ${
              isSigningUp === true ? `Create an account` : `Login`
            }`}
          </CardDescription>
        </CardHeader>
        <CardContent className="">
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="flex flex-col gap-4"
            >
              <div
                className={`transition-all duration-300 flex flex-col ${
                  isSigningUp ? `gap-6` : `gap-4`
                }`}
              >
                <div className="grid gap-3">
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>{`Email`}</FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            placeholder={`m@example.com`}
                            autoComplete="email"
                            disabled={loading}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                {isSigningUp === true && (
                  <div className="grid gap-3">
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>{`Enter a Display Name`}</FormLabel>
                          <FormControl>
                            <Input
                              {...field}
                              placeholder={`John Doe`}
                              autoComplete="name"
                              disabled={loading}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                )}

                <div className="grid gap-3">
                  <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem>
                        <div className="flex items-center">
                          <FormLabel>{`Password`}</FormLabel>
                          <a
                            href="#"
                            className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                          >
                            {`Forgot your password?`}
                          </a>
                        </div>
                        <FormControl>
                          <Input
                            {...field}
                            placeholder={`password123`}
                            type="password"
                            autoComplete="password"
                            disabled={loading}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                {isSigningUp === true && (
                  <div className="grid gap-3">
                    <FormField
                      control={form.control}
                      name="confirmPassword"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>{`Confirm Password`}</FormLabel>
                          <FormControl>
                            <Input
                              {...field}
                              placeholder={`password123`}
                              type="password"
                              autoComplete="password"
                              disabled={loading}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                )}

                <div className="flex flex-col gap-3">
                  <Button type="submit" className="w-full" disabled={loading}>
                    {loading
                      ? `loading`
                      : isSigningUp === true
                      ? `Sign Up`
                      : `Sign In`}
                  </Button>

                  <Button variant="outline" type="button" className="w-full">
                    {isSigningUp === true
                      ? `Signup with Github`
                      : `Login with Github`}
                    <GithubIcon className="ml-2" />
                  </Button>
                </div>
              </div>
              <div className="mt-4 text-center text-sm">
                {isSigningUp === true
                  ? `Don't have an account?`
                  : `Already have an account?`}
                {` `}
                <a
                  onClick={() => {
                    setIsSigningUp((isSigningUp) => !isSigningUp);
                    form.reset();
                  }}
                  className="underline underline-offset-4 transition-300 hover:cursor-pointer transition-transform hover:text-blue-600"
                >
                  {isSigningUp === true ? `Sign In` : `Sign Up`}
                </a>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
