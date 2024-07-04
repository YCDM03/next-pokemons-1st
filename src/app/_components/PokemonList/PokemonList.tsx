"use client";

import axios from "axios";
import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import type { Pokemon } from "@/app/_types";
import { useRouter } from "next/navigation";
import PokemonCard from "../PokemonCard";
import { useCallback, useEffect, useRef } from "react";

const TOTAL_POKEMON = 151;
const PAGE_SIZE = 20;

function PokemonList() {
  const $observer = useRef<HTMLDivElement>(null);

  const { fetchNextPage, data, isPending, isError } = useInfiniteQuery({
    queryKey: ["pokemons"],
    initialPageParam: 1,
    queryFn: async ({ pageParam }): Promise<Pokemon[]> => {
      const response = await fetch(`/api/pokemons?page=${pageParam}`, {
        method: "GET",
      });
      return response.json();
    },
    getNextPageParam: (
      lastPage,
      allPages,
      lastPageParam
    ): number | undefined => {
      const nextPage = lastPageParam + 1;
      return nextPage <= Math.ceil(TOTAL_POKEMON / PAGE_SIZE)
        ? nextPage
        : undefined;
    },
    select: ({ pages }) => pages.flat(),
  });

  useEffect((): void => {
    const onIntersect = ([entries]: IntersectionObserverEntry[]) => {
      if (entries.isIntersecting) fetchNextPage();
    };

    const option = {
      threshold: 0.5,
    };

    const observer = new IntersectionObserver(onIntersect, option);

    if (!isPending) {
      observer.observe($observer.current!);
    }
  }, [isPending]);

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
          "w-2/3 mx-auto grid gap-6 justify-center grid-cols-1 2xl:grid-cols-new5 lg:grid-cols-new4 md:grid-cols-new2 sm:grid-cols-new2"
        }
      >
        {data.map((pokemon) => {
          return <PokemonCard key={pokemon.id} pokemon={pokemon} />;
        })}
      </div>
      <div ref={$observer} className={"h-10"}></div>
    </div>
  );
}

export default PokemonList;
