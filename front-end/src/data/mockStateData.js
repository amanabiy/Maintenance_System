// src/data.js
export const initialState = [
  {
    id: "1",
    label: "State 1",
    isFirst: true,
    deletable: false,
    transitionTo: ["2"],
  },
  {
    id: "2",
    label: "State 2",
    isFirst: false,
    deletable: true,
    transitionTo: [],
  },
];
