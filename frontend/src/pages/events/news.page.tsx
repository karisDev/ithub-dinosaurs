import { EventDto, MockEvents } from "api/models/event.model.ts";
import { useEffect, useState } from "react";
import { Chip, Input } from "@/ui";
import SearchIcon from "@/assets/search.svg";
import { EventCard } from "@/components/cards/event-card.widget";
import api from "api/utils/api";
import { EventsEndpoint } from "api/endpoints/events.endpoint";
import { NewsDto } from "api/models/news.model";
import { NewsCard } from "../main/sections/news/news.section";
import { observer } from "mobx-react-lite";
import { MainPageStore } from "../main/main.vm";

enum Filter {
  ForMe,
  Sport,
  Education,
  Volunteering,
  Creativity
}

export const NewsPage = observer(() => {
  const [search, setSearch] = useState("");
  const [filters, setFilters] = useState<Filter[]>([Filter.ForMe]);

  const handleFilter = (filter: Filter) => {
    if (filters.includes(filter)) {
      setFilters(filters.filter((f) => f !== filter));
    } else {
      setFilters([...filters, filter]);
    }
  };

  return (
    <div className="flex flex-col pb-4 gap-4 px-4 mx-auto max-w-screen-desktop fade-enter-done mt-6 sm:mt-10">
      <Input
        id={"search"}
        placeholder={"Поиск"}
        rightIcon={<SearchIcon />}
        className=""
        value={search}
        onChange={setSearch}
      />
      <div className={"flex items-center gap-2 flex-wrap"}>
        <Chip
          title={"Для меня"}
          onClick={() => handleFilter(Filter.ForMe)}
          isActive={filters.includes(Filter.ForMe)}
        />
        <Chip
          title={"Спорт"}
          onClick={() => handleFilter(Filter.Sport)}
          isActive={filters.includes(Filter.Sport)}
        />
        <Chip
          title={"Обучение"}
          onClick={() => handleFilter(Filter.Education)}
          isActive={filters.includes(Filter.Education)}
        />
        <Chip
          title={"Волонтёрство"}
          onClick={() => handleFilter(Filter.Volunteering)}
          isActive={filters.includes(Filter.Volunteering)}
        />
        <Chip
          title={"Творчество"}
          onClick={() => handleFilter(Filter.Creativity)}
          isActive={filters.includes(Filter.Creativity)}
        />
      </div>
      <ul
        className="grid gap-4"
        style={{
          gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))"
        }}>
        {MainPageStore.news.map((v, i) => (
          <NewsCard id={v.id} title={v.title} img={v.img} type={v.type} key={i} wide />
        ))}
      </ul>
    </div>
  );
});