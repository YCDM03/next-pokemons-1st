"use client";

import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import type { Pokemon } from "@/types";
import { useRouter } from "next/navigation";
import PokemonCard from "../PokemonCard";

function PokemonList() {
  const { data, isPending, isError } = useQuery({
    queryKey: ["pokemons"],
    queryFn: async (): Promise<Pokemon[]> => {
      const response = await fetch("http://localhost:3000/api/pokemons", {
        method: "GET",
      });
      return response.json();
    },
  });

  if (isPending) {
    return (
      <div className="w-screen h-screen m-auto content-center ">
        <div className="w-12 h-12 mx-auto my-[calc(50%-24)] box-border border-4  border-gray-500 border-y-white rounded-full animate-spin"></div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="text-white w-screen h-screen m-auto text-center content-center">
        리스트를 불러오는데 실패하였습니다!
      </div>
    );
  }

  return (
    <div className={"text-white"}>
      <h2 className={"block w-full text-3xl text-center py-10"}>포켓몬 도감</h2>
      <div
        className={
          "w-2/3 mx-auto grid gap-6 justify-center grid-cols-1 2xl:grid-cols-new6 xl:grid-cols-new5 lg:grid-cols-new4 md:grid-cols-new3 sm:grid-cols-new2"
        }
      >
        {data!.map((pokemon) => {
          return <PokemonCard key={pokemon.id} pokemon={pokemon} />;
        })}
      </div>
    </div>
  );
}

export default PokemonList;
