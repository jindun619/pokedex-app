# PokedexApp

PokedexApp is a cross-platform mobile application built with **React Native** and **TypeScript**. It serves as a digital Pokédex, allowing users to browse, search, and view detailed information about Pokémon. The app leverages **PokeAPI**, a free and open-source RESTful API, to fetch Pokémon data. 

## Features

- **Home Screen**: Displays a list of Pokémon in index order, with **infinite scroll** to fetch more data as the user scrolls.
- **Search Screen**: Allows users to search for specific Pokémon by name.
- **Detail Screen**: Shows detailed information about a selected Pokémon, including stats, abilities, and more.
- **Navigation**: Clicking on a Pokémon card from any screen routes the user to the corresponding **Detail Screen** using **React Navigation**.

## Tech Stack

- **Frontend**: React Native + TypeScript
- **State Management & Data Fetching**: React Query (TanStack)
- **Styling**: Styled Components
- **Navigation**: React Navigation
- **API**: [PokeAPI](https://pokeapi.co/)

## Key Learnings
- Implemented infinite scroll for seamless data fetching.
- Utilized React Query for efficient data management and caching.
- Styled the app using Styled Components for a consistent and maintainable design.
- Integrated React Navigation for smooth and intuitive navigation between screens.
- Gained experience in working with external APIs, specifically PokeAPI.