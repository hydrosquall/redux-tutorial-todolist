import { schema } from "normalizr";

// Normalizr syntax has diverged from the tutorial:
// https://github.com/paularmstrong/normalizr/blob/master/docs/api.md#schema
export const todo = new schema.Entity("todos");
export const arrayOfTodos = new schema.Array(todo);
