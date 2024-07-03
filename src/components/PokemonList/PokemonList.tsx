"use client";

import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import type { Pokemon } from "@/types";
import Image from "next/image";
import { useRouter } from "next/navigation";

function PokemonList() {
  const router = useRouter();
  const { data, isPending, isError } = useQuery({
    queryKey: ["pokemons"],
    queryFn: async (): Promise<Pokemon[]> => {
      const { data } = await axios.get<Pokemon[]>(
        "http://localhost:3000/api/pokemons"
      );
      return data;
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
          return (
            <div
              className={
                "flex flex-col p-2 border border-white text-center justify-center items-center rounded hover:scale-105 cursor-pointer duration-75"
              }
              key={pokemon.id}
              onClick={() => {
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
        })}
      </div>
    </div>
  );
}

export default PokemonList;
