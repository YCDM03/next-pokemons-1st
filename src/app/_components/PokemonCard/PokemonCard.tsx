"use client";

import React, { useState } from "react";
import type { Pokemon } from "@/app/_types";
import Image from "next/image";
import { useRouter } from "next/navigation";

interface Props {
  pokemon: Pokemon;
}

function PokemonCard({ pokemon }: Props) {
  const router = useRouter();
  return (
    <div
      className={
        "flex flex-col p-2 border border-white text-center justify-center items-center rounded hover:scale-105 cursor-pointer duration-75"
      }
      onClick={() => {
        sessionStorage.setItem(
          "MainPageScrollY",
          JSON.stringify(window.scrollY)
        );
        router.push(`/detail/${pokemon.id}`);
      }}
    >
      <Image
        src={`${pokemon.sprites.front_default}`}
        alt={`${pokemon.korean_name}`}
        width={96}
        height={96}
        priority
      />
      <div>{pokemon.korean_name}</div>
      <div>도감번호:{pokemon.id}</div>
    </div>
  );
}

export default PokemonCard;
