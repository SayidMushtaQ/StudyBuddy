import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Link,
  Button,
} from "@heroui/react";

export default function App() {
  return (
    <Navbar className="bg-background/70 backdrop-blur-lg" maxWidth="xl">
      <NavbarBrand>
        <p className="font-bold text-xl text-inherit">StudyBuddy</p>
      </NavbarBrand>

      <NavbarContent className="gap-4" justify="center">
        <NavbarItem>
          <Link color="foreground" href="#">
            Dashboard
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link color="foreground" href="#">
            Study Groups
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link color="foreground" href="#">
            Resources
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link color="foreground" href="#">
            Community
          </Link>
        </NavbarItem>
      </NavbarContent>

      <NavbarContent justify="end">
        <NavbarItem>
          <Button
            as={Link}
            className="font-medium"
            color="primary"
            href="#"
            variant="flat"
          >
            Login
          </Button>
        </NavbarItem>
        <NavbarItem>
          <Button
            as={Link}
            className="font-medium"
            color="primary"
            href="#"
            variant="solid"
          >
            Let &apos; s Get started
          </Button>
        </NavbarItem>
      </NavbarContent>
    </Navbar>
  );
}
