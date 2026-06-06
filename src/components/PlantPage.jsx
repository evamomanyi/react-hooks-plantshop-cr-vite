import React, { useEffect, useState } from "react";
import NewPlantForm from "./NewPlantForm";
import PlantList from "./PlantList";
import Search from "./Search";

function PlantPage() {
  const [plants, setPlants] = useState([]);
  const [search, setSearch] = useState("");

  const handleToggleStock = (id) => {
  setPlants(
    plants.map((plant) =>
      plant.id === id
        ? { ...plant, inStock: false }
        : plant
    )
  );
};

  useEffect(() => {
    fetch("http://localhost:6001/plants")
      .then((res) => res.json())
      .then((data) =>
  setPlants(
    data.map((plant) => ({
      ...plant,
      inStock: true
    }))
  )
);
  }, []);

  const filteredPlants = plants.filter((plant) =>
    plant.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <main>
      <NewPlantForm
        plants={plants}
        setPlants={setPlants}
      />

      <Search
        search={search}
        setSearch={setSearch}
      />

      <PlantList
        plants={filteredPlants}
        onToggleStock={handleToggleStock}
      />
    </main>
  );
}

export default PlantPage;