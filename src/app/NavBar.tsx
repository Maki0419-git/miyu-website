"use client";

import { styled } from "@pigment-css/react";
import Image from "next/image";
import Link from "next/link";

const Container = styled("div")({
  fontSize: "1rem",
  fontWeight: "bold",
  padding: "10px 5px",
  border: "1px solid black",
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
});

const LogoWrapper = styled("div")({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  border: "1px solid red",
});

const LogoImage = styled(Image)({
  borderRadius: "50%",
  marginRight: "10px",
});

const PageWrapper = styled("div")({
  display: "flex",
  gap: "10px",
  alignItems: "center",
  justifyContent: "center",
  border: "1px solid red",
});

export default function NavBar() {
  return (
    <Container>
      <LogoWrapper>
        <LogoImage
          src="https://picsum.photos/200"
          alt="Next.js Logo"
          width={50}
          height={50}
          priority
        />
        <Link href="/">Miyu website</Link>
      </LogoWrapper>
      <PageWrapper>
        <Link href="/weather">weather</Link>
        <Link href="/about">about</Link>
      </PageWrapper>
    </Container>
  );
}
