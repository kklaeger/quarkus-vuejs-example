import { mutations, fetchUsers, State } from "@/store/store";
import { User } from "@/models/User";
import { ActionContext } from "vuex";
import http from "../../../src/utils/Api";

jest.mock("../../../src/utils/Api");

const { FETCH_INIT, FETCH_SUCCESS, FETCH_ERROR } = mutations;

describe("Store", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("Mutations", () => {
    it("should call FETCH_INIT and change to isLoading=true and isError=false, given isLoading=false and isError=false.", () => {
      const state: State = { isLoading: false, isError: false };

      FETCH_INIT(state);

      expect(state).toEqual({ isLoading: true, isError: false });
    });

    it("should call FETCH_INIT and change to isLoading=true and isError=false, given isLoading=false and isError=true.", () => {
      const state: State = { isLoading: false, isError: true };

      FETCH_INIT(state);

      expect(state).toEqual({ isLoading: true, isError: false });
    });

    it("should call FETCH_SUCCESS and change to isLoading=false and isError=false and user list, given isLoading=true and isError=false.", () => {
      const state: State = { isLoading: true, isError: false };
      const payload: User[] = [{ id: 1, name: "Test" }];

      FETCH_SUCCESS(state, payload);

      expect(state).toEqual({
        isLoading: false,
        isError: false,
        users: payload
      });
    });
    it("should call FETCH_ERROR and change to isLoading=false and isError=true and error message, given isLoading=true and isError=false.", () => {
      const state: State = { isLoading: true, isError: false };
      const payload = "error";

      FETCH_ERROR(state, payload);

      expect(state).toEqual({
        isLoading: false,
        isError: true,
        error: payload
      });
    });
  });

  describe("Actions", () => {
    it("should commit 'FETCH_INIT', call the api and commit 'FETCH_SUCCESS'", async () => {
      const state: State = { isLoading: false, isError: false };
      const context = {
        commit: jest.fn(),
        dispatch: jest.fn(),
        state,
        getters: {},
        rootState: state,
        rootGetters: {}
      } as ActionContext<State, State>;
      (http.get as jest.Mock).mockReturnValue({ data: { users: "xyz" } });
      await fetchUsers(context);

      expect(context.commit).toHaveBeenCalledTimes(2);
      expect(context.commit).toHaveBeenNthCalledWith(1, "FETCH_INIT");
      expect(context.commit).toHaveBeenNthCalledWith(2, "FETCH_SUCCESS", {
        users: "xyz"
      });
    });

    it("should commit 'FETCH_INIT', call the api and commit 'FETCH_ERROR'", async () => {
      const state: State = { isLoading: false, isError: false };
      const context = {
        commit: jest.fn(),
        dispatch: jest.fn(),
        state,
        getters: {},
        rootState: state,
        rootGetters: {}
      } as ActionContext<State, State>;
      (http.get as jest.Mock).mockRejectedValue(new Error());
      await fetchUsers(context);

      expect(context.commit).toHaveBeenCalledTimes(2);
      expect(context.commit).toHaveBeenNthCalledWith(1, "FETCH_INIT");
      expect(context.commit).toHaveBeenNthCalledWith(
        2,
        "FETCH_ERROR",
        expect.any(Error)
      );
    });
  });
});
