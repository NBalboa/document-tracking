import React from 'react'
import { Input } from './ui/input'
import { Button } from './ui/button'
import { FaRegEye, FaRegEyeSlash } from 'react-icons/fa6'

const SecureText = ({
    value = "",
    onHandleChange,
    isShowPassword = false,
    onHandleClick
}: {
    value?: string
    onHandleChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
    isShowPassword?: boolean,
    onHandleClick?: () => void
}) => {
    return (
        <div className="relative">
            <Input id="password" value={value} className="pr-10" type={isShowPassword ? "text" : "password"} onChange={onHandleChange} />
            <Button onClick={onHandleClick} type="button" className="absolute right-0 top-0 bottom-0" size={"icon"}>
                {isShowPassword ? <FaRegEyeSlash /> : <FaRegEye />}
            </Button>
        </div>
    )
}

export default SecureText
