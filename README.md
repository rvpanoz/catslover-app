# catslover 🐱

A React application for cat lovers, utilizing [TheCatAPI](https://thecatapi.com) to display cat breeds and images. Users can explore random cat images, view breed details, and add favourites.

## 🚀 Features

- Display a list of random cat images
- Load more images dynamically
- Click an image to view details in a modal
- Share image URLs for direct access
- Add cats to a favorites list

## 🛠️ Tech Stack

- **React** – Component-based UI
- **TypeScript** – Type safety
- **Tailwind CSS** – Styling
- **Context API** – State management (instead of Redux)
- **Jest** – Unit testing
- **TheCatAPI** – API for fetching cat images and breeds
- **localStorage** - storing user properties (encrypted)
---

## 📥 Installation

### Prerequisites

- **Node.js** (Recommended: latest LTS version)
- **Package Manager** (npm or yarn)

### Setup

1. Clone the repository:

   ```sh
   git clone https://github.com/rvpanoz/catslover-app.git
   cd catslover-app

   ```

2. Install dependencies

   ```sh
   npm install
   # or
   yarn install

   ```

3. Create a .env file in the root directory and add:

   ```sh
   VITE_SECRET_KEY=your_secret_key_here
   VITE_API_KEY=your_api_key_here

   ```

   ..to speed up things, you can use: :)
   ```
   VITE_API_KEY=live_jvFvJ5YkRNWk1DtqO3mtVSgJkSV3o5PbsqWKvQwbtFMwrdqoJuafSZbCvLukJur2
   VITE_SECRET_KEY=hwbts4yitag4inhwbt
   ```
   
### Production build and preview environment

For previewing the production build issue the command:

```sh
npm run preview
# or
yarn preview

```

Visit **http://localhost:4173** in your browser to view app.

### Development server

1. Start the development server

   ```sh
   npm run dev
   # or
   yarn dev

   ```

   Visit **http://localhost:5173** in your browser to view app.

## Project structure

src  
│── components/ # Reusable UI components

│── context/ # Context API for state management  
│── services/ # API requests  
│── hooks/ # Custom React hooks  
│── state/ # Reducers and state management  
│── types/ # TypeScript interfaces  
│── views/ # Page views

## State Management

This project does not use Redux. Instead, it relies on the Context API and reducers:

AppContext.tsx manages global state
Reducers handle state updates (appReducers.ts, catsReducer.ts)

## ✅ Testing

This project uses Jest for unit tests.

Run Tests

```sh
npm test
# or
yarn test
```

## Overall

✅ Scalable - Easy to add new features without cluttering the codebase.

✅ Modular - Separates concerns (UI, logic, state management).

✅ Reusable - Encourages the reuse of components and hooks.

✅ Testable - Clear separation makes writing tests straightforward.

## Best Practices

- Components are reusable and modular
- Tailwind CSS is used for styling consistency
- Context API is preferred over Redux for simplicity
- Custom hooks (useFetch.ts) separate concerns
- API service functions. By moving API calls to service functions, components focus only on UI and state management,
  while services handle data fetching and API logic, increases reusability, improves testing.
- Encrypt user id in localStorage for better security

## Future Improvements

- Implement pagination for breed list
- Add user authentication (currently using localStorage with encrypted data for user properties)
