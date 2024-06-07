// src/data.js
export const initialState = [
  {
    id: "1",
    name: "State 1",
    isInitialStatus: true,
    deletable: false,
    transitionTo: ["2"],
  },
  {
    id: "2",
    name: "State 2",
    isInitialStatus: false,
    deletable: true,
    transitionTo: ["1"],
  },
  {
    id: "3",
    name: "State 3",
    isInitialStatus: false,
    deletable: true,
    transitionTo: ["1"],
  },
];
