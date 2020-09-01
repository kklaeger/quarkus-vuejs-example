import { mutations, fetchUsers, addUser, State } from "@/store/store";
import { User } from "@/models/User";
import { ActionContext } from "vuex";
import http from "../../../src/utils/Api";

jest.mock("../../../src/utils/Api");

const {
  FETCH_INIT,
  FETCH_SUCCESS,
  FETCH_ERROR,
  ADD_INIT,
  ADD_SUCCESS,
  ADD_ERROR
} = mutations;

describe("Store", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("Mutations", () => {
    it("should call FETCH_INIT and change to fetchUsersIsLoading=true and fetchUsersHasError=false, given fetchUsersIsLoading=false and fetchUsersHasError=false.", () => {
      const state: State = {
        users: [],
        fetchUsersIsLoading: false,
        fetchUsersHasError: false,
        addUserIsLoading: false,
        addUserHasError: false
      };

      FETCH_INIT(state);

      expect(state).toEqual({
        users: [],
        fetchUsersIsLoading: true,
        fetchUsersHasError: false,
        addUserIsLoading: false,
        addUserHasError: false
      });
    });

    it("should call FETCH_INIT and change to fetchUsersIsLoading=true and fetchUsersHasError=false, given fetchUsersIsLoading=false and fetchUsersHasError=true.", () => {
      const state: State = {
        users: [],
        fetchUsersIsLoading: false,
        fetchUsersHasError: true,
        addUserIsLoading: false,
        addUserHasError: false
      };

      FETCH_INIT(state);

      expect(state).toEqual({
        users: [],
        fetchUsersIsLoading: true,
        fetchUsersHasError: false,
        addUserIsLoading: false,
        addUserHasError: false
      });
    });

    it("should call FETCH_SUCCESS and change to fetchUsersIsLoading=false and fetchUsersHasError=false and user list, given fetchUsersIsLoading=true and fetchUsersHasError=false.", () => {
      const state: State = {
        users: [],
        fetchUsersIsLoading: true,
        fetchUsersHasError: false,
        addUserIsLoading: false,
        addUserHasError: false
      };
      const payload: User[] = [{ id: 1, name: "Test" }];

      FETCH_SUCCESS(state, payload);

      expect(state).toEqual({
        users: payload,
        fetchUsersIsLoading: false,
        fetchUsersHasError: false,
        addUserIsLoading: false,
        addUserHasError: false
      });
    });
    it("should call FETCH_ERROR and change to fetchUsersIsLoading=false and fetchUsersHasError=true and error message, given fetchUsersIsLoading=true and fetchUsersHasError=false.", () => {
      const state: State = {
        users: [],
        fetchUsersIsLoading: true,
        fetchUsersHasError: false,
        addUserIsLoading: false,
        addUserHasError: false
      };
      const payload = "error";

      FETCH_ERROR(state, payload);

      expect(state).toEqual({
        users: [],
        fetchUsersErrorMsg: payload,
        fetchUsersIsLoading: false,
        fetchUsersHasError: true,
        addUserIsLoading: false,
        addUserHasError: false
      });
    });

    it("should call ADD_INIT and change to addUserIsLoading=true and addUserHasError=false, given addUserIsLoading=false and addUserHasError=false.", () => {
      const state: State = {
        users: [],
        fetchUsersIsLoading: false,
        fetchUsersHasError: false,
        addUserIsLoading: false,
        addUserHasError: false
      };

      ADD_INIT(state);

      expect(state).toEqual({
        users: [],
        fetchUsersIsLoading: false,
        fetchUsersHasError: false,
        addUserIsLoading: true,
        addUserHasError: false
      });
    });

    it("should call ADD_INIT and change to addUserIsLoading=true and addUserHasError=false, given addUserIsLoading=false and addUserHasError=true.", () => {
      const state: State = {
        users: [],
        fetchUsersIsLoading: false,
        fetchUsersHasError: false,
        addUserIsLoading: false,
        addUserHasError: true
      };

      ADD_INIT(state);

      expect(state).toEqual({
        users: [],
        fetchUsersIsLoading: false,
        fetchUsersHasError: false,
        addUserIsLoading: true,
        addUserHasError: false
      });
    });

    it("should call ADD_SUCCESS and change to addUserIsLoading=false and addUserHasError=false and user list, given addUserIsLoading=true and addUserHasError=false.", () => {
      const state: State = {
        users: [{ id: 1, name: "Test1" }],
        fetchUsersIsLoading: false,
        fetchUsersHasError: false,
        addUserIsLoading: true,
        addUserHasError: false
      };
      const payload: User = { id: 2, name: "Test2" };

      ADD_SUCCESS(state, payload);

      expect(state).toEqual({
        users: [
          { id: 1, name: "Test1" },
          { id: 2, name: "Test2" }
        ],
        fetchUsersIsLoading: false,
        fetchUsersHasError: false,
        addUserIsLoading: false,
        addUserHasError: false
      });
    });
    it("should call ADD_ERROR and change to addUserIsLoading=false and addUserHasError=true and error message, given addUserIsLoading=true and addUserHasError=false.", () => {
      const state: State = {
        users: [],
        fetchUsersIsLoading: false,
        fetchUsersHasError: false,
        addUserIsLoading: true,
        addUserHasError: false
      };
      const payload = "error";

      ADD_ERROR(state, payload);

      expect(state).toEqual({
        users: [],
        addUserErrorMsg: payload,
        fetchUsersIsLoading: false,
        fetchUsersHasError: false,
        addUserIsLoading: false,
        addUserHasError: true
      });
    });
  });

  describe("Actions", () => {
    it("should commit 'FETCH_INIT', call the api and commit 'FETCH_SUCCESS'", async () => {
      const state: State = {
        users: [],
        fetchUsersIsLoading: false,
        fetchUsersHasError: false,
        addUserIsLoading: false,
        addUserHasError: false
      };
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
      expect((http.get as jest.Mock).mock.calls[0][0]).toEqual("/user");
    });

    it("should commit 'FETCH_INIT', call the api and commit 'FETCH_ERROR'", async () => {
      const state: State = {
        users: [],
        fetchUsersIsLoading: false,
        fetchUsersHasError: false,
        addUserIsLoading: false,
        addUserHasError: false
      };
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
      expect((http.get as jest.Mock).mock.calls[0][0]).toEqual("/user");
    });

    it("should commit 'ADD_INIT', call the api and commit 'ADD_SUCCESS'", async () => {
      const state: State = {
        users: [],
        fetchUsersIsLoading: false,
        fetchUsersHasError: false,
        addUserIsLoading: false,
        addUserHasError: false
      };
      const context = {
        commit: jest.fn(),
        dispatch: jest.fn(),
        state,
        getters: {},
        rootState: state,
        rootGetters: {}
      } as ActionContext<State, State>;
      (http.post as jest.Mock).mockReturnValue({ data: { user: "xyz" } });
      await addUser(context, "TestUser");

      expect(context.commit).toHaveBeenCalledTimes(2);
      expect(context.commit).toHaveBeenNthCalledWith(1, "ADD_INIT");
      expect(context.commit).toHaveBeenNthCalledWith(2, "ADD_SUCCESS", {
        user: "xyz"
      });
      expect((http.post as jest.Mock).mock.calls[0][0]).toEqual("/user");
      expect((http.post as jest.Mock).mock.calls[0][1]).toEqual({
        name: "TestUser"
      });
    });

    it("should commit 'ADD_INIT', call the api and commit 'ADD_ERROR'", async () => {
      const state: State = {
        users: [],
        fetchUsersIsLoading: false,
        fetchUsersHasError: false,
        addUserIsLoading: false,
        addUserHasError: false
      };
      const context = {
        commit: jest.fn(),
        dispatch: jest.fn(),
        state,
        getters: {},
        rootState: state,
        rootGetters: {}
      } as ActionContext<State, State>;
      (http.post as jest.Mock).mockRejectedValue(new Error());
      await addUser(context, "TestUser");

      expect(context.commit).toHaveBeenCalledTimes(2);
      expect(context.commit).toHaveBeenNthCalledWith(1, "ADD_INIT");
      expect(context.commit).toHaveBeenNthCalledWith(
        2,
        "ADD_ERROR",
        expect.any(Error)
      );
      expect((http.post as jest.Mock).mock.calls[0][0]).toEqual("/user");
      expect((http.post as jest.Mock).mock.calls[0][1]).toEqual({
        name: "TestUser"
      });
    });
  });
});
