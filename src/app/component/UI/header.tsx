"use client";
import LoginModal from "./modals/login.modal";
import {Navbar, NavbarBrand, NavbarContent, NavbarItem, Link, Button} from "@heroui/react";
import RegistrationModal from "./modals/registration.modal";
import {useState} from "react";
import { sign } from "crypto";
import { signOutFunc } from "@/actions/sign-out";

export const AcmeLogo = () => {
  return (
    <svg
      className="logo-icon"
      width="48"
      height="48"
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      
      <rect x="2" y="2" width="44" height="44" rx="8" fill="var(--color-primary)" />
      <text x="50%" y="57%" textAnchor="middle" fill="var(--color-inverse-text)" fontWeight={700} fontSize={18} fontFamily="Inter, system-ui, -apple-system, 'Segoe UI', Roboto, 'Helvetica Neue', Arial">
        ПКС
      </text>
    </svg>
  );
};


export default function Header() {

  const handleSignOut = async () => {
    try {
      await signOutFunc();
    }
    catch (error) {
      console.error("Error", error);
    }
  };
  const [isRegistrationOpen, setIsRegistrationOpen] = useState(false);
  const [isLoginOpen, setIsLoginOpen] = useState(false);

  return (
    <Navbar>
      <NavbarBrand className="brand">
        <AcmeLogo />
      </NavbarBrand>
      <NavbarContent className="hidden sm:flex gap-4" justify="center">
        <NavbarItem>
          <Link color="foreground" href="#">
            Главная
          </Link>
        </NavbarItem>
        <NavbarItem isActive>
          <Link aria-current="page" href="#">
            Документация
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link color="foreground" href="#">
            О нас
          </Link>
        </NavbarItem>
      </NavbarContent>
      <NavbarContent justify="end">
        <NavbarItem className="hidden lg:flex">
          <Button as={Link} onPress={() => setIsLoginOpen(true)} className="btn-black" href="#" variant="flat">
            Войти
          </Button>
        </NavbarItem>
        <NavbarItem>
          <Button as={Link} onPress={() => setIsRegistrationOpen(true)} className="btn-white" href="#" variant="flat">
            Зарегистрироваться
          </Button>
        </NavbarItem>
        <NavbarItem>
          <Button as={Link} color = "secondary" href ="#" variant="flat" onPress={handleSignOut}>
            Выйти
          </Button>
        </NavbarItem>
      </NavbarContent>

      <RegistrationModal isOpen={isRegistrationOpen} onClose={() => setIsRegistrationOpen(false)} />
      <LoginModal isOpen={isLoginOpen} onClose={() => setIsLoginOpen(false)} />
    </Navbar>
  );
}
