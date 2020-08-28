import Vue from "vue";
import Vuex, { ActionContext } from "vuex";
import { MutationTree } from "vuex";
import { User } from "@/models/User";
import http from "../utils/Api";

Vue.use(Vuex);

export interface State {
  users?: User[];
  isLoading: boolean;
  isError: boolean;
  error?: string;
}

export const mutations: MutationTree<State> = {
  FETCH_INIT(state: State): void {
    state.isLoading = true;
    state.isError = false;
  },
  FETCH_SUCCESS(state: State, payload: User[]): void {
    state.isLoading = false;
    state.isError = false;
    state.users = payload;
  },
  FETCH_ERROR(state: State, payload: string): void {
    state.isLoading = false;
    state.isError = true;
    state.error = payload;
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

export default new Vuex.Store<State>({
  state: { isLoading: true, isError: false },
  mutations: mutations,
  actions: { fetchUsers }
});
