import Vue from "vue";
import Vuex, { ActionContext } from "vuex";
import { MutationTree } from "vuex";
import { User } from "@/models/User";
import http from "../utils/Api";

Vue.use(Vuex);

export interface State {
  users: User[];
  fetchUsersIsLoading: boolean;
  fetchUsersHasError: boolean;
  fetchUsersErrorMsg?: string;
  addUserIsLoading: boolean;
  addUserHasError: boolean;
  addUserErrorMsg?: string;
  deleteUserIsLoading: string[];
  deleteUserHasError: string[];
  deleteUserErrorMsg: { [id: string]: string };
}

export const mutations: MutationTree<State> = {
  FETCH_INIT(state: State): void {
    state.fetchUsersIsLoading = true;
    state.fetchUsersHasError = false;
  },
  FETCH_SUCCESS(state: State, payload: User[]): void {
    state.fetchUsersIsLoading = false;
    state.fetchUsersHasError = false;
    state.users = payload;
  },
  FETCH_ERROR(state: State, payload: string): void {
    state.fetchUsersIsLoading = false;
    state.fetchUsersHasError = true;
    state.fetchUsersErrorMsg = payload;
  },
  ADD_INIT(state: State): void {
    state.addUserIsLoading = true;
    state.addUserHasError = false;
  },
  ADD_SUCCESS(state: State, payload: User): void {
    state.addUserIsLoading = false;
    state.addUserHasError = false;
    state.users = [...state.users, payload];
  },
  ADD_ERROR(state: State, payload: string): void {
    state.addUserIsLoading = false;
    state.addUserHasError = true;
    state.addUserErrorMsg = payload;
  },
  DELETE_INIT(state: State, payload: string): void {
    state.deleteUserIsLoading = Array.from(
      new Set([...state.deleteUserIsLoading, payload])
    );
    state.deleteUserHasError = state.deleteUserHasError.filter(
      id => id !== payload
    );
    state.deleteUserErrorMsg = Object.fromEntries(
      Object.entries(state.deleteUserErrorMsg).filter(
        ([key, value]) => key !== payload
      )
    );
  },
  DELETE_SUCCESS(state: State, payload: string): void {
    state.deleteUserIsLoading = state.deleteUserIsLoading.filter(
      id => id !== payload
    );
    state.users = state.users.filter(user => user.id !== payload);
  },
  DELETE_ERROR(state: State, payload: { id: string; error: string }): void {
    state.deleteUserHasError = Array.from(
      new Set([...state.deleteUserHasError, payload.id])
    );
    state.deleteUserErrorMsg = {
      ...state.deleteUserErrorMsg,
      [payload.id]: payload.error
    };
    state.deleteUserIsLoading = state.deleteUserIsLoading.filter(
      id => id !== payload.id
    );
  }
};

export const fetchUsers = async ({ commit }: ActionContext<State, State>) => {
  commit("FETCH_INIT");
  try {
    const res = await http.get("/user");
    commit("FETCH_SUCCESS", res.data);
  } catch (error) {
    commit("FETCH_ERROR", error);
  }
};

export const addUser = async (
  { commit }: ActionContext<State, State>,
  name: string
): Promise<boolean> => {
  commit("ADD_INIT");
  try {
    const res = await http.post("/user", { name });
    commit("ADD_SUCCESS", res.data);
    return true;
  } catch (error) {
    commit("ADD_ERROR", error);
    return false;
  }
};

export const deleteUser = async (
  { commit }: ActionContext<State, State>,
  id: string
): Promise<void> => {
  commit("DELETE_INIT", id);
  try {
    const res = await http.delete(`/user/${id}`);
    if (res.status !== 200) {
      throw new Error("Server response not accepted.");
    }
    commit("DELETE_SUCCESS", res.data.id);
  } catch (error) {
    commit("DELETE_ERROR", { id, error });
  }
};

export default new Vuex.Store<State>({
  state: {
    users: [],
    fetchUsersIsLoading: true,
    fetchUsersHasError: false,
    addUserIsLoading: false,
    addUserHasError: false,
    deleteUserIsLoading: [],
    deleteUserHasError: [],
    deleteUserErrorMsg: {}
  },
  mutations: mutations,
  actions: { fetchUsers, addUser, deleteUser }
});
