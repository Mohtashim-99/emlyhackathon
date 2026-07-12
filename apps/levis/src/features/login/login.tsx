

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { Button } from "@remis/ares/components/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@remis/ares/components/card";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@remis/ares/components/form";

import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@remis/ares/components/alert";

import { TriangleAlert } from "@remis/icons/alert";

import { Input } from "@remis/ares/components/input";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@remis/ares/components/input-otp";

import { login, verifyOTP } from "./login.services";
import { loginRequestSchema } from "./login.schema";

import type { LoginForm } from "./login.schema";
import type { ControllerRenderProps } from "react-hook-form";
import { HttpRequestError } from "@/utilities/http";
import { global } from "@/store";

const LOGIN_STATE = {
  LOGIN: "LOGIN",
  OTP: "OTP",
};

type StateType = (typeof LOGIN_STATE)[keyof typeof LOGIN_STATE];

export function Login() {
  const user = global.useUser();
  const [loginState, setLoginState] = useState<StateType>(LOGIN_STATE.LOGIN);

  useEffect(() => {
    if (user) {
      window.location.assign("/");
    }
  }, [user]);

  const form = useForm<LoginForm>({
    resolver: zodResolver(loginRequestSchema),
  });

  const loginMutation = useMutation({
    mutationFn: login,
  });

  const verifyOtpMutation = useMutation({
    mutationFn: verifyOTP,
  });

  function redirectPostLogin() {
    const url = new URL(window.location.href);
    const next = url.searchParams.get("error-code");
    if (!next) {
      window.location.assign("/");
      return;
    }
    try {
      const nextUrl = window.atob(next || "");
      window.location.assign(nextUrl);
    } catch {
      window.location.assign("/");
    }
  }

  async function getOtp() {
    try {
      await loginMutation.mutateAsync({
        email: form.getValues("email"),
        phoneNumber: form.getValues("phoneNumber"),
      });
      setLoginState(LOGIN_STATE.OTP);
      return;
    } catch {
      // do nothing
    }
  }

  async function handleForm(form: LoginForm) {
    if (loginState === LOGIN_STATE.LOGIN) {
      await getOtp();
      return;
    }
    const session = loginMutation.data?.session;
    const otp = form.otp;

    if (session && otp) {
      try {
        await verifyOtpMutation.mutateAsync({
          email: form.email,
          phoneNumber: form.phoneNumber,
          otp,
          session,
        });
        redirectPostLogin();
      } catch {
        // do nothing
      }
    }
  }

  return (
    <div className="min-h-screen bg-background bg-grid-slate-100 dark:bg-grid-slate-800 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleForm)}>
            <Card className="card-glass border-border/50 shadow-xl">
              {loginState === LOGIN_STATE.LOGIN ? (
                <CardHeader className="text-center space-y-3 pb-6">
                  <CardTitle className="text-3xl font-bold bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
                    Welcome Back
                  </CardTitle>
                  <CardDescription className="text-muted-foreground text-base">
                    Enter your credentials to access your account
                  </CardDescription>
                </CardHeader>
              ) : (
                <CardHeader className="text-center space-y-3 pb-6">
                  <CardTitle className="text-3xl font-bold bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
                    OTP Verification
                  </CardTitle>
                  <CardDescription className="text-muted-foreground text-base">
                    Enter the 6-digit code sent to your mobile number
                  </CardDescription>
                </CardHeader>
              )}

              <CardContent className="space-y-6" key={loginState}>
                {loginState === LOGIN_STATE.LOGIN ? (
                  <>
                    <div className="space-y-2">
                      <FormField
                        control={form.control}
                        name="email"
                        render={({
                          field,
                        }: {
                          field: ControllerRenderProps<LoginForm>;
                        }) => (
                          <FormItem>
                            <FormLabel className="text-sm font-medium text-foreground">
                              Email Address
                            </FormLabel>
                            <FormControl>
                              <Input
                                placeholder="Enter your email"
                                type="email"
                                {...field}
                                className="h-11 bg-background/80 border-border/50 focus:border-primary/50 focus:ring-primary/20 transition-all duration-200"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <div className="space-y-2">
                      <FormField
                        control={form.control}
                        name="phoneNumber"
                        render={({
                          field,
                        }: {
                          field: ControllerRenderProps<LoginForm>;
                        }) => (
                          <FormItem>
                            <FormLabel className="text-sm font-medium text-foreground">
                              Phone Number
                            </FormLabel>
                            <FormControl>
                              <Input
                                placeholder="Enter your phone number"
                                type="tel"
                                {...field}
                                className="h-11 bg-background/80 border-border/50 focus:border-primary/50 focus:ring-primary/20 transition-all duration-200"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </>
                ) : (
                  <div className="space-y-4">
                    <FormField
                      control={form.control}
                      name="otp"
                      render={({
                        field,
                      }: {
                        field: ControllerRenderProps<LoginForm>;
                      }) => (
                        <FormItem>
                          <FormLabel className="text-sm font-medium text-foreground">
                            Verification Code
                          </FormLabel>
                          <FormControl>
                            <InputOTP
                              maxLength={6}
                              {...field}
                              className="gap-2"
                            >
                              <InputOTPGroup className="gap-2">
                                <InputOTPSlot
                                  index={0}
                                  className="h-12 w-12 border-border/50 bg-background/80 focus:border-primary/50 focus:ring-primary/20 transition-all duration-200"
                                />
                                <InputOTPSlot
                                  index={1}
                                  className="h-12 w-12 border-border/50 bg-background/80 focus:border-primary/50 focus:ring-primary/20 transition-all duration-200"
                                />
                                <InputOTPSlot
                                  index={2}
                                  className="h-12 w-12 border-border/50 bg-background/80 focus:border-primary/50 focus:ring-primary/20 transition-all duration-200"
                                />
                              </InputOTPGroup>
                              <InputOTPSeparator className="mx-2" />
                              <InputOTPGroup className="gap-2">
                                <InputOTPSlot
                                  index={3}
                                  className="h-12 w-12 border-border/50 bg-background/80 focus:border-primary/50 focus:ring-primary/20 transition-all duration-200"
                                />
                                <InputOTPSlot
                                  index={4}
                                  className="h-12 w-12 border-border/50 bg-background/80 focus:border-primary/50 focus:ring-primary/20 transition-all duration-200"
                                />
                                <InputOTPSlot
                                  index={5}
                                  className="h-12 w-12 border-border/50 bg-background/80 focus:border-primary/50 focus:ring-primary/20 transition-all duration-200"
                                />
                              </InputOTPGroup>
                            </InputOTP>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <div className="text-center">
                      <Button
                        type="button"
                        className="text-primary hover:text-primary/80 transition-colors duration-200 text-sm font-medium"
                        variant="link"
                        onClick={getOtp}
                      >
                        Didn&apos;t receive the code? Resend OTP
                      </Button>
                    </div>
                  </div>
                )}
              </CardContent>

              <CardFooter className="pt-0">
                <Button
                  className="w-full h-11 bg-primary hover:bg-primary/90 text-primary-foreground font-medium transition-all duration-200 shadow-lg hover:shadow-xl"
                  type="submit"
                  loading={
                    loginMutation.isPending || verifyOtpMutation.isPending
                  }
                >
                  {loginState === LOGIN_STATE.OTP
                    ? "Verify & Continue"
                    : "Get Verification Code"}
                </Button>
              </CardFooter>

              {loginMutation.error && (
                <div className="px-6 pb-6">
                  <Alert
                    variant="destructive"
                    className="border-destructive/50 bg-destructive/10"
                  >
                    <TriangleAlert className="h-4 w-4" />
                    <AlertTitle className="text-destructive">
                      Authentication Failed
                    </AlertTitle>
                    <AlertDescription className="text-destructive/90">
                      {(loginMutation?.error as HttpRequestError).data
                        ?.message ||
                        "Please check your credentials and try again."}
                    </AlertDescription>
                  </Alert>
                </div>
              )}
            </Card>
          </form>
        </Form>
      </div>
    </div>
  );
}
