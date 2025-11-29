"use client";

import CustomModel from "@/app/component/common/modal";
import LoginForm from "@/forms/login.form";

interface IProps {
    isOpen: boolean;
    onClose: () => void;
}

const LoginModal = ({ isOpen, onClose }: IProps) => {
    return (
        <CustomModel isOpen={isOpen} onClose={onClose} title="Авторизация">
            <LoginForm onClose={onClose} />
        </CustomModel>
    );
}

export default LoginModal;