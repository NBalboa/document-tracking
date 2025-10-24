
import { Head } from "@inertiajs/react"
import useLogin from "./useLogin"
import { Card, CardContent } from "@/components/ui/card"
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import GuestLayout from "@/layouts/GuestLayout"
import SecureText from "@/components/SecureText"

const Login = () => {
    const {
        handleChange,
        handleSubmit,
        errors,
        data,
        isShowPassword,
        handleToggleIsShowPassword
    } = useLogin()
    return (
        <>
            <Head title="Login" />
            <GuestLayout>
                <div className="bg-background flex min-h-svh flex-col items-center justify-center p-6 md:p-10">
                    <div className="w-full max-w-sm md:max-w-4xl">
                        <div className={"flex flex-col gap-6"} >
                            <Card className="overflow-hidden p-0">
                                <CardContent className="grid p-0 md:grid-cols-2">
                                    <form className="p-6 md:p-8" onSubmit={handleSubmit}>
                                        <FieldGroup>
                                            <div className="flex flex-col items-center gap-2 text-center">
                                                <h1 className="text-2xl font-bold">Welcome</h1>
                                                <p className="text-muted-foreground text-balance">
                                                    Login to your DTS Account
                                                </p>
                                            </div>
                                            <Field>
                                                <FieldLabel htmlFor="email" >Email</FieldLabel>
                                                <Input
                                                    id="email"
                                                    type="email"
                                                    value={data.email}
                                                    placeholder="m@example.com"
                                                    onChange={(e) => handleChange({ data: "email", event: e })}
                                                />
                                                <span className="text-destructive text-sm">{errors.email ?? ""}</span>
                                            </Field>
                                            <Field>
                                                <div className="flex items-center">
                                                    <FieldLabel htmlFor="password">Password</FieldLabel>
                                                    <a
                                                        href="#"
                                                        className="ml-auto text-sm underline-offset-2 hover:underline hidden"
                                                    >
                                                        Forgot your password?
                                                    </a>
                                                </div>
                                                <SecureText isShowPassword={isShowPassword} onHandleClick={handleToggleIsShowPassword} value={data.password} onHandleChange={(e) => handleChange({ data: 'password', event: e })} />
                                                <span className="text-destructive text-sm">{errors.password ?? ""}</span>
                                            </Field>
                                            <Field>
                                                <Button type="submit">Login</Button>
                                            </Field>
                                        </FieldGroup>
                                    </form>
                                    <div className="bg-background relative hidden md:block">
                                        <img
                                            src="/hero.jpg"
                                            alt="Image"
                                            className="absolute inset-0 h-full w-full object-cover"
                                        />
                                    </div>
                                </CardContent>
                            </Card>
                        </div>
                    </div>
                </div>
            </GuestLayout>
        </>
    )
}

export default Login
